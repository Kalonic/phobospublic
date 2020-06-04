const config = require('../../config.json');
const ms = require('ms');
const prefixSchema = require('../../models/guild.js');
const Discord = require('discord.js');
module.exports = {
    config: {
        name: 'timedmute',
        aliases: ['tm'],
        description: 'Mutes a member for a certain amount of time.',
        usage: 'timedmute <MEMBER-PING / MEMBER-ID> <TIME> [REASON] eg. timedmute @DefiniteError 5d Abuse to staff',
        category: 'Moderation',
        access: 'Members with Manage Roles permission'
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner)return message.channel.send(config.emoji.cross + ' You do not have permission to use this command.');
        if(!message.guild.me.hasPermission('MANAGE_ROLES', 'ADMINISTRATOR')) return message.channel.send(config.emoji.cross + ' I do not have permissions to mute this member.');
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!mutee) return message.channel.send(config.emoji.cross + ' Please give a user to be muted');
        if (mutee.roles.cache.some(role => role.name === 'Muted')) return message.channel.send(config.emoji.cross + ' That user is already muted!');
        if(!args[1]) return message.channel.send(config.emoji.cross + ' Please provide a time to mute for, for example, 5d or 2h')
        

        let time = ms(args[1])
        let reason = args.slice(2).join(' ');
        if(!reason) reason = 'No reason given.'
        let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
        if(!muterole) {
            try{
                message.channel.send('I couldn\'t find a suitable mute role. Creating one now!')
                muterole = await message.guild.roles.create({
                    data: {name: 'Muted',
                    color: config.colour.darkgrey,
                    permissions: []
                 }
                })
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.updateOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
        } catch(e) {
            console.log(e.stack);
        }
        }
        mutee.roles.add(muterole.id).then(async () => {
            mutee.send(`You have been time-muted in ${message.guild.name} for ${ms(time, { long: true })} by ${message.author.tag} for the reason '${reason}'`)
            message.channel.send(config.emoji.tick + ` Member time-muted successfully for ${ms(time, { long: true })}!`)
            
            guild = await prefixSchema.findOne({ guildid: message.guild.id });
    
            if(guild.logs){
                let modlog = message.guild.channels.cache.get(guild.logschannel);
                if (!modlog) return message.channel.send('No mod log channel or your current mod log channel was deleted');
                
                let mutembed = new Discord.MessageEmbed()
                        .setTitle('MOD LOGS - TIMED-MUTE')
                        .setColor(config.colour.red)
                        .addField(`User Time-Muted`, `**Muted User:** ${mutee.user.tag}\n**Muted by:** ${message.author.tag}\n**Time Muted For:** ${ms(time, { long: true })}\n**Reason:** ${reason}`)
                        .setTimestamp()
                message.guild.channels.cache.get(guild.logschannel).send(mutembed);
            }
        })
        setTimeout(async () => {
            mutee.roles.remove(muterole.id)
            fguild = await prefixSchema.findOne({ guildid: message.guild.id });
            if(time < 600000){
                message.channel.send(config.emoji.tick + ` ${mutee.user.tag} successfully unmuted from a Time Mute.`)
            }
            if(fguild.logs){
                let modlogc = message.guild.channels.cache.get(fguild.logschannel);
                if (!modlogc) return message.channel.send('No mod log channel or your current mod log channel was deleted');
                
                let mutembedf = new Discord.MessageEmbed()
                        .setTitle('MOD LOGS - AUTO-UNMUTE')
                        .setColor(config.colour.green)
                        .addField(`User Auto UnMuted`, `**UnMuted User:** ${mutee.user.tag}\n**UnMuted by:** AUTO (FROM TIMED MUTE)\n**Reason:** TIMED MUTE`)
                        .setTimestamp()
                message.guild.channels.cache.get(fguild.logschannel).send(mutembedf);
            }
            mutee.send(`You have been unmuted from your time mute of ${ms(time, { long: true })} in ${message.guild.name}`)
    
            }, time);

    }
}