const config = require('../../config.json');

module.exports = {
    config: {
        name: 'say',
        aliases: ['s'],
        category: 'OwnerOnly',
        description: 'Makes me say something',
        usage: 'say [MESSAGE]',
        access: 'Bot Owner.'
    },
    run: async (client, message, args) => {
        if (message.author.id !== config.ownerID){
            return;
        }
        if(!args[0]){
            return message.channel.send('Please specify what you would like me to say.');
        }
        message.channel.send(args.slice(0).join(' '));
        message.delete();
    }
}