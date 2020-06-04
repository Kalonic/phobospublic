const mongoose = require('mongoose');
const joinSchema = mongoose.Schema({
    guildid: String,
    guildownerid: String,
    channel: String,
    guildname: String,
    title: String,
    description: String,
    colour: String,
    enabled: Boolean
});
module.exports = mongoose.model('joinSchema', joinSchema);