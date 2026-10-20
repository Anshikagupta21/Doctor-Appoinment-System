import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../Utils/BackendUrl";
import Table from "react-bootstrap/Table";

const Contact=()=>{
    
      

  const [appointments, setAppointments] = useState([]);

  const loadData = async () => {
    try {
      const api = `${BackendUrl}/doctor/displayappointment`;
      const response = await axios.get(api);
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        All Appointments
      </h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Disease</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.doctorname}</td>
                <td>{item.patientname}</td>
                <td>{item.deseases}</td>
                <td>{item.address}</td>
                <td>{item.contact}</td>
                <td>{item.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Appointments Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};


    

export default Contact;