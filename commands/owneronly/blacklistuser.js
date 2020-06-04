const config = require('../../config.json');
const userSchema = require('../../models/user.js');
module.exports = {
    config: {
        name: 'blacklistuser',
        aliases: ['bu', 'userblacklist'],
        access: 'Bot Owner.',
        category: 'Owner Only',
        usage: 'blacklistuser <add/del> <user-id> [true/false]',
        description: 'Blacklists a user from using Phobos.'
    },
    run: async(client, message, args) => {
        if(message.author.id !== config.ownerID) return;
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Invalid Args.');
        if(!args[1]) return message.channel.send(config.emoji.cross + ' Invalid Args.');

        
        if(args[0] === 'add'){
            let bguserid = args[1] || message.mentions.users.first();
            user = await userSchema.findOne({ userid: bguserid });
            if(user.blacklisted === true) return message.channel.send(config.emoji.cross + ' That user is already blacklisted.');
            await userSchema.findOneAndUpdate({userid: bguserid}, {blacklisted: true});
            message.channel.send(config.emoji.tick + ' That user has been blacklisted from using Phobos.')
        }else if(args[0] === 'del'){
            let bguserid = args[1] || message.mentions.users.first();
            user = await userSchema.findOne({ userid: bguserid });
            if(user.blacklisted === false) return message.channel.send(config.emoji.cross + ' That user is not blacklisted.');
            await userSchema.findOneAndUpdate({userid: bguserid}, {blacklisted: false});
            message.channel.send(config.emoji.tick + ' That user has been unblacklisted from using Phobos.')
        }else{
            return message.channel.send(config.emoji.cross + ' Invalid Args.');
        }
    }
}