const { ownerID, prefix } = require("../../config.json");
const { inspect } = require("util")
const config = require('../../config.json');
const Discord = require('discord.js');
module.exports = { 
    config: {
        name: "eval",
        description: "Evaluates a string of JavaScript code.",
        access: "Bot Owner.",
        aliases: ['e'],
        usage: 'eval [CODE]',
        category: 'OwnerOnly'
    },
    run: async (client, message, args) => {
    if(message.author.id == ownerID) {
        if(!args[0]) return message.channel.send(config.emoji.cross + ' Please specify JS code to evaluate.');
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 }).then(m => m.delete({timeout:5000}))
            }
            
        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``);
        }

      } else return;
        
    }
}