var mongoose = require('mongoose');
var Pet = mongoose.model('Favoritepet');

module.exports.allPets = function(req, res){
    Pet.find({}, function(err, docs){
        if (!err){
           res.status(200);
           res.json(docs); 
        } else {throw err;}
    });
}

module.exports.getPet = function(req, res){
    console.log("id ", req.params.favoritepetid);
       if (req.params && req.params.favoritepetid){
         Pet.findById(req.params.favoritepetid)
              .exec(function(err, pet){
           if (!pet){
              res.status(404);
              res.json("id not found");
              return;
           } else if(err){
              res.status(404);
              res.json(err);
              return;
           }
         res.status(200);
         res.json(pet);
       });
       } else {
         res.status(404);
         res.json("no id in request");
    }
}