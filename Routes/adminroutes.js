var express=require('express')
var router=express.Router();
var conn=require('../databasecon');
var mealschema=require('../Schema/mealschema.js')
var userschema=require('../Schema/userschema.js')
var auth=require('../auth.js')



router.get('/users',auth,(req,res)=>{
    console.log("inside get users ")
    console.log(req.session)
   // console.log(session)
    userschema.find({},(err,result)=>{
        console.log("getting the meals");
        console.log(result)
       /*console.log(resp);*/
       // res.render('userlist',{userlist:result});
       res.json({users:result});
    });
    
    

})


router.get('/get_meals_of_a_user/:username',auth,(req,res)=>{
    console.log("inside edit get of admin user")
    var uname=req.params.username;
    
    console.log(uname);
    mealschema.find({username:uname},(err,result)=>{
    
        console.log(result);
        res.json({meals:result});
    });
    
    console.log("exiting edit  of user")
})

router.get('/user/edit/:id',auth,(req,res)=>{
    console.log("inside edit get of admin user")
    var id=req.params.id;
    userschema.findOne({_id:id},(err,result)=>{
    
        console.log(result);
        //res.render('useredit',{user:result});
        res.json({user:result});
    });
    
    console.log("exiting edit  of user")
})

router.post('/user/edit/:id',auth,(req,res)=>{
    var id=req.params.id;

console.log("inside post method of edit");

userschema.findByIdAndUpdate({_id:id},req.body,(err,result)=>{
    
        console.log("printing updated"+result);
       // res.redirect('/admin/users/');
       res.json({msg:"user updated successfully" ,code:"1"})
        
    });
    

})



router.get('/user/delete/:id',auth,(req,res)=>{
    var id=req.params.id;
    console.log("inside get delete method of user")
    userschema.deleteOne({_id:id},(err,result)=>{
        console.log("printing deleted student");
        console.log(result);
        //res.redirect('/admin/users/'); 
        res.json({msg:"user deleted successfully" ,code:"1"})
             
    
        })

        
 })

module.exports= router;