import React from 'react';


function FormData({seatdis,handledelete,seatnumber_ref,seatid_ref,name_ref,email_ref,tel_ref,book_aseat}) {//pass props variable and function too
  
   
   // const [disp_seats,setdis_seats]=useState({});

   /* useEffect(()=>{
        const disp_seatdata= async()=>{
            setdis_seats(await display_seats());
        }
     
        disp_seatdata();
       
    })*/
   
    
  
    return (
     
        
         <>
         
         	 <form id="formdata" >
            
              <div className="form-group">
                  <h4 className="text-center text-light">Seat Number</h4>
                  <input type="hidden" id="seat_id" ref={seatid_ref} name="seat_id" />
                  <input type="hidden" id="seat_number" ref={seatnumber_ref}  name="seat_number"  className="form-control"/>
               </div>
               <div className="justify-content seat-modal-disp">
                  <h1 className="seat_disp_array">
                  {
         seatdis.map((seatdata,index)=>(

           <span key={index} className={`m-between ${seatdata.randomColor}`}>{seatdata.seatNumber}<span className="delbtn" data-toggle="tooltip" title={index} onClick={e =>handledelete(e)}>X</span></span>
         ))
        }
                  </h1>
              </div>
             
            
                 <div className="form-group text-light">
                     <label >Enter Full Name</label>
                     
                        <input type="text" name="name" ref={name_ref} className="form-control" defaultValue="" required/>
                 </div>
                 <div className="form-group text-light">
                        <label >Enter email</label>
                        <input type="email"  name="email" ref={email_ref}  id="email" className="form-control" required/>
                    </div>
                
             
                 <div className="form-group text-light">
                        <label >Enter Tel Number</label>
                        <input type="tel"  name="tel" ref={tel_ref} className="form-control" required/>
                    </div>

              <button type="button" className="btn btn-primary" onClick={book_aseat}>book Seat</button>
                    </form>
        
         </>
   
        
      
      );
}
  export default FormData;
