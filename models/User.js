const mongoose = require('mongoose');

const SignUpSchema = mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true},
});



const SauceSchema = mongoose.Schema({
    userId : {type : String, required : true},

    email : {type : String, required : true},
    password : {type : String, required : true},
 });

module.exports = mongoose.model('User', UserSchema);

