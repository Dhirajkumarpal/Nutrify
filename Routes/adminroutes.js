var express=require('express')
var router=express.Router();
var conn=require('../databasecon');
var mealschema=require('../Schema/mealschema.js')
var userschema=require('../Schema/userschema.js')




router.get('/users',(req,res)=>{
    console.log("inside get users ")
    console.log(req.session)
   // console.log(session)
    userschema.find({},(err,result)=>{
        console.log("getting the meals");
        console.log(result)
       /*console.log(resp);*/
        res.render('userlist',{userlist:result});
    });
    
    

})


router.get('/get_meals_of_a_user/:username',(req,res)=>{
    console.log("inside edit get of admin user")
    var uname=req.params.username;
    uname=uname.substring(1);
    console.log(uname);
    mealschema.find({username:uname},(err,result)=>{
    
        console.log(result);
        res.send(result)
    });
    
    console.log("exiting edit  of user")
})

router.get('/user/edit/:id',(req,res)=>{
    console.log("inside edit get of admin user")
    var id=req.params.id;
    userschema.findOne({_id:id},(err,result)=>{
    
        console.log(result);
        res.render('useredit',{user:result});
    });
    
    console.log("exiting edit  of user")
})

router.post('/user/edit/:id',(req,res)=>{
    var id=req.params.id;

console.log("inside post method of edit");

userschema.findByIdAndUpdate({_id:id},req.body,(err,result)=>{
    
        console.log("printing updated"+result);
        res.redirect('/admin/users/');
        
    });
    

})



router.get('/user/delete/:id',(req,res)=>{
    var id=req.params.id;
    console.log("inside get delete method of user")
    userschema.deleteOne({_id:id},(err,result)=>{
        console.log("printing deleted student");
        console.log(result);
        res.redirect('/admin/users/');   
    
        })

        
 })

module.exports= router;