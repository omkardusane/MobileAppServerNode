var config = require('./config');
var mongoose = require('mongoose');
var mrl =  config.mrl; 
var db ;

mongoose.connect(mrl);
db = mongoose.connection ;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('db connection established');
});

function dbFoo(){
    console.log("glowing_ops: Db");
};
dbFoo.prototype.users = db.collection('users');
module.exports = dbFoo ;
