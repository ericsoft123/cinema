import React,{useState,useRef} from 'react';
import '../App.css';
import FormData from './FormData';
import {book_seat,check_seats,cancel_seats} from '../api';


const DisplaySeat = ({ displayseat , update_seat_state,showloader,hideloader}) => {

  var [seatdis,setSeat]=useState([]);


  

//console.log(displayseat);
  const name_ref=useRef();
  const email_ref=useRef();
  const tel_ref=useRef();
  const seatid_ref=useRef();
  const seatnumber_ref=useRef();
 
 

  function handledelete(e){
//const {id}=e.target.parentElement;
const id=e.target.title
seatdis.splice(id,1);
setSeat([...seatdis])

var seatNumber='';
var seatId='';
get_textdata(seatdis,seatNumber,seatId);

  }
function get_textdata(seatdis,seatNumber,seatId){
  //console.log("test");
 var seatn=seatNumber;
 var seatid=seatId;
 //console.log(seatdis);
  var arr=seatn===''?[]:[seatn];//if seatn equal "" then give empty array else array start with value
  var arr2=seatid===''?[]:[seatId];
  Array.prototype.map.call(seatdis, function(item) { arr.push(item.seatNumber);arr2.push(item.seatId) }).join(",");
  //console.log(arr.toString());
  
   seatnumber_ref.current.value=arr.toString();
   seatid_ref.current.value=arr2.toString();
  
}

function choose_seat(seat_id,status,seat_number,random_colorclass){
  if(status!=='booked')
  {

    
     const is_selected = seatdis.find(seatdi=> seatdi.seatId === seat_id); //check if value seat is selected
    if(!is_selected){
      setSeat([{
        seatId:seat_id,
        seatNumber:seat_number,
        randomColor:random_colorclass,
       },...seatdis])
       //console.log(seatdis);
       get_textdata(seatdis,seat_number,seat_id);//this function will help me to update seat_number and seat_id on handledelete or choose_seat
    }
    else{
      alert(`this seat ${seat_number} is already in your list choose another one or remove from the list`);
    }
 
  }
  else{
    if(localStorage.getItem("email")){
        var email=localStorage.getItem("email");
      //
      check_seat(seat_id,email,seat_number);
      //
    }
    else{
        alert("this seat is already booked and you are not allowed to unbooked");
    }
   
   }

    }
    async function book_aseat(){


      var name=name_ref.current.value;
     var email=email_ref.current.value;
     var tel=tel_ref.current.value;
     var seatid=seatid_ref.current.value;
     var seatnumber=seatnumber_ref.current.value;
     if(seatid==='' || tel==='' || email==='' || name==='')return alert("Please fill This forms")
     showloader();
             
      var formdata={//just combine form input to be able to send as json data
        name:name,
        email:email,
        tel:tel,
        seat_id:seatid,
        seat_number:seatnumber,
       };
     
    await book_seat(formdata);
    localStorage.setItem("email", email);//when client choose seat it will save somedata on localstorage to be able to track him on unbooked
    
    name_ref.current.value=null;
    email_ref.current.value=null;
    tel_ref.current.value=null;
    seatid_ref.current.value=null;
    seatnumber_ref.current.value=null;
    
    update_seat_state();//update state after inserting some data
    hideloader();//hide loader
    
    
    
    //console.log(b_seat);
    
    }
    
    async function check_seat(seat_id,email,seat_number){
      showloader();
     var check= await check_seats(seat_id,email,seat_number);
     if(check){
       //
       hideloader();
if(window.confirm(`Are you Sure you want to unbook this Seat ${seat_number}`))// alert before unbooked seat
{
  showloader();
   cancel_seat(seat_id,email);//call cancel function to unbook seat
}
//
     }
    }
    async function cancel_seat(seat_id,email){
     await cancel_seats(seat_id,email);
     update_seat_state();//update state after inserting some data
    hideloader();//hide loader
    }


  var Colors= [//this array will add a good effects to randomize seat
    "pink",
    "blue",
    "green",
    
  ];
    return (
      
      <>
 
 <FormData seatdis={seatdis} handledelete={handledelete}  seatnumber_ref={seatnumber_ref} seatid_ref={seatid_ref}//pass variable state,ref,function to FormData Component Function
 name_ref={name_ref} email_ref={email_ref} tel_ref={tel_ref} book_aseat={book_aseat}
 />
 

        {displayseat.map((seat) => (
          
         
           <div className={`grid-item ${seat.status==='available'?'bcolor_available':'bcolor_booked'}`} key={seat.seat_id} onClick={()=>choose_seat(`${seat.seat_id}`,`${seat.status}`,`${seat.seat_number}`,`${Colors[Math.floor(Math.random() * Colors.length)]}`)}><span className={`m-between seat-big ${Colors[Math.floor(Math.random() * Colors.length)]}`} >{seat.seat_number}</span></div>
         
        ))}
      </>
    )
  };

  export default DisplaySeat