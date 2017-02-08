var express= require('express');
var router = express.Router() ;

var dbconn = require('../core/db');
var db = new dbconn();


router.get("/do",function(req,res){
    res.json({ok:true,message:'yo'});
});

module.exports = router ;
