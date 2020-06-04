const config = require('../../config.json');
module.exports = {
    config: {
        name: '8ball',
        aliases: ['ball', '8b'],
        category: 'Fun',
        usage: '8ball [input]',
        description: 'Shakes an 8 Ball and gives you the output for your question or event.'
    },
    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Please provide something for me to judge.')
        var chance = Math.floor(Math.random() * 20);
        if(chance === 0) return message.channel.send('It is certain!');
        if(chance === 1) return message.channel.send('It is decidedly so.');
        if(chance === 2) return message.channel.send('Without a doubt!');
        if(chance === 3) return message.channel.send('Yes, Defininitely.');
        if(chance === 4) return message.channel.send('You may rely on it.');
        if(chance === 5) return message.channel.send('As I see it.');
        if(chance === 6) return message.channel.send('It is Most likely.');
        if(chance === 7) return message.channel.send('Outlook good.');
        if(chance === 8) return message.channel.send('Signs point to yes.');
        if(chance === 9) return message.channel.send('Reply hazy.');
        if(chance === 10) return message.channel.send('Try again.');
        if(chance === 11) return message.channel.send('Ask again later.');
        if(chance === 12) return message.channel.send('Better not tell you now.');
        if(chance === 13) return message.channel.send('Cannot predict now.');
        if(chance === 14) return message.channel.send('Concentrate and ask again.');
        if(chance === 15) return message.channel.send('Don\'t bet on it.');
        if(chance === 16) return message.channel.send('My reply is no.');
        if(chance === 17) return message.channel.send('My sources say no.');
        if(chance === 18) return message.channel.send('Outlook not so good.');
        if(chance === 19) return message.channel.send('Very doubtful.');

    }
}