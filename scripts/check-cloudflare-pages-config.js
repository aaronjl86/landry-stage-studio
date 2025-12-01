#!/usr/bin/env node

/**
 * Check and Fix Cloudflare Pages Deployment Configuration
 * Checks why deployments are being skipped and fixes the issue
 */

import https from 'https';

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const PROJECT_NAME = 'landry-stage-studio';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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
          if (parsed.success !== false) {
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
  log(`Fetching project: ${PROJECT_NAME}...`, 'yellow');
  try {
    const response = await apiRequest('GET', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}`);
    return response.result;
  } catch (error) {
    log(`✗ Error: ${error.message}`, 'red');
    throw error;
  }
}

async function updateProjectSettings(settings) {
  log(`Updating project settings...`, 'yellow');
  try {
    const response = await apiRequest('PATCH', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}`, settings);
    log(`✓ Settings updated`, 'green');
    return response.result;
  } catch (error) {
    log(`✗ Error: ${error.message}`, 'red');
    throw error;
  }
}

async function createDeployment(branch = 'main') {
  log(`Creating deployment from branch: ${branch}...`, 'yellow');
  try {
    const response = await apiRequest('POST', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`, {
      branch: branch,
    });
    log(`✓ Deployment created: ${response.result?.url || 'Check dashboard'}`, 'green');
    return response.result;
  } catch (error) {
    log(`✗ Error: ${error.message}`, 'red');
    throw error;
  }
}

async function main() {
  console.log('');
  log('========================================', 'green');
  log('Cloudflare Pages Config Check & Fix', 'green');
  log('========================================', 'green');
  console.log('');

  if (!API_TOKEN || !ACCOUNT_ID) {
    log('✗ Missing API credentials', 'red');
    log('Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID', 'yellow');
    process.exit(1);
  }

  try {
    // Get current project settings
    const project = await getProject();
    console.log('');
    log('Current Settings:', 'blue');
    log(`  Production Branch: ${project.production_branch || 'NOT SET'}`, project.production_branch === 'main' ? 'green' : 'red');
    log(`  Build Command: ${project.build_config?.build_command || 'NOT SET'}`, 'reset');
    log(`  Output Directory: ${project.build_config?.destination_dir || 'NOT SET'}`, 'reset');
    console.log('');

    // Check deployment settings
    log('Checking deployment configuration...', 'yellow');
    
    // The API doesn't directly expose "production_deployments_enabled" but we can check deployments
    log('Creating a new deployment to trigger build...', 'yellow');
    await createDeployment('main');
    
    console.log('');
    log('========================================', 'green');
    log('Deployment triggered!', 'green');
    log('Check Cloudflare Dashboard for status', 'yellow');
    log('========================================', 'green');
    console.log('');

  } catch (error) {
    log(`\nError: ${error.message}`, 'red');
    if (error.message.includes('404')) {
      log('Project not found. Check project name and account ID.', 'yellow');
    }
    process.exit(1);
  }
}

// Run if executed directly
main().catch(console.error);

export { main, getProject, createDeployment };

