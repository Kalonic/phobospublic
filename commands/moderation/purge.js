const config = require('../../config.json');
const Discord = require('discord.js');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'purge',
        aliases: ['clear', 'delete'],
        category: 'Moderation',
        usage: 'purge [AMOUNT]',
        description: 'Bulk Deletes up to 100 messages.',
        access: 'Members with permission: \'Manage Messages\'.'
    },
    run: async (client, message, args) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.channel.send(config.emoji.cross + ' You do not have permissions to Manage Messages in this guild.')
        }
        if(!message.guild.me.hasPermission('MANAGE_MEMBERS')) return message.channel.send(config.emoji.cross + ' I do not have permission to Manage Messages in this guild.');
        if(!args[0]){
            return message.reply('Please give an amount inbetween 1 and 100.')
        }
        if(isNaN(args[0])) return message.channel.send(config.emoji.cross + ' Please enter a number between 1 and 100, not a string!');
        if(args[0] > 100) return message.channel.send(config.emoji.cross + ' Please enter a number between 1 and 100, that number is too large!');
        message.delete().then(message.channel.bulkDelete(args[0]));
        
        guild = await prefixSchema.findOne({ guildid: message.guild.id });

        if(guild.logs){
            let modlog = message.guild.channels.cache.get(guild.logschannel);
            if (!modlog) return message.channel.send('No mod log channel or your current mod log channel was deleted');
            
            let mutembed = new Discord.MessageEmbed()
            .setTitle('MOD LOGS - PURGE')
            .setColor(config.colour.purple)
            .addField(`Messages Purged`, `**Amount Purged:** ${args[0]}\n**Purged by:** ${message.author.tag}\n**Channel:** ${message.channel.name}`)
            .setTimestamp()
            message.guild.channels.cache.get(guild.logschannel).send(mutembed);
        }
        
        




    }




}