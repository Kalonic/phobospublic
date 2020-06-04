const config = require('../../config.json');
module.exports = {
    config: {
        name: 'role',
        category: 'Moderation',
        description: 'Adds and Removes roles from users.',
        usage: 'role [ADD/REMOVE] [ROLE] [USER]',
        access: 'Members with permission: \'Manage Roles\'.'
    },
    run: async (client, message, args) => {
        message.delete();
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(config.emoji.cross + ' You do not have the permission to Manage Roles in this guild.');
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(config.emoji.cross + ' I do not have permission to Manage Roles in this guild.');
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Usage: ?role [add/remove] [role] [member]');
        if(!args[1]) return message.channel.send(config.emoji.cross + ' Usage: ?role [add/remove] [role] [member]');
        if(!args[2]) return message.channel.send(config.emoji.cross + ' Usage: ?role [add/remove] [role] [member]');
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[2]);
        if(!user) return message.channel.send(config.emoji.cross + ' That user is not in this guild.');
        let roleinmessage = args[1]
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first();
        if(!role) return message.channel.send(config.emoji.cross + ' That role does not exist in this guild.');
        
        if(args[0] === 'add'){
            if (user.roles.cache.some(role => role.name === role)) return message.channel.send(config.emoji.cross + ' That user already has that role!');
            else{user.roles.add(role.id)
                return message.channel.send(config.emoji.tick + ' Roles added successfully.');
            }
        }
        if(args[0] === 'remove'){
            if(!user.roles.cache.some(role => role.name === role)) return message.channel.send(config.emoji.cross + ' That user does not have that role!');
            else{user.roles.remove(role.id)
                return message.channel.send(config.emoji.tick + ' Roles successfully removed.');
            }
        }
    }
}