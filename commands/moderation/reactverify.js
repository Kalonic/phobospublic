const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'roles',
        description: '',
        usage: 'roles',
        category: '',
        access: ''
    },
    run: async (client, message, args) => {
        if(message.guild.id !== config.serverid) return;
        message.delete()
        const a = message.guild.roles.cache.get('698664100347117598');
        const filter = (reaction, user) => ['☑️'].includes(reaction.emoji.name) && user.id !== client.user.id;
        const embed = new MessageEmbed()
            .setTitle('React to verify')
            .setDescription(`
            
            ☑️ React to get the ${a.toString()} role.

            `)
            .setColor(config.colour.green)
            .setFooter(`React with ☑️`);
        message.channel.send(embed).then(async msg => {
            msg.react('☑️');
            msg.awaitReactions(filter, {
                 max: 1,
                 time: 20000,
                 errors: ['time']
            }).then(collected => {

                const reaction = collected.first();
                switch(reaction.emoji.name) {
                    case '☑️':
                        message.member.roles.add(a).catch(err => {
                            console.log(err);
                            return message.channel.send(config.emoji.cross + ` Error adding you to this role: **${err.message}**`);
                        });
                        message.channel.send(config.emoji.tick + ' You are now verified!');
                        msg.delete()
                        break;
                }
            }).catch(collected => {
                return;
            });
        });
    }
}