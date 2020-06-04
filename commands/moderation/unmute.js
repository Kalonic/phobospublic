const config = require('../../config.json');
const Discord = require('discord.js');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'unmute',
        access: 'Members with Manage Roles permission.',
        aliases: ['unm', 'um'],
        description: 'Allows a muted user to speak again.',
        category: 'Moderation',
        usage: 'unmute [USER] <REASON>'
    },
    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Do ?help unmute for info on this command.');
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(config.emoji.cross + ' You do not have permission to Manage Roles in this guild.');
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(config.emoji.cross + ' I do not have permission to Manage Roles in this guild.');
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user.roles.cache.some(role => role.name === 'Muted')) return message.channel.send(config.emoji.cross + ' That user is not muted!');
        else{
            let reason = args.slice(1).join(' ');
            if(!reason) reason = 'No reason given.'
            let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
            user.roles.remove(muterole.id).then(async() => {
                user.send(`You have been unmuted in ${message.guild.name} by ${message.author.tag} for the reason '${reason}'`)
                message.channel.send(config.emoji.tick + ' Member unmuted successfully!')
                
                guild = await prefixSchema.findOne({ guildid: message.guild.id });

        if(guild.logs){
            let modlog = message.guild.channels.cache.get(guild.logschannel);
            if (!modlog) return message.channel.send('No mod log channel or your current mod log channel was deleted');
            
            let unmutembed = new Discord.MessageEmbed()
                    .setTitle('MOD LOGS - UNMUTE')
                    .setColor(config.colour.green)
                    .addField(`User Unmuted`, `**Unmuted User:** ${user.user.tag}\n**Unmuted by:** ${message.author.tag}\n**Reason:** ${reason}`)
                    .setTimestamp()
            message.guild.channels.cache.get(guild.logschannel).send(unmutembed);
        }

            })
        }
    }
}