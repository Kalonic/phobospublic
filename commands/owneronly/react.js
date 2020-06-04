const config = require('../../config.json');

module.exports = {
    config: {
        name: 'react',
        //aliases: ['commands', 'helpplz'],
        category: 'OwnerOnly',
        description: 'Reacts to a message.',
        access: 'Bot Owner.',
        usage: 'react [MESSAGE-ID] [REACTION]'
    },
    run: async (client, message, args) => {

        if(message.author.id !== config.ownerID){
            return;
        }
        if(!args[0]){
            return message.reply('Usage: ?react [MessageID] [Emoji]');
        }
        if(!args[1]){
            return message.reply('Usage: ?react [MessageID] [Emoji]');
        }
        let messageID = args[0];
        let emoji = args[1];
        (message.channel.messages.fetch(messageID)).then(r => r.react(emoji));
        message.delete()
        message.channel.send(config.emoji.tick + ' Reacted Successfully!').then(m => m.delete({ timeout: 3000, reason: 'It had to be done.' }));


    } 





}
