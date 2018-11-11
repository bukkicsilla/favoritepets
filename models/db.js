var mongoose = require('mongoose');
    
var dbURI = 'mongodb://lunasaturni:vorce166@ds159273.mlab.com:59273/petmlab'
mongoose.connect(dbURI);

require('./favorpet');