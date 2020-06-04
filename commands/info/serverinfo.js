const config = require('../../config.json');
const Discord = require('discord.js');
const moment = require('moment');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'serverinfo',
        aliases: ['si', 'server'],
        category: 'Info',
        usage: 'serverinfo',
        description: 'Gives information on the server.'
    },
    run: async (client, message, args, prefix) => { 
        guild = await prefixSchema.findOne({ guildid: message.guild.id });
        status = guild.swearfilter
        if(status === false) thing = 'Disabled'
        if(status === true) thing = 'Enabled'
        channelthing = guild.report
        if(channelthing === false) channelthing = 'Disabled'
        if(channelthing === true) channelthing = `Set to <#${guild.reportchannel}>`
        premiumthing = guild.premium
        if(premiumthing === false) premiumthing = 'Disabled'
        if(premiumthing === true) premiumthing = 'Enabled'
        modlogs = guild.logs
        if(modlogs === true) modlogs = `Set to <#${guild.logschannel}>`
        if(modlogs === false) modlogs = 'Disabled'

        let region = 'N/A'
        if(message.guild.region === 'europe') region = 'Europe'
        if(message.guild.region === 'brazil') region = 'Brazil'
        if(message.guild.region === 'hongkong') region = 'Hong Kong'
        if(message.guild.region === 'india') region = 'India'
        if(message.guild.region === 'japan') region = 'Japan'
        if(message.guild.region === 'russia') region = 'Russia'
        if(message.guild.region === 'singapore') region = 'Singapore'
        if(message.guild.region === 'southafrica') region = 'South Africa'
        if(message.guild.region === 'us-central') region = 'US Central'
        if(message.guild.region === 'sydney') region = 'Sydney'
        if(message.guild.region === 'us-east') region = 'US East'
        if(message.guild.region === 'us-south') region = 'US South'
        if(message.guild.region === 'us-west') region = 'US West'
        
        
        function checkDays (date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? ' day' : ' days') + ' ago';
        };
        const embed = new Discord.MessageEmbed()
            .setColor(config.colour.green)
            //.setTitle('Server Info')
            //.setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .setAuthor('Server Information')
            .addField('Name', message.guild.name, true)
            .addField('ID', message.guild.id, true)
            .addField('Owner', message.guild.owner.user.tag, true)
            .addField('Created', `${moment(message.guild.createdAt).format('ddd, MMM Do, YYYY, h:mm a')} (${checkDays(client.guilds.cache.get(message.guild.id).createdAt)})`, true)
            .addField('Region', region, true)
            .addField('SwearFilter', thing, true)
            .addField('ReportLogs', channelthing, true)
            .addField('Premium', premiumthing, true)
            .addField('Prefix', prefix, true)
            .addField('ModLogs', modlogs, true)
            .addField('Members', message.guild.members.cache.size, true)
            .addField('Channels', message.guild.channels.cache.size, true)
            .addField('Emojis', message.guild.emojis.cache.size, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            if(message.guild.roles.cache.size-1 > 30) embed.addField(`Roles [${message.guild.roles.cache.size-1}]`, 'Too many roles to display.');
            else embed.addField(`Roles [${message.guild.roles.cache.size-1}]`, message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(', ') || 'No Roles.');
        message.channel.send(embed)
    }
}