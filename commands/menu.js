export default {
    name: "menu",
    description: "Full KAISEN-BOT-MD menu",
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
neko, waifu, animegirl
*╰──────────────────❒*

*╭────❒ AUDIO-EDIT ❒*
bass, slow, blown, deep, earrape, fast, fat, nightcore, reverse, squirrel
*╰──────────────────❒*

*╭────❒ CONVERTER ❒*
photo, voice, gif, mp3, asticker, msticker, steal, stickerpack, doc, sticker, fancy, bubble, reverse, mock, aesthetic, trt, tts, url
*╰──────────────────❒*

*╭────❒ CREATE ❒*
emix
*╰──────────────────❒*

*╭────❒ DOWNLOAD ❒*
fb, ig, song, video
*╰──────────────────❒*

*╭────❒ FILTER ❒*
filter, stop
*╰──────────────────❒*

*╭────❒ FUN ❒*
8ball, fortune, dice, coin, gamble, lottery, roast, pickup, truth, dare, wouldyou, advice, flip, magic8, choose, compliment, fact, trivia, science, history, cry, cuddle, bully, hug, awoo, lick, pat, smug, bonk, yeet, blush, handhold, highfive, nom, wave, joke, dadjoke, pun, meme, rmeme, dmeme, programming, mtemplates, quote, motivate, wisdom, love, dance, happy, confused, love
*╰──────────────────❒*

*╭────❒ FUN_IMG ❒*
cosplay
*╰──────────────────❒*

*╭────❒ GENERAL ❒*
channeljid, savechannel, getchannels, jid
*╰──────────────────❒*

*╭────❒ GROUP ❒*
promote, demote, revoke, invite, lock, unlock, mute, unmute, gdesc, gname, gpp, left, add, ginfo, kick, tagall, welcome, goodbye
*╰──────────────────❒*

*╭────❒ INFO ❒*
platform, ping, repo, getpp
*╰──────────────────❒*

*╭────❒ INFORMATION ❒*
dob, country, checkapi
*╰──────────────────❒*

*╭────❒ LOGO ❒*
3dcomic, dragonball, deadpool, blackpink, neonlight, cat, sadgirl, naruto, thor, america, eraser, 3dpaper, futuristic, clouds, sand, galaxy, leaf, hacker, boom, floral, zodiac, angel
*╰──────────────────❒*

*╭────❒ MANAGE ❒*
antiword, antilink, antifake, antidelete, antibot, antidemote, antipromote, pdm
*╰──────────────────❒*

*╭────❒ MEDIA ❒*
black
*╰──────────────────❒*

*╭────❒ MISC ❒*
toggle, vote
*╰──────────────────❒*

*╭────❒ OWNER ❒*
ban, unban, chatbot, join, block, unblock, pp, fullpp
*╰──────────────────❒*

*╭────❒ PRIVACY ❒*
getprivacy, lastseen, online, mypp, mystatus, read, groupadd
*╰──────────────────❒*

*╭────❒ SEARCH ❒*
img
*╰──────────────────❒*

*╭────❒ SYSTEM ❒*
restart, plugin, remove
*╰──────────────────❒*

*╭────❒ TOOLS ❒*
pair, vv, vvf
*╰──────────────────❒*

*╭────❒ USER ❒*
mention
*╰──────────────────❒*

*╭────❒ UTILITY ❒*
calc, convert, take, password, passcheck, qr, readqr, short, expand, weather
*╰──────────────────❒*

*╭────❒ WHATSAPP ❒*
menu, clear, archive, unarchive, chatpin, unpin, setbio, setname, disappear
*╰──────────────────❒*

💖 *~_Made with love by KAISEN_~*`;

        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
