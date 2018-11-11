var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

/*var petSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true},
    meaning: {type: String},
    descs: [descSchema]
});
    
var descSchema = new mongoose.Schema({
    desc: {type: String}
});
*/

var Desc = new Schema({
    desc: {type: String}
});

var Pet = new Schema({
    name: { type: String, unique: true, required: true},
    descs: [Desc]
});

mongoose.model('favoritepet', Pet);