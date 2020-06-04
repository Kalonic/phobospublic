const config = require('../../config.json')
module.exports = {
    config: {
        name: 'reload',
        category: 'OwnerOnly',
        description: 'Reloads a command.',
        usage: 'reload [COMMAND]',
        access: 'Bot Owner.'
    },
    run: async (client, message, args) => {
        if(message.author.id !== config.ownerID) return;

        if(!args[0]) return message.channel.send(config.emoji.cross + ' You need to provide a command to reload!').then(m => m.delete({timeout:5000}));
        let commandName = args[0].toLowerCase();
        try{
            delete require.cache[require.resolve(`../${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`../${commandName}.js`)
            client.commands.set(commandName, pull)
        } catch(e) {
            return message.channel.send(config.emoji.cross + ` Could not reload: \'${args[0].toUpperCase()}\'`).then(m => m.delete({timeout:5000}));
        }
        message.channel.send(config.emoji.tick + ` Command: \'${args[0].toUpperCase}\' reloaded successfully!`).then(m => m.delete({timeout:5000}));

    }
}