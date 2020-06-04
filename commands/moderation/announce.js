const config = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
    config: {
        name: 'announce',
        aliases: ['a', 'shout']
    },
    run: async (client, message, args) => {
        let split = '|'
        if(message.guild.id !== '695938279354400789') return;
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(config.emoji.cross + ' You do not have permissions to perform this command.');
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Usage - ?announce [TITLE] | [DESCRIPTION] | <COLOUR>');
        if(!args[1]) return message.channel.send(config.emoji.cross + ' Usage - ?announce [TITLE] | [DESCRIPTION] | <COLOUR>');

        args = args.join(' ').split(split);

        for(var i = 0; i < args.length; i++) args[i] = args[i].trim();
        let title = args[0];
        let desc = args[1];
        let colour = args[2];
        if(!colour) colour = config.colour.green
        const embed = new Discord.MessageEmbed()
            .setColor(colour)
            .setTitle(title)
            .setDescription(desc)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.guild.channels.cache.get('696148418904588319').send(embed)
    }
}