export default {
    name: "media",
    description: "Media commands like photo, gif, sticker, download",
    execute: async (sock, msg, args) => {
        const reply = `*Media Commands:*
photo, gif, sticker, download`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
