function dbconnect(){
    const mongoose = require('mongoose');

mongoose.set('strictQuery',false);
mongoose.connect('mongodb://localhost/comment', {useNewUrlParser: true,useUnifiedTopology:true});

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("we are connected"); 
}); 
}

module.exports=dbconnect