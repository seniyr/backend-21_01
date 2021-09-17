const express   =require('express')
const router = express.Router();
const path = require('path')


router.use(express.static( path.join( __dirname ,"../client/build" )));

router.get("/react",(req,res)=>{
    res.send("Hey we got it");
})

router.get("/app",(req,res)=>{
    res.sendFile("/client/build/index.html" , {root:path.join(__dirname,"../")});
})

module.exports = router;