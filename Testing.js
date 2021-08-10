
const connection = require('./database/scripts/mongo_init')
const express = require('express')
const app = express();



app.get('/', async (req,res)=>{
//   const data = await db.collection('users').find({}).toArray()  
  
   console.log(db)
})


app.listen(5000,(err)=>{
    if(err){
        throw err;
    }
    console.log('started listing on port 5000')
});








