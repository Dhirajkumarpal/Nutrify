var express=require('express')
var router=express.Router();
var conn=require('../databasecon');
var mealschema=require('../Schema/mealschema.js')
var userschema=require('../Schema/userschema.js')

router.get('/',(req,res)=>{
    console.log("inside get meals ")
    console.log(req.session)
   // console.log(session)
    mealschema.find({},(req1,resp)=>{
        console.log("getting the meals");
        console.log(resp)
       /*console.log(resp);*/
        res.render('mealList',{meals:resp});
    });
    
    

})



router.get('/create',(req,res)=>{
    console.log("inside get create")    
        res.render('Createmeal',{});
    });
    
    




router.post('/',(req,res)=>{
    console.log("inside  post of meals")
    console.log("inside post method")
    
    var newmeal=new mealschema({
        

            "food_name": req.body.food_name,
            "calorie": req.body.calorie,
            "description": req.body.description,
            "username": req.session.user.username,
            "datetime": req.body.datetime,
            
        
    })
    newmeal.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log('saving  successfull')
            console.log(result)
            

        }
    })
        

    
    
    //console.log(obj[0].class)
    //obj[0].Nostudent=obj[0].Nostudent+1
    res.redirect('/meals/');
    
    


})

router.get('/edit/:id',async (req,res)=>{
    console.log("inside edit get of meals")
    var id=req.params.id;
    console.log(req.session)
    console.log(typeof req.session)
    console.log(req.session.user["username"])
    var username=req.session.user["username"]

 
   
   try{
       await mealschema.findOne({_id:id},(err,resp)=>{
        console.log("hi printing err and resp")
        console.log(err)
        console.log(typeof resp);
        console.log(resp)
        console.log(resp)

        /*if(resp.username===username){
            console.log("both usernames are equal")
        
            console.log("before rendering");
            res.render('mealedit',{meal:resp});
            console.log("after render");
           
        }
        else{
            console.log('cant delete as meal does not belong to this user')
            res.redirect('/meals/');
        }*/
        console.log("before rendering");
        res.render('mealedit',{meal:resp});
        console.log("after render1");

    });
}
catch(error){
    res.send(error);
}

    
    console.log("after render2")
    return;

});


router.post('/edit/:id',(req,res)=>{
    console.log("inside edit post m of meals")
    var id=req.params.id;
    console.log(id);
    /*
    var newstud=new studentschema({
        

        "firstname": req.body.firstname,
        "middlename": req.body.middlename,
        "lastname": req.body.lastname,
        "age": req.body.age,
        "class": req.body.class,
        "address": req.body.address,
        "mothername": req.body.mothername,
        "fathername": req.body.fathername
        
    
})
*/
console.log("printing new meal")
 
var newmeal=new mealschema({
        
     "_id":id,
    "food_name": req.body.food_name,
    "calorie": req.body.calorie,
    "description": req.body.description,
    "username": req.session.user.username,
    "datetime": req.body.datetime,
    

})

    var students1=mealschema.findByIdAndUpdate({_id:id},newmeal,(reqp,resp)=>{
        
        console.log("printing resp"+resp);
        res.redirect('/meals/');
        
    });
    

})



router.get('/delete/:id',(req,res)=>{
    console.log("inside delete post of meals")
    var id=req.params.id;
    console.log("printing id:"+id)
    mealschema.findById({_id:id},(err,resp)=>{
    console.log("foudn elemnt with id")
    console.log(resp)
        if(resp.username==req.session.user.username){
         console.log("the usernme are equals")
        mealschema.deleteOne({_id:id},(req1,res1)=>{
            console.log("printing deleted student");
            console.log(res1);
            

            res.redirect('/meals/');
        })
     }
        else{
            console.log("cannot delete as it belongsd to different user ")
            res.redirect('/meals/');
        }
    }
      );
 })
 
    



 var sortBy = (function () {
    var toString = Object.prototype.toString,
        // default parser function
        parse = function (x) { return x; },
        // gets the item to be sorted
        getItem = function (x) {
          var isObject = x != null && typeof x === "object";
          var isProp = isObject && this.prop in x;
          return this.parser(isProp ? x[this.prop] : x);
        };
        
    /**
     * Sorts an array of elements.
     *
     * @param {Array} array: the collection to sort
     * @param {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortby (array, cfg) {
      if (!(array instanceof Array && array.length)) return [];
      if (toString.call(cfg) !== "[object Object]") cfg = {};
      if (typeof cfg.parser !== "function") cfg.parser = parse;
      cfg.desc = !!cfg.desc ? -1 : 1;
      return array.sort(function (a, b) {
        a = getItem.call(cfg, a);
        b = getItem.call(cfg, b);
        return cfg.desc * (a < b ? -1 : +(a > b));
      });
    };
    
  }());
  

 router.get('/usermeal',(req,res)=>{
    console.log("inside get methods of  meals of a user")
    var currdate=new Date();
    console.log("printing current date",currdate);
    console.log(req.session)
    var dt="2021-07-30T00:00:00.000Z";
   // console.log(session)
    mealschema.find({username:req.session.user.username,datetime:{$lt:dt}},(err,result)=>{
        console.log("getting the meals of user");
        console.log(result)
        var t_calorie=0
        result.forEach((e) => {
              t_calorie=t_calorie+e.calorie;
        });

        userschema.findOne({username:req.session.user.username},(err,result1)=>{
            if(t_calorie>result1.calories_per_day){
                console.log("limit excedded")
            }
            else{
                console.log("limit not excedded")
            }
        })
        
        
        /*sortBy(result, {
            prop: "datetime",
            desc:true,
            parser: function (item) {
                return new Date(item);
            }
        });
        */
        result.sort((a, b) => {
            return a.calorie - b.calorie;
        });
    

        console.log("after sorting by date",result)
        

       /*console.log(resp);*/
        res.send(result);
    });
    
    

})



/*
router.post('/',(req,res)=>{
    var students=studentschema.find( function (err, docs) {
        console.log("got the result "+res);
        
    });
  
    res.send(student);
})
*/
/*router.get('/userone',(req,res)=>{
    res.send(users[0]);
})

router.get('/usertwo',(req,res)=>{
    res.send(users[1]);
})
*/

module.exports= router;