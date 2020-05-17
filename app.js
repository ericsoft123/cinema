const express=require('express');

const cors=require('cors');

const body_parser=require('body-parser'); //json purpose
const serverapp=express();
serverapp.use(express.urlencoded());//you must not forget this
const db_connect=require('./config/db_config');
const email_auth_con=require('./config/email_config');
const port=3000;
var con=db_connect.database_config;
serverapp.get('/',(req,res)=>{
   var reslt=email_auth_con.email_auth();
   //con.end();
   res.json(reslt.email);
})
serverapp.listen(port,()=>{
    console.log("app is running");
    
});
