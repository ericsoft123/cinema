/*var selected=[];
const link="http://localhost:3000";*/
/* date time initialization*/

  
/* date time initialization*/

var choose_seat_arr={};
$(function(){
    display_seats();
   
   // document.getElementById('formdata').reset();
});
function display_seats(){
    $('#cover-spin').show();
$.ajax({

//url:`${link}/display_seats`,
url:`/display_seats`,
type:"get",

success:function(data){


//console.log(data);

var data_displ="";
for(var i=0;i<data.length;i++)
{
    var Colors= [
        "pink",
        "blue",
        "green",
        
      ]
      
      var random_colorclass= Colors[Math.floor(Math.random() * Colors.length)];
var color_status=data[i]["status"]=='available'?'rgba(255, 255, 255, 0.8);':'green';


data_displ+= `<div class="grid-item" onclick="return choose_seat('${data[i]["seat_id"]}','${data[i]["status"]}',${data[i]["seat_number"]},'${random_colorclass}')" style="background:${color_status}"><span class="${random_colorclass} m-between seat-big">${data[i]["seat_number"]}</span></div>`;
}

$(".data_disp").html(data_displ);
setTimeout(function(){
    $('#cover-spin').hide();
  }, 500);

},
error:function(data){
alert(data.statusText);
}

});
}
function delete_this_seat(seat_number,seat_id){
    //console.log(seat_number);
    $('.'+seat_id).remove();
    
    delete choose_seat_arr[seat_id];

var seatNumber=Object.values(choose_seat_arr).join(',');//convert object to comma separated array

$('#seat_number').val(seatNumber);
$('#seat_id').val(Object.keys(choose_seat_arr).join(','));

}
function choose_seat(seat_id,status,seat_number,random_colorclass){
   
if(status!='booked')
{
//console.log(choose_seat_arr.indexOf(seat_number));
console.log(choose_seat_arr.hasOwnProperty(seat_id));
console.log(choose_seat_arr);
 
 if(!choose_seat_arr.hasOwnProperty(seat_id))  // to check if object has this key before adding this key as seat
 {
     //choose_seat_arr.push(seat_number);
     choose_seat_arr[seat_id]=seat_number;

     $('.seat_disp_array').append(`
 <span class="${random_colorclass} m-between ${seat_id}">${seat_number}<span class="delbtn" data-toggle="tooltip" title="Delete This Seat" onclick="return delete_this_seat(${seat_number},'${seat_id}')">X</span></span>
     `);
    $('#seat_number').val(Object.values(choose_seat_arr).join(','));
    $('#seat_id').val(Object.keys(choose_seat_arr).join(','));
 }
 else{
    alert(`this seat ${seat_number} is already in your list choose another one or remove from the list`);
 }

 
$('#seatModal').modal('show'); //to open modal to be able to send form data of this function book_seat(); to book seat
}
else{
 if(localStorage.getItem("email")){
     var email=localStorage.getItem("email");
   //
   check_seat(seat_id,email,seat_number)
   //
 }
 else{
     alert("this seat is already booked and you are not allowed to unbooked");
 }

}
}
function check_seat(seat_id,email,seat_number){
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
   cancel_seat(seat_id,email);//call cancel function to unbook seat
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
    $('#cover-spin').show();
$.ajax({

url:`/book_seat`,
type:'post',
data:$('#formdata').serialize(),
success:function(data){
if(data.result){//return data as true
    if(data.is_booked)//seat booked successfuly
    {
        var email=$('#email').val();
        localStorage.setItem("email", email);
        //console.log(data);
        //alert("Seat has booked check on your email for more infos");
        setTimeout(function(){
            $('#cover-spin').hide();
          }, 500);
          $('#formdata .form-control').val(""); //reset form
        display_seats();
        alert("Thank you for Booking Seat with us check your inbox or spam of your inbox");
        
    }
    else{
        alert("This Seat is booked choose another one");
        setTimeout(function(){
            $('#cover-spin').hide();
          }, 500);
        display_seats();

    }
   
}
else{
   
}



},
error:function(data){
alert(data.statusText);
}

});
return false;


}
function cancel_seat(seat_id,email){
$.ajax({

url:`/cancel_seat`,
//url:`/cancel_seat`,
type:"post",
data:{seat_id:seat_id,email:email},
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
