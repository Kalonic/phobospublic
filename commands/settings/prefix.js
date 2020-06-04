const config = require('../../config.json')
const prefixSchema = require('../../models/guild.js')
module.exports = {
    config: {
        name: 'prefix',
        access: 'Members with Manage Server permission.',
        description: 'Changes the prefix for the bot in a server.',
        usage: 'prefix <NEW PREFIX/ \'reset\'>',
        category: 'Settings'
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(config.emoji.cross + ' You do not have permission to run this command!');
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Usage: ?prefix <NEW PREFIX/ \'reset\'>');
        if(args[0] === 'reset') {
            await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {prefix: config.prefix});
            message.channel.send(config.emoji.tick + ' Prefix has been reset to `?`!')
        }
        else {
            await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {prefix: args[0]});
            message.channel.send(config.emoji.tick + ` Prefix has been set to \`${args[0]}\`!`)
        }      
    }
}