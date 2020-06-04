const config = require('../../config.json');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'premium',
        aliases: ['prem'],
        description: 'Gives/Takes premium commands from servers.',
        usage: 'premium <add/del> <server-id>',
        category: 'OwnerOnly',
        access: 'Bot Owner'
    },
    run: async (client, message, args) => {
        if(message.author.id !== config.ownerID) return message.channel.send(config.emoji.cross + ' You do not have permission to use this command.');
        guild = await prefixSchema.findOne({ guildid: message.guild.id });
        thing = guild.premium
        if(thing === true) thing = 'This server has Premium.'
        if(thing === false) thing = 'This server does not have Premium.'
        if(!args[1]) return message.channel.send(config.emoji.cross + ' Invalid Args.\n' + thing);
        if(args[0] === 'add'){
            if(guild.premium) return message.channel.send(config.emoji.cross + ' This server already has premium.');
            if(args[1] === 'this'){
                await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {premium: true});
                message.channel.send(config.emoji.tick + ' This server is now premium!')
            }else{
                let g = args[1]
                await prefixSchema.findOneAndUpdate({guildid: g}, {premium: true});
                message.channel.send(config.emoji.tick + ' That server is now premium!')
            }
            
        }else if(args[0] === 'del'){
            if(!guild.premium) return message.channel.send(config.emoji.cross + ' This server does not already have premium.');
            if(args[1] === 'this'){
                await prefixSchema.findOneAndUpdate({guildid: message.guild.id}, {premium: false});
                message.channel.send(config.emoji.tick + ' This server is no longer premium.')
            }else{
                let g = args[1]
                await prefixSchema.findOneAndUpdate({guildid: g}, {premium: false});
                message.channel.send(config.emoji.tick + ' That server is no longer premium.')
            }
        }else{
            return message.channel.send(config.emoji.cross + ' Invalid Args.');
        }
    }
}