const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = (client) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
            client.channels.cache.get("696709942685728858").send(x.join(" "));
        });
    }