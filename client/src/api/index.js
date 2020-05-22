import axios from 'axios';


const url="http://localhost:8080";

export function Test(testdata){
console.log(`pass data between ${testdata}`);
}

export const display_seats=async()=>{
    try {
        const response= axios.get(`${url}/display_seats`);
       // console.log(response);
      return response;
    } catch (error) {
        
    }
}

export const book_seat=async(formdata)=>{
    console.log(JSON.stringify(formdata));
    try {
      
     
var body = new URLSearchParams();
//body.set('seat_id', 's-1');
for ( var key in formdata ) {
    body.set(key, formdata[key]);
}

          const response= axios.post(`${url}/book_seat`,body);
          return response;
      

    } catch (error) {
        alert(error);
    }
}

export const check_seats=async(seat_id,email,seat_number)=>{
    
    try {
      
     
var body = new URLSearchParams();
body.set('seat_id',seat_id);
body.set('email',email);
body.set('seat_number',seat_number);


          const response= axios.post(`${url}/check_seat`,body);
          return response;

    } catch (error) {
        alert(error);
    }
}

export const cancel_seats=async(seat_id,email)=>{
    
    try {
      
     
var body = new URLSearchParams();
body.set('seat_id',seat_id);
body.set('email',email);



          const response= axios.post(`${url}/cancel_seat`,body);
          return response;
      

    } catch (error) {
        alert(error);
    }
}






