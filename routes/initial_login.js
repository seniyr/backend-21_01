require('dotenv').config()
const express = require('express');
const path  = require("path");
const router = express.Router();

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');  //similar to fetch on client side

const session = require('express-session');
var passport = require('passport');

const connection = require('../database/scripts/mongo_init')
const User = connection.models.User;
const USER_PROFILE = connection.models.profile;

const {genPassword} = require('../lib/passwordUtils')


const {
    auth_handlerp,
    errorhandler,
    loginbypass,
    isAuth
}  = require("../controllers/logincontrollers.js")


// session files.
require('../controllers/passportConfig')(router);





router.use('/static/' , express.static( path.join( "../",__dirname ,"/html/" )))

//----------NETWORK CALLS ----------------------------------------------------
router.get('/logout', (req, res) => {
    // req.session.times_visited = -1;
    req.logout();
    res.redirect('/');
});

router.get("/testing",isAuth,(req,res)=>{
    console.log("WE GOT IT")
    res.send("WER GOT IT")
});

router.get(`/`,loginbypass,async (req,res)=>{
    // result =await db.get ("SELECT * FROM USERS;")
    // console.log(result)
    res.sendFile("/html/Login.html" , {root:path.join(__dirname,"../")});

}); // if logged in , redirect to user/dashboard, else login or register page via authenticator
router.get('/register',(req,res)=>{
    res.sendFile("/html/register.html" , {root:path.join(__dirname,"../")});
})

router.get('/auth/github', (req,res)=>{
   res.redirect(
       `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
   ) 
});

router.get('/auth/github/callback' , async (  { query : {code}} , res) =>{
    console.log("QUERY code",code) // code is like permision from user to view.
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SERVER_SECRET,
        scope : "USER,public_repo",
        code,
    }

    // the code is genral to session but client secret is specefic to this host.
    const options = {headers : {accept : "application/json"}}

    Token = await axios
    .post('https://github.com/login/oauth/access_token',body,options)
    .then( (res)=>{
        // response looks likeAccept:
        // application/json
        //{"access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a", "scope":"repo,gist", "token_type":"bearer"}
        console.log("RESPONSE DATA",res.data)
        return res.data.access_token 
    })
    .then( (token)=>{
        console.log("GOT TOKEN :",token)
        // now we can make user detail request on behalf of the use with the token.
            //Authorization: token OAUTH-TOKEN
            //GET https://api.github.com/user
        
        // res.redirect(`https://github.com/?token=${token}`);
        return token;
    }).catch((e)=>{
        console.log(e);
    })

    if(Token !== undefined){
        options2 = {headers : {Authorization : `Bearer ${Token}` }}
        const Git_user_details = await axios.get( 'https://api.github.com/user',options2).catch((e)=>{
            console.log("Error in getting details" ,e)
        })
        // at this point we have already got user data from the oauth. and its authenticated since they r logged in.
        // so we just have to log them in.
        auth_handler(Git_user_details.data,res);
    }
})// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps read more about it here
//--------------------------------------------------------------------

router.get('/fail',(req,res)=>{
    const message = {msg : "incorrect username or password" }
    res.send(message);
});


router.get('/auth/google',loginbypass,passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{successRedirect:'/user'}),(req,res)=>{ // this time, we get code back in url so passport will detect it
    const data   =  JSON. stringify(req.user)
    const ses   =  JSON. stringify(req.session)

    res.send(`<h1>you reached redirect URI we have </h1> <br>\n ${data} <br> ${ses}`);
});

//----------------------POST CALLS-------------------------------------------
// Standard format chosen for sending data is a data object with msg feild



// ==========NEW  login and register methods using passport
router.post('/register', async (req,res)=>{
    console.log("GOT HERE")
    

    await User.findOne({ username: req.body.email })
        .then((user) => {
            if(user){
                res.status(400);
                console.log("user exist")
                message = {msg: "User already exist"}
                res.send(message);
                
                }

        
        // so if you didnt find any existing user, then create one
        else{
            const saltHash = genPassword(req.body.password);
    
            const salt = saltHash.salt;
            const hash = saltHash.hash;
        const newUser = new User({
            username: req.body.email,
            hash: hash,
            salt: salt,
            admin: true
        });

        newUser.save()
            .then((user) => {
                const newprofile = new USER_PROFILE({
                    normaluserid :user.id,
                    name:'testing',
                    email:user.email
                })

                newprofile.save().then((profile)=>{
                    console.log("new profile created",profile);
                }).catch((e)=>{console.log(e)});
                console.log(user);
            });
            message = {msg: "User Created succefully"}
            res.send(message);
        }

});

});

router.post('/',passport.authenticate('local' , { successRedirect: '/user'}));







router.use(errorhandler)
module.exports  = router;

