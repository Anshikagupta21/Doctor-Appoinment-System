import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BackendUrl from "../Utils/BackendUrl";
import { useNavigate } from "react-router-dom";
const GetAppointment=()=>{
  
const navigate = useNavigate();
   const {id} = useParams();
   const [mydata, setMydata] = useState({});
   const [input, setInput] = useState({});
   const loadData=async()=>{
      let api = `${BackendUrl}/doctor/getdocinfo/?id=${id}`;
      const response= await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
   }
 useEffect(()=>{
    loadData();
 }, []);

 const handleInput=(e)=>{
      
      let name=e.target.name ;
      let value = e.target.value ;
      setInput(values=>({...values, [name]:value}));
      console.log(input);
 }
const handleSubmit = async (e) => {
  e.preventDefault();

  let api = `${BackendUrl}/doctor/patientsave`;

  try {
    await axios.post(api, { id: id, ...input });

    alert("Appointment Booked Successfully");

    navigate("/contact");   // 👈 redirect here
  } catch (error) {
    console.log(error);
  }
};

    return(
        <>      
      <center>
         <h1> Book Your Appointment </h1>
           <Card style={{ width: '18rem', margin:"10px" }}>
      <Card.Img variant="top" src={mydata.image} height="270" />
      <Card.Body>
        <Card.Title>{mydata.doctorname}</Card.Title>
        <Card.Text>
         <span style={{color:"red", fontWeight:"bold"}}>Specialization : {mydata.speciality}</span> 
         <br />
         <span style={{color:"navy", fontWeight:"bold"}}> City : {mydata.city}</span> 
         <br/>
           <span style={{color:"black", fontWeight:"bold", fontSize:"12px"}}>
             Email : {mydata.email},<br></br> Mobie: {mydata.contact}</span> 
        </Card.Text>
      </Card.Body>
    </Card>
    </center>

  <h2 align="center"> Submit Patient Detail for Appointment</h2>
    <Form style={{margin:"auto", width:"400px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Patient Name</Form.Label>
        <Form.Control type="text" name="patientname" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Diseases</Form.Label>
        <Form.Control type="text" name="deseases" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Address</Form.Label>
        <Form.Control type="text" name="address" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Contact No</Form.Label>
        <Form.Control type="text" name="contact" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email</Form.Label>
        <Form.Control type="text" name="email" onChange={handleInput} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
        </>
    )
}

export default GetAppointment;