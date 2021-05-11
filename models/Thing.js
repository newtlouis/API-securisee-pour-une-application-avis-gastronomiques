const mongoose = require('mongoose');

const SignUpSchema = mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true},
});



const SauceSchema = mongoose.Schema({
    name : {type : String, required : true},
    manufacturer : {type : String, required : true},
    description : {type : String, required : true},
    imageUrl : {type : String, required : true},
    mainPepper : {type : String, required : true},
    heat : {type : Number, required : true},
 });

module.exports = mongoose.model('Thing', SauceSchema);
