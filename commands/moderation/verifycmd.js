const config = require('../../config.json')
module.exports = {
    config: {
        name: 'verify',
        aliases: ['v'],
    },
    run: async (client, message, args) => {
        if(message.guild.id !== config.serverid) return;
        if(message.channel.id !== '701823816849948747') return;
        message.delete()
        let role = message.guild.roles.cache.find(r => r.name === 'Verified');
        message.member.roles.add(role.id)
    }
}