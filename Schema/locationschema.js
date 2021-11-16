

var mongoose=require('mongoose');

const locationSchema = new mongoose.Schema({
    "_id": { type : String }, // Date and time when the meal was consumed.
    "city": { type : String}, // Name of food.
    "loc": { type : Array }, // Calorie contained in the food.
    "pop": { type : Number},
    "state": { type : String}
 // Unique Id for the entry, this could be the object ID (_id field) of mongoDB
     // User for which the entry is added.});
},{collection: 'location'})

module.exports = mongoose.model('locationschema',locationSchema);





