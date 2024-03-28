const { Client, Intents, Permissions } = require('discord.js');
const config = require('./config.json');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        
    ]
});

// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI
const prefix = config.BOTPREFİX

client.once('ready', () => {
    console.log(config.ConsoleLog);
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === config.BOTKANALSILMEKOMUTU) {
        
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        try {
            const guild = message.guild;
            const channels = guild.channels.cache.filter(channel => channel.type !== 'GUILD_CATEGORY');

            channels.forEach(async channel => {
                await channel.delete();
            });

            message.reply('Sunucudaki tüm kanallar başarıyla silindi.');
        } catch (error) {
            console.error('Kanallar silinirken bir hata oluştu:', error);
            message.reply('Kanallar silinirken bir hata oluştu.');
        }
    } else if (command === config.BOTKATEGORISILMEKOMUTU) {
        
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        try {
            const guild = message.guild;
            const categories = guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY');

            categories.forEach(async category => {
                await category.delete();
            });

            message.reply('Sunucudaki tüm kategoriler başarıyla silindi.');
        } catch (error) {
            console.error('Kategoriler silinirken bir hata oluştu:', error);
            message.reply('Kategoriler silinirken bir hata oluştu.');
        }
    }
});
// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI

client.login(config.TOKEN);
