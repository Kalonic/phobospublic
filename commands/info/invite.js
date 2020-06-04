const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'invite',
        aliases: ['i', 'invites'],
        description: 'Gives the invite links for Phobos and it\'s support server.',
        usage: 'invite',
        category: 'Info'
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('Invite Links')
            .setFooter(`Made by ${client.users.cache.get('407221681858412575').tag}`, client.users.cache.get('407221681858412575').displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(config.colour.blurple)
            .addField('**Bot Invite Link**', '[Click Here](https://discordapp.com/oauth2/authorize?client_id=695936277941452856&scope=bot&permissions=8) to invite the Bot to your server!')
            .addField('**Invite to Support Server**', '[Click Here](https://discord.gg/hfgCyyP) to join the Official Support Server!')
        message.channel.send(embed)
    }
}