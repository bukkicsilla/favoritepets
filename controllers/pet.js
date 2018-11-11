module.exports.getPets = function(req, res){
    res.render('index', {title: 'Do you have favorite pets?'});
};