const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    config: {
        name: 'help',
        aliases: ['commands', 'helpplz'],
        category: 'Info',
        description: 'Displays an embed with all commands listed.',
        usage: 'help <COMMAND>'
    },
    run: async (client, message, args, prefix) => {

        const embedhelp = new Discord.MessageEmbed()
                .setColor(config.colour.green)
                .setFooter(`Made by ${client.users.cache.get('407221681858412575').tag}`, client.users.cache.get('407221681858412575').displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setTitle('Help Message')
                .setDescription('This message includes all commands. For more information a command, do ?help [command].')
                .addField('Fun [4]', `\`${prefix}8ball\`, \`${prefix}flip\`, \`${prefix}roll\`, \`${prefix}quiz\``)
                .addField('Helpful [1]', `\`${prefix}poll\``)
                .addField('Info [5]', `\`${prefix}help\`, \`${prefix}phobos\`, \`${prefix}ping\`, \`${prefix}serverinfo\`, \`${prefix}userinfo\`, \`${prefix}invite\``)
                .addField('NSFW [3]', `\`${prefix}thigh\`, \`${prefix}ass\`, \`${prefix}pussy\`, \`${prefix}anal\`, \`${prefix}porn\``)
                .addField('Settings [4]', `\`${prefix}prefix\`, \`${prefix}swearfilter\`, \`${prefix}modlogs\`, \`${prefix}reportlogs\``)
                if(message.guild.id == '695938279354400789') embedhelp.addField('Support [2]', `\`${prefix}new\`, \`${prefix}close\``).addField('Moderation [8]', `\`${prefix}ban\`, \`${prefix}kick\`, \`${prefix}mute\`, \`${prefix}unmute\`, \`${prefix}purge\`, \`${prefix}report\`, \`${prefix}role\`, \`${prefix}unban\`, \`${prefix}timedmute\``)
                .addField('Modmail [2]', `\`${prefix}dm\`, \`${prefix}reply\``)
                .addField('OwnerOnly [7]', `\`${prefix}eval\`, \`${prefix}react\`, \`${prefix}reload\`, \`${prefix}say\`, \`${prefix}shutdown\`, \`${prefix}blacklistguild\`, \`${prefix}blacklistuser\`, \`${prefix}premium\`, \`${prefix}permcheck\`, \`${prefix}repeat\``)
                else embedhelp.addField('Moderation [8]', `\`${prefix}ban\`, \`${prefix}kick\`, \`${prefix}mute\`, \`${prefix}unmute\`, \`${prefix}purge\`, \`${prefix}report\`, \`${prefix}role\`, \`${prefix}unban\`, \`${prefix}timedmute\``)
                .addField('Modmail [2]', `\`${prefix}dm\`, \`${prefix}reply\``)
                .addField('OwnerOnly [7]', `\`${prefix}eval\`, \`${prefix}react\`, \`${prefix}reload\`, \`${prefix}say\`, \`${prefix}shutdown\`, \`${prefix}blacklistguild\`, \`${prefix}blacklistuser\`, \`${prefix}premium\`, \`${prefix}permcheck\`, \`${prefix}repeat\``)
            
            if(!args[0]) return message.channel.send(embedhelp);
            if(args[0]){
                let command = args[0].toLowerCase();
                if(client.commands.has(command)) {
                    command = client.commands.get(command) || client.commands.get(client.aliases.get(cmd));
                    var AHembed = new Discord.MessageEmbed()
                        .setColor(config.colour.green)
                        .setAuthor(`Help Message for ${command.config.name}`)
                        .setDescription(`This bot's prefix in this server is ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Category:** ${command.config.category || "No category"}\n**Usage:** \`${prefix}${command.config.usage || "No usage"}\`\n**Accessible By:** ${command.config.access || "Members"}\n**Aliases:** ${command.config.aliases || "No aliases."}`)
                        .setFooter(`Made by ${client.users.cache.get('407221681858412575').tag}`, client.users.cache.get('407221681858412575').displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    message.channel.send(AHembed);
                }
                else return message.channel.send(config.emoji.cross + ' That command does not exist. Do ?help for a list of all commands.')
            }
            
        }
}