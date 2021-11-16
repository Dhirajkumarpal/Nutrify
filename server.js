
const express = require('express')
const  app=express();
const bodyparser=require('body-parser')
const  cookieParser = require('cookie-parser');
const shortid = require('shortid');
const session= require('express-session'); //we're using 'express-session' as 'session' here
var RedisStore = require('connect-redis')(session);  

const Bcrypt = require("bcrypt"); // 
var conn=require('./databasecon');
const userschema=require('./Schema/userschema.js');
const mealschema=require('./Schema/mealschema.js');

var mealRoutes=require('./Routes/mealroutes.js')
var adminRoutes=require('./Routes/adminroutes.js')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
    


//all app.uses
app.use(bodyparser.urlencoded({ extended : true}))
app.use(express.json())
app.use(express.static('public'))
const path = require("path");
app.set("view engine", "ejs");
app.set('views','views');
/*app.use(session({

  store: new RedisStore({
    url: process.env.REDIS_URL
  }),
  secret: process.env.REDISSECRET,
  //resave: false,
  //saveUninitialized: false

  // secret: 'hello world',
   resave: true,
  saveUninitialized: true
  }))
  */
/*var  authmiddleware=(req,res,next)=>{

    console.log(req.session);
    if(req.session.user==undefined){
      console.log("sessionnot set redirecting to login")
      
      if(req.url==='/login' || req.url==='/signup') {
        next();
     }
     else{
       res.json({msg:"please login or sign up",code:"0"})
     }
    }
    else{
      if(req.url==='/login' || req.url==='/signup') {
        res.json({msg:"Already logged in ",code:"1"})
     }
     next();
    }
  
  }
app.use(authmiddleware);
 */
app.use('/meals',mealRoutes);  
app.use('/admin',adminRoutes)
app.get('/login',(req,res)=>{
  console.log("inside get login")
    res.render('login',{});
  })

app.post('/login', (request,response)=>{
  

  console.log("username",request.body.username)
  console.log("password",request.body.password)
  console.log("inside post login")
  console.log("inside post login")
    try {
        userschema.findOne({ username: request.body.username },(err,user)=>{
        if(!user) {

           console.log('user name incorrect')
           response.json({msg:"username incorrect.please login again",code:"0"})
           //response.redirect('/login');
           //response.redirect('http://localhost:3000')
        }
        else{
        if(!Bcrypt.compareSync(request.body.password, user.hash_password)) {
          console.log('password incorrect')
          response.json({msg:"password incorrect.please login again",code:"0"});

           

      }
      else{
  /*    request.session.user = {
        username: request.body.username,
  password: request.body.password,

  
}*/// saving some user's data into user's session
      
      console.log({ message: "The username and password combination is correct!" });
      /*if(request.body.username==="Admin"){
          response.redirect('/admin/users')
      }*/
      //else{
      //response.redirect('/')
      console.log("redirecting to home")
      response.json({msg:"login succedssfull",code:"1"});

      //}
}
        }
})}catch(error) {
        response.status(500).send(error);
    }



        
})

app.get('/signup',(req,res)=>{
  console.log("inside get sign up");
    res.render('signup',{});
  })
    
  app.post('/signup', async(request,response)=>{

    console.log(request.body)
    console.log("inside postsign up")
      
      try {
          var usera =await userschema.findOne({ username: request.body.username }).exec();
          console.log(user)
          if(!usera) {
            console.log("trying to add user to d")
            try
            {
              
              var user = new userschema({
                username:request.body.username,
                firstName:request.body.firstname,
                lastName:request.body.lastname,
                calories_per_day:request.body.calorie,
                emailid:request.body.email,
                phone:request.body.phoneno,


                hash_password:Bcrypt.hashSync(request.body.password, 10)
              });
              console.log("before save method")
              var result = await user.save();
              console.log("printing the result")
              console.log(result);
              response.json({msg:"signed up now login",code:"1"})
              console.log("the user is saved")
          }catch (error) {
            console.log("inside catch",error)
               
              response.status(500).send(error);
          }
          }
          else{
            
            console.log("142 the user already exist");
            response.json({msg:"user already exist try new user",code:"3"})
          }
          
          } catch (error) {
          response.status(500).send(error);
      }
    
    })
   
app.get('/logout',(request,response)=>{
        request.session.user=undefined;
        console.log("logging out");
        response.redirect('/login');
   });
       
app.get('/',(req,res)=>{
  console.log("got the request")
    // res.render('Home')
    //res.send("hi the the home page")
})

app.post('/',(req,res)=>{
    console.log(req.body);
    res.json({name:req.body.name});
})

//listening for request at port
const PORT=5000;
app.listen(PORT,function(){
    console.log("listening...... on port 5000");
})    


