@echo off
echo Pushing Community Help Hub to GitHub...
echo.

cd /d "d:\Hub"

echo Initializing git repository...
git init

echo Adding remote origin...
git remote add origin https://github.com/arun-66102/Community-Hub.git

echo Staging all files...
git add .

echo Creating initial commit...
git commit -m "Fix date-fns dependency issue: Replace date-fns with native JavaScript Date methods - Resolved import error in statistics.js - Replaced format, subDays, startOfDay, endOfDay, isWithinInterval functions - Maintained all date manipulation functionality - Application now runs without external date library dependency"

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo Your Community Help Hub is now available at:
echo https://github.com/arun-66102/Community-Hub

pause
