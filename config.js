const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "ADEEL-XMD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0pucEZ4MldlY25xR0ZSZ0p3MkxzMjFrNnU0UUtXVzRjTmUyNXRNTWJFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0RlT0tyaVVLeUtMR0JMYS9GcGx4N25TMDI3bmlyOHRyYVVJSW5JbllUYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNR3BwVFVjazNFSmtYbDEyU0lxVmxCOGljU1d1cTBtdy9FOTRSNW5pUTJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRGpZKzQ2dkpDYVdkYkg0aWpBM05xazJVNmNyTWVkbGRmZ0RJTjloUlZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNKWHU3d0FvdjFNdkFtbFhJZjJyUWVBWGpxM3NnRGo2dFJlNzRFcm5qR3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZaSjc2bXdjQzc3RU42RUJTUHNrMitNRHJ4aGZhQUxseUFQenNqQ3JHQ1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUlweVB1NEVoUmZyVlA0UGNyTjV2MjN5YjRZekRTbDdLYmVHdmlDd09rWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWC8zYWh3UjBmeVFoa2ljTXh5SThoNkJxYzNmdmtUOGF0cHQyLzlIYU1YYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpZR3B0cUdEQ3VPZlNua0JPOHNOM2N5Qms0M0JPVSt3MlF1cXhMV1lRaWR6OUUrY1VENUc1SjVQUzd6NU9tWGRKaHNQRFdhQzN6MU41ODFKYXVXVWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMyLCJhZHZTZWNyZXRLZXkiOiI4YlJQYjhPNE16RElsOThXVzBObXJhSVZJM21WT1dQUStIV095clR2UFFrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkZFRU1PME1EIiwibWUiOnsiaWQiOiI5MTc4NjY5Nzg0MDI6MjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4oCOIOKAjiDigI4g4oCOIOKAjiDigI4g4oCOIOKAjiDigI4g4oCOICDigI4g4oCOIOKAjiDigI4g4oCOIOKAjiDigI4g4oCOIOKAjiDigI4g4qS58J2Zjc2i8J2emvCdnpvMpPCdmYXwnZ6dzZzwnZ6d8J2eo+KAjtmg4qS4IiwibGlkIjoiMzk2NTU5ODY3NDU0Nzg6MjFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKMzBnYkFHRUpTQmlNNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI1QmtZcCtLNkNvNkoxZXZTMktSbnM3Yjd2QU5vVmJvZ2daODVIdURvSVhzPSIsImFjY291bnRTaWduYXR1cmUiOiIwNVVhamg0QXZjSExvVVlRTlF4OXNwRGE1d0RqbEc3ZDdYbjFMbmlJYkV6Y2N3SVJMZE1KKzZHb2E3WVM5bUM0SDFCNzN5MmIxKys3bXQxZ0xCdnZCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiS3NaUGFBL3lsYTUxa1JrRXJKNkpVeW5BSUoxTHhENnptRjdlTnR4WlFMdTArQWZHdjUrbXRoVGx6NGlqT0t4aVBXZ1hiNDBHWG5EUDgyTUlucVE0amc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTc4NjY5Nzg0MDI6MjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZVFaR0tmaXVncU9pZFhyMHRpa1o3TzIrN3dEYUZXNklJR2ZPUjdnNkNGNyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnZ04ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzc0MzIxODI4LCJsYXN0UHJvcEhhc2giOiIzbWwxalMifQ==",  // Your bot's session ID (keep it secure)
    PREFIX: getConfig("PREFIX") || ".",  // Command prefix (e.g., "., / ! * - +")
    CHATBOT: getConfig("CHATBOT") || "on", // on/off chat bot 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "𝐀𝐃𝚵𝚵𝐋-𝐌𝐃",  // Bot's display name
    MODE: getConfig("MODE") || process.env.MODE || "public",        // Bot mode: public/private/group/inbox
    REPO: process.env.REPO || "https://github.com/ADEEL-XMD/ADEEL-AI-XD/forkhttps://github.com/ADEEL-XMD/ADEEL-AI-XD",  // Bot's GitHub repo
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",  // Bot's BAILEYS

    // ===== OWNER & DEVELOPER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "917866978402",  // Owner's WhatsApp number
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "RAMJEET-XD",           // Owner's name
    DEV: process.env.DEV || "917866978402",                     // Developer's contact number
    DEVELOPER_NUMBER: '917866978402@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*RAMJEET-XD VIEWED YOUR STATUS 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 THIS PERSON NOT ALLOWED CALL*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "RAMJEET-XD",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/9sn87j.jpg",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "false", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "false",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*📌 ᴘᴏᴡᴇʀ ʙʏ LORD RAMJEET*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "false",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true", // React to status updates?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "false", // ture to get auto bio 
    WELCOME: process.env.WELCOME || "false", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        
