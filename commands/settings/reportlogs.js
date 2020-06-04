const config = require('../../config.json');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'reportlogs',
        aliases: ['logsreport', 'rl', 'lr'],
        description: 'Sets a channel for report embeds.',
        usage: 'reportlogs <enable/disable> <channel-ping>',
        category: 'Settings',
        access: 'Members with Manage Server permission'
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(config.emoji.cross + ' You do not have permission to do that in this server.');
        if(!args[0])return message.channel.send(config.emoji.cross + ' Invalid Args.');
        guild = await prefixSchema.findOne({ guildid: message.guild.id });
        if(args[0] === 'enable'){
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send(config.emoji.cross + ' Invalid Args.');
        await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {reportchannel: channel, report: true})
        message.channel.send(config.emoji.tick + ` Reports have been successfully set to <#${channel.id}>`);
        }else if(args[0] === 'disable'){
            if(guild.report === false) return message.channel.send(config.emoji.cross + ' Reports are already disabled!');
            await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {reportchannel: 'none', report: false})
        }else{
            return message.channel.send(config.emoji.cross + ' Invalid Args.');
        }
    }
}