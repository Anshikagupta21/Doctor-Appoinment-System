import { Heart, User} from "lucide-react";
import "../css/Header.css"; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { UserPlus } from "lucide-react";  
import  {useNavigate} from "react-router-dom";
import BackendUrl from "../Utils/BackendUrl";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {

 
  const [input, setInput] = useState({});
    //  const [input1, setInput1] = useState({});
    const [image, setImage] = useState("");
   const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
   const [email1, setEmail1] = useState("");
   const [password1, setPassword1]= useState("");

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);

    const navigate = useNavigate();
  const handleImage=(e)=>{
       setImage(e.target.files[0]);
       console.log(e.target.files[0]);
  }

   const handleInput=(e)=>{
       let name=e.target.name;
       let value=e.target.value;
       setInput(values=>({...values, [name]:value}));
       console.log(input);
   }



  const handleSubmit=async(e)=>{
    e.preventDefault();
    let api=`${BackendUrl}/doctor/doctorsave`;     
    if (!image) return alert("Please select a Image");
 const formData = new FormData();
 formData.append("file", image);
  
 for (let x in input) {
      formData.append(x, input[x]);
    }

 try {
 const res = await axios.post(api, formData, {
 headers: { "Content-Type": "multipart/form-data" },
 });

 console.log(res);
  setShow(false);
  toast.info("You are Succesfully Registered!");


 } catch (err) {
 console.error(err);
 }
  }


    const handleSubmit1=async(e)=>{
      e.preventDefault();
       let api=`${BackendUrl}/doctor/doctorlogin`;  
       try {
           const response = await axios.post(api, {email:email1, password:password1});
           console.log(response.data);
           localStorage.setItem("docname", response.data.doctorname);
           localStorage.setItem("docid", response.data._id);
           navigate("/doctordashboard");

       } catch (error) {
           console.log(error);
       }
    } 



  return (
    <header className="header">
      <nav className="nav-container">
        
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <Heart className="icon" />
          </div>
          <div className="logo-text">
            <span>MediCare</span>
            <span>Healthcare Solutions</span>
          </div>
        </div>

        {/* Navigation Links */}
         <Navbar>
        
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="finddoctors">Find-Doctors</Nav.Link>
             <Nav.Link as={Link} to="searchbycity">Search By City</Nav.Link>
             <Nav.Link as={Link} to="searchbyspeciality">Search By Specialization</Nav.Link>
            <Nav.Link href="contact">Contact</Nav.Link>
           </Nav>
       
      </Navbar>
     

        {/* Login/Logout Buttons */}
        <div className="auth-buttons">
          <button className="login">
            <User className="icon-small" />
            <span onClick={handleShow1}>Login</span>
          </button>

         <button className="regisration">
        <UserPlus className="icon-small" />
         <span onClick={handleShow}>Registration</span>
         </button>    

       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Doctor Name</Form.Label>
        <Form.Control type="text" name="name" onChange={handleInput} />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Select Specialization</Form.Label>
       <Form.Select aria-label="Default select example" name="speciality" onChange={handleInput}>
      <option>Open this select menu</option>
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
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter City</Form.Label>
        <Form.Control type="text" name="city"  onChange={handleInput}/>
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Clinic Address</Form.Label>
        <Form.Control type="text" name="address" onChange={handleInput} />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload Doctor Image</Form.Label>
        <Form.Control type="file" name="file" accept="image/*" capture="camera" onChange={handleImage}  />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Contact Number</Form.Label>
        <Form.Control type="text" name="contact" onChange={handleInput} />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email</Form.Label>
        <Form.Control type="text"  name="email" onChange={handleInput}/>
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control type="password" name="password" onChange={handleInput} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
 </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      



   {/*doctor login*/}
       <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>    
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email</Form.Label>
        <Form.Control type="email"  name="email1" value={email1} onChange={(e)=>{setEmail1(e.target.value)}}/>
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control type="password" name="password1" value={password1} onChange={(e)=>{setPassword1(e.target.value)}} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit1} type="submit">
        Login
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
   
   
   
   
   
   
   


          
        </div>

        {/* Mobile Menu Button (optional) */}
        <div className="mobile-menu-btn">
          <button>
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
