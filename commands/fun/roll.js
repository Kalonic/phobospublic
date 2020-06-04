module.exports = {
    config: {
        name: 'roll',
        aliases: ['dice', 'rolldice'],
        category: 'Fun',
        description: 'Rolls a six sided dice and gives you the output.',
        usage: 'roll'
    },
    run: async (client, message, args) => {
        var chance = Math.floor(Math.random() * 6);
        if(chance === 0) return message.channel.send('You rolled a 1!');
        if(chance === 1) return message.channel.send('You rolled a 2!');
        if(chance === 2) return message.channel.send('You rolled a 3!');
        if(chance === 3) return message.channel.send('You rolled a 4!');
        if(chance === 4) return message.channel.send('You rolled a 5!');
        if(chance === 5) return message.channel.send('You rolled a 6!');
    }
}