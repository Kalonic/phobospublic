const config = require('../../config.json');
module.exports = {
    config: {
        name: 'leave',
        aliases: ['lvc', 'leavevc'],
        description: 'Leaves the current voice channel.',
        usage: 'leave',
        category: 'Music'
    },
    run: async (client, message, args) => {
        const { channel } = message.guild.me.voice
        if(channel){
            message.guild.me.voice.channel.leave();
        message.channel.send(config.emoji.tick + ' I have successfully left the voice channel!');
        }else{
        message.channel.send(config.emoji.cross + ' I am not in a voice channel.');
        }
    }
}