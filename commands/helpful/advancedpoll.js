const config = require('../../config.json');
const {MessageEmbed} = require('discord.js')
module.exports = {
    config: {
        name: 'poll',
        aliases: ['p'],
        description: '',
        usage: 'p <QUESTION> OR p [title/question] | [option1] | [option2] up to 5',
        category: 'Helpful',
        access: 'Members with Manage Messages permission.'
    },
    run: async (client, message, args, prefix) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(config.emoji.cross + ' You must have the permission \'Manage Messages\' in this guild to perform this action.');
        let split = '|'
        const embed = new MessageEmbed()
            .setColor(config.colour.green)
            .setTitle('Start a Poll')
            .setDescription(`-poll to start a poll.`)
            .addField('**Multi Options (1-5):**', `-poll What's Your Favorite Color? | Blue | Red | Yellow`)
            .addField('**Yes / No :**', `-poll Do you like this Command?`)
        
        
        
        args = args.join(' ').split(split);
        for(var i = 0; i < args.length; i++) args[i] = args[i].trim();
        if(!args[0]) return message.channel.send(embed);
        
        if(!args[1]){
            let msgArgs = args.slice(0).join(' ');
            const embedno = new MessageEmbed()
                .setTitle(msgArgs)
                .setColor(config.colour.green)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.channel.send(embedno).then(async messageReaction => {
            messageReaction.react('697201554477940837').then(messageReaction.react('697201580935479367'));
            message.delete();    })
        } else if(!args[2]){
            let title = args[0];
            let option1 = args[1];
            const embed2 = new MessageEmbed()
                .setTitle(title)
                .setDescription(`
                
                🇦 ${option1}

                
                `)
                .setColor(config.colour.purple)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.channel.send(embed2).then(messageReaction => {
                messageReaction.react('🇦');
                message.delete()
            })
        } else if(!args[3]){
            let title = args[0];
            let option1 = args[1];
            let option2 = args[2];
            const embed3 = new MessageEmbed()
                .setTitle(title)
                .setDescription(`
                
                🇦 ${option1}
                🇧 ${option2}

                
                `)
                .setColor(config.colour.purple)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.channel.send(embed3).then(async messageReaction => {
                messageReaction.react('🇦');
                messageReaction.react('🇧');
                message.delete()
            })
        } else if(!args[4]){
            let title = args[0];
            let option1 = args[1];
            let option2 = args[2];
            let option3 = args[3];
            const embed4 = new MessageEmbed()
                .setTitle(title)
                .setDescription(`
                
                🇦 ${option1}
                🇧 ${option2}
                🇨 ${option3}

                
                `)
                .setColor(config.colour.purple)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.channel.send(embed4).then(async messageReaction => {
                messageReaction.react('🇦');
                messageReaction.react('🇧');
                messageReaction.react('🇨');
                message.delete()
            })
        } else if(!args[5]){
            let title = args[0];
            let option1 = args[1];
            let option2 = args[2];
            let option3 = args[3];
            let option4 = args[4];
            const embed5 = new MessageEmbed()
                .setTitle(title)
                .setDescription(`
                
                🇦 ${option1}
                🇧 ${option2}
                🇨 ${option3}
                🇩 ${option4}

                
                `)
                .setColor(config.colour.purple)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.channel.send(embed5).then(async messageReaction => {
                messageReaction.react('🇦');
                messageReaction.react('🇧');
                messageReaction.react('🇨');
                messageReaction.react('🇩');
                message.delete()
            })
        } else if(!args[6]){
            let title = args[0];
            let option1 = args[1];
            let option2 = args[2];
            let option3 = args[3];
            let option4 = args[4];
            let option5 = args[5];
            const embed6 = new MessageEmbed()
                .setTitle(title)
                .setDescription(`
                
                🇦 ${option1}
                🇧 ${option2}
                🇨 ${option3}
                🇩 ${option4}
                🇪 ${option5}

                
                `)
                .setColor(config.colour.purple)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.channel.send(embed6).then(async messageReaction => {
                messageReaction.react('🇦');
                messageReaction.react('🇧');
                messageReaction.react('🇨');
                messageReaction.react('🇩');
                messageReaction.react('🇪');
                message.delete()
            })
        }else{
            return message.channel.send(config.emoji.cross + ' That is too many options for me to include in a poll.');
        }
        
    }
}