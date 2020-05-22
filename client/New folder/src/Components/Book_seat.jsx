 import React from 'react';
 import {book_seat} from '../api/index';
async function book_aseat(seatdis,handledelete,seatnumber_ref,seatid_ref,name_ref,email_ref,tel_ref,book_aseat,showloader,update_seat_state,hideloader){


    var name=name_ref.current.value;
   var email=email_ref.current.value;
   var tel=tel_ref.current.value;
   var seatid=seatid_ref.current.value;
   var seatnumber=seatnumber_ref.current.value;
   if(seatid==='' || tel==='' || email==='' || name==='')return alert("Please fill your forms")
   showloader();
           
    var formdata={
      name:name,
      email:email,
      tel:tel,
      seat_id:seatid,
      seat_number:seatnumber,
     };
   
  var b_seat=await book_seat(formdata);
  localStorage.setItem("email", email);
  
  name_ref.current.value=null;
  email_ref.current.value=null;
  tel_ref.current.value=null;
  seatid_ref.current.value=null;
  seatnumber_ref.current.value=null;
  
  update_seat_state();
  hideloader();
  
  
  
  //console.log(b_seat);
  
  }
  export default  book_aseat;