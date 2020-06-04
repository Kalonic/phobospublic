const config = require('../../config.json');
const Discord = require('discord.js');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'kick',
        //aliases: ['commands', 'helpplz'],
        category: 'Moderation',
        usage: 'kick [USER] <REASON>',
        description: 'Kicks a user.',
        access: 'Members with permission: \'Kick Members\'.'
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission('KICK_MEMBERS')){
            return message.channel.send(config.emoji.cross + ' You do not have permission to Kick Members in this guild.');
        }
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(config.emoji.cross + ' I do not have permission to Kick Members in this guild.');
    
        if(!args[0]){
            return message.channel.send(config.emoji.cross + ' You didn\'t mention a user to kick!');
        }
    
    

        let kickreason = args.slice(1).join(' ');
        if(!args[1]){
            kickreason = 'No reason provided.';
        }
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(user){
            const member = message.guild.member(user);
            if(member){
                member.kick(kickreason).then(async() => {
                    message.channel.send(config.emoji.tick + ` Successfully kicked ${member.user.tag}!`)
                    
                    guild = await prefixSchema.findOne({ guildid: message.guild.id });

                    if(guild.logs){
                        let modlog = message.guild.channels.cache.get(guild.logschannel);
                        if (!modlog) return message.channel.send('No mod log channel or your current mod log channel was deleted');
                        
                        let mutembed = new Discord.MessageEmbed()
                                .setTitle('MOD LOGS - KICK')
                                .setColor(config.colour.red)
                                .addField(`User Kicked`, `**Kicked User:** ${member.user.tag}\n**Kicked by:** ${message.author.tag}\n**Reason:** ${kickreason}`)
                                .setTimestamp()
                        message.guild.channels.cache.get(guild.logschannel).send(mutembed);
                    }
                    
                })
                .catch(err => {
                    message.channel.send(config.emoji.cross + ' I was unable to kick the member.');
                    console.error(err);
                });
            }else{
                message.channel.send(config.emoji.cross + ' That user isn\t in this guild!');
            }

        }

    }

}