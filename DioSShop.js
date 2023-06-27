const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const prefix = '/'; // Botunuzun ön ekini buraya girin
const linkRole = '1111741364095422534'; // Link atmasına izin verilen rolün ID'sini buraya girin

client.on('ready', () => {
    console.log(`Bot olarak giriş yapıldı: ${client.user.tag}`);
    client.user.setActivity('DioSShop By di0s_ Prefix : /', { type: 'PLAYING' });
});

client.on('messageCreate', message => {
    if (message.author.bot) return; // Sadece kullanıcı mesajlarını işle

    // Komutları işle
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();

        if (command === 'linkengel') {
            // Sadece belirli roldeki kullanıcılara link atma izni ver
            if (!message.member.roles.cache.has(linkRole)) {
                message.delete();
                message.member.send('Link atma izniniz bulunmamaktadır!');
            }
        } else if (command === 'linkengelkapa') {
            // Link engellemeyi kapat
            if (!message.member.hasPermission('ADMINISTRATOR')) return;

            message.channel.send('Link engelleme özelliği kapatıldı.');
            client.off('messageCreate', linkBlocker);
        }
    }
});

client.on('messageCreate', linkBlocker);

function linkBlocker(message) {
    if (message.content.includes('http://') || message.content.includes('https://')) {
        if (!message.member.roles.cache.has(linkRole)) {
            message.delete();
            message.member.send('Link atma izniniz bulunmamaktadır!');
        }
    }
}

client.login('MTEyMzMxMzQxMDI2ODk5NTY1NQ.GlxZrF.vtc-hEF1X_pucdzLkTWVOydd9Wc0rVZJhQ5agg').catch(console.error); // Discord botunuzun tokenini girin
