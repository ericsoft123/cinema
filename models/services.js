
const db_connect=require('../config/db_config');
const email_auth_con=require('../config/email_config');
var con=db_connect.database_config;
var email_dataconfig=email_auth_con.email_auth();
var nodemailer = require('nodemailer');
//



const result_value=true;//it is true on success only this is to make sure that in case of changing i will change only this valuable
const update_method='update_seat';

exports.main_method={//this is a best practise to change functions dynamically
    check_seat:function(seat_id,email){
   

        seat_id= "'" + seat_id.split( "," ).join( "','" ) + "'";


        var sql =`select email,seat_id from booking where email='${email}' and FIND_IN_SET(${seat_id}, seat_id) limit 1`;
        return new Promise(function(resolve, reject) {
         var returnValue = "";
         con.query(sql, function(error, rows,result) {
             if (error) {
                console.log("not found");
             } else {
                 if(rows && rows.length ){
                    returnValue={//return true if found
                       result_query:result_value,
                       //message_result:"This Seat is booked choose another one",


                   };
                 }
                 else{
                    returnValue ={//return false if not found
                        result_query:false,
                        
                    };
                    
                 }
                
              
             }
             resolve(returnValue)
         });
     });
       
    },
    display_seat:function(callback){//displya table seat on grid
        con.query("SELECT * FROM seat", function (err, result, fields) {
            if (err) throw err;
        
            callback(result);
           
            
          });
       
       
    },
    
     book_seat:function(name,email,tel,seat_id){//insert data on booking then after call update_seat method and then update methods call sent email(all on async ways)
    
        var sql =`INSERT INTO booking (name,seat_id,email,tel) VALUES ('${name}','${seat_id}','${email}','${tel}')`;
           return new Promise(function(resolve, reject) {
            var returnValue = "";
            con.query(sql, function(error, rows) {
                if (error) {
                    returnValue = {
                        result_query:false,
                        method_name:update_method,
                        status:'booked',
                    };
                } else {
                    returnValue ={
                        result_query:result_value,
                        method_name:update_method,
                        status:'booked',
                    };
                 
                }
                resolve(returnValue)
            });
        });

        
      
      
       
    },
    cancel_seat:function(seat_id,email){//add status cancel from booking then update_seat status(async ways)
      var cancel_seat=seat_id+"@cancel";
      
        var sql =`update booking
        set seat_id = replace(seat_id ,'${seat_id}', '${cancel_seat}') 
      where email='${email}' limit 1`;//this will update comma separated values on mysql by replace seat_id to cancel_seat
     
        return new Promise(function(resolve, reject) {
            var returnValue = "";
            con.query(sql, function(error, rows) {
                if (error) {
                    returnValue = {
                        result_query:false,
                        method_name:update_method,
                        status:'available',
                    };
                } else {
                    returnValue ={
                        result_query:result_value,
                        method_name:update_method,
                        status:'available',
                    };
                 
                }
                resolve(returnValue)
            });
        });
        
        
    },
    update_seat:function(seat_id,status){//every time we book_seat,we will sent email then update or cancel_seat we must  update seat too
        //UPDATE seat SET status='booked' WHERE seat_id IN("s-1","s-2")
        seat_id= "'" + seat_id.split( "," ).join( "','" ) + "'";
        var sql =`update seat set status='${status}' where seat_id IN (${seat_id})`;//means unbooked
        return new Promise(function(resolve, reject) {
            var returnValue = "";
            con.query(sql, function(error, rows) {
                if (error) {
                    returnValue = {
                        result_query:false,
                        method_name:update_method,
                        status:'booked',
                    };
                } else {
                    returnValue ={
                        result_query:result_value,
                        method_name:update_method,
                        status:'booked',
                    };
                 
                }
                resolve(returnValue)
            });
        });
        
    },
    sent_email:function(name,email,tel,seat_id,seat_number){
     
//
var transporter = nodemailer.createTransport({
    /*service: 'gmail',

    auth: {
      user:email_dataconfig.email,
      pass:email_dataconfig.password
    }*/
    host:email_dataconfig.host,
  port:email_dataconfig.port,
  auth: {
    user:email_dataconfig.email,
    pass:email_dataconfig.password
  }
  });
  
  var mailOptions = {
    from:email_dataconfig.email,
    to: email,
    subject: 'Confirmation Booking',
    html: `Hi Dear ${name}
    <br>
    <h3>Booking Details</h3>
    <table class="demo">
    
  
    <tbody>
    <tr>
        <td>Name</td>
        <td>${name}</td>
    </tr>
    <tr>
        <td>Email</td>
        <td>${email}</td>
    </tr>
    <tr>
        <td>Tel</td>
        <td>${tel}</td>
    </tr>
    <tr>
        <td>Seat ID</td>
        <td>${seat_id}</td>
    </tr>
    <tr>
    <td>Seat Number</td>
    <td>${seat_number}</td>
</tr>

    </tbody>
</table>
    `
  };
    return new Promise(function(resolve, reject) {
            var returnValue = "";

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        returnValue = {
            result_query:false,
            method_name:update_method,
            status:'booked',
        };
        //console.log("errors");
    } else {
       returnValue ={
            result_query:result_value,
            method_name:update_method,
            status:'booked',
        };
       // console.log("sent");
    }
    resolve(returnValue);
  });
//

        });
        


        
    },
    
}


