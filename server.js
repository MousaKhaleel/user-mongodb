var express= require('express')
var app=express();

const {MongoClient}=require('mongodb')

var connection="mongodb+srv://user1:qwe12345678@cluster0.1ogr7io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client= new MongoClient(connection)

const mydb= client.db('test')

const collection= mydb.collection('Users')


app.get("/", function(req,res)
{
     res.send("started")
})

app.get("/users",async(req,res)=>{
     //find  =>{}=>all
     const users= await collection.find({}).toArray() 
     res.send(users)
})

app.get("/user/:username",async(req,res)=>{
     //find  =>{}=>all
     const users= await collection.findOne({'username':req.params.username}) 
     res.send(users)
})

var bodyParse= require('body-parser')

var urlEncoded= bodyParse.urlencoded({extended:false})

app.get("/form", function(req,res)
{
   res.sendFile(__dirname+"/form.html")
})

// var fs=require('fs')

var LocalStorage = require('node-localstorage').LocalStorage;
var ls = new LocalStorage('./scratch');

app.post("/login",urlEncoded, async(req,res)=>
{
      const finduser= await collection.findOne({'email':req.body.email,'password':req.body.password})
      if (finduser){
          // fs.writeFile("user.txt", finduser.email),'password':req.body.password,'username':req.body.username,'age':req.body.age,'gender':req.body.gender
          ls.setItem("email",req.body.email)
          ls.setItem("password",req.body.password)
          ls.setItem("username",req.body.username)
          ls.setItem("age",req.body.age)
          ls.setItem("gender",req.body.gender)
          res.sendFile(__dirname+"/userInfo.html")
      }
      else{
          res.sendFile(__dirname+"/register.html")
      }
})

// app.get("/getinfo",function(req,res){
//     res.sendFile(__dirname+"/user.txt")
// })


app.post("/register",urlEncoded, async(req,res)=>
{    //find 
     const find= await collection.findOne({'email': req.body.email})
     const createuser='';
     if(!find)
     createuser= await collection.insertOne({'username': req.body.username,'password':req.body.password,'username':req.body.username,'age':req.body.age,'gender':req.body.gender})
    
})





var server= app.listen(9000,function()
{
     var host = server.address().address
     var port=server.address().port

     console.log("start my server")
})