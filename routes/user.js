
const express   =require('express')
const router = express.Router();
const path = require('path')
const connection = require('../database/scripts/mongo_init')

const USER_PROFILE = connection.models.profile;
const {
    Authenticator,
    Authenticated,
    auth_handler,
    getuserprofile,
    errorhandler,
    isAuth
}  = require("../controllers/logincontrollers")

require('../controllers/passportConfig')(router);




router.get("/" ,isAuth, async (req,res) =>{
    // console.log("THERE THERE",req.session.passport.user)
    var current_time =new Date( Date.now());
    
    let query = {};

    if(req.session.passport.user.type == 'normal'){
        query = {'normaluserid':req.session.passport.user.id };
    }
    else if(req.session.passport.user.type == 'google'){
        query = {'googleuserid':req.session.passport.user.id };
    }

    newdata = {lastlogin : current_time,$inc: {'numberOfLogins': 1 }};
    
    USER_PROFILE.findOneAndUpdate(query, newdata, {upsert: true}, function(err, doc) {
        if (err) {console.log(e); res.send("Some Server error occured. Sorry!")}
        else{
            // console.log('Last profile', doc);

            res.send(`<h3>you ${doc.email} visited this page <h1>${doc.numberOfLogins }</h1> times today! </h3>  
            <br> Last accessed  at ${doc.lastlogin} <br>
            <a href = '/signin/logout'>CLICK HERE TO LOGOUT </a>`);
        
        }
    });
    

    
   
    
    
});

router.get('/testing',isAuth,(req,res)=>{
    res.send("<h1>hello there</h1> <a href = '/signin/logout'>LOGOUT </a>>")
})

router.get("/dashboard",isAuth, (req,res) =>{
    console.log("reached here")
    res.sendFile("/html/Dashboard.html" ,{ root:path.join( __dirname,"../" )})

}); // get user dashboard . redirect to login if not logged in


module.exports  = router;