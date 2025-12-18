#!/bin/bash
set -e

echo "🔍 Verifying Images..."

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Track verification results
FAILED=0
TOTAL=0

# Function to check if a file exists and report details
check_image() {
  local file_path="$1"
  local full_path="$PROJECT_ROOT/$file_path"
  
  TOTAL=$((TOTAL + 1))
  
  if [ -f "$full_path" ]; then
    local size=$(du -h "$full_path" | cut -f1)
    local type=$(file -b --mime-type "$full_path")
    echo "✅ $file_path ($size, $type)"
  else
    echo "❌ Missing: $file_path"
    FAILED=$((FAILED + 1))
  fi
}

echo ""
echo "Checking critical image assets..."
echo ""

# Check key assets referenced in the application
check_image "src/assets/after-staged-room.avif"
check_image "src/assets/before-empty-room.avif"
check_image "src/assets/hero-living-room.jpg"
check_image "src/assets/after-staged-room.webp"
check_image "src/assets/before-empty-room.webp"

echo ""
echo "Checking logo assets..."
echo ""

check_image "src/assets/tlm-logo-white.png"
check_image "src/assets/tlm-logo-footer.png"

echo ""
echo "Checking public assets..."
echo ""

check_image "public/favicon.png"
check_image "public/placeholder.svg"

echo ""
echo "────────────────────────────────────────"
echo "Total images checked: $TOTAL"
echo "Missing images: $FAILED"

if [ $FAILED -eq 0 ]; then
  echo "✅ All image verification checks passed!"
  exit 0
else
  echo "❌ Some images are missing!"
  exit 1
fi
