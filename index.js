const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const { type } = require('os');//auto imported
const bcrypt=require('bcrypt');
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

var signed=false;
const isSigned=(req,res,next)=>{
    if(signed){
        next()
    }
    else{
        res.redirect('/');
    }
}
const isNotSigned=(req,res,next)=>{
    if(!signed){
        next()
    }
    else{
        res.redirect('/redirected');
    }
}

var data=fs.readFileSync('user_info.json');
data=JSON.parse(data) 
var data_keys=Object.keys(data)

app.get('/',isNotSigned,(req,res)=>{
    res.render('home');
});
app.get('/signup',isNotSigned,(req,res)=>{
    res.render('signup');
});
app.get('/redirected',isSigned,(req,res)=>{
    
    res.render('redirected_page');
    
    
});
app.get('/signout',isSigned,(req,res)=>{
    signed=false
    res.redirect('/')
});

app.get('/*',(req,res)=>{
    res.redirect('/');
});
const check_password=(password)=>{
    var verified;
    bcrypt.compare()
}
app.post('/',isNotSigned,(req,res)=>{
    if(data_keys.includes(req.body.username)){
        /*
        if(data[req.body.username]==req.body.password){
            signed=true;
            
            res.redirect('/redirected');
        }
        else{
            
            res.redirect('/')
        }*/
        bcrypt.compare(req.body.password,data[req.body.username])
              .then((result)=>{
                if(result){
                    signed=true;
                    res.redirect('/redirected');
                }
                else{
                    res.redirect('/');
                }
              });
    }
    else{
        
        res.redirect('/')
    }
    
});
app.post('/signup',isNotSigned,(req,res)=>{
    var input=req.body;
    if(data_keys.includes(req.body.username)){
        res.redirect('/signup');
    }
    else{
        const saltRounds=5;
        var new_password=String(req.body.password)
        var new_username=String(req.body.username);
        bcrypt.hash(new_password,saltRounds).then(hash=>{
            new_password=String(hash);
            data[new_username]=new_password;
            data=JSON.stringify(data,null,2);
            fs.writeFile('user_info.json',data,()=>{
                //console.log('Added new user\n',data)
            });
            data=JSON.parse(data) 
            data_keys=Object.keys(data)
            res.redirect('/')
        })
        
        
        
        
    }
});
app.listen(3000,()=>{
    console.log("Listening to port 3000")
});