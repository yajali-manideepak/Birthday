@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
 echo Install Node.js 20 or later from https://nodejs.org and try again.
 pause
 exit /b 1
)
node server.mjs
pause
