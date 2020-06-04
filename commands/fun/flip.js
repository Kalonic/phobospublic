module.exports = {
    config: {
        name: 'flip',
        aliases: ['coin', 'coinflip'],
        category: 'Fun',
        usage: 'flip',
        description: 'Flips a coin and gives you the output.'
    },
    run: async (client, message, args) => {
        var chance = Math.floor(Math.random() * 2);
        if(chance === 0) return message.channel.send('Your coin landed on heads!');
        else return message.channel.send('Your coin landed on tails!');
    }
}