# Kaisen-Bot-2.0

# ⚡ KAISEN-BOT-MD Clone

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-blue)](https://vercel.com/new)

A **full-featured WhatsApp bot** clone inspired by **KAISEN-BOT-MD**, built with **Baileys v6** and **Node.js**.  
Supports commands, economy system, owner commands, and more.

---

## 🚀 Features

- Dynamic **multi-command system**  
- Advanced **economy system** with balance, leaderboard, and items  
- Owner-only commands with **unlimited balance**  
- Auto reconnect & **multi-file session** management  
- Easy deployment on **Vercel**  
- Customizable **command prefix** (`.`)

---

## 📂 Folder Structure
project/
├─ commands/
│ ├─ kaisen.js
│ ├─ eco.js
│ ├─ eco-leaderboard.js
│ ├─ eco-admin.js
│ └─ tamimowner.js
├─ data/
│ ├─ economy.json
│ └─ shop.json
├─ session/ # Auto-generated QR session files
├─ index.js
└─ package.json
