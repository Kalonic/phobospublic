const config = require('../../config.json');
const prefixSchema = require('../../models/guild.js');
const Discord = require('discord.js');
module.exports = {
    config: {
        name: 'mute',
        aliases: ['m'],
        category: 'Moderation',
        usage: 'mute [USER] <REASON>',
        description: 'Disables talking permissions for a user.',
        access: 'Members with permission: \'Manage Roles\'.'
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner)return message.channel.send(config.emoji.cross + ' You do not have permission to use this command.');
        if(!message.guild.me.hasPermission('MANAGE_ROLES', 'ADMINISTRATOR')) return message.channel.send(config.emoji.cross + ' I do not have permissions to mute this member.');
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!mutee) return message.channel.send(config.emoji.cross + ' Please give a user to be muted');
        if (mutee.roles.cache.some(role => role.name === 'Muted')) return message.channel.send(config.emoji.cross + ' That user is already muted!');
        let reason = args.slice(1).join(' ');
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
        mutee.send(`You have been muted in ${message.guild.name} by ${message.author.tag} for the reason '${reason}'`)
        message.channel.send(config.emoji.tick + ' Member muted successfully!')
        
        guild = await prefixSchema.findOne({ guildid: message.guild.id });

        if(guild.logs){
            let modlog = message.guild.channels.cache.get(guild.logschannel);
            if (!modlog) return message.channel.send('No mod log channel or your current mod log channel was deleted');
            
            let mutembed = new Discord.MessageEmbed()
                    .setTitle('MOD LOGS - MUTE')
                    .setColor(config.colour.red)
                    .addField(`User Muted`, `**Muted User:** ${mutee.user.tag}\n**Muted by:** ${message.author.tag}\n**Reason:** ${reason}`)
                    .setTimestamp()
            message.guild.channels.cache.get(guild.logschannel).send(mutembed);
        }
    })


}
}