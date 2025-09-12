@echo off
echo Pushing Community Help Hub to GitHub...
echo.

cd /d "d:\Hub_Fsd"

echo Initializing git repository...
git init

echo Adding remote origin...
git remote add origin https://github.com/arun-66102/Community-Hub.git

echo Staging all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: Complete Community Help Hub platform - Interactive React.js web interface - Tailwind CSS responsive design - Leaflet map integration with geolocation - User role management (volunteers, NGOs, people in need) - Help request creation and management - Urgency-based filtering system - Real-time notifications - Mobile-responsive design - Accessibility features"

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo Your Community Help Hub is now available at:
echo https://github.com/arun-66102/Community-Hub

pause
