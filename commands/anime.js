export default {
    name: "anime",
    description: "Anime commands like neko, waifu, animegirl",
    execute: async (sock, msg, args) => {
        const reply = `*Anime Commands:*
neko, waifu, animegirl`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
