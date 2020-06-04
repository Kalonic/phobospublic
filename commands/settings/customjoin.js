const config = require('../../config.json');
const joinSchema = require('../../models/customjoin.js');
module.exports = {
    config: {
        name: 'customjoin',
        aliases: ['customjoinmessage', 'cj', 'cjm', 'jm', 'joinmessage'],
        description: 'Enables a custom join message feature for your server.',
        usage: 'customjoin <enable/disable> "<title>" "<description>" <channel> [colour(hex)]',
        access: 'Members with Manage Server permission.',
        category: 'Settings'
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(config.emoji.cross + ' You do not have permission to run this command.');
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Invalid Args.');
        if(!args[1]) return message.channel.send(config.emoji.cross + ' Invalid Args.');
        if(!args[2]) return message.channel.send(config.emoji.cross + ' Invalid Args.');
        if(!args[3]) return message.channel.send(config.emoji.cross + ' Invalid Args.');

        let cj = await joinSchema.findOne({ guildid: message.guild.id });
        if (!cj) {
            let newJoin = new joinSchema({
                guildid: message.guild.id,
                guildownerid: message.guild.owner.user.id,
                guildname: message.guild.name,
                channel: 'none',
                title: 'none',
                colour: 'none',
                description: 'none',
                enabled: false
            });
            await newJoin.save();
            cj = await joinSchema.findOne({ guildid: message.guild.id });
        };
        if(args[0] === 'disable'){
            if(cj.enabled === false) return message.channel.send(config.emoji.cross + ' Custom Join Messages are already disabled for this server.');
            await joinSchema.findOneAndUpdate({guildid: message.guild.id}, {enabled: false})
            message.channel.send(config.emoji.tick + ' Custom join messages have been disabled.')
        }else if(args[0] === 'enable'){
            if(cj.enabled === true) return message.channel.send(config.emoji.cross + ' Custom join Messages are already enabled for this server.');
            

        }else{
            return message.channel.send(config.emoji.cross + ' Invalid Args.')
        }
    }
}