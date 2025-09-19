export default {
    name: "utility",
    description: "Utility commands",
    execute: async (sock, msg, args) => {
        const reply = `*Utility Commands:*
calc, convert, take, password, passcheck, qr, readqr, short, expand, weather`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
