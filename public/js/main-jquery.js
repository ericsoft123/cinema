/*var selected=[];
const link="http://localhost:3000";*/

$(function(){
    display_seats();
});
function display_seats(){
   
$.ajax({

//url:`${link}/display_seats`,
url:`/display_seats`,
type:"get",

success:function(data){


//console.log(data);

var data_displ="";
for(var i=0;i<data.length;i++)
{
var color_status=data[i]["status"]=='available'?'rgba(255, 255, 255, 0.8);':'green';


data_displ+= `<div class="grid-item" onclick="return choose_seat('${data[i]["seat_id"]}','${data[i]["status"]}',${data[i]["seat_number"]})" style="background:${color_status}">${data[i]["seat_number"]}</div>`;
}

$(".data_disp").html(data_displ);

},
error:function(data){
alert(data.statusText);
}

});
}

function choose_seat(seat_id,status,seat_number){
if(status!='booked')
{

 $('#seat_id').val(seat_id);
 $('#seat_number').val(seat_number);


$('#seatModal').modal('show'); //to open modal to be able to send form data of this function book_seat(); to book seat
}
else{
 if(localStorage.getItem("email")){
     var email=localStorage.getItem("email");
   //
   check_seat(seat_id,email)
   //
 }
 else{
     alert("this seat is already booked and you are not allowed to unbooked");
 }

}
}
function check_seat(seat_id,email){
    $.ajax({
    
    url:`/check_seat`,
    //url:`/cancel_seat`,
    type:"post",
    data:{seat_id:seat_id,email:email},
    success:function(data){
   if(data){//true as showing result means data found
//
if(confirm(`Are you Sure you want to unbook this Seat ${seat_number}`))// alert before unbooked seat
{
   cancel_seat(seat_id);//call cancel function to unbook seat
}
//
   }
    },
    error:function(data){
    console.log(data.status);
    //alert(data.statusText);
    }
    
    });
    return false;
    
    }
function book_seat(){

$.ajax({

url:`/book_seat`,
type:'post',
data:$('#formdata').serialize(),
success:function(data){
if(data.result){//data is available
    alert("This Seat is booked choose another one");
    display_seats();
}
else{
    var email=$('#email').val();
    localStorage.setItem("email", email);
    console.log(data);
    //alert("Seat has booked check on your email for more infos");
    display_seats();
}



},
error:function(data){
alert(data.statusText);
}

});
return false;


}
function cancel_seat(seat_id){
$.ajax({

url:`/cancel_seat`,
//url:`/cancel_seat`,
type:"post",
data:{seat_id:seat_id},
success:function(data){
console.log(data);
//$('#modalform').modal('hide');
display_seats();
},
error:function(data){
console.log(data.status);
//alert(data.statusText);
}

});
return false;

}
