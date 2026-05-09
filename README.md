# 📞 ElevenLabs AI Calling Agent

An AI-powered outbound calling system built using **ElevenLabs Conversational AI**, **Twilio**, and **Cursor MCP**.  
This project enables an AI voice agent to make phone calls and provide tech updates in a natural, conversational way.

---

## 🚀 Project Overview

This project integrates:

- **ElevenLabs Conversational AI** for intelligent voice interaction
- **Twilio** for phone call functionality
- **Cursor MCP (Model Context Protocol)** for local AI integration

The AI agent is capable of:

✅ Making outbound phone calls  
✅ Speaking naturally using an AI voice  
✅ Delivering quick tech updates  
✅ Conversing in a friendly, human-like tone

---

## ✨ Features

- 📞 **Outbound Calling Agent**
- 🤖 **AI-powered Voice Conversations**
- 🗣️ **Natural Female Voice Support**
- 🔗 **Twilio Phone Number Integration**
- 🧠 **ElevenLabs Conversational AI**
- ⚡ **MCP Integration with Cursor IDE**
- 📰 **Real-Time Tech News Style Updates**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Python | Backend setup |
| ElevenLabs | Conversational AI & Voice |
| Twilio | Phone call service |
| Cursor IDE | MCP integration |
| MCP | AI tooling integration |

---

## 📋 Prerequisites

Before starting, make sure you have:

### 1. ElevenLabs Account
You need an ElevenLabs account to create conversational AI agents and generate API keys.

### 2. Twilio Account
A Twilio account is required for purchasing a phone number and making calls.

### 3. Python & Cursor IDE
- Python **3.10+**
- Cursor IDE installed
- Virtual environment configured

---

## ⚙️ Installation & Setup

### Step 1: Clone Repository

```bash
git clone YOUR_REPOSITORY_LINK
cd YOUR_PROJECT_NAME
```

---

### Step 2: Create Virtual Environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
ELEVENLABS_API_KEY=your_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

⚠️ Never upload your `.env` file to GitHub.

---

## 🎙️ ElevenLabs Setup

### Generate API Key

1. Login to ElevenLabs
2. Open **Profile → API Keys**
3. Create a new API key
4. Copy and save the key securely

---

### Create AI Agent

Use the following prompt:

```text
Create an agent that makes an outbound call to update someone about recent tech news.

- Use a confident, friendly tone — like a helpful colleague
- Deliver updates about the latest in AI, programming, and cybersecurity
- Keep the explanation short, clear, and jargon-free
- Use my voice (female) for the call
- The agent should sound like a tech-savvy friend, not a sales rep
- First message:
"Hey, I’ve got some quick tech updates for you — should I go ahead?"
```

---

## ☎️ Twilio Integration

### Setup Twilio

1. Create a Twilio account
2. Verify your phone number
3. Buy a Twilio number
4. Configure Voice Webhook

Set this URL:

```text
https://api.us.elevenlabs.io/twilio/inbound_call
```

---

### Import Number Into ElevenLabs

1. Open **Conversational AI**
2. Go to **Phone Numbers**
3. Click **Import Number**
4. Select **Twilio**
5. Paste your Twilio number
6. Add:
   - Account SID
   - Auth Token

---

## 🔌 MCP Setup in Cursor

Install MCP dependency:

```bash
pip install elevenlabs-mcp
```

Run:

### Git Bash / Mac/Linux

```bash
python -m elevenlabs_mcp --api-key=$ELEVENLABS_API_KEY --print
```

### Windows CMD

```cmd
python -m elevenlabs_mcp --api-key=%ELEVENLABS_API_KEY% --print
```

Copy the generated JSON output and paste it into your Cursor MCP configuration file.

---

## 📞 Making an Outbound Call

Prompt:

```text
Now make an outbound call to my number, ask for my number
```

The AI agent will:

1. Initiate a call to the registered number
2. Connect using Twilio
3. Start the ElevenLabs conversational agent
4. Deliver tech updates naturally


## 🔒 Security

This project uses environment variables for API security.

Secrets are stored in:

```env
.env
```

and accessed using:

```json
"${ELEVENLABS_API_KEY}"
```

Never expose:
- API Keys
- Twilio Auth Token
- `.env` file

---

## 👨‍💻 Author

**Yogishi Paliwal**

Built as a real-world AI communication project using ElevenLabs + Twilio.