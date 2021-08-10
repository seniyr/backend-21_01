const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../database/scripts/mongo_init');
const User = connection.models.User;
const googleUser = connection.models.googleUser;
const {validPassword} =  require('../lib/passwordUtils');

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};
// this will grab the Username and password from req.body.uname and pw feild.

const verifyCallback = (username, password, done) => {
    if(username == undefined){
        console.log("GOT GOOGLE USER ")
        return done('pass');
    }
    User.findOne({ username: username })
        .then((user) => {

            if (!user) {console.log("user not exist"); return done(null, false) }//nope no error and no user also
            
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                console.log("logged in")
                
                return done(null, user,{type : 'normal'}); // no eror and yes we had user which is provided
            } else {
                console.log("wrong password")
                return done(null, false); // none no error and no there was not valid passwword
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback); // ie take the values given in the custom feilds.
passport.use(strategy);

passport.serializeUser((user, done) => {
    // console.log("Serialising normal user / google user or any other user",user )
    if(user.googleID != undefined){
        // console.log("Got here in google")
        done(null,{id:user.id,type:'google'});
    }
    else{
        done(null,{id:user.id,type:'normal'})
    }
    
}); // serialise doenst care which user it is, it just adds the id. its the issue with desearallise

passport.deserializeUser((userIDandType, done) => { // this basicly on the basis of ID which we got in above function,
    // is going to add req.user object would be added as user details.
    // console.log("desearlising")
    let id = userIDandType.id;
    if(userIDandType.type == 'google'){
        console.log("got google")
        googleUser.findById(id).then((user)=>{
            console.log("this is deseralised one", user)
            done(null,user);
        }).catch((e)=>{console.log(e)});
    }

    else{
        // console.log("got normal")
        User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
    }
    
});

