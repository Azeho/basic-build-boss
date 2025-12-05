#!/bin/bash
# Deploy to GitHub Pages

# Build the site
npm run build

# Create gh-pages branch and deploy
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
rm -rf dist
git add .
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages
git checkout main
