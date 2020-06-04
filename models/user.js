const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userid: String,
    username: String,
    usertag: String,
    blacklisted: Boolean,
});
module.exports = mongoose.model('userSchema', userSchema);