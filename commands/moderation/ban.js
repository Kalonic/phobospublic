const config = require('../../config.json');
const Discord = require('discord.js');
const prefixSchema = require('../../models/guild.js');
module.exports = {
    config: {
        name: 'ban',
        //aliases: ['', 'helpplz']
        category: 'Moderation',
        usage: 'ban [USER] <REASON>',
        description: 'Bans a user.',
        access: 'Members with permission: \'Ban Members\'.'
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission('BAN_MEMBERS')){
            return message.channel.send(config.emoji.cross + ' You do not have permission to Ban Members in this guild.');
        }
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(config.emoji.cross + ' I do not have permission to Ban Members in this guild.');
    
        if(!args[0]){
            return message.channel.send(config.emoji.cross + ' You didn\'t mention a user to ban!');
        }
        let banreason = args.slice(1).join(' ');
        if(!args[1]){
            banreason = 'No reason specified.'
        }
        const user1 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(user1){
            const member1 = message.guild.member(user1);
            if(member1){
                member1.ban(banreason).then(async () => {
                    message.channel.send(config.emoji.tick + ` Successfully banned ${member1.user.tag}!`)
                    
                    
                    
                    guild = await prefixSchema.findOne({ guildid: message.guild.id });

                    if(guild.logs){
                        let modlog = message.guild.channels.cache.get(guild.logschannel);
                        if (!modlog) return message.channel.send('No mod log channel or your current mod log channel was deleted');
                        
                        let mutembed = new Discord.MessageEmbed()
                            .setTitle('MOD LOGS - BAN')
                            .setColor(config.colour.red)
                            .addField(`User Banned`, `**Banned User:** ${member.user.tag}\n**Banned by:** ${message.author.tag}\n**Reason:** ${banreason}`)
                            .setTimestamp()
                        message.guild.channels.cache.get(guild.logschannel).send(mutembed);
                    }

                }).catch(err => {
                    message.channel.send(config.emoji.cross + ' I was unable to ban the member.');
                    console.error(err);
                });
            }else{
                message.channel.send(config.emoji.cross + ' That user isn\t in this guild!');
            }

        }



        

    }

}