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

    if (command === config.BANAFKOMUTU) {
        
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return message.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        try {
            const guild = message.guild;
            const bans = await guild.bans.fetch();
            bans.forEach(async banInfo => {
                await guild.members.unban(banInfo.user);
                console.log(`${banInfo.user.tag} kullanıcısının yasağı kaldırıldı.`);
            });
            message.reply('Sunucudaki tüm yasaklar başarıyla kaldırıldı.');
        } catch (error) {
            console.error('Yasaklar kaldırılırken bir hata oluştu:', error);
            message.reply('Yasaklar kaldırılırken bir hata oluştu.');
        }
    }
});
// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI
client.login(config.TOKEN); 
