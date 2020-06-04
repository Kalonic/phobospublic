const mongoose = require('mongoose');
const prefixSchema = mongoose.Schema({
    guildid: String,
    guildownerid: String,
    prefix: String,
    guildname: String,
    logs: Boolean,
    logschannel: String,
    swearfilter: Boolean,
    blacklisted: Boolean,
    premium: Boolean,
    report: Boolean,
    reportchannel: String,
    autorole: String
});
module.exports = mongoose.model('prefixSchema', prefixSchema);