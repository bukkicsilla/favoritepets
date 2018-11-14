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
        age: req.body.age,
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

module.exports.updatePet = function(req, res){
        if(!req.params.favoritepetid){
          res.status(404);
          res.json({"message": "id not found, it is required"});    
          return;
        }
        Pet.findById(req.params.favoritepetid)
        .select('-name')
        .exec(
          function(err, pet){
            if(!pet){
              res.status(404);
              res.json({"message":"pet is not found"});
              return;
            } else if (err) {
              res.status(400);
              res.json(err);
              return;
            }
            pet.age = req.body.age;
            pet.descs = [];
            pet.descs = pet.descs.concat(req.body.descs);
            pet.save(function(err,  pet){
              if (err){
                res.status(404);
                res.json(err);
              } else {
                res.status(200);
                res.json(pet);
              }   
            });
          });
      }
      