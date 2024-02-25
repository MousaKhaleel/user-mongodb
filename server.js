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

var fs=require('fs')

app.post("/login",urlEncoded, async(req,res)=>
{
      const finduser= await collection.findOne({'email':req.body.email})
      if (finduser){
        //   fs.writeFileSync("user.txt", finduser.email),'password':req.body.password,'username':req.body.username,'age':req.body.age,'gender':req.body.gender
        localStorage.setItem('cUser',finduser.email)
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
     const createuser= await collection.insertOne({'userName': req.body.userName})
    
})





var server= app.listen(9000,function()
{
     var host = server.address().address
     var port=server.address().port

     console.log("start my server")
})