#!/usr/bin/env node

/**
 * Comprehensive Cloudflare Pages Deployment Fix Script
 * 
 * This script diagnoses and fixes common issues that cause Cloudflare Pages
 * to skip deployments, including:
 * - Production deployments disabled
 * - Branch exclusion rules
 * - Build watch paths misconfiguration
 * - Git integration issues
 */

import https from 'https';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file if it exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

let API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
let ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';

try {
  const envFile = readFileSync(join(projectRoot, '.env'), 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^CLOUDFLARE_(API_TOKEN|ACCOUNT_ID)=["']?([^"'\n]+)["']?$/);
    if (match) {
      if (match[1] === 'API_TOKEN' && !API_TOKEN) {
        API_TOKEN = match[2];
      } else if (match[1] === 'ACCOUNT_ID' && !ACCOUNT_ID) {
        ACCOUNT_ID = match[2];
      }
    }
  });
} catch (e) {
  // .env file doesn't exist or can't be read, use environment variables only
}

const PROJECT_NAME = 'landry-stage-studio';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function apiRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.success !== false && res.statusCode < 400) {
            resolve(parsed);
          } else {
            reject(new Error(JSON.stringify(parsed.errors || parsed)));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function getProject() {
  try {
    const response = await apiRequest('GET', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}`);
    return response.result;
  } catch (error) {
    throw new Error(`Failed to fetch project: ${error.message}`);
  }
}

async function updateProjectSettings(settings) {
  try {
    const response = await apiRequest('PATCH', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}`, settings);
    return response.result;
  } catch (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }
}

