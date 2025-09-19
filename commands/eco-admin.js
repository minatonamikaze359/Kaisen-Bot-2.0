import fs from "fs";
const dataFile = "./data/economy.json";
const adminNumbers = ["8801405706170@s.whatsapp.net"]; // add your number here

export default {
    name: "ecoadmin",
    description: "Admin only economy commands",
    execute: async (sock, msg, args) => {
        const sender = msg.key.participant || msg.key.remoteJid;
        if(!adminNumbers.includes(sender)) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Only admin can use this." });

        if(!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "{}");
        const data = JSON.parse(fs.readFileSync(dataFile));

        const sub = args[0]?.toLowerCase();
        if(sub === "add") {
            const target = args[1] + "@s.whatsapp.net";
            const amount = parseInt(args[2]);
            if(!data[target]) data[target] = { balance: 0, daily: 0, items: [] };
            data[target].balance += amount;
            fs.writeFileSync(dataFile, JSON.stringify(data,null,2));
            return sock.sendMessage(msg.key.remoteJid, { text: `✅ Added ${amount} coins to ${args[1]}` });
        }

        else if(sub === "remove") {
            const target = args[1] + "@s.whatsapp.net";
            const amount = parseInt(args[2]);
            if(!data[target]) data[target] = { balance: 0, daily: 0, items: [] };
            data[target].balance -= amount;
            if(data[target].balance < 0) data[target].balance = 0;
            fs.writeFileSync(dataFile, JSON.stringify(data,null,2));
            return sock.sendMessage(msg.key.remoteJid, { text: `✅ Removed ${amount} coins from ${args[1]}` });
        }

        else if(sub === "reset") {
            fs.writeFileSync(dataFile, "{}");
            return sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Economy reset done." });
        }

        else {
            await sock.sendMessage(msg.key.remoteJid, { text: `Admin Commands:\n.add user amount\n.remove user amount\n.reset` });
        }
    }
};
