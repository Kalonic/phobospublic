const config = require('../../config.json');
const prefixSchema = require('../../models/guild.js');
const userSchema = require('../../models/user.js');
module.exports = async (client, message) => {
    if(message.channel.type === 'dm'){
        if (message.author.id === client.user.id) return;
        return client.channels.cache.get('696709942685728858').send(`**${message.author.tag} (\`${message.author.id}\`)** : \`${message.content}\``);
    }
    let user = await userSchema.findOne({ userid: message.author.id });
    if(!user){
        let newUser = new userSchema({
            userid: message.author.id,
            username: message.author.username,
            usertag: message.author.tag,
            blacklisted: false,
        });
        await newUser.save();
        user = await userSchema.findOne({ userid: message.author.id });
    };






    let guild = await prefixSchema.findOne({ guildid: message.guild.id });
    if (!guild) {
        let newGuild = new prefixSchema({
            guildid: message.guild.id,
            guildownerid: message.guild.owner.user.id,
            prefix: config.prefix,
            guildname: message.guild.name,
            logs: false,
            logschannel: 'none',
            swearfilter: false,
            blacklisted: false,
            premium: false,
            report: false,
            reportchannel: 'none',
            autorole: 'none'
        });
        await newGuild.save();
        guild = await prefixSchema.findOne({ guildid: message.guild.id });
    };
    let prefix
    if(guild && guild.prefix) prefix = guild.prefix
    else prefix = config.prefix
    if(guild.swearfilter){
        if(config.swear.includes(message.content.toLowerCase())) {
        //if(message.content.includes(config.swear)){
            message.delete()
            message.channel.send(`${config.emoji.cross} ${message.author} Please do not use language like that in this server.`).then(m => m.delete({timeout:5000}));
        }
    }
    //}
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    if(message.content.match)
    if(message.channel.id === '697454329568821321'){
        if(message.author.id === client.user.id) return;
        if(!message.content.startsWith('?report')) message.delete()
    }
    // if(message.channel.id === '701823816849948747') {
    //     if(!message.content.startsWith('?verify')) message.delete()
    // }
    
    // if(message.content.toLowerCase() === 'phobos is cool!'){
    //     return message.react('👍');
    // }
    if (RegExp(`^<@!?${client.user.id}>`).test(message.content) && !args.length) {
        message.channel.send(`Hi! I'm Phobos, a discord bot made for multiple purposes!\nUse ${prefix}help for a list of commands, or ${prefix}phobos for more information about me!`)
     }



    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;
    if(message.author.id !== config.ownerID) if(guild.blacklisted === true) return message.channel.send(config.emoji.cross + ' This server is blacklisted from using Phobos.');
    if(user.blacklisted === true) return message.channel.send(config.emoji.cross + ' You are blacklisted from using Phobos.');
    let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    if(commandfile) commandfile.run(client, message, args, prefix, guild)
}