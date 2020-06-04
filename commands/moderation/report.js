const Discord = require('discord.js');
const config = require('../../config.json');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'report',
        category: 'Moderation',
        usage: 'report [USER] <REASON>',
        description: 'Reports a user in \'Olympus Development\'.'
    },
    run: async (client, message, args) => {
        guild = await prefixSchema.findOne({guildid: message.guild.id})
        let thing = guild.report
        if(thing === false) thing = 'false'
        if(thing === true) thing = 'true'

        
        if(thing === 'false') return message.channel.send(config.emoji.cross + ' This feature is not enabled in this server.');
        message.delete();
        if(message.guild.id === config.serverid) if(message.channel.id !== '697454329568821321') return message.channel.send(config.emoji.cross + ' You can only report members in the designated channel.').then(m => m.delete({timeout:5000}));
        if(!args[0]) return message.channel.send('Please specify the user you wish to report.').then(m => m.delete({timeout:5000}));
        if(!args[1]) return message.channel.send('Please give a reasonfor why you would like to report the user.').then(m => m.delete({timeout:5000}));
        let reason = args.slice(1).join(' ');
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const reporter = message.author.tag;
        const embed = new Discord.MessageEmbed()
            .setFooter('Reported by ' + message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle('Report')
            .setDescription('A report filed on a member.')
            .setColor('ff5555')
            .addField('Reported User', user)
            .addField('Reason for report', reason)
        if(message.author.id !== config.ownerID){
            if(user.id === config.ownerID) return message.channel.send(config.emoji.cross + ' You cannot report the owner!').then(m => m.delete({timeout:5000}));
        }
            
        if(user){
            const member = message.guild.member(user);
            if(member){
                client.channels.cache.get(guild.reportchannel).send(embed).then(() => {
                    message.channel.send(config.emoji.tick + ` Successfully reported ${user.tag}!`).then(m => m.delete({timeout: 5000}));
                })
                .catch(err => {
                    message.channel.send(config.emoji.cross + ' I was unable to report the member.').then(m => m.delete({timeout: 3000}));
                    console.error(err);
                });
            }else{
                message.channel.send(config.emoji.cross + ' That user isn\t in this guild!').then(m => m.delete({timeout: 3000}));
            }

        }


    }
}