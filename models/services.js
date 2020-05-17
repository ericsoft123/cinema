
const db_connect=require('../config/db_config');
var con=db_connect.database_config;


const result_value=true;//it is true on success only this is to make sure that in case of changing i will change only this valuable
const update_method='update_seat';

exports.main_method={//this is a best practise to change functions dynamically
    display_seat:function(callback){
        con.query("SELECT * FROM seat", function (err, result, fields) {
            if (err) throw err;
        
            callback(result);
           
            
          });
       
       
    },
    
    book_seat:function(){//insert data on booking then after call update_seat method and then update methods call sent email(all on async ways)
        var sql =`INSERT INTO booking (name,seat_id,email,tel) VALUES ('${name}','${seat_id}','${email}','${tel}')`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              return {
                result:result_value,
                method_name:update_method,
                status:'booked',
            };
            });
       
    },
    cancel_seat:function(seat_id){//delete from booking then update_seat status(async ways)
        var sql =`delete from booking where seat_id='${seat_id}'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          return {
            result:result_value,
            method_name:update_method,
            status:'available',
        };
        });
        
    },
    update_seat:function(seat_id,status){//every time we book_seat,we will sent email then update or cancel_seat we must  update seat too
        
        var sql =`update seat set status='${status}' where seat_id='${seat_id}'`;//means unbooked
    con.query(sql, function (err, result) {
        return {
            result:result_value,
            method_name:'sent_email',//only on booking
           
        };
    });
        
    },
    sent_email:function(){
        return {
            result:result_value,
           // method_name:'',
        };
    },
}