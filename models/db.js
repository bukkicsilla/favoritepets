var mongoose = require('mongoose');
    
var dbURI = 'mongodb://lunasaturni:vorce166@ds159273.mlab.com:59273/petmlab'
if (process.env.NODE_ENV === 'production'){
      dbURI = process.env.MONGODB_URI;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
    console.log('Moongose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err){
    console.log('Moongose connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Moongose disconnected');
});
// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

require('./favorpet');