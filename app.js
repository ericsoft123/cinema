const express=require('express');

const cors=require('cors');

const body_parser=require('body-parser'); //json get data
const serverapp=express();
serverapp.use(express.urlencoded());//you must not forget this
//const db_connect=require('./config/db_config');
const email_auth_con=require('./config/email_config');
const my_models=require('./models/services');


serverapp.use(express.static(__dirname + '/public'));
//production
//const port=3000;

const port=process.env.port||8080;
//var con=db_connect.database_config;
serverapp.get('/',(req,res)=>{

    res.sendFile(__dirname + '/view/jquery-front/index.html');
 


})
serverapp.get('/vuejs',(req,res)=>{


    res.sendFile(__dirname + '/view/vue-front/index.html');
 


})

serverapp.get('/display_seats',(req,res)=>{
 //
my_models.main_method["display_seat"](function(result) {//this function display_seat it pass 1 parameters as function to be able to have a call back return values
    res.json(result);
  });
//
 })

 serverapp.get('/check_seat',(req,res)=>{//to check if seat is available when you click to booked seat
    var seat_id=req.body.seat_id;
    var email=req.body.email;

    check_select_seat();

    async function check_select_seat(){
        var check_seat=await my_models.main_method["check_seat"](seat_id,email);
        if(check_seat.result_query)
{
 //here seat is available then it will return true
 res.json( check_seat.result_value);

}
    }
 


})
serverapp.post('/book_seat',(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var tel=req.body.tel;
    var seat_id=req.body.seat_id;
    var seat_number=req.body.seat_number;
    //
    book_seat();
   async function book_seat(){//this to run deleted to make sure if data has been deleted
     
//
var check_seat=await my_models.main_method["check_seat"](seat_id,email);
 
if(check_seat.result_query)
{
 //here seat is available then it will return true
 res.json( check_seat.result_value);

}
else{//if seat is not available then booked seat
   //
      var booked=await my_models.main_method["book_seat"](name,email,tel,seat_id);
    if(booked.result_query)
{
var update_seat=await my_models.main_method[booked.method_name](seat_id,booked.status);//note this is update method
if(update_seat.result_query){
    var sent_email=await my_models.main_method["sent_email"](name,email,tel,seat_id,seat_number);
   if(sent_email.result_query){

   }else{
       res.json("email is not valid or data is not set");
   }
}
}
           



   //
}

}
              
    //
 })
serverapp.post('/cancel_seat',(req,res)=>{
   // var reslt=email_auth_con.email_auth();
    var seat_id=req.body.seat_id;
    //
    cancel_seat();
    async function cancel_seat(){
   
       var cancel_seat=await my_models.main_method["cancel_seat"](seat_id);
    if(cancel_seat.result_query){
       var update_seat=await my_models.main_method[cancel_seat.method_name](seat_id,cancel_seat.status);//note this is update method
       if(update_seat.result_query){
           res.json("seat has been cancelled");
       }
       else{
           res.json("something went wrog");
       }
    }
   }
    //

 })

serverapp.listen(port,()=>{
    console.log("app is running");
    
});
