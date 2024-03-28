
const { Client, Intents } = require('discord.js');
const config = require('./config.json')

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        
    ]
});
// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI
client.once('ready', () => {
    console.log(config.ConsoleLog);
    client.user.setActivity(config.DURUM, { type: 'WATCHING' });
});


const excludedUsers = config.BANİSTİSNA; 

client.once('ready', async () => {
    
    const guild = client.guilds.cache.get(config.SUNUCUID); 
    if (!guild) return console.log('Sunucu bulunamadı.');

    try {
        const members = await guild.members.fetch();
        members.forEach(async (member) => {
            if (!excludedUsers.includes(member.id)) {
                await member.ban({ reason: config.BANACIKLAMASI });
            }
        });
        console.log('Sunucudaki herkes başarıyla yasaklandı.');
    } catch (error) {
        console.error('Hata oluştu:', error);
    }
});


// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI



client.login(config.TOKEN); 
