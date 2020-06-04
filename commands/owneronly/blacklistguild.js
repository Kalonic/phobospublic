const prefixSchema = require('../../models/guild.js');
const config = require('../../config.json');
module.exports = {
    config: {
        name: 'blacklistguild',
        aliases: ['bg', 'guildblacklist', 'blacklistserver', 'bs'],
        access: 'Bot Owner.',
        usage: 'blacklistguild <add/del> <guild-id> [true/false]',
        description: 'Blacklists a guild from using phobos.',
        category: 'OwnerOnly'
    },
    run: async (client, message, args) => {
        if(message.author.id !== config.ownerID) return;
        if(!args[1]) return message.channel.send(config.emoji.cross + ' Invalid Args.');

        if(args[0] === 'add'){
            if(args[1] === 'this'){
                guild = await prefixSchema.findOne({ guildid: message.guild.id });
                if(guild.blacklisted === true) return message.channel.send(config.emoji.cross + ' This server is already blacklisted.');
                if(message.guild.id === '708108939673206855') return message.channel.send(config.emoji.cross + ' You cannot blacklist this server!');
                await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {blacklisted: true});
                message.channel.send(config.emoji.tick + ' This server has been blacklisted from using Phobos.')
            }else{
                let bguildid = args[1];
                guild = await prefixSchema.findOne({ guildid: bguildid });
                if(guild.blacklisted === true) return message.channel.send(config.emoji.cross + ' That server is already blacklisted.')
                await prefixSchema.findOneAndUpdate({guildid: bguildid}, {blacklisted: true});
                message.channel.send(config.emoji.tick + ' That server has been blacklisted from using Phobos.')
            }
        }
        else if(args[0] === 'del'){
            if(args[1] === 'this'){
                guild = await prefixSchema.findOne({ guildid: message.guild.id });
                if(guild.blacklisted === false) return message.channel.send(config.emoji.cross + ' This server is\'nt blacklisted.');
                await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {blacklisted: false});
                message.channel.send(config.emoji.tick + ' This server has been unblacklisted from using Phobos.')
            }else{
                let bguildid = args[1];
                guild = await prefixSchema.findOne({ guildid: bguildid });
                if(guild.blacklisted === false) return message.channel.send(config.emoji.cross + ' That server is\'nt blacklisted.')
                await prefixSchema.findOneAndUpdate({guildid: bguildid}, {blacklisted: false});
                message.channel.send(config.emoji.tick + ' That server has been unblacklisted from using Phobos.')
            }
        }else{
            return message.channel.send(config.emoji.cross + ' Invalid Args.');
        }
    }
}
