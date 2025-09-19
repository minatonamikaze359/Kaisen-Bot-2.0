// index.js
import makeWASocket, { useSingleFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from "@adiwajshing/baileys";
import P from "pino";
import fs from "fs";
import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCC9KrhUviEdyVG2CPXF-ms-SzlppDM768";
const OWNER_NUMBER = "8801405706170"; // Owner WhatsApp number without '+'
const SESSION_FILE = "./session.json";
const PREFIXES = ['.', ',', '!'];

const { state, saveState } = useSingleFileAuthState(SESSION_FILE);
let BOT_MODE_PUBLIC = true;

async function startBot() {
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    auth: state
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      if ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
        startBot();
      }
    } else if (connection === "open") {
      console.log("KAISEN-BOT-MD started successfully!");
    }
  });

  sock.ev.on("messages.upsert", async m => {
    if (!m.messages) return;
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const isOwner = sender.includes(OWNER_NUMBER);
    let text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (!text) return;

    const prefixUsed = PREFIXES.find(p => text.startsWith(p));
    if (!prefixUsed) return;

    const command = text.slice(1).trim().split(/ +/)[0].toLowerCase();
    const args = text.slice(1).trim().split(/ +/).slice(1);

    // ===== OWNER COMMANDS =====
    if (isOwner) {
      switch(command){
        case 'ban': await sock.sendMessage(sender, { text: "User banned (simulated)" }); return;
        case 'unban': await sock.sendMessage(sender, { text: "User unbanned (simulated)" }); return;
        case 'block': await sock.sendMessage(sender, { text: "User blocked (simulated)" }); return;
        case 'unblock': await sock.sendMessage(sender, { text: "User unblocked (simulated)" }); return;
        case 'restart': 
          await sock.sendMessage(sender, { text: "Bot restarting..." }); 
          process.exit(1); 
          return;
        case 'chatbot': 
          if(args[0] === "on"){ BOT_MODE_PUBLIC = true; await sock.sendMessage(sender, { text: "Chatbot public mode ON" });}
          if(args[0] === "off"){ BOT_MODE_PUBLIC = false; await sock.sendMessage(sender, { text: "Chatbot public mode OFF" });}
          return;
      }
    }

    // ===== MENU COMMAND =====
    if(command === 'menu'){
      const menu = `
*╭══〘〘 KAISEN-BOT-MD 〙〙*
*┃❍ ᴏᴡɴᴇʀ  :* Tamim
*┃❍ ᴍᴏᴅᴇ   :* ${BOT_MODE_PUBLIC ? "Public" : "Private"}
*╰══════════⊷*

*╭────❒ FUN ❒*
*├◈ 8ball*
*├◈ dice*
*├◈ coin*
*├◈ fortune*
*├◈ flip*
*├◈ truth*
*├◈ dare*
*╰──────────────────❒*

*╭────❒ ANIME ❒*
*├◈ neko*
*├◈ waifu*
*├◈ animegirl*
*├◈ cosplay*
*╰──────────────────❒*

*╭────❒ AUDIO / CONVERTER ❒*
*├◈ bass*
*├◈ slow*
*├◈ fast*
*├◈ deep*
*├◈ mp3*
*├◈ sticker*
*├◈ asticker*
*╰──────────────────❒*

*╭────❒ MEDIA ❒*
*├◈ fb*
*├◈ ig*
*├◈ song*
*├◈ video*
*├◈ photo*
*├◈ gif*
*╰──────────────────❒*

*╭────❒ UTILITY ❒*
*├◈ calc*
*├◈ convert*
*├◈ qr*
*├◈ weather*
*├◈ short*
*├◈ expand*
*╰──────────────────❒*

*╭────❒ GROUP ❒*
*├◈ promote*
*├◈ demote*
*├◈ mute*
*├◈ unmute*
*├◈ tagall*
*├◈ welcome*
*╰──────────────────❒*

💖 *~_Made with love by KAISEN_~*
      `;
      await sock.sendMessage(sender, { text: menu });
      return;
    }

    // ===== FUN COMMANDS =====
    if(['8ball','dice','coin','fortune','flip','truth','dare'].includes(command)){
      let reply = '';
      switch(command){
        case '8ball': reply = ["Yes","No","Maybe","Ask again"][Math.floor(Math.random()*4)]; break;
        case 'dice': reply = `${Math.floor(Math.random()*6)+1}`; break;
        case 'coin': reply = Math.random() < 0.5 ? "Heads":"Tails"; break;
        case 'fortune': reply = ["Good luck","Bad luck","Neutral"][Math.floor(Math.random()*3)]; break;
        case 'flip': reply = Math.random() < 0.5 ? "Flipped!":"Not flipped!"; break;
        case 'truth': reply = "Always tell the truth!"; break;
        case 'dare': reply = "Do a fun dare!"; break;
      }
      await sock.sendMessage(sender, { text: reply });
      return;
    }

    // ===== SIMPLE ANIME COMMANDS =====
    if(['neko','waifu','animegirl','cosplay'].includes(command)){
      const urls = {
        neko: ["https://cdn.nekos.life/neko/neko1.jpg","https://cdn.nekos.life/neko/neko2.jpg"],
        waifu: ["https://cdn.nekos.life/waifu/waifu1.jpg","https://cdn.nekos.life/waifu/waifu2.jpg"],
        animegirl: ["https://cdn.nekos.life/anime/anime1.jpg","https://cdn.nekos.life/anime/anime2.jpg"],
        cosplay: ["https://cdn.nekos.life/cosplay/cosplay1.jpg","https://cdn.nekos.life/cosplay/cosplay2.jpg"]
      };
      const img = urls[command][Math.floor(Math.random()*urls[command].length)];
      await sock.sendMessage(sender, { image: { url: img }});
      return;
    }

    // ===== AI CHAT =====
    if(BOT_MODE_PUBLIC || isOwner){
      try{
        const res = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
          { prompt: text, temperature: 0.7, max_output_tokens: 256 },
          { headers: { "Authorization": `Bearer ${GEMINI_API_KEY}`, "Content-Type": "application/json" } }
        );
        const aiReply = res.data?.candidates?.[0]?.content || "Sorry, I cannot respond now.";
        await sock.sendMessage(sender, { text: aiReply });
      } catch(err){
        console.error(err);
        await sock.sendMessage(sender, { text: "Error contacting AI API." });
      }
    }
  });
}

startBot();
