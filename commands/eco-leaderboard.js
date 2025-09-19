import fs from "fs";
const dataFile = "./data/economy.json";

export default {
    name: "ecoleaderboard",
    description: "Show top richest users",
    execute: async (sock, msg, args) => {
        if(!fs.existsSync(dataFile)) return sock.sendMessage(msg.key.remoteJid, { text: "No economy data yet." });
        const data = JSON.parse(fs.readFileSync(dataFile));
        
        const sorted = Object.entries(data)
            .map(([user, info]) => ({ user, balance: info.balance || 0 }))
            .sort((a,b) => b.balance - a.balance)
            .slice(0,10);
        
        let text = "💎 Top 10 Richest Users:\n\n";
        sorted.forEach((u,i) => {
            text += `${i+1}. ${u.user.replace("@s.whatsapp.net","")} - ${u.balance} coins\n`;
        });
        await sock.sendMessage(msg.key.remoteJid, { text });
    }
};
