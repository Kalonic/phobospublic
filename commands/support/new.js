const config = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
    config: {
        name: 'new',
        aliases: ['newticket', 'open', 'ticket'],
        usage: 'new [TITLE]',
        category: 'Support',
        description: 'Opens a new support ticket'
    },
    run: async(client, message, args) => {
        if(message.guild.id !== config.serverid) return;
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Usage - ?new [TITLE]');
        let title = args.slice(0).join(' ');
        let channel = message.guild.channels.cache.find(c => c.name === `${(message.author.username).toLowerCase()}`);
        let staffrole = message.guild.roles.cache.find(r => r.id === '696147666119163984')
        if(channel) return message.channel.send(config.emoji.cross + ' You already have a ticket open.');
        
        await message.guild.channels.create(`${(message.author.username).toLowerCase()}`, {
            type: 'text',
            parent: '702221120069173299',
            reason: 'Ticket Opened',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES']
                },
                {
                    id: staffrole.id,
                    allow: ['VIEW_CHANNEL']
                }
            ]
        })
        const embed = new Discord.MessageEmbed()
            .setTitle('New Ticket')
            .setDescription('A new ticket has been opened!')
            .setColor(config.colour.blurple)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp()
            .addField('Information!', `**Opened by:** ${message.author.tag}\n**Title of ticket:** ${title}`)
        let ticketchannel = message.guild.channels.cache.find(c => c.name === `${(message.author.username).toLowerCase()}`);
        message.guild.channels.cache.find(c => c.name === `${(message.author.username).toLowerCase()}`).send(`<@&696147666119163984>`)
        message.guild.channels.cache.find(c => c.name === `${(message.author.username).toLowerCase()}`).send(embed)
        message.guild.channels.cache.find(c => c.name === `${(message.author.username).toLowerCase()}`).send('A member of staff will be with you shortly. In the mean time, please try to explain your issue in further detail.')
        message.author.send('A ticket for you has been opened in Olympus Development.')
        message.channel.send(config.emoji.tick + ` A ticket has been opened at <#${ticketchannel.id}>`)
    }
}