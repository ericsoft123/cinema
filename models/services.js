
const db_connect=require('../config/db_config');
const email_auth_con=require('../config/email_config');
var con=db_connect.database_config;
var email_dataconfig=email_auth_con.email_auth();
var nodemailer = require('nodemailer');
//



const result_value=true;//it is true on success only this is to make sure that in case of changing i will change only this valuable
const update_method='update_seat';

exports.main_method={//this is a best practise to change functions dynamically
    display_seat:function(callback){
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
    cancel_seat:function(seat_id){//delete from booking then update_seat status(async ways)
        var sql =`delete from booking where seat_id='${seat_id}'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          return {
            result_query:result_value,
            method_name:update_method,
            status:'available',
        };
        });
        
    },
    update_seat:function(seat_id,status){//every time we book_seat,we will sent email then update or cancel_seat we must  update seat too
        
        var sql =`update seat set status='${status}' where seat_id='${seat_id}'`;//means unbooked
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
    sent_email:function(name,email,tel,seat_id){
        return new Promise(function(resolve, reject) {
            var returnValue = "";

//
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:email_dataconfig.email,
      pass:email_dataconfig.password
    }
  });
  
  var mailOptions = {
    from: 'esoftdev1@gmail.com',
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
        <td>Seat No</td>
        <td>${seat_id}</td>
    </tr>
    </tbody>
</table>
    `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
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
//

        });
        


        
    },
    
}


