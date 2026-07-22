#!/bin/bash
# Downscales object photos so the longest side is at most 2000px.
# Photos already at or under 2000px are left untouched. Run after adding
# new files to src/assets/objects/*/*.jpg.
set -euo pipefail
cd "$(dirname "$0")/.."

MAX_SIDE=2000

find src/assets/objects -name "*.jpg" | while read -r file; do
  width=$(sips -g pixelWidth "$file" | awk '/pixelWidth:/{print $2}')
  height=$(sips -g pixelHeight "$file" | awk '/pixelHeight:/{print $2}')
  longest=$(( width > height ? width : height ))

  if [ "$longest" -gt "$MAX_SIDE" ]; then
    sips -Z "$MAX_SIDE" "$file" >/dev/null
    echo "resized $file (${width}x${height} -> max ${MAX_SIDE})"
  else
    echo "skipped $file (${width}x${height}, already <= ${MAX_SIDE})"
  fi
done
