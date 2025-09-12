@echo off
echo Fixing GitHub push issue and uploading Community Help Hub...
echo.

cd /d "d:\Hub_Fsd"

echo Pulling remote changes...
git pull origin main --allow-unrelated-histories

echo Pushing Community Help Hub to GitHub...
git push origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo Your Community Help Hub is now available at:
echo https://github.com/arun-66102/Community-Hub

pause
