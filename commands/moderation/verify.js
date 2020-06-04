const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'vfy',
        description: '',
        usage: 'vfy',
        category: '',
        access: ''
    },
    run: async (client, message, args) => {
        if(message.guild.id !== config.serverid) return;
        if(message.author.id !== config.ownerID) return;
        message.delete()
        const a = message.guild.roles.cache.get('698664100347117598');
        const filter = (reaction, user) => ['☑️'].includes(reaction.emoji.name) && user.id !== client.user.id;
        const embed = new MessageEmbed()
            .setTitle('React to this message to get the verified role.')
            .setDescription(`Incase bots raid this server, you must react to this message with ☑️ to gain access to the rest of the server.
            `)
            .setColor(config.colour.green)
            //.setFooter(`ID: ${message.author.id}`);
            .setFooter('React to recieve Verified role,')
        message.channel.send(embed).then(msg => {
            msg.react('☑️');
            msg.awaitReactions(filter).then(collected => {

                const reaction = collected.first();
                switch(reaction.emoji.name) {
                    case '☑️':
                        message.member.roles.add(a).catch(err => {
                            console.log(err);
                            //return message.channel.send(config.emoji.cross + ` Error adding you to this role: **${err.message}**`);
                        });
                        //message.channel.send(config.emoji.tick + ' You are now verified!');
                        //msg.delete()
                        break;
                }
            }).catch(collected => {
                return;
            });
        });
    }
}