const express =require('express');
const hbs=require('hbs');
const fs =require('fs');

var app=express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine","hbs");

// app.use(express.static(__dirname+"/public")); // without using any library
// app.get('/',(req,res)=>{
//     res.send("hello express");
// });

app.use((req,res,next)=>{
var log=`new Date().toString: ${req.method} ${req.url}`;
    fs.appendFile("server.log",log +'\n',(err)=>{
        if(err){
            console.log("unable to connect");
        }
    });
    next();
});

// app.use((req,res,next)=>{
// res.render("maintenance.hbs");
// });


app.get("/",(req,res)=>{
res.render("home.hbs",{
    pageTitle:"Welcome in home page",
    home:"You are in home page",
    currentYear: new Date().getFullYear()

});
});

app.get('/about',(req,res)=>{
    res.render("about.hbs",{
        pageTitle:"About Page",
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000);
