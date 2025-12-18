#!/bin/bash

# Cloudflare Security Settings Adjustment Script
# This script adjusts Cloudflare security settings to eliminate slow security check pages

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="thelandrymethod.com"
ZONE_ID=""  # Will be fetched automatically
API_TOKEN=""  # Will be prompted if not set

# Check if API token is provided
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${YELLOW}Cloudflare API Token not found in environment.${NC}"
    echo -e "${YELLOW}Please enter your Cloudflare API Token:${NC}"
    echo -e "${YELLOW}(Get one from: https://dash.cloudflare.com/profile/api-tokens)${NC}"
    read -s API_TOKEN
    echo ""
else
    API_TOKEN="$CLOUDFLARE_API_TOKEN"
fi

if [ -z "$API_TOKEN" ]; then
    echo -e "${RED}Error: API Token is required${NC}"
    exit 1
fi

echo -e "${GREEN}Fetching Zone ID for ${DOMAIN}...${NC}"

# Get Zone ID
ZONE_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json")

ZONE_ID=$(echo $ZONE_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$ZONE_ID" ]; then
    echo -e "${RED}Error: Could not find zone ID for ${DOMAIN}${NC}"
    echo -e "${RED}Response: ${ZONE_RESPONSE}${NC}"
    exit 1
fi

echo -e "${GREEN}Zone ID: ${ZONE_ID}${NC}"
echo ""

# Function to update security level
update_security_level() {
    local level=$1
    echo -e "${YELLOW}Setting Security Level to: ${level}${NC}"
    
    RESPONSE=$(curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/security_level" \
        -H "Authorization: Bearer ${API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data "{\"value\":\"${level}\"}")
    
    SUCCESS=$(echo $RESPONSE | grep -o '"success":[^,]*' | cut -d':' -f2)
    
    if [ "$SUCCESS" = "true" ]; then
        echo -e "${GREEN}✓ Security Level updated to ${level}${NC}"
    else
        echo -e "${RED}✗ Failed to update Security Level${NC}"
        echo -e "${RED}Response: ${RESPONSE}${NC}"
        return 1
    fi
}

# Function to update bot fight mode
update_bot_fight_mode() {
    local enabled=$1
    echo -e "${YELLOW}Setting Bot Fight Mode to: ${enabled}${NC}"
    
    RESPONSE=$(curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/bot_fight_mode" \
        -H "Authorization: Bearer ${API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data "{\"value\":\"${enabled}\"}")
    
    SUCCESS=$(echo $RESPONSE | grep -o '"success":[^,]*' | cut -d':' -f2)
    
    if [ "$SUCCESS" = "true" ]; then
        echo -e "${GREEN}✓ Bot Fight Mode updated to ${enabled}${NC}"
    else
        echo -e "${RED}✗ Failed to update Bot Fight Mode${NC}"
        echo -e "${RED}Response: ${RESPONSE}${NC}"
        return 1
    fi
}

# Function to update challenge passage
update_challenge_passage() {
    local minutes=$1
    echo -e "${YELLOW}Setting Challenge Passage to: ${minutes} minutes${NC}"
    
    RESPONSE=$(curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/challenge_passage" \
        -H "Authorization: Bearer ${API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data "{\"value\":${minutes}}")
    
    SUCCESS=$(echo $RESPONSE | grep -o '"success":[^,]*' | cut -d':' -f2)
    
    if [ "$SUCCESS" = "true" ]; then
        echo -e "${GREEN}✓ Challenge Passage updated to ${minutes} minutes${NC}"
    else
        echo -e "${RED}✗ Failed to update Challenge Passage${NC}"
        echo -e "${RED}Response: ${RESPONSE}${NC}"
        return 1
    fi
}

# Main execution
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Cloudflare Security Settings Update${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Update Security Level to Medium (recommended)
update_security_level "medium"
echo ""

# Disable Bot Fight Mode (or set to low if preferred)
update_bot_fight_mode "off"
echo ""

# Set Challenge Passage to 30 minutes
update_challenge_passage 30
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}All settings updated successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Note: Changes take effect immediately.${NC}"
echo -e "${YELLOW}Test your site in an incognito window to verify.${NC}"


