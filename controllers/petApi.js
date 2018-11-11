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

module.exports.createPet = function(req, res){
      Pet.create({
        name: req.body.name,
        descs: req.body.descs
      }, function(err, pet){
        if(err){
          res.status(400);
          res.json(err);
        } else {
          res.status(201);
          res.json(pet);
        }
      });
    }

module.exports.deletePet = function(req, res){
        var partid = req.params.favoritepetid;
        if (partid){
          Pet.findByIdAndRemove(partid)
            .exec(
              function(err, pet){
                if(err){
                  res.status(404);
                  res.json(err);
                  return;
                }
                res.status(204);
                res.json(null);
            });
        } else {
          res.status(404);
          res.json({"message":"no id"});
        } 
      } 