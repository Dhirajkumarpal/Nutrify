
var mongoose=require('mongoose');

const mealSchemas = new mongoose.Schema({
    datetime: { type : Date, required : true }, // Date and time when the meal was consumed.
    food_name: { type : String, required : true }, // Name of food.
    calorie: { type : Number, required : true }, // Calorie contained in the food.
    description: { type : String, required : true },
 // Unique Id for the entry, this could be the object ID (_id field) of mongoDB
    username:  { type : String, required : true } // User for which the entry is added.});
})

module.exports = mongoose.model('mealschemas',mealSchemas);




