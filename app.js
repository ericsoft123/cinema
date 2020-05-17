const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

const body_parser=require('body-parser'); //json purpose
const serverapp=express();
serverapp.use(express.urlencoded());//you must not forget this
const port=3000;

serverapp.get('/',(req,res)=>{
   
})
serverapp.listen(port,()=>{
    console.log("app is running");
    
});
