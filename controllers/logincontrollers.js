const jwt = require('jsonwebtoken');


module.exports.loginbypass = function loginbypass (req,res,next){
   
    try{
        if(req.session.passport.user) {
            res.redirect('/user') ; 
            console.log('checking for bypass' , req.session.passport.user)
        }
        else{
            next();  
        }
    }
    catch(e){    
           console.log(e);  
    }
    
   

}; // authenticates the token. if not found. sends the login page. 
//if found,send the payload in req.data to next



module.exports.auth_handler = async function  auth_handler (data,res){
    let email = data.email
    console.log("OAUTH EMAIL IS", email);
    if(email != undefined){
        const query_to_check_user = `
        SELECT 
            *
        FROM
            USERS
        WHERE
            email = "${email}"
        ;`
        userverify = await db.get(query_to_check_user);
        if(userverify){
            const payload  = {username : email, }
            const jwtoken = jwt.sign(payload,"Seniyr")

            // res.setHeader("Set-Cookie",`User_Session = ${jwtoken}`)

            res.cookie("User_session",jwtoken,{ maxAge: 24*1000*60*60, httpOnly:true ,secure:false})
            // httponly would restrict that cokkie cannot be accesed from javascript or in genral programaticly
            // data   = {message:"Logged in Succesfully"}

            res.redirect("/user/dashboard")
        }
        else{

            res.status(400);
            res.send({message:"USER DO NOT EXIST< KINDLY REGISTER FIRST"})
        }
    }
}


module.exports.errorhandler = async function errorhandler (err,req,res,next){

    console.log("Error handler",err);
    res.status(500);
    res.send("someerror occured")

    // incase you want client to handel
    // res.json({err: err})
}// any error occured in any of the middlewares is directly passed to final middleware which is this one


module.exports.isAuth = (req, res, next) => {
    try{
        if (req.session.passport.user) {
            next();
        }
        else{
            res.redirect('/signin')
        }
    } catch(e) {
        console.log(e);
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}

module.exports.init_session = (router) =>{
    const MongoStore = require('connect-mongo')(session);

    const sessionStore = new MongoStore({
        mongooseConnection : connection,
        collection : 'sessions'

    })

    router.use(cookieParser()); // this needs to be on top otherwise code gives bug sometimes.
    const oneDay = 1000 * 60 * 60 * 24;

    router.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        store:sessionStore, // this would use this mongo store for storing sessions
        resave: false
    })); // so basicly everything is stored in express session object and every request comes with res.session
    // everytime we visit website it just creates a cookie in both our browser and in the database which expires in 1 day.
    // if we login from diffrent computer or say delete the cookie and login again, we r new device so new cookie for us.

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    require("./Passport") // would load passport.use statergy
    router.use(passport.initialize());
    router.use(passport.session()); // passport cleverly uses the current session which passed data middleware to middleware
    // from using req.session. So basicly if for that session User was generated previously.
    //i must have been stored in session.passport.user and thus, passport will automaticly detect it and fetch  user details. and put in req.user

    router.use((req,res,next)=>{
        console.log(req.session);
        console.log(req.user);
        next(); // debug middleware
    })


}// it initialise express session. its same thing in passport config
