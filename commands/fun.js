export default {
    name: "fun",
    description: "Fun commands like 8ball, dice, hug, pat",
    execute: async (sock, msg, args) => {
        const reply = `*Fun Commands:*
8ball, dice, coin, roast, hug, pat`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
