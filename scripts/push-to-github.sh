#!/bin/bash

# ⚠️ SECURITY WARNING
# The GitHub PAT in .env.local was shared publicly
# REVOKE IT at: https://github.com/settings/tokens
# Generate a NEW token with 'repo' scope

set -e

# Load environment variables
source .env.local

if [ -z "$GITHUB_PAT" ]; then
    echo "❌ Error: GITHUB_PAT not found in .env.local"
    exit 1
fi

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GITHUB_USERNAME not found in .env.local"
    echo "   Set it to your GitHub username"
    exit 1
fi

REPO_URL="https://${GITHUB_USERNAME}:${GITHUB_PAT}@github.com/${GITHUB_USERNAME}/formfab.git"

echo "🔧 Setting up git..."

# Initialize git if not done
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add -A

# Commit
git commit -m "Initial commit - FormFab ready for deployment" || echo "No changes to commit"

# Check if remote exists
if git remote | grep -q "^origin$"; then
    echo "✅ Remote 'origin' already exists"
else
    echo "🔗 Adding remote origin..."
    git remote add origin "$REPO_URL"
fi

# Create repo on GitHub via API (optional - you can also create manually)
echo "📦 Creating GitHub repository..."
curl -s -X POST \
  -H "Authorization: token ${GITHUB_PAT}" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{"name":"formfab","description":"Multi-Material 3D Printing Platform","private":false}' \
  | grep -q "Already created" && echo "✅ Repository already exists" || echo "✅ Repository created"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "✅ SUCCESS!"
echo ""
echo "📦 Your code is now at:"
echo "   https://github.com/${GITHUB_USERNAME}/formfab"
echo ""
echo "🚀 Next steps:"
echo "   1. Deploy frontend to Vercel: https://vercel.com/new"
echo "   2. Deploy backend to Railway: https://railway.app/new"
echo "   3. Set up Supabase: https://supabase.com"
echo "   4. Set up Stripe: https://stripe.com"
echo ""
echo "⚠️ SECURITY: Revoke your PAT and generate a new one!"
echo "   https://github.com/settings/tokens"
