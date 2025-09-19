export default {
    name: "group",
    description: "Group commands",
    execute: async (sock, msg, args) => {
        const reply = `*Group Commands:*
promote, demote, lock, unlock, mute, unmute, gdesc, gname, gpp, left, add, ginfo, kick, tagall, welcome, goodbye`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
