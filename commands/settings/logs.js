const prefixSchema = require('../../models/guild.js');
const config = require('../../config.json');
module.exports = {
    config: {
        name: 'modlogs',
        aliases: ['logs', 'ml'],
        description: 'Sets a modlogs channel for bot commands.',
        access: 'Members with Manage Server permission.',
        usage: 'modlogs enable <channel> OR modlogs disable',
        category: 'Settings'
    },
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(config.emoji.cross + ' You do not have permission to run this command.');
        guild = await prefixSchema.findOne({ guildid: message.guild.id });
        thing = guild.logs
        if(thing === true) thing = 'Enabled'
        if(thing === false) thing = 'Disabled' 
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Invalid Args.\n In this server, Modlogs are ' + thing + '.');
        if(args[0] === 'enable'){
            if(!args[1]) return message.channel.send(config.emoji.cross + ' Invalid Args.');
            let channel = message.mentions.channels.first();
            if(!channel) return message.channel.send(config.emoji.cross + ' Invalid Args.');
            await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {logs: true, logschannel: channel});
            message.channel.send(config.emoji.tick + ` ModLogs has been successfully set to ${channel}`)
        }else if(args[0] === 'disable'){
            if(guild.logs === false) return message.channel.send(config.emoji.cross + ' Moglogs are already disabled in this server.');
            await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {logs: false, logschannel: 'none'});
            message.channel.send(config.emoji.tick + ` ModLogs has been disabled for this server.`)
        }else{
            return message.channel.send(config.emoji.cross + ' Invalid Args.');
        }
    }
}