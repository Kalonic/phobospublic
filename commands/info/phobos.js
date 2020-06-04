const Discord = require('discord.js');
const config = require('../../config.json')
const moment = require('moment');
module.exports = {
    config: {
        name: 'phobos',
        category: 'Info',
        description: 'Gives information on the bot.',
        usage: 'phobos'
    },
    run: async (client, message, args) => {
        function duration(ms) {
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '')} days, ${hrs.padStart(2, '')} hours, ${min.padStart(2, '')} minutes`
        }
        
        
        function checkDays (date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? ' day' : ' days') + ' ago';
        };
        const embed = new Discord.MessageEmbed()
            .setColor(config.colour.green)
            .setAuthor('Phobos')
            .setDescription('Phobos is mostly a utility bot, he will give you information about many things. Type `?help` to get started!')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField('Developer', client.users.cache.get(config.ownerID).tag, true)
            .addField('Contributor', 'DevNathor#0001', true)
            .addField('Created', `${moment(client.user.createdAt).format('ddd, MMM Do, YYYY, h:mm a')} (${checkDays(client.users.cache.get(client.user.id).createdAt)})`, true)
            .addField('Uptime', `${duration(client.uptime)}`, true)
            .addField('Library', 'Discord.js v^12.0.2', true)
            .addField('Total Guilds', client.guilds.cache.size, true)
            .addField('Total Users', client.users.cache.size, true)
            .addField('Total Channels', client.channels.cache.size, true)
            .addField('Total Commands', client.commands.size)
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(embed)
    }
}