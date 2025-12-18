#!/usr/bin/env node

/**
 * Cloudflare Security Settings Adjustment Script
 * Adjusts Cloudflare security settings via API to eliminate slow security check pages
 * 
 * Usage:
 *   CLOUDFLARE_API_TOKEN=your_token node scripts/adjust-cloudflare-security.js
 *   OR
 *   node scripts/adjust-cloudflare-security.js (will prompt for token)
 */

const https = require('https');

const DOMAIN = 'thelandrymethod.com';
let ZONE_ID = '';
let API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Make API request
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
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.success) {
            resolve(parsed);
          } else {
            reject(new Error(JSON.stringify(parsed.errors || parsed)));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Get Zone ID
async function getZoneId() {
  log(`Fetching Zone ID for ${DOMAIN}...`, 'yellow');
  try {
    const response = await apiRequest('GET', `/client/v4/zones?name=${DOMAIN}`);
    if (response.result && response.result.length > 0) {
      ZONE_ID = response.result[0].id;
      log(`✓ Zone ID: ${ZONE_ID}`, 'green');
      return ZONE_ID;
    } else {
      throw new Error('Zone not found');
    }
  } catch (error) {
    log(`✗ Error fetching Zone ID: ${error.message}`, 'red');
    throw error;
  }
}

// Update Security Level
async function updateSecurityLevel(level) {
  log(`Setting Security Level to: ${level}`, 'yellow');
  try {
    await apiRequest('PATCH', `/client/v4/zones/${ZONE_ID}/settings/security_level`, {
      value: level,
    });
    log(`✓ Security Level updated to ${level}`, 'green');
  } catch (error) {
    log(`✗ Failed to update Security Level: ${error.message}`, 'red');
    throw error;
  }
}

// Update Bot Fight Mode
async function updateBotFightMode(enabled) {
  log(`Setting Bot Fight Mode to: ${enabled}`, 'yellow');
  try {
    await apiRequest('PATCH', `/client/v4/zones/${ZONE_ID}/settings/bot_fight_mode`, {
      value: enabled ? 'on' : 'off',
    });
    log(`✓ Bot Fight Mode updated to ${enabled ? 'on' : 'off'}`, 'green');
  } catch (error) {
    log(`✗ Failed to update Bot Fight Mode: ${error.message}`, 'red');
    throw error;
  }
}

// Update Challenge Passage
async function updateChallengePassage(minutes) {
  log(`Setting Challenge Passage to: ${minutes} minutes`, 'yellow');
  try {
    await apiRequest('PATCH', `/client/v4/zones/${ZONE_ID}/settings/challenge_passage`, {
      value: minutes,
    });
    log(`✓ Challenge Passage updated to ${minutes} minutes`, 'green');
  } catch (error) {
    log(`✗ Failed to update Challenge Passage: ${error.message}`, 'red');
    throw error;
  }
}

// Main execution
async function main() {
  console.log('');
  log('========================================', 'green');
  log('Cloudflare Security Settings Update', 'green');
  log('========================================', 'green');
  console.log('');

  // Check for API token
  if (!API_TOKEN) {
    log('Cloudflare API Token not found in environment.', 'yellow');
    log('Please set CLOUDFLARE_API_TOKEN environment variable', 'yellow');
    log('Get your token from: https://dash.cloudflare.com/profile/api-tokens', 'yellow');
    process.exit(1);
  }

  try {
    // Get Zone ID
    await getZoneId();
    console.log('');

    // Update Security Level to Medium (recommended)
    await updateSecurityLevel('medium');
    console.log('');

    // Disable Bot Fight Mode
    await updateBotFightMode(false);
    console.log('');

    // Set Challenge Passage to 30 minutes
    await updateChallengePassage(30);
    console.log('');

    log('========================================', 'green');
    log('All settings updated successfully!', 'green');
    log('========================================', 'green');
    console.log('');
    log('Note: Changes take effect immediately.', 'yellow');
    log('Test your site in an incognito window to verify.', 'yellow');
    console.log('');
  } catch (error) {
    log(`\nError: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main, updateSecurityLevel, updateBotFightMode, updateChallengePassage };


