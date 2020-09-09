const express = require('express');
const mongoose = require('mongoose');
const data= require('./data');

const connection_url='mongodb+srv://apathre:a09SVlQpntf3WXSD@cluster0.tlbkx.mongodb.net/tiktokClone?retryWrites=true&w=majority';
const Videos = require('./dbModel');


mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});


//app config
const app = express();
const port = 9000;

//middlewares
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next()
});

//DB config

//api endpoints
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('/v1/posts',(req,res)=>{
    res.send(data);
});
app.get('/v2/posts',(req,res)=>{
    Videos.find((err,data)=>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(200).send(data);
    }
});
});

app.post('/v2/posts',(req,res)=>{
    
    const dbVideos=req.body;
    Videos.create(dbVideos,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data);
        }
    });
});
//listen
app.listen(port,()=>{
    console.log('Listening on Port:',port);
});

