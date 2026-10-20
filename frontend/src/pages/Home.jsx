import "../css/Home.css";
import doctorImg from "../images/doctor-removebg-preview.png";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  BackendUrl from '../Utils/BackendUrl';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home=()=>{
const [mydata, setMydata] = useState([]);
const navigate = useNavigate();

const loadData =async()=>{
   let api=`${BackendUrl}/doctor/doctorinfo`; 
    try {
         const response = await axios.get(api);
         console.log(response.data);
         setMydata(response.data);
     } catch (error) {
       console.log(error)
    } 
}

useEffect(()=>{
  loadData();
}, [])

  
const ans=mydata.map((key)=>{
    return(
      <>
         <Card  key={key._id} style={{ width: '18rem', margin:"10px" }}>
      <Card.Img variant="top" src={key.image} height="270" />
      <Card.Body>
        <Card.Title>{key.doctorname}</Card.Title>
        <Card.Text>
         <span style={{color:"red", fontWeight:"bold"}}>Specialization : {key.speciality}</span> 
         <br />
         <span style={{color:"navy", fontWeight:"bold"}}> City : {key.city}</span> 
        </Card.Text>
        {/* <Button variant="primary" onClick={()=>{navigate(`/getappointment/${key._id}`)}}>Get Appointment</Button> */}
        <Button
  variant="primary"
  onClick={() => {
    console.log("Button clicked");
    navigate(`/getappointment/${key._id}`);
  }}
>
  Get Appointment
</Button>
      </Card.Body>
    </Card>
      
      </>
    )
})

return(
        <>
          <div className="home">
          {/* Hero Section */} <section className="hero"> <div className="hero-content">
             <h1>Book Your Doctor Appointment Easily</h1>
              <p>Find the right doctor at the right time, hassle-free.</p>
               <button className="btn-primary" onClick={() => navigate('/find-doctors')} > Book Appointment </button>
                </div>
                 <div className="hero-image"> <img src={doctorImg} alt="Doctor" />
                  </div> 
                  </section>
       </div>
      <h1> Top Doctors </h1>

      <div id="docList">
         {ans}
      </div>
     </>      
  
 )   
}


export default Home;