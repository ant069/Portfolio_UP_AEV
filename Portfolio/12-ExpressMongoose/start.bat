@echo off
echo ========================================
echo   F1 Database - Quick Start Script
echo ========================================
echo.

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
) else (
    echo Dependencies already installed.
    echo.
)

echo ========================================
echo Make sure MongoDB is running on:
echo mongodb://127.0.0.1:27017
echo ========================================
echo.

:menu
echo What would you like to do?
echo.
echo [1] Load data from CSV into MongoDB
echo [2] Start the server
echo [3] Load data AND start server
echo [4] Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto loaddata
if "%choice%"=="2" goto startserver
if "%choice%"=="3" goto both
if "%choice%"=="4" goto end

echo Invalid choice. Please try again.
echo.
goto menu

:loaddata
echo.
echo Loading data from CSV...
node loadData.js
echo.
pause
goto menu

:startserver
echo.
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
node server.js
pause
goto menu

:both
echo.
echo Loading data from CSV...
node loadData.js
echo.
echo Data loaded successfully!
echo.
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
node server.js
pause
goto menu

:end
echo.
echo Goodbye!
timeout /t 2 >nul
