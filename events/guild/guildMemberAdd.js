const Discord = require('discord.js');
const config = require('../../config.json');
const prefixSchema = require('../../models/guild.js');
module.exports = async (client, member) => {
    if (member.guild.id === config.serverid) {
    let e = new Discord.MessageEmbed().setTitle(`Welcome to ${member.guild.name}, ${member.user.username}!`)
    .setColor(config.colour.blue)
    .setDescription('Welcome to the Olympian Bots\' support server! We hope you enjoy your stay!')
    .setFooter(member.user.tag, member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp()
    .addField('Important!', 'Please go to the verification channel and verify before anything else. \nPlease read <#696148514631057469> and <#696148499628163212> for more info!')
    await client.channels.cache.get('701410295352000553').send(`<@${member.user.id}>`)
    await client.channels.cache.get('701410295352000553').send(e);
    };
    guild = prefixSchema.findOne({guildid: member.guild.id})
    if(guild.autorole !== 'none'){
        let role = member.guild.roles.cache.get(guild.autorole);
        if(!role) return;
        member.roles.add(role.id);
    }




};