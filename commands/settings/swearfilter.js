const config = require('../../config.json')
const prefixSchema = require('../../models/guild.js')
module.exports = {
    config: {
        name: 'swearfilter',
        access: 'Members with Manage Server permission.',
        description: 'Enables/Disables a swear word filter for a server.',
        usage: 'swearfilter <ENABLE/DISABLE>',
        category: 'Settings',
        aliases: ['filter', 'swear', 'sf']
    },
    run: async (client, message, args, prefix) => {
        guild = await prefixSchema.findOne({ guildid: message.guild.id });
        status = guild.swearfilter
        if(status === false) thing = 'Disabled'
        if(status === true) thing = 'Enabled'
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(config.emoji.cross + ' You do not have permission to run this command!')
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')) return message.channel.send(config.emoji.cross + ' I need to have the permission Manage Messages in this guild in order to do this.');
        if(!args[0]) return message.channel.send(config.emoji.cross + ` Usage: ${prefix}swearfilter <ENABLE/DISABLE>\nIn this server, swearfilter is ${thing}.`);
        if(args[0] === 'enable'){
            await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {swearfilter: true})
            message.channel.send(config.emoji.tick + ' Swear Filter has been enabled.')
        }
        else if(args[0] === 'disable'){
            await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {swearfilter: false})
            message.channel.send(config.emoji.tick + ' Swear Filter has been disabled.')
        }
        else{
            return message.channel.send(config.emoji.cross + ` Usage: ${prefix}swearfilter <ENABLE/DISABLE>`);
        }
    }
}