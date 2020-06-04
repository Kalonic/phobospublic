const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "REACTION"] })
const config = require('./config.json');
['commands', 'aliases'].forEach(x => client[x] = new Discord.Collection());;
['console', 'command', 'event'].forEach(x => require(`./handler/${x}`)(client));
client.login(config.token);

const mongoose = require('mongoose');
mongoose.connect('NOT GIVING CONNECTION STRING', {
    useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, dbName: 'phobos'
});
mongoose.connection.on('connected', () => console.log('Connected to database.'));

