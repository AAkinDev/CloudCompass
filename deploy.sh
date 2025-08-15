#!/bin/bash
# deploy.sh — One-command Next.js → GitHub Pages deploy for CloudProInsights

set -e

REPO_NAME="CloudProInsights"

# 1) Ensure next.config.js exists and is Pages-ready
cat > next.config.js <<EOL
const isProd = process.env.NODE_ENV === "production";
const repo = "${REPO_NAME}";

module.exports = {
  output: "export",
  basePath: isProd ? \`/\${repo}\` : "",
  assetPrefix: isProd ? \`/\${repo}/\` : "",
  images: { unoptimized: true },
  trailingSlash: true,
};
EOL

echo "[1/5] ✅ Updated next.config.js for GitHub Pages"

# 2) Install dependencies & build
npm ci
npm run build

echo "[2/5] ✅ Build complete"

# 3) Move output to /docs for GitHub Pages
rm -rf docs
mkdir docs
rsync -a out/ docs/
touch docs/.nojekyll

echo "[3/5] ✅ Exported site moved to /docs with .nojekyll"

# 4) Commit & push
git add next.config.js docs
git commit -m "Deploy to GitHub Pages"
git push --set-upstream origin main

echo "[4/5] ✅ Changes committed and pushed"

# 5) Done
echo "[5/5] 🚀 Deployment ready. Ensure GitHub Pages is set to serve from 'main' branch /docs folder."
