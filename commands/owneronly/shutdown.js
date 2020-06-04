const config = require('../../config.json');
module.exports = {
    config: {
        name: 'shutdown',
        category: 'OwnerOnly',
        aliases: ['sd'],
        usage: 'shutdown',
        description: 'Shuts down the bot.',
        access: 'Bot Owner.'
    },
    run: async (client, message, args) => {
        if(message.author.id !== config.ownerID) return;
        try{
            await message.channel.send(config.emoji.tick + ' Bot shutdown successful.')
            process.exit()
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
        
    }
}