const config = require('../../config.json');
module.exports = {
    config: {
        name: 'repeat',
        aliases: ['loop', 'l'],
        description: 'Repeats a message up to 10 times.',
        usage: 'repeat <amount> <message>',
        category: 'OnwerOnly',
        access: 'Bot Owner.'
    },
    run: async (client, message, args) => {
        if (message.author.id !== config.ownerID) return;
        if (isNaN(args[0])) return message.channel.send("Amount must be a number")
        if(args[0] > 10) return message.channel.send(config.emoji.cross + ' That number is too large.');
        if (!args[1]) return message.channel.send(`${config.emoji.cross} You must provide a string to repeat`);
        await Promise.all(Array(+args[0]).fill(args.slice(1).join(' ')).map(x => message.channel.send(x)));
        message.channel.send(config.emoji.tick + ' Successfully abused the API saying `' + args.slice(1).join(' ') + '` an amount of `' + args[0] + '` times!').then(m => m.delete({timeout:5000}));
    }
}