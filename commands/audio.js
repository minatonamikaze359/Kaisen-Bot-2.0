export default {
    name: "audio",
    description: "Audio-edit commands",
    execute: async (sock, msg, args) => {
        const reply = `*Audio Commands:*
bass, slow, blown, deep, earrape, fast, fat, nightcore, reverse, squirrel`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
