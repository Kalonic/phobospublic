module.exports = {
    config: {
        name: 'ping',
        aliases: ['latency', 'pong'],
        category: 'Info',
        usage: 'ping',
        description: 'Gives the bot\'s latency ping.'
    },
    run: async (client, message, args) => {
        message.channel.send('Pinging...').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`Pong!\nClient Latency: \`${Math.round(ping)}ms\`\nAPI Latency: \`${client.ws.ping}ms\``);
        })
    }
}