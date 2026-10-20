import { Heart, User, UserPlus } from "lucide-react";
import "../css/Header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackendUrl from "../Utils/BackendUrl";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <Navbar
  expand="lg"
  expanded={expanded}
  className="header-navbar px-3 shadow-sm"
>
      {/* LOGO */}
      <Navbar.Brand className="d-flex align-items-center">
        <Heart className="me-2" />
        <div>
          <div>MediCare</div>
          <small>Healthcare Solutions</small>
        </div>
      </Navbar.Brand>

      {/* TOGGLE BUTTON (IMPORTANT) */}
      <Navbar.Toggle
        onClick={() => setExpanded(!expanded)}
      />

      {/* MENU */}
      <Navbar.Collapse>
        <Nav className="ms-auto gap-2 text-center">
          <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/finddoctors" onClick={() => setExpanded(false)}>
            Find Doctors
          </Nav.Link>

          <Nav.Link as={Link} to="/searchbycity" onClick={() => setExpanded(false)}>
            Search By City
          </Nav.Link>

          <Nav.Link as={Link} to="/searchbyspeciality" onClick={() => setExpanded(false)}>
            Search Speciality
          </Nav.Link>

          <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>
            Contact
          </Nav.Link>

          {/* BUTTONS */}
          <Button variant="outline-primary" onClick={() => alert("Login")}>
            <User size={16} /> Login
          </Button>

          <Button variant="primary" onClick={() => alert("Register")}>
            <UserPlus size={16} /> Register
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;