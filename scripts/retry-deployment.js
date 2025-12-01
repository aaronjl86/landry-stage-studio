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

async function retryDeployment(deploymentId) {
  log(`Retrying deployment: ${deploymentId}...`, 'yellow');
  try {
    const response = await apiRequest('POST', `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments/${deploymentId}/retry`);
    log(`✓ Deployment retry initiated`, 'green');
    return response.result;
  } catch (error) {
    log(`✗ Error: ${error.message}`, 'red');
    throw error;
  }
}

async function main() {
  console.log('');
  log('========================================', 'green');
  log('Retry Cloudflare Pages Deployment', 'green');
  log('========================================', 'green');
  console.log('');

  // The latest successful deployment with compliance changes
  const deploymentId = 'e6c75dd6-cdd7-45fd-b763-93360d576cc6';
  
  log(`Retrying deployment: ${deploymentId}`, 'yellow');
  log('This will trigger a fresh build of commit 5cddfff', 'yellow');
  console.log('');

  try {
    await retryDeployment(deploymentId);
    console.log('');
    log('========================================', 'green');
    log('Deployment retry initiated!', 'green');
    log('Check Cloudflare Dashboard for build progress', 'yellow');
    log('========================================', 'green');
    console.log('');
  } catch (error) {
    log(`\nError: ${error.message}`, 'red');
    process.exit(1);
  }
}

main().catch(console.error);

