#!/bin/sh
# Publishes public/ from the `source` branch as the root of `main` (Hostinger deploys `main` into public_html).
# Usage: commit your changes on `source`, then run ./deploy.sh
set -e

git rev-parse --verify -q source >/dev/null || { echo "Missing branch 'source'"; exit 1; }
[ -z "$(git status --porcelain)" ] || { echo "Commit or stash your changes first"; exit 1; }

# The committed build must be current (compiled CSS + versioned asset URLs)
npm run -s build >/dev/null
[ -z "$(git status --porcelain)" ] || { echo "Build output changed: commit it, then deploy again"; exit 1; }

git fetch -q origin main
git push -q origin source

TREE=$(git rev-parse source:public)
if [ "$TREE" = "$(git rev-parse origin/main^{tree})" ]; then
  echo "main already matches source:public — nothing to deploy"; exit 0
fi

COMMIT=$(git commit-tree "$TREE" -p origin/main -m "Deploy website from source $(git rev-parse --short source)" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>")
git update-ref refs/heads/main "$COMMIT"
git push -q origin main
echo "Deployed $(git rev-parse --short "$COMMIT") to main"
