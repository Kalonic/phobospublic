const config = require('../../config.json');

module.exports = {
    config: {
        name: 'dm',
        aliases: ['directmessage', 'pm', 'message', 'm'],
        category: 'Modmail',
        description: 'DMs a user.',
        usage: 'dm [USER] [MESSAGE]',
        access: 'Members with permission: \'Manage Messages\'.'
    },
    run: async (client, message, args) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        if(!args[0]) return message.reply('Please specify who you would like me to DM.');
        if(!args[1]) return message.reply('Please specify what you would like me to DM the user.');
        let dmArgs = args.slice(1).join(' ');
        if(args[0] === 'me') return message.author.send(dmArgs);
        else{
        let dmuser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let userID = dmuser.user.id;
        client.users.cache.get(userID).send(dmArgs);
        }

    }



}