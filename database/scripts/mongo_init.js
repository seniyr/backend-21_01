const mongoose = require('mongoose');

// https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp

require('dotenv').config() // this would work since we are gonna use it in somewhere else
console.log(process.env.MONGO_URL)

const conn = process.env.MONGO_URL;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin : Boolean
});

const GuserSchema  = new mongoose.Schema({
    username : String, // its gonna be the name or email
    googleID : String ,// its the google id specefic for that google account
    email :String

});


const profile = new mongoose.Schema({
    normaluserid: {type: String, defualt:''},
    googleuserid :{type: String, defualt:''},
    githubuserid : {type: String, defualt:''},

    name :{type: String, defualt:''},
    age:{type: Number, defualt:0},
    email:{type: String, required:true},
    lastlogin : {type:String,default :''},
    numberOfLogins : {type:Number,default:0}

});


const Quetionarre_schema  = new mongoose.Schema({
    name : {type : String,defualt:"dir101"}, // its gonna be the name or email
    number : {type: Number,defualt: 5} ,// number of quetions
    description : {type :String ,defualt : "This is a sample form, nothing has been updated yet"} ,
    quetions :[{index : {type :Number, defualt:0} , quetiontype:{type:String,defualt:"text"}  ,value : {type:String,defualt:"This is a sample problem"} ,options: {type:Array, defualt :["option A","option b","optionC","optionD"]}}]

});

const Quetionarre  = connection.model('Quetionarre' , Quetionarre_schema);

const googleUser = connection.model('googleUser', GuserSchema)

const User = connection.model('User', UserSchema); //  normalusers

const USER_PROFILE  = connection.model('profile',profile)

       
module.exports = connection;




    







