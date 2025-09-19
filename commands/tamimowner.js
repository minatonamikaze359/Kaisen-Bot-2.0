import fs from "fs";
const dataFile = "./data/economy.json";

export default {
    name: "owner",
    description: "Owner commands and auto balance",
    execute: async (sock, msg, args) => {
        const sender = msg.key.participant || msg.key.remoteJid;
        const ownerNumber = "8801405706180@s.whatsapp.net";

        if(sender !== ownerNumber) {
            return sock.sendMessage(msg.key.remoteJid, { text: "❌ Only the owner can use this." });
        }

        if(!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "{}");
        const data = JSON.parse(fs.readFileSync(dataFile));

        // Set owner balance to insane amount
        if(!data[ownerNumber]) data[ownerNumber] = { balance: 0, daily: 0, items: [] };
        data[ownerNumber].balance = BigInt("999999999999999999999").toString();

        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        await sock.sendMessage(msg.key.remoteJid, { text: "💰 Owner balance set to maximum!" });
    }
};
