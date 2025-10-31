#!/bin/bash
# thelandrymethod.com production validation script
echo "🔍 Checking production integrity for The Landry Method..."
echo "----------------------------------------------------"

check() {
  echo "▶️ $1"
  eval "$2"
  echo ""
}

# 1️⃣ Homepage check
check "Homepage:" "curl -Is https://thelandrymethod.com | grep 'HTTP'"

# 2️⃣ SPA route check
check "Dashboard route:" "curl -Is https://thelandrymethod.com/dashboard | grep 'HTTP'"

# 3️⃣ Cache header check
check "Cache-Control on JS assets:" "curl -Is https://thelandrymethod.com/assets/index-*.js | grep 'Cache-Control'"

# 4️⃣ Robots.txt check
check "Robots.txt first lines:" "curl -s https://thelandrymethod.com/robots.txt | head -3"

# 5️⃣ Security header check
echo "Security header snapshot:"
curl -Is https://thelandrymethod.com | grep -E 'X-Frame-Options|X-Content-Type-Options|Referrer-Policy|Permissions-Policy|X-XSS-Protection'
echo ""
   
echo "----------------------------------------------------"
echo "✅ Basic production integrity checks complete."
echo ""

