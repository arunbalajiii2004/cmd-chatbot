# CMD Chatbot 🤖

A zero-install AI chatbot that runs directly in Windows CMD.
No Python. No Node.js. No setup. Just configure and chat.

---

## Architecture

```
CMD → Cloudflare Worker → Groq API → Response printed in CMD
```

---

## Why this is different

Most AI chatbots require installing Python, Node.js, or some other runtime. This one uses only what Windows already has built in — `curl` and `CMD`. Nothing is installed, nothing is left behind on the host PC.

---

## Features

- ✅ Zero installs — works on any Windows 10/11 PC out of the box
- ✅ No traces — nothing saved on the host PC after you exit
- ✅ API key never exposed — hidden inside Cloudflare Worker
- ✅ Protected — secret token blocks unauthorized access to your Worker
- ✅ Portable — run from a USB or a single memorized command
- ✅ Free — Cloudflare free tier (100k requests/day) + Groq free tier

---

## File Structure

```
cmd-chatbot/
├── worker.js       # Cloudflare Worker middleware code
├── chatbot.bat     # Windows CMD chatbot script
└── README.md       # This file
```

---

## Setup

### Step 1 — Get a free Groq API key
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up and go to **API Keys**
3. Click **Create API Key** and copy it

### Step 2 — Deploy the Cloudflare Worker
1. Go to [cloudflare.com](https://cloudflare.com) and sign up free
2. Dashboard → **Workers & Pages** → **Create Worker**
3. Name it anything (e.g. `chatbot`)
4. Click **Deploy** then **Edit Code**
5. Delete the default code and paste the contents of `worker.js`
6. Click **Deploy**
7. Go to **Settings** → **Variables and Secrets** → add these two:

| Variable Name | Value |
|---|---|
| `GROQ_API_KEY` | Your Groq API key |
| `ACCESS_TOKEN` | A secret word you choose (e.g. `batman42`) |

8. Click **Deploy** again

### Step 3 — Configure bro.bat
Open `chatbot.bat` and update these two lines:

```bat
set TOKEN=your_secret_token_here        ← replace with your ACCESS_TOKEN
set WORKER_URL=https://your-worker-name.your-subdomain.workers.dev  ← your Worker URL
```

### Step 4 — Run it
Double click `chatbot.bat` or run in CMD:

```cmd
chatbot.bat
```

---

## How it works

```
You type a message in CMD
        ↓
bro.bat sends it to your Cloudflare Worker via curl
        ↓
Worker verifies your secret token
        ↓
Worker calls Groq AI API with your message
        ↓
Groq returns a response
        ↓
Worker sends back plain text
        ↓
curl prints it directly in CMD
```

---

## Security

- Your **Groq API key** is never in the bat file — it lives inside Cloudflare's encrypted environment variables
- The **ACCESS_TOKEN** blocks anyone who finds your Worker URL from using your API credits
- The bat file **clears the screen on exit** leaving no chat history on the host PC

---

## Tech Stack

| Layer | Technology |
|---|---|
| Client | Windows CMD + curl (built-in) |
| Middleware | Cloudflare Workers (free tier) |
| AI Model | Groq — llama-3.3-70b-versatile |

---

## License

MIT — free to use and modify
