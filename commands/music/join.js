const config = require('../../config.json');
module.exports = {
    config: {
        name: 'join',
        aliases: ['summon', 'jvc', 'joinvc'],
        description: 'Joins the current voice channel.',
        usage: 'join',
        category: 'Music'
    },
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if(channel) {
            await message.member.voice.channel.join()
            message.guild.me.voice.deafen
            message.channel.send(config.emoji.tick + ' I have successfully joined the voice channel!');
        } else {
            message.channel.send(config.emoji.cross + ' You must be in a voice channel to execute this command.');
        }
    }
}