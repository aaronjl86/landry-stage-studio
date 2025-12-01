#!/usr/bin/env node

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
          resolve(parsed);
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

async function getDeployments() {
  log('Fetching recent deployments...', 'yellow');
  try {
    const response = await apiRequest('GET', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments?per_page=10`);
    return response.result || [];
  } catch (error) {
    log(`✗ Error: ${error.message}`, 'red');
    throw error;
  }
}

async function main() {
  console.log('');
  log('========================================', 'green');
  log('Cloudflare Pages Deployment Status', 'green');
  log('========================================', 'green');
  console.log('');

  if (!API_TOKEN || !ACCOUNT_ID) {
    log('✗ Missing API credentials', 'red');
    process.exit(1);
  }

  try {
    const deployments = await getDeployments();
    console.log('');
    log(`Found ${deployments.length} recent deployments:`, 'blue');
    console.log('');

    deployments.forEach((deploy, index) => {
      const status = deploy.latest_stage?.status || 'unknown';
      const statusColor = status === 'success' ? 'green' : status === 'failure' ? 'red' : 'yellow';
      const commit = deploy.deployment_trigger?.metadata?.commit_hash?.substring(0, 7) || 'N/A';
      const message = deploy.deployment_trigger?.metadata?.commit_message || 'N/A';
      
      log(`${index + 1}. ${deploy.id}`, 'reset');
      log(`   Status: ${status}`, statusColor);
      log(`   Commit: ${commit}`, 'reset');
      log(`   Message: ${message.substring(0, 60)}...`, 'reset');
      log(`   URL: ${deploy.url || 'N/A'}`, 'reset');
      log(`   Created: ${new Date(deploy.created_on).toLocaleString()}`, 'reset');
      console.log('');
    });

    log('========================================', 'green');
    log('Check Cloudflare Dashboard for details', 'yellow');
    log('========================================', 'green');
    console.log('');

  } catch (error) {
    log(`\nError: ${error.message}`, 'red');
    process.exit(1);
  }
}

main().catch(console.error);

