const config = require('../../config.json');
const { MessageAttachment } = require('discord.js');
module.exports = {
    config: {
        name: 'tias',
        aliases: ['tryandsee'],
        description: 'Displays the Try it and see link.',
        usage: 'tias',
        category: 'Fun'
    },
    run: async (client, message, args) => {
        let a = new MessageAttachment('stuff/tryitandsee.mp4'); message.channel.send(a);

    }
}