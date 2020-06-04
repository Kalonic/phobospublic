const config = require('../../config.json');
module.exports = {
    config: {
        name: 'cookie',
        aliases: ['givecookie', 'gc'],
        description: '',
        usage: '',
        category: '',
        access: ''
    },
    run: async (client, message, args) => {
        if (message.author.id !== config.ownerID) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Cannot find that member");
        if(!member.lastMessage) return message.channel.send(config.emoji.cross + ' No last message.');
        member.lastMessage.react('🍪')
        message.channel.send(config.emoji.tick + ' Successfully gave ' + member.user.tag + ' a cookie!! 🍪');
    }
}