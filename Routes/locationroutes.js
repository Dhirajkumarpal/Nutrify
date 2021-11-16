var express=require('express')
var router=express.Router();
var conn=require('../databasecon');
var location=require('../Schema/locationschema.js')
function compareid(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a._id.toUpperCase();
    const bandB = b._id.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  function comparecity(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.city.toUpperCase();
    const bandB = b.city.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  function comparepop(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.pop;
    const bandB = b.pop;
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  function comparestate(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.state.toUpperCase();
    const bandB = b.state.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  

  function compareiddec(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a._id.toUpperCase();
    const bandB = b._id.toUpperCase();
  
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  function comparecitydec(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.city.toUpperCase();
    const bandB = b.city.toUpperCase();
  
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  function comparepopdec(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.pop;
    const bandB = b.pop;
  
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }

  
  function comparestatedec(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.state.toUpperCase();
    const bandB = b.state.toUpperCase();
  
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }
  

  
  

router.get('/:page',(req,res)=>{
    perPage = 8
    var page = req.params.page || 1 ;
    console.log(page);
    location
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, locs) {
            location.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('locationlist', {
                    locs: locs,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    })
    
router.get('/sort/:ind/:field/:currpage',(req,res)=>{
            perPage = 8
            var field=req.params.field;
            var ind=req.params.ind;
            var page = req.params.currpage || 1
            console.log(page)
            location
                .find({})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(function(err, locs) {
                    if(ind==0){
                    if(field=="_id"){
                        locs.sort(compareid);
                    }
                    else if(field=="city"){
                        locs.sort(comparecity);
                    }
                    else if(field=="pop"){
                        locs.sort(comparepop);
                    }
                    else if(field=="state"){
                        locs.sort(comparestate);
                    }
                }
                else if(ind==1){
                    if(field=="_id"){
                        locs.sort(compareiddec);
                    }
                    else if(field=="city"){
                        locs.sort(comparecitydec);
                    }
                    else if(field=="pop"){
                        locs.sort(comparepopdec);
                    }
                    else if(field=="state"){
                        locs.sort(comparestatedec);
                    }
                }
                    
                    
                    
                    
                    location.count().exec(function(err, count) {
                        if (err) return next(err)
                        res.render('locationlist', {
                            locs: locs,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    })
                })
            })
        
    





    
    




module.exports= router;