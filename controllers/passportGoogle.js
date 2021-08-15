require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const connection = require('../database/scripts/mongo_init');
const googleUser = connection.models.googleUser;
const USER_PROFILE = connection.models.profile;


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.GOOGLE_REDIRECT_URI}/signin/auth/google/callback`,
  passReqToCallback: true,
    }, // pass request to call back will eventualy pass the profile info we got toobject which is profile

    function(request, accessToken, refreshToken, profile, done) {
        // we can use access token to change, delete , extract various things from google profile
        // refresh token is used when access token expires to get a new one
        // profile is what we get 
        // done is next function in the middleware series

        // console.log("i came back with the info", profile.emails[0].value)
        googleUser.findOne({googleID:profile.id}).then((currentUser)=>{
            if(currentUser){
                // we have a use
                // console.log("Current user from DB :",currentUser)
                return done(null,currentUser); // so send user with no error
            }

            else{
                // create user
                
                new googleUser({
                    username : profile.displayName,
                    googleID : profile.id,
                    email : profile.emails[0].value
                }).save().then((newuser)=>{
                    // console.log('new user created : ', newuser);
                    new USER_PROFILE({
                        googleuserid :newuser.id,
                        name:'testing',
                        email:newuser.email
                    })
                    .save().then((profile)=>{
                        console.log("new GOOGLE profile created",profile);
                    }).catch((e)=>{console.log(e)});


                    return done(null,newuser); // so send new user. with no error. This would go to serialise method
                });
            }
        }).catch((e)=>{
            console.log("Got a small error \n",e);
            return done(e,null);
        })


    })); // this callback function









