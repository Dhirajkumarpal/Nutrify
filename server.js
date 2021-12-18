
const express = require('express')
const  app=express();
const bodyparser=require('body-parser')
const  cookieParser = require('cookie-parser');
const shortid = require('shortid');
const session= require('express-session'); //we're using 'express-session' as 'session' here
var RedisStore = require('connect-redis')(session);  
const jwt1 = require('express-jwt');
var cors = require('cors')


app.use(cors())
const Bcrypt = require("bcrypt"); // 
var conn=require('./databasecon');
const userschema=require('./Schema/userschema.js');
const mealschema=require('./Schema/mealschema.js');
const auth=require('./auth.js');
var mealRoutes=require('./Routes/mealroutes.js')
var adminRoutes=require('./Routes/adminroutes.js')
const jwt = require("jsonwebtoken");
app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended : true}))
app.use(express.json())
app.use(express.static('public'))
const path = require("path");
const { appendFile } = require('fs/promises');
app.set("view engine", "ejs");
app.set('views','views');


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
    


//all app.uses
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
  /*app.use(
    jwt1({
      secret: 'login,signup',
      algorithms: ['HS256'] ,
      getToken: req => req.cookies.access_token
    })
  );*/
  /*const getSignedJwtToken = id => {
    return jwt.sign({id},"login,signup", {
    expiresIn: '30d'
    })
    }*/
    //console.log(getSignedJwtToken("615f1b7c5627d62a385ccad3"))


var  authmiddleware=(req,res,next)=>{

    //console.log(req.session);
    
    //console.log(req.cookie.username)
  //  token=req.cookies.token
  console.log("printing cookies")
  
  
    //console.log(token)
    const token = req.header("x-auth-token");
    console.log(token);
    
    console.log("i middleware")
    
    if (!token) {
      console.log("token is not set")
      if(req.url==='/login' || req.url==='/signup') {
        console.log("url is login,signup hence executing next()")
        return next();
     }
      // alert("user not logined");
     // console.log("need to exec alert")
       return res.json({msg:"user not logiined",code:"2"})

    }
    try {
      if(req.url==='/login' || req.url==='/signup') {
        res.json({msg:"user is already logined",code:"1"})
;
     }
     
     console.log("token exist")
     console.log("token:"+token)
     console.log("ma")
     jwt.verify(token, "login,signup",function(err,decoded){
        if(err){
          console.log("error "+err);
          
        }
        else{
          console.log("mb")
          console.log("decode")
          console.log(decoded._id);
          console.log(decoded.username);

          console.log("mc")
      //req.username = decoded.username;
      
        }
      });
      
       
      console.log(req.userId);
      console.log(req.username)
      console.log.log("before next")    
      next();
    } catch {
      res.json({msg:"error occured while logging",code:"2"})
;
    }
  
    /*if(req.session.user==undefined){
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
    }*/
  
  }
//app.use(authmiddleware);
console.log("before meals")
app.use('/meals',mealRoutes);  
app.use('/admin',adminRoutes)
app.get('/login',(req,res)=>{
  console.log("inside get login")
    res.render('login',{});
  })

app.post('/login',async (request,res)=>{
  

  console.log("username",request.body.username)
  console.log("password",request.body.password)
  console.log("inside post login")
  console.log("inside post login")
    try {
        userschema.findOne({ username: request.body.username },async(err,user)=>{
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
      //var token=getSignedJwtToken(user._id);
      //jwt.sign({id:user._id},"login,signup", {
        //expiresIn: '30d'
        //})
        console.log("a")
        var token =await jwt.sign({
          id: user._id,
          username: user.username
        }, "login,signup", { expiresIn: '1h' });
        console.log("b")
        //res.cookie('token', token)
        res.json({msg:"succesfully login",token:token,username:user.username})
        console.log("c")
      /*const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), id: user._id, username: user.username }, "login,signup"
        );
      console.log(token);
     res.cookie('access_token', token, {
        maxAge: 60*60*24*30*1000, //30 days
            secure: false,
        httpOnly: false
      })*/
      
      //res.json({ message: "Logged in successfully 😊 👌" ,code:"1",token:token});
       console.log("D")
     /*res.cookie("access_token", token, {
        httpOnly: true,
        secure: true
      })
      .status(200)
      console.log(res)

      res.json({ message: "Logged in successfully 😊 👌" ,code:"1"});
      */
     // console.log("redirecting to home")
      //response.json({msg:"login succedssfull",code:"1"});

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
   


 
    
    app.get("/tokenIsValid", async (req, res) => {
    
try{
const token = req.header("x-auth-token");
console.log(token)
console.log("A")
if(!token){
    console.log("B")

return res.status(401).json({msg: "No authentication token, access denied",authentication:false});
}
console.log("C")

const verified = jwt.verify(token, "login,signup");
console.log("D")

console.log("verified : ",verified)
if(!verified){
    console.log("not verified")
return res.status(401).json({msg: "Token verification failed, authorization denied",authentication:false});
}
console.log("after verification")
//req.userid = verified.id;
//req.username=verified.username;

next();
} catch (err) {
    console.log("E")

res.json({ error: err.message,authentication:false });
} });
  app.get("/currentuserinfo",async (req, res) => {
      const user = await userschema.findById(req.user);
      res.json({
      username: user.username,
      
      });
      });


app.get('/logout',(request,res)=>{
  localStorage.setItem("x-auth-token",undefined);
  localStorage.setItem("username",undefined);
  
  return res
  
  .json({ message: "Successfully logged out 😏 🍀" ,code:"2"});
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


