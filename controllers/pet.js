/*module.exports.getPets = function(req, res){
    res.render('pets', {title: 'Do you have favorite pets?',
             pets: [{
                name: 'Donut'
                },
                {
                name: 'Moomoo'
                }
               ]              
    });
};*/

/*module.exports.getPet = function(req, res){
    res.render('pet', {title: 'Favorite pet.',
    pet:                   
            { 
              name: 'Donut',
              descs: [
                'Tabby cat', '2 years old', 
                'Hunting'
                ]
              }          
    });
};*/
   
var request = require('request');
var apiOps = {
    server : "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOps.server = "https://gentle-forest-13499.herokuapp.com";
}

module.exports.getPets = function(req, res){
      var requestOps, path;
      path = '/api/favoritepets';
      requestOps = {
        url: apiOps.server + path,
        method:"GET",
        json: {},
        qs: {}
      };
      request(requestOps, function(err, response, body){
        var msg;
        if (!(body instanceof Array)){
          msg = "api lookup error";
          body = [];
        } else {
          if(!body.length){
            msg = "no pet found";
          }
        }//else
        //rendering
        res.render('pets', {
          title : 'Do you have favorite pets?',
            pets: body,
            message: msg
          });
        })
    }

module.exports.getPet = function(req,res){
      var requestOps, path;
      path = "/api/favoritepets/" + req.params.favoritepetid;
    
      requestOps = {
        url: apiOps.server + path,
        method: "GET",
        json: {}
      };
      request(requestOps, 
        function(err, response, body){
          if (response.statusCode === 200){
            res.render('pet', {
              title: 'Favorite pet',
              favorpet: body,
              pet: {
                name: body.name,
                descs: body.descs
              }
                });
          } else  {
            if (response.statusCode === 404){
              title = "404, page not found";
            } else {
              title = response.statusCode + ", sorry";
            }
                
            res.status(response.statusCode);
            res.render('error', {
              title: title,
              message: "Try with different id, page not found",
              error: {
                status: response.statusCode,
                stack: 'go back to pet list'
              }
            });   
          }//else
        });//function
    }

module.exports.formCreatePet = function(req, res){
      res.render('createpet', {
        title: 'Create a Pet',
        error: req.query.err
      });
    }

module.exports.createPet = function(req, res){
      var requestOps, path, postdata;
      path = '/api/favoritepets';
      var desclist = req.body.formdesc.split(",");
      var descdict = [];
      if (desclist[0] !== ""){
        var l = desclist.length;
        var i;
        for (i = 0; i <l; i++){
          descdict.push({ "desc": desclist[i] });
        }
      }
      postdata = {
        name: req.body.formname,    
        descs: descdict
      };
      
      requestOps = {
        url : apiOps.server + path,
        method : "POST",
        json : postdata
      };
      if (!postdata.name) {
        res.redirect('/createpet/');
      } else {
        request(
          requestOps, function(err, response, body) {
            if (response.statusCode === 201) {
              res.redirect('/pets');
            } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
              res.redirect('/createpet/');
            } else {
              res.status(response.statusCode);
              res.render('error', {
                message: "The name must be unique!",
                error: {
                  status: response.statusCode,
                  stack: 'go back to the form'
                }
              });
            }
          }
        );
      }     
   }

      
module.exports.deletePet = function(req, res){
        var requestOps, path;
        path = "/api/favoritepets/" + req.params.favoritepetid;
          requestOps = {
            url: apiOps.server + path,
            method: "DELETE",
            json: {}
          };
          request(requestOps, 
            function(err, response, body){
              if (response.statusCode === 204){
                 res.redirect('/pets');
              } else  {
                 if (response.statusCode === 404){
                   title = "404, page not found";
                 } else {
                   title = response.statusCode + ", sorry";
                 }
                res.status(response.statusCode);
                res.render('error', {
                  title: title,
                  message: "Try with different id, page not found",
                  error: {
                    status: response.statusCode,
                    stack: 'go back to pet list'
                  }
                });    
              }//else
            }
          );
      } 