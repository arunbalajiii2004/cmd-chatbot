@echo off
title CMD Chatbot
echo === CMD Chatbot ===
echo Type 'exit' to quit
echo.

:: Replace this with your own secret token
set TOKEN=your_secret_token_here

:: Replace this with your own Cloudflare Worker URL
set WORKER_URL=https://your-worker-name.your-subdomain.workers.dev

:loop
set /p INPUT="You: "
if /i "%INPUT%"=="exit" goto end
if "%INPUT%"=="" goto loop

curl -s -G "%WORKER_URL%/" --data-urlencode "msg=%INPUT%" --data-urlencode "token=%TOKEN%"

echo.
echo.
goto loop

:end
cls
