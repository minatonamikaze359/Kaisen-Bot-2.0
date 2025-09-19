import fs from "fs";
const dataFile = "./data/economy.json";
const shopFile = "./data/shop.json";

// Ensure folders exist
if(!fs.existsSync("./data")) fs.mkdirSync("./data");
if(!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "{}");
if(!fs.existsSync(shopFile)) fs.writeFileSync(shopFile, JSON.stringify({
    "sword": { "price": 1000, "desc": "Sharp sword to attack enemies" },
    "shield": { "price": 800, "desc": "Protects you from attacks" },
    "potion": { "price": 500, "desc": "Heals you completely" }
}, null, 2));

function loadData() { return JSON.parse(fs.readFileSync(dataFile)); }
function saveData(data) { fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); }
function loadShop() { return JSON.parse(fs.readFileSync(shopFile)); }

export default {
    name: "eco",
    description: "Advanced economy system",
    execute: async (sock, msg, args) => {
        const user = msg.key.participant || msg.key.remoteJid;
        const data = loadData();
        if(!data[user]) data[user] = { balance: 0, daily: 0, items: [] };

        const command = args[0]?.toLowerCase();

        // ----- BALANCE -----
        if(command === "balance" || command === "bal") {
            const items = data[user].items.length > 0 ? data[user].items.join(", ") : "None";
            await sock.sendMessage(msg.key.remoteJid, { text: `💰 Balance: ${data[user].balance} coins\n🎒 Items: ${items}` });
        }

        // ----- DAILY -----
        else if(command === "daily") {
            const now = Date.now();
            if(data[user].daily && now - data[user].daily < 86400000) {
                const remaining = 86400000 - (now - data[user].daily);
                const h = Math.floor(remaining / 3600000);
                const m = Math.floor((remaining % 3600000) / 60000);
                await sock.sendMessage(msg.key.remoteJid, { text: `⏰ Daily already claimed. Try again in ${h}h ${m}m` });
            } else {
                const amount = Math.floor(Math.random() * 500) + 200;
                data[user].balance += amount;
                data[user].daily = now;
                saveData(data);
                await sock.sendMessage(msg.key.remoteJid, { text: `🎉 You received ${amount} coins! Balance: ${data[user].balance}` });
            }
        }

        // ----- WORK -----
        else if(command === "work") {
            const earnings = Math.floor(Math.random() * 1000) + 100;
            data[user].balance += earnings;
            saveData(data);
            await sock.sendMessage(msg.key.remoteJid, { text: `💼 You worked and earned ${earnings} coins! Balance: ${data[user].balance}` });
        }

        // ----- GIVE -----
        else if(command === "give") {
            const target = args[1];
            const amount = parseInt(args[2]);
            if(!target || isNaN(amount) || amount <= 0) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .eco give @user amount" });
            if(data[user].balance < amount) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Not enough balance" });

            const targetId = target.replace(/[^\d]/g,"") + "@s.whatsapp.net";
            if(!data[targetId]) data[targetId] = { balance: 0, daily: 0, items: [] };

            data[user].balance -= amount;
            data[targetId].balance += amount;
            saveData(data);
            await sock.sendMessage(msg.key.remoteJid, { text: `✅ You gave ${amount} coins to ${target}` });
        }

        // ----- GAMBLE -----
        else if(command === "gamble" || command === "slot") {
            const bet = parseInt(args[1]);
            if(!bet || bet <= 0) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .eco gamble amount" });
            if(data[user].balance < bet) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Not enough balance" });

            const symbols = ["🍒","🍋","🍉","⭐","💎"];
            const result = Array(3).fill(0).map(() => symbols[Math.floor(Math.random()*symbols.length)]);
            const win = result[0] === result[1] && result[1] === result[2];

            if(win) {
                const winnings = bet * 3;
                data[user].balance += winnings;
                saveData(data);
                await sock.sendMessage(msg.key.remoteJid, { text: `🎰 ${result.join(" ")}\n🎉 You won ${winnings} coins! Balance: ${data[user].balance}` });
            } else {
                data[user].balance -= bet;
                saveData(data);
                await sock.sendMessage(msg.key.remoteJid, { text: `🎰 ${result.join(" ")}\n💸 You lost ${bet} coins. Balance: ${data[user].balance}` });
            }
        }

        // ----- SHOP -----
        else if(command === "shop") {
            const shop = loadShop();
            let text = "🛒 Shop:\n";
            for(const item in shop) {
                text += `\n• ${item} - ${shop[item].price} coins\n  ${shop[item].desc}`;
            }
            await sock.sendMessage(msg.key.remoteJid, { text });
        }

        // ----- BUY ITEM -----
        else if(command === "buy") {
            const item = args[1];
            const shop = loadShop();
            if(!item || !shop[item]) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Invalid item. Use .eco shop to see items." });
            if(data[user].balance < shop[item].price) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Not enough coins" });

            data[user].balance -= shop[item].price;
            data[user].items.push(item);
            saveData(data);
            await sock.sendMessage(msg.key.remoteJid, { text: `✅ You bought ${item}! Balance: ${data[user].balance}` });
        }

        else {
            await sock.sendMessage(msg.key.remoteJid, { text: `💰 Economy commands:
- .eco balance
- .eco daily
- .eco work
- .eco give @user amount
- .eco gamble amount
- .eco shop
- .eco buy item` });
        }
    }
};
