const config = require('../../config.json');
module.exports = {
    config: {
        name: 'makepoll',
        aliases: ['mp']
    },
    run: async (client, message, args) => {
        if(message.author.id !== config.ownerID) return;
        let messageID = args[0];
        (message.channel.messages.fetch(messageID)).then(messageReaction => {
            messageReaction.react('697201554477940837').then(messageReaction.react('697201580935479367'));
        });
    }
}