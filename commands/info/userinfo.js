const Discord = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');
const userSchema = require('../../models/user.js');
module.exports = {
    config: {
        name: 'userinfo',
        aliases: ['ui', 'userinfomation', 'whois'],
        category: 'Info',
        usage: 'userinfo <USER>',
        description: 'Gives information on a user.'
    },
    run: async (client, message, args) => {

        try {
            let author = message.mentions.members.first() || message.guild.members.cache.find(user => user.username === args.join(' ')) || message.guild.members.cache.find(user => user.tag === args.join(' ')) || message.guild.members.cache.get(args[0]);
            if (!args[0]) author = message.member;
            if (!author) return message.channel.send(config.emoji.cross + ` User **${args.join(' ')}** could not be found.`);

            function checkDays (date) {
                let now = new Date();
                let diff = now.getTime() - date.getTime();
                let days = Math.floor(diff / 86400000);
                return days + (days == 1 ? ' day' : ' days') + ' ago';
            };
            let status = { online: config.emoji.online + ' Online', idle: config.emoji.idle + ' Idle', dnd: config.emoji.dnd + ' Do Not Disturb', streaming: config.emoji.streaming + ' Streaming', offline: config.emoji.offline + ' Offline' };
            guild = await userSchema.findOne({ userid: author.id });
            thing = guild.blacklisted
            if(thing === false) thing = 'No'
            if(thing === true) thing = `Yes`
            let userinfoEmbed = new Discord.MessageEmbed()
            .setAuthor('User Information')
            .setColor(config.colour.green)
            .setThumbnail(author.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField('Tag', author.user.tag, true)
            .addField('ID', author.user.id, true)
            .addField('Blacklisted', thing, true)
            .addField('Joined', moment(author.joinedAt).format('llll'), true)
            .addField('Registered', `${moment(client.users.cache.get(author.user.id).createdAt).format('llll')} (${checkDays(client.users.cache.get(author.user.id).createdAt)})`, true)
            .addField('Status', status[author.user.presence.status], true)
            .addField('Presence', author.user.presence.activities.join(', ') || 'No presence', true)
            .addField(`Roles [${author.roles.cache.size-1}]`, author.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(', ') || 'No roles')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

            if (author.user.id === '407221681858412575') userinfoEmbed.addField('Acknowledgements', 'Best developer there is to ever live, Amazing.');

            message.channel.send(userinfoEmbed);
        } catch (error) {
            message.channel.send(config.emoji.cross + ` ${error}`);
        };
        
        
        
    }


}