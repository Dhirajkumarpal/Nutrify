var mongoose=require('mongoose');

const usersSchema = new mongoose.Schema({
    username : { type : String, required : true },
    firstName:{ type : String, required : true },
   lastName:{ type : String, required : true },
   
   calories_per_day:{ type : Number, required : true }, // Maximum calorie per day as set by user.
   phone:{ type : String, required : true },
   emailid:{ type : String, required : true },
   
    hash_password : { type : String, required : true },
    });


module.exports = mongoose.model('usersschema', usersSchema);
