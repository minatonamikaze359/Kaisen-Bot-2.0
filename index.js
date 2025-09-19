import { default as makeWASocket, useMultiFileAuthState, DisconnectReason } from "@adiwajshing/baileys";
import P from "pino";
import fs from "fs";
import path from "path";

const { state, saveCreds } = await useMultiFileAuthState("./session");

const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: "silent" })
});

sock.ev.on("creds.update", saveCreds);

// Load all commands
const commands = new Map();
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (let file of commandFiles) {
    const cmd = await import(`./commands/${file}`);
    commands.set(cmd.default.name, cmd.default);
}

// Message handler
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
        }
    }
});

console.log("⚡ KAISEN-BOT-MD is running...");
