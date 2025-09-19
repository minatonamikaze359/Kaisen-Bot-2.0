export default {
    name: "menu",
    description: "Show full KAISEN-BOT-MD menu",
    execute: async (sock, msg, args) => {
        const reply = `*╭══〘〘 KAISEN-BOT-MD 〙〙*
*┃❍ ʀᴜɴ     :* 01h 21m 37s
*┃❍ ᴍᴏᴅᴇ    :* Public
*┃❍ ᴘʀᴇғɪx  :* [.,!]
*┃❍ ʀᴀᴍ     :* 159.11 / 384.22 GB
*┃❍ ᴠᴇʀsɪᴏɴ :* v3.5.0
*┃❍ ᴜsᴇʀ    :* Sasuke Uchia
*╰═════════════════⊷*

*╭────❒ ANIME ❒*
*├◈ neko*
*├◈ waifu*
*├◈ animegirl*
*┕──────────────────❒*

*╭────❒ AUDIO-EDIT ❒*
*├◈ bass*
*├◈ slow*
*├◈ blown*
*├◈ deep*
*├◈ earrape*
*├◈ fast*
*├◈ fat*
*├◈ nightcore*
*├◈ reverse*
*├◈ squirrel*
*┕──────────────────❒*

*╭────❒ FUN ❒*
*├◈ 8ball*
*├◈ dice*
*├◈ coin*
*├◈ roast*
*├◈ pickup*
*├◈ hug*
*├◈ pat*
*┕──────────────────❒*

💖 *~_Made with love by Minato bby_~*`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
