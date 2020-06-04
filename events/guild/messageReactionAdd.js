const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = async (client, reaction, user) => {
    if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.emoji.name !== "☑️" || reaction.message.id !== "709386188787810434" || user.bot) return;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (member) member.roles.add("698664100347117598");
};