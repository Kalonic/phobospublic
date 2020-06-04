const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    config: {
        name: 'unban',
        aliases: ['pardon'],
        category: 'Moderation',
        usage: 'unban [USER] [REASON]',
        description: 'Unbans a user.',
        access: 'Members with permission: \'Ban Members\'.'
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(config.emoji.cross + ' You do not have permission to unban members in this guild.');
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(config.emoji.cross + ' I do not have permission to Ban Members in this guild.');
        let reason = args.slice(1).join(' ');
        if(!args[1]) reason = 'No reason given.'
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Please provide a member to unban.');
        client.users.fetch(args[0]).then(user => {
            message.guild.members.unban(user.id)
            });
        let user = client.users.fetch(args[0])(u => u.id)
        message.channel.send(config.emoji.tick + ' Member successfully unbanned!');
            
    }
}