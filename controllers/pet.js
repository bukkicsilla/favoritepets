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
//import createHistory from 'history/createBrowserHistory'
//var createHistory = require('history').createBrowserHistory
//console.log('history', createHistory);
//var history = createHistory();

//const createBrowserHistory = require('history/createBrowserHistory').default
//var history = createBrowserHistory();
const Window = require('window');
 
const window = new Window();
//console.log("window history*** ", window.history);

var request = require('request');
var apiOps = {
    server : "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    //apiOps.server = "https://gentle-forest-13499.herokuapp.com";
    apiOps.server = "https://favoritepets.herokuapp.com/";
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
          title : 'Favorite pets',
            pets: body,
            message: msg
          });
        })
    }

module.exports.getPet = function(req,res){
    console.log("len ", window.history.length);
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
              return res.redirect('/pets');
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
                  console.log("length ", window.history.length);
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

module.exports.formUpdateDescription = function(req, res){
        var requestOps, path;
        path = "/api/favoritepets/" + req.params.favoritepetid;
        requestOps = {
          url: apiOps.server + path,
          method: "GET",
          json: {}
        };
        request(requestOps, 
          function(err, response, body){
            var desclist = "";
            var l = body.descs.length;
            var i;
            if (l > 0){
              for (i = 0; i < l-1; i++){
                desclist += body.descs[i].desc + ', '
              }
              desclist += body.descs[l-1].desc;
            }
            //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');//
            res.render('updatedescription', {
              title: 'Update  Description',
              error: req.query.err,
              favorpet: body,
              pet:{
                name: body.name,
                descs: desclist
              }
            });
          });
      };

module.exports.updateDescription = function(req, res){
        var requestOps, path, petid, postdata;
        petid = req.params.favoritepetid;
        path = "/api/favoritepets/" + req.params.favoritepetid + "/description";
        var desclist = req.body.formdesc.split(",");
        var descdict = [];
        if(desclist[0]!== "") {
          var l = desclist.length;
          var i;
          for (i = 0; i < l; i++){
            descdict.push({
              "desc": desclist[i]
            });
          }
        }
        postdata = {
          descs: descdict
        };
        requestOps = {
          url : apiOps.server + path,
          method: "PUT",
          json : postdata
        };
        if (!postdata.descs) {
          res.redirect('/updatedescription/'+petid);
        }
        else {
          request( requestOps, function(err, response, body) {
            if (response.statusCode === 200) {
                //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                res.redirect(302, '/pet/'+petid);
                //res.redirect('back');
                //res.redirect('/pets');
            } else if (response.statusCode === 400 && body.formdescs && body.formdescs === "ValidationError" ) {
              res.redirect('/updatedescription/' + petid);
            } else {
              res.status(response.statusCode);
              res.render('error', {
                message: "field is empty",
                petid: petid,
                error: {
                  status: response.statusCode,
                  stack: 'go back to pet'
                }
              });
            }
          }
         );
        } //else 
      }