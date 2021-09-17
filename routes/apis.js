const express   =require('express')
const router = express.Router();

const path = require('path')
const connection = require('../database/scripts/mongo_init')

const Que = connection.models.Quetionarre;

router.get("/quetions/:formname/description" , (req,res)=>{

        console.log(req.params.formname);
    Que.findOne({name : req.params.formname}).then((result)=>{
        console.log(result);
        res.send({name : result.name , number: result.number , about : result.description })
    }).catch((e)=>{
        console.log(e);
        res.send("Not found!");
    })

})

router.get("/quetions/createdemo/:nametocreate",(req,res)=>{
    console.log(req.params.nametocreate);
// this is a sample quetionare
new Que({
    name : req.params.nametocreate,
    quetions : [{index : 0 , type  :"text" , value : "this is testing quetions" , options : ["option1", "option2","option3","option4"]},
                {index : 1 ,type :"number" , value  :"Choose a number from options" ,options: [1,2,3,4]}],
    number : 2,
    description : "this is a demo form,please dont do anything about it"

}).save().then((saved) => {
    res.send(saved);
}).catch((e)=>{
    console.log(e);
    res.send("Some errro occured");
});

});


router.post('/quetions/submit', (req,res)=>{
Que.save(req.submit).then((submission)=>{
    res.send(`Succefully submitted \n${submission}`)
}).catch((e)=>{
    console.log(e)
    res.status(400);

});
}) 

router.get("/quetions/:formname/fetch:id" , async (req,res)=>{

    await Que.findOne({name  : req.params.formname , "quetions.index" : req.params.id})
 
    .then((result)=>{
        res.send(result.quetions[req.params.id]);
        console.log(result);
       

    }).catch((e)=>{
        console.log(e);
        res.send("some error occured");
    })

})


module.exports  =  router; 