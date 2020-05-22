import React from 'react';

import DisplaySeat from './Components/DisplayAction';

import  './App.css';


import {display_seats} from './api';




class App extends React.Component{
 
  state={
    displayseat:[],
    loading:'none',
    
    
  }
  
 async componentDidMount(){
 

const displayall_seat=await display_seats();


this.setState({displayseat:displayall_seat.data});





 }
 showloader(){
   this.setState({loading:'block'});
 }
 hideloader(){
  this.setState({loading:'none'});
 }

 
  render(){
    return(
      <>
      
 
  <div id="cover-spin" style={{display:this.state.loading}}></div>
   <div className={`container wrapper`}>
   <h1 className="text-center text-capitalize text-light mt-20">BOOKING SEAT APP</h1>
   <p className="text-center text-capitalize text-light mt-20">Book YOUR SEAT</p>
        <div className="grid-container data_disp">
            
        <DisplaySeat displayseat={this.state.displayseat} update_seat_state={this.componentDidMount.bind(this)} showloader={this.showloader.bind(this)} hideloader={this.hideloader.bind(this)}/>

        </div>

   </div>
     


      </>
    )
  }
}
export default App;
