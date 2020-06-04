const config = require('../../config.json');
module.exports = {
    config: {
        name: 'close',
        description: 'Closes a ticket',
        category: 'Support',
        aliases: ['c']
    },
    run: async (client, message, args) => {
        if(message.channel.parent.id !== '702221120069173299') return message.channel.send(config.emoji.cross + ' This channel is not a ticket!');
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(config.emoji.cross + ' You do not have permissions to close this ticket.');
        const channel = message.channel;
        channel.delete();
    }
}