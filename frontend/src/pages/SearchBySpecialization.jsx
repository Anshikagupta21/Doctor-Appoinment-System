import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BackendUrl from "../Utils/BackendUrl";

const SearchBySpecialization = () => {
  const [speciality, setSpeciality] = useState("");
  const [mydata, setMydata] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let api = `${BackendUrl}/doctor/searchbyspeciality`;
    const response = await axios.post(api, { speciality });

    setMydata(response.data);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">
        Search By Specialization
      </h2>

      {/* FORM */}
      <Form
        onSubmit={handleSubmit}
        className="p-3 shadow rounded mx-auto"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Select Specialization</Form.Label>

          <Form.Select
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="General Physician">General Physician</option>
            <option value="ENT Specialist">ENT Specialist</option>
            <option value="Dentist">Dentist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Surgeon">Surgeon</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>

      <hr />

      {/* TABLE */}
      <div className="table-responsive">
        <Table striped bordered hover className="text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>City</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {mydata.length > 0 ? (
              mydata.map((key, index) => (
                <tr key={key._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={key.image}
                      alt="doctor"
                      className="img-fluid rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>

                  <td>{key.doctorname}</td>
                  <td>{key.speciality}</td>
                  <td>{key.city}</td>
                  <td>{key.address}</td>
                  <td>{key.contact}</td>
                  <td style={{ wordBreak: "break-word" }}>
                    {key.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SearchBySpecialization;