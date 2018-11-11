module.exports.getPets = function(req, res){
    res.render('pets', {title: 'Do you have favorite pets?',
             pets: [{
                name: 'Donut'
                },
                {
                name: 'Moomoo'
                }
               ]              
    });
};

module.exports.getPet = function(req, res){
    res.render('pet', {title: 'Favorite pet.',
    pet:                   
            { 
              name: 'Donut',
              desc: [
                'Tabby cat', '2 years old', 
                'Hunting'
                ]
              }          
    });
};
        