/* PROBLEM STATEMENT

Create a POST API "/" using express server which:
- Accepts { name : "xyz"} as input and save to namesdb
- Returns "namesdb" object as response.

Create a GET API "/:name" using express server which : 
- Accepts a name (string) as input
- Returns "1" if the name is present in "namesdb" object , otherwise it returns "0" if the name is not present in "namesdb" object

NOTE :
- Do not implement "app.listen" function 
*/

// DO NOT EDIT THE FOLLOWING LINE
const express = require("express");
const bodyParser = require("body-parser");
var namesdb = [] // store names here
// ENTER YOUR CODE BELOW THIS LINE
const app=express();
app.use(express.json())
//app.use(bodyParser.urlencoded({ extended : true}))
app.post('/',(req,res)=>{
    console.log("inside post")
     namesdb.push(req.body.name)
     res.send(namesdb)
    // return(namesdb)
})

app.get('/:name',(req,res)=>{

  console.log("inside get")
  var name1=req.params.name;
  if(namesdb.includes(name1)){
      res.send("1")
    //return("1");
  }
  else{
      res.send("0")
    //return("0");
  }
})







// ENTER YOUR CODE ABOVE THIS LINE



app.listen(3000, () => console.log("server starting on port 3000!"));

// DO NOT EDIT THE FOLLOWING LINE
