const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'rv2',
        description: '',
        usage: '',
        category: '',
        access: ''
    },
    run: async (client, message, args) => {
        if(message.guild.id !== config.serverid) return;
        const a = message.guild.roles.cache.get('698664100347117598');
        const filter = (reaction, user) => reaction.emoji.name === '☑️' && user.id !== client.user.id;
        const embed = new MessageEmbed()
            .setTitle('React with ☑️ to verify!')
            .setDescription('To gain access to the rest of the server, react with ☑️.')
            .setFooter('React to gain access to the rest of the server.');
        message.channel.send(embed).then(msg => {
            msg.react('☑️')
            const collector = message.createReactionCollector(filter, {});
            collector.on('collect', r => {
                    message.member.roles.add(a).catch(err => {
                        console.log(err);
                        return message.channel.send(config.emoji.cross + ` Error adding you to this role: **${err.message}**`);
                    });
                
            });
        }).catch(err => {
            console.log(err)
        });
    }
}