const config = require('../../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = async client => {
    console.log('The bot is online.');
    client.user.setActivity(`${config.prefix}help | ${client.guilds.cache.size} guilds`, { type: 'WATCHING' } ).catch(console.error);
};