async function createDeployment(branch = 'main') {
  try {
    const response = await apiRequest('POST', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`, {
      branch: branch,
    });
    return response.result;
  } catch (error) {
    throw new Error(`Failed to create deployment: ${error.message}`);
  }
}

async function diagnoseAndFix() {
  console.log('');
  log('========================================', 'cyan');
  log('Cloudflare Pages Deployment Diagnostic', 'cyan');
  log('========================================', 'cyan');
  console.log('');

  if (!API_TOKEN || !ACCOUNT_ID) {
    log('✗ Missing API credentials', 'red');
    log('Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID', 'yellow');
    log('', 'reset');
    log('You can get these from:', 'yellow');
    log('1. Cloudflare Dashboard → My Profile → API Tokens', 'reset');
    log('2. Create a token with: Account.Cloudflare Pages:Edit permissions', 'reset');
    log('3. Account ID is in the right sidebar of your dashboard', 'reset');
    process.exit(1);
  }

  try {
    // Get current project settings
    log('Fetching project configuration...', 'yellow');
    const project = await getProject();
    
    console.log('');
    log('Current Configuration:', 'blue');
    log(`  Production Branch: ${project.production_branch || 'NOT SET'}`, 
        project.production_branch === 'main' ? 'green' : 'red');
    log(`  Build Command: ${project.build_config?.build_command || 'NOT SET'}`, 'reset');
    log(`  Output Directory: ${project.build_config?.destination_dir || 'NOT SET'}`, 'reset');
    log(`  Root Directory: ${project.build_config?.root_dir || '/'}`, 'reset');
    
    // Check critical settings
    console.log('');
    log('Checking Critical Settings:', 'blue');
    
    const issues = [];
    const fixes = [];
    
    // 1. Check production deployments enabled
    const prodDeploymentsEnabled = project.production_deployments_enabled !== false;
    if (!prodDeploymentsEnabled) {
      issues.push('Production deployments are DISABLED');
      fixes.push({
        setting: 'production_deployments_enabled',
        value: true,
        description: 'Enable automatic production branch deployments'
      });
      log('  ✗ Production deployments: DISABLED', 'red');
    } else {
      log('  ✓ Production deployments: ENABLED', 'green');
    }
    
    // 2. Check preview branch includes
    const previewIncludes = project.preview_branch_includes || [];
    const previewExcludes = project.preview_branch_excludes || [];
    
    if (previewExcludes.includes('main') || previewExcludes.includes('*')) {
      issues.push('main branch is excluded from preview deployments');
      fixes.push({
        setting: 'preview_branch_excludes',
        value: previewExcludes.filter(b => b !== 'main' && b !== '*'),
        description: 'Remove main from preview branch exclusions'
      });
      log('  ✗ Preview branches: main is EXCLUDED', 'red');
    } else {
      log('  ✓ Preview branches: main is NOT excluded', 'green');
    }
    
    // 3. Check production branch
    if (project.production_branch !== 'main') {
      issues.push(`Production branch is set to '${project.production_branch}' instead of 'main'`);
      fixes.push({
        setting: 'production_branch',
        value: 'main',
        description: 'Set production branch to main'
      });
      log(`  ✗ Production branch: ${project.production_branch} (should be 'main')`, 'red');
    } else {
      log('  ✓ Production branch: main', 'green');
    }
    
    // 4. Check build watch paths (if configured)
    if (project.build_config?.watch_paths && project.build_config.watch_paths.length > 0) {
      log(`  ⚠ Build watch paths: ${project.build_config.watch_paths.join(', ')}`, 'yellow');
      log('     (If deployments skip, ensure changed files match these paths)', 'yellow');
    } else {
      log('  ✓ Build watch paths: Not configured (all changes trigger builds)', 'green');
    }
    
    // 5. Check deployments enabled
    if (project.deployments_enabled === false) {
      issues.push('All deployments are disabled');
      fixes.push({
        setting: 'deployments_enabled',
        value: true,
        description: 'Enable deployments'
      });
      log('  ✗ Deployments: DISABLED', 'red');
    } else {
      log('  ✓ Deployments: ENABLED', 'green');
    }
    
    console.log('');
    
    // Summary
    if (issues.length === 0) {
      log('✓ No configuration issues found!', 'green');
      log('', 'reset');
      log('If deployments are still being skipped, check:', 'yellow');
      log('1. Commit messages for skip flags: [skip ci], [CF-Pages-Skip]', 'reset');
      log('2. Git integration status in Cloudflare Dashboard', 'reset');
      log('3. Build logs for skipped deployments', 'reset');
      log('4. GitHub app installation status', 'reset');
    } else {
      log(`Found ${issues.length} issue(s):`, 'red');
      issues.forEach((issue, i) => {
        log(`  ${i + 1}. ${issue}`, 'red');
      });
      
      console.log('');
      log('Attempting to fix issues...', 'yellow');
      
      // Apply fixes
      const updateData = {};
      fixes.forEach(fix => {
        updateData[fix.setting] = fix.value;
        log(`  → ${fix.description}`, 'cyan');
      });
      
      if (Object.keys(updateData).length > 0) {
        try {
          await updateProjectSettings(updateData);
          log('', 'reset');
          log('✓ Settings updated successfully!', 'green');
        } catch (error) {
          log('', 'reset');
          log(`✗ Failed to update settings: ${error.message}`, 'red');
          log('', 'reset');
          log('Please update these settings manually in Cloudflare Dashboard:', 'yellow');
          log('Settings → Builds & deployments', 'reset');
          fixes.forEach(fix => {
            log(`  - ${fix.description}`, 'reset');
          });
        }
      }
    }
    
    // Offer to trigger deployment
    console.log('');
    log('Would you like to trigger a new deployment now?', 'yellow');
    log('(This will create a deployment from the main branch)', 'reset');
    log('', 'reset');
    log('To trigger manually, run:', 'cyan');
    log('  node scripts/fix-cloudflare-deployments.js --deploy', 'reset');
    
    // Check if --deploy flag is passed
    if (process.argv.includes('--deploy')) {
      console.log('');
      log('Triggering deployment...', 'yellow');
      try {
        const deployment = await createDeployment('main');
        log(`✓ Deployment triggered!`, 'green');
        log(`  URL: ${deployment.url || 'Check dashboard'}`, 'cyan');
        log(`  Status: ${deployment.latest_stage?.name || 'Building...'}`, 'cyan');
      } catch (error) {
        log(`✗ Failed to trigger deployment: ${error.message}`, 'red');
      }
    }
    
    console.log('');
    log('========================================', 'cyan');
    log('Diagnostic Complete', 'cyan');
    log('========================================', 'cyan');
    console.log('');
    
  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    if (error.message.includes('404')) {
      log('', 'reset');
      log('Project not found. Check:', 'yellow');
      log('1. Project name is correct: landry-stage-studio', 'reset');
      log('2. Account ID is correct', 'reset');
      log('3. API token has correct permissions', 'reset');
    }
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  diagnoseAndFix().catch(console.error);
}

export { diagnoseAndFix, getProject, updateProjectSettings, createDeployment };

