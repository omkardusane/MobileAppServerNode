var express= require('express');
var api = new express();
var dbconn = require('./core/db');
var db = new dbconn();
var bodyparser    = require('body-parser');
var morgan    = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
api.use(morgan('dev'));
api.use(bodyparser.urlencoded({ extended: false }));
api.use('/things',require('./stuff/things'));

api.post("/signUp",function(req,res){
   // req : email mobile name password
    if(!req.body){
        res.json({err:'error parsing body'});
        return;
    }
    var list = ['un','name','pw'];
    var invalid =[];
    let data ={};
    list.forEach(function(t){
        if(!req.body[t]){
            invalid.push(t);
        }
        else{
            data[t] = req.body[t];
        }
    });
    if(invalid.length==0){
        var newUser = true ;
           db.users.find({un:data.un},{}).toArray(function(e,doc){
               if(doc.length==0){
                    db.users.insert(data).then(function(e,doc){
                        res.json({un:data.un,success:true,message:'you are registered'});
                    });
                }
                else{
                    newUser =false;
                    res.json({un:data.un,success:false,message:'you are already registered , '});
                }
            });
    }
    else{
        res.json({success:false,message:'missing params',missing:invalid});
    }

});

api.get('/',(req,res)=>{
    res.send('Here you are , welcome');
});

api.get('/sample',function(req,res){
    console.log('im here');
    res.send("hello you good person");
});


api.post("/signIn",function(req,res){
    if(!req.body){
        res.json({err:'error'});
        return;
    }
    var un = req.body.un ;
    var pw = req.body.pw;

    if(!!un && !!pw){
    db.users.findOne({un:un,pw:pw},{_id:0},function(err,doc){
            if (doc==null){
                var ret ={};
                ret.success = false;
                ret.message = 'invalid credentials';
                res.json(ret) ;
                }
                else
                {
                var ret ={};
                ret.success = true;
                /* ret.token = jwt.sign(doc, db.secret , {
                 expiresIn: 36000 // expires in 24 hours
                });  */
                ret.name = doc.name ;
                res.json(ret) ;
            }
        });
    }else{
      res.json({success:false,message:'missing params'});   
    }
});



api.listen(1337,function(){
    console.log('running on 1337 or 8 ');
});