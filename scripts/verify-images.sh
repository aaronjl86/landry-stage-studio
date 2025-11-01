#!/bin/bash
echo "🔍 Verifying Cloudflare Image Optimization..."
URLS=(
  "https://thelandrymethod.com/cdn-cgi/image/width=800,quality=85,format=auto/assets/after-staged-room-wGILei75.avif"
  "https://thelandrymethod.com/cdn-cgi/image/width=400,quality=85,format=auto/assets/logo.png"
)
for url in "${URLS[@]}"; do
  echo -e "\n▶️ Testing $url"
  curl -Is "$url" | grep -E "HTTP|cf-image-transform|Cache-Control|Vary|cf-resized"
done
echo -e "\n✅ Image optimization checks complete."

