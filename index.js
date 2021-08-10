const express = require('express');
const app = express();

const path  = require("path");

require('dotenv').config()

const connection = require('./database/scripts/mongo_init')

const {
    Authenticator,
    Authenticated,
    auth_handler,
    getuserprofile,
    errorhandler,
    isAuth
    
}  = require("./controllers/logincontrollers")


app.use('/static/' , express.static( path.join( __dirname ,"/html/" )))
// static is used for client. dont try to use it in the server side.

  
app.get("/api/userinfo",isAuth,(req,res)=>{
    console.log("user info is ,", req.user)
});
// --------------------------------------------------------------------------



app.get('/' , async (req,res)=>{
    // const result  =await db.get("SELECT * FROM USERS;").catch((e) =>{console.log(e)})
    // console.log( result)
    // res.send(`${date}`);
    res.sendFile("/html/index.html" , {root:__dirname}); 
    
});


const initial_login = require('./routes/initial_login')
app.use("/signin",initial_login);

const user = require('./routes/user.js')
app.use('/user',user)


app.use(errorhandler);















app.listen(3000, ()=>{
    console.log("server started on port 3000")
});
