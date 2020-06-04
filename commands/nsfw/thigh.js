const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const config = require('../../config.json');
module.exports = {
    config: {
        name: 'thigh',
        description: 'Gives a picture of thighs.',
        usage: 'thigh',
        category: 'NSFW',
        access: 'Members in NSFW channels.'
    },
    run: async (client, message, args) => {
        try{
            if(!message.channel.nsfw) return message.channel.send(config.emoji.cross + ' You can only use that command in NSFW marked channels.');
            let res = await require('node-fetch')('https://nekobot.xyz/api/image?type=thigh');
            let data = await res.json();
            let attachment = new Discord.MessageAttachment(data.message);
            message.channel.send(attachment);
        }catch(error) {
            await console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${chalk.hex(config.colour.red)('[ERROR]')} ${error}`);
            await message.channel.send(`${config.emoji.cross} An error occured.\n\`\`\'js\n${error.stack}\n\'\`\``)
        };
    }
}