const config = require('../../config.json');
module.exports = {
    config: {
        name: 'permcheck',
        aliases: ['pc'],
        description: 'Checks the permissions of someone in a guild.',
        usage: 'permcheck <member-id>',
        category: 'OwnerOnly',
        access: 'Bot Owner'
    },
    run: async (client, message, args) => {
        if(message.author.id !== config.ownerID) return;
        let person = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let thing = person.permissions.toArray().map(ree => ree).join(', ');
        message.channel.send(`**${person.user.tag} has the following permissions:**\n\`` + thing + '`');
        
    }
}