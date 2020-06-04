const config = require('../../config.json');

module.exports = {
    config: {
        name: 'reply',
        aliases: ['r', 'respond'],
        category: 'Modmail',
        usage: 'reply [USER] [MESSAGE]',
        description: 'DMs a user starting with your Discord name and tag.',
        access: 'Members with permission: \'Manage Messages\'.'
    },
    run: async (client, message, args) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
            if(!args[0]) return message.reply('Please specify who you would like to reply to.');
            if(!args[1]) return message.reply('Please specify what you would like to send to the user.');
            let replyArgs = args.slice(1).join(' ');
            let replyuserID = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let authorTag = message.author.tag;
            let tag = replyuserID.user.tag;
            client.users.cache.get(replyuserID.user.id).send('**' + message.author.tag + ':** ' + replyArgs);
            //message.client.channels.cache.get('696709942685728858').send('**' + message.author.tag + '** *to* **' + tag + ':** ' + replyArgs);
            message.channel.send('**' + message.author.tag + '** *to* **' + tag + ':** ' + replyArgs);
            if(message.deletable) return message.delete();


    }


}