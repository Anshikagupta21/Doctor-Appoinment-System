
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "./pages/Home";

import FindDoctors from "./pages/FindDoctors";
// import { Contact } from "lucide-react";
import DoctroDashBoard from "./DoctorDashBoard";
import PatientList from "./pages/PatientList";
import SearchByCity from "./pages/SearchByCity";
import SearchBySpecialization from "./pages/SearchBySpecialization";
import GetAppointment from "./pages/GetAppointment";
import Contact from "./pages/Contact";


const App=()=>{
  return(
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="home" element={<Home/>}/>
    <Route path="finddoctors" element={<FindDoctors/>}/>
    <Route path="searchbycity" element={<SearchByCity/>}/> 
     <Route path="searchbyspeciality" element={<SearchBySpecialization/>}/>
    <Route path="contact" element={<Contact/>}/>
    <Route path="/getappointment/:id" element={<GetAppointment />} />
    <Route path="/contact" element={<Contact/>}/>
     </Route>
  </Routes>
  <Routes>

  <Route path="/doctordashboard" element={<DoctroDashBoard/>}>
   <Route path="patientlist" element={<PatientList/>} />  
            </Route>  
          </Routes>      
  </BrowserRouter>
  
  </>
  )
};
export default App;