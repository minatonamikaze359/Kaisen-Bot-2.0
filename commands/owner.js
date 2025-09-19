export default {
    name: "owner",
    description: "Owner-only commands",
    execute: async (sock, msg, args) => {
        const reply = `*Owner Commands:*
ban, unban, block, unblock, chatbot, join, pp, fullpp`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
