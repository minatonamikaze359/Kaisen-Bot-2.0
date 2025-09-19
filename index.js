import { default as makeWASocket, useMultiFileAuthState, DisconnectReason } from "@adiwajshing/baileys";
import P from "pino";
import fs from "fs";
import path from "path";

// ---------- AUTH ----------
const { state, saveCreds } = await useMultiFileAuthState("./session");

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: "silent" })
});

sock.ev.on("creds.update", saveCreds);

// ---------- OWNER BALANCE ----------
const dataFile = "./data/economy.json";
const ownerNumber = "8801405706180@s.whatsapp.net";

if(!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "{}");
const data = JSON.parse(fs.readFileSync(dataFile));

if(!data[ownerNumber]) data[ownerNumber] = { balance: 0, daily: 0, items: [] };
data[ownerNumber].balance = BigInt("999999999999999999999").toString();

fs.writeFileSync(dataFile, JSON.stringify(data,null,2));
console.log("💎 Owner balance set automatically!");

// ---------- LOAD COMMANDS ----------
const commands = new Map();
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (let file of commandFiles) {
    const cmd = await import(`./commands/${file}`);
    commands.set(cmd.default.name, cmd.default);
}

// ---------- MESSAGE HANDLER ----------
sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if(!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if(!text) return;

    const prefix = "."; // command prefix
    if(!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(commands.has(commandName)) {
        try {
            await commands.get(commandName).execute(sock, msg, args);
        } catch(e) {
            console.log("Command error:", e);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Error executing command." });
        }
    }
});

// ---------- CONNECTION HANDLER ----------
sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === "close") {
        if((lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
            console.log("Reconnecting...");
        } else {
            console.log("Logged out. Delete session folder and scan QR again.");
        }
    }
});

console.log("⚡ KAISEN-BOT-MD is running...");
