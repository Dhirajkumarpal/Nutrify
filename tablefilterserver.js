
const express = require('express')
const  app=express();
const bodyparser=require('body-parser')
const  cookieParser = require('cookie-parser');
const shortid = require('shortid');
const session= require('express-session'); //we're using 'express-session' as 'session' here
const Bcrypt = require("bcrypt"); // 
var conn=require('./databasecon');
const locationschema=require('./Schema/locationschema.js');
var locationRoutes=require('./Routes/locationroutes.js')

    


//all app.uses
app.use('/loc',locationRoutes);
app.use(bodyparser.urlencoded({ extended : true}))
app.use(express.json())
app.use(express.static('public'))
const path = require("path");
app.set("view engine", "ejs");
app.set('views','views');
app.use(session({

    secret: 'hello world',
    resave: true,
    saveUninitialized: true
  }))
  
app.get('/',(req,res)=>{
     res.render('Home')
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


