#!/bin/bash

echo "🔍 Verifying Cloudflare Polish Configuration for The Landry Method..."
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Base URL (update this to your actual domain)
BASE_URL="https://thelandrymethod.com"

# Test URLs - different image types
declare -A URLS=(
  ["Gallery Before (Lossy+WebP)"]="$BASE_URL/assets/gallery/before-bedroom.jpg"
  ["Gallery After (Lossy+WebP)"]="$BASE_URL/assets/gallery/after-bedroom.jpg"
  ["Hero Image (Lossless+WebP)"]="$BASE_URL/assets/hero-living-room.jpg"
  ["Logo PNG (Polish OFF)"]="$BASE_URL/assets/logos/austin-real-estate-opt.png"
  ["Before Image (Lossless+WebP)"]="$BASE_URL/images/before/before-empty-bedroom.png"
  ["After Image (Lossless+WebP)"]="$BASE_URL/images/after/after-traditional-bedroom.jpeg"
)

echo ""
for name in "${!URLS[@]}"; do
  url="${URLS[$name]}"
  echo -e "${YELLOW}▶️ Testing: $name${NC}"
  echo "   URL: $url"
  
  # Check for Cf-Polished header
  cf_polished=$(curl -sI "$url" | grep -i "cf-polished" || echo "Not found")
  
  if [[ "$cf_polished" == *"Not found"* ]]; then
    if [[ "$name" == *"Logo"* ]]; then
      echo -e "   ${GREEN}✅ Polish OFF: Header absent (expected for logos)${NC}"
    else
      echo -e "   ${RED}❌ Warning: cf-polished header not found${NC}"
    fi
  else
    echo -e "   ${GREEN}✅ $cf_polished${NC}"
  fi
  
  # Check Content-Type
  content_type=$(curl -sI "$url" | grep -i "content-type" || echo "Not found")
  echo "   $content_type"
  
  # Check Cache-Control
  cache_control=$(curl -sI "$url" | grep -i "cache-control" || echo "Not found")
  echo "   $cache_control"
  
  # Check Vary header
  vary=$(curl -sI "$url" | grep -i "^vary:" || echo "Not found")
  if [[ "$vary" != *"Not found"* ]]; then
    echo "   $vary"
  fi
  
  echo ""
done

echo "=================================================="
echo ""
echo "📊 Expected Polish Behavior:"
echo ""
echo "1. ${GREEN}General Images (Gallery):${NC}"
echo "   - cf-polished: lossy=true, webp=true"
echo "   - 40-60% file size reduction"
echo ""
echo "2. ${GREEN}High-Value Images (Hero, Before/After):${NC}"
echo "   - cf-polished: lossy=false, webp=true"
echo "   - 20-30% file size reduction (lossless)"
echo ""
echo "3. ${GREEN}Logos:${NC}"
echo "   - cf-polished: Header absent (Polish OFF)"
echo "   - Original quality preserved"
echo ""
echo "4. ${GREEN}All Images:${NC}"
echo "   - WebP served to compatible browsers (Chrome, Firefox, Edge)"
echo "   - Original format served to Safari/older browsers"
echo "   - Vary: Accept header present"
echo ""

echo "🔧 Troubleshooting:"
echo "- No cf-polished header? Check Configuration Rules are enabled in Cloudflare Dashboard"
echo "- Wrong optimization? Verify rule priority (Logos > Lossless > Lossy)"
echo "- Changes not applying? Purge Cloudflare cache (Dashboard → Caching → Purge Everything)"
echo ""
echo "✅ Polish verification complete!"
