import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OpdPatient from "./pages/receptionist/OpdPatient";
import DoctorChannel from "./pages/receptionist/DoctorChannel";
import HospitalAdmit from "./pages/receptionist/HospitalAdmit";
import MedicalReport from "./pages/receptionist/MedicalReport";
import Payments from "./pages/receptionist/Payments";
import ChanelPatient from "./pages/receptionist/ChanelPatient";
import OtherServices from "./pages/receptionist/OtherServices";
import RDashboard from "./pages/receptionist/RDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import Prescription from "./pages/doctor/Prescription";
import Appointments from "./pages/doctor/Appointments";
import DRequest from "./pages/laboratory/DRequest";
import IssueReport from "./pages/laboratory/IssueReport";
import ListPatient from "./pages/laboratory/ListPatient";
import AddItem from "./pages/admin/AddItem";
import NewDoctor from "./pages/admin/NewDoctor";
import NewDrug from "./pages/admin/NewDrugs";
import NewUser from "./pages/admin/NewUser";
import Dashboard from "./pages/management/Dashboard";
import DrugStock from "./pages/management/DrugStock";
import Revanue from "./pages/management/Revanue";
import Staff from "./pages/management/Staff";
import NurseAppoint from "./pages/nurse/NurseAppoint";
import NurseProfile from "./pages/nurse/NurseProfile";
import AvailableDrug from "./pages/phamacist/AvailableDrug";
import IssueDrugs from "./pages/phamacist/IssueDrugs";
import AdminProfile from "./pages/admin/AdminProfile";
import PhamaProfile from "./pages/phamacist/PhamaProfile";
import ManProfile from "./pages/management/ManProfile";
import LabProfile from "./pages/laboratory/LabProfile";
import RecProfile from "./pages/receptionist/RecProfile";
import Prescribe from "./pages/phamacist/Prescribe";
import UpDoct from "./pages/admin/UpDoct";
import SchedDoct from "./pages/admin/ScheduleDoctor";
import Appointment from "./pages/receptionist/Appointments";
import SystemUsers from "./pages/admin/SystemUsers";
import PatientReports from "./pages/receptionist/PatientReports";
import AllDrugs from "./pages/admin/AllDrugs";
import Treatments from "./pages/doctor/Treatments";
import TestRequest from "./pages/doctor/TestRequest";
import AppointNurse from "./pages/admin/AppointNurse";
import Nursedata from "./pages/admin/NurseData";
import PrintBill from "./pages/receptionist/PrintBill";
import DoctorChannelingData from "./pages/management/DoctorChannelingData";
import IssuedDrugs from "./pages/management/IssuedDrugs";
import MedicalReportData from "./pages/management/MedicalReportData";
import OpdPatientData from "./pages/management/OpdPatientData";
import PatientData from "./pages/management/PatientData";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/opd" element={<OpdPatient/>}/>
          <Route exact path="/dchanel" element={<DoctorChannel/>}/>
          <Route exact path="/hadmit" element={<HospitalAdmit/>}/>
          <Route exact path="/mreport" element={<MedicalReport/>}/>
          <Route exact path="/payment" element={<Payments/>}/>
          <Route exact path="/pchanel/:id" element={<ChanelPatient/>}/>
          <Route exact path="/other" element={<OtherServices/>}/>
          <Route exact path="/rdashboard" element={<RDashboard/>}/>
          <Route exact path="/dprofile/:doctorEmail" element={<DoctorProfile/>}/>
          <Route exact path="/prescripe" element={<Prescription/>}/>
          <Route exact path="/appoints" element={<Appointments/>}/>
          <Route exact path="/drequest" element={<DRequest/>}/>
          <Route exact path="/issuereport/:id" element={<IssueReport/>}/>
          <Route exact path="/listpatient" element={<ListPatient/>}/>
          <Route exact path="/additem" element={<AddItem/>}/>
          <Route exact path="/newdoctor" element={<NewDoctor/>}/>
          <Route exact path="/newdrug" element={<NewDrug/>}/>
          <Route exact path="/newuser" element={<NewUser/>}/>
          <Route exact path="/adminprofile/:userEmail" element={<AdminProfile/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/drugstock" element={<DrugStock/>}/>
          <Route exact path="/revanue" element={<Revanue/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/nurseappoint/:email" element={<NurseAppoint/>}/>
          <Route exact path="/nurseprofile/:nurseEmail" element={<NurseProfile/>}/>
          <Route exact path="/availabledrug" element={<AvailableDrug/>}/>
          <Route exact path="/issuedrug" element={<IssueDrugs/>}/>
          <Route exact path="/phamaprof/:phamaEmail" element={<PhamaProfile/>}/>
          <Route exact path="/manprof/:manEmail" element={<ManProfile/>}/>
          <Route exact path="/labprof/:labEmail" element={<LabProfile/>}/>
          <Route exact path="/recprofile/:recepEmail" element={<RecProfile/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/precribe/:id" element={<Prescribe/>}/>
          <Route exact path="/updoct/:id" element={<UpDoct/>}/>
          <Route exact path="/scheddoct" element={<SchedDoct/>}/>
          <Route exact path="/appointments" element={<Appointment/>}/>
          <Route exact path="/users" element={<SystemUsers/>}/>
          <Route exact path="/preports" element={<PatientReports/>}/>
          <Route exact path="/alldrugs" element={<AllDrugs/>}/>
          <Route exact path="/treat" element={<Treatments/>}/>
          <Route exact path="/trequest/:id" element={<TestRequest/>}/>
          <Route exact path="/appointnurse" element={<AppointNurse/>}/>
          <Route exact path="/nursedata" element={<Nursedata/>}/>
          <Route exact path="/printbill/:email" element={<PrintBill/>}/>
          <Route exact path="/doctorCdata" element={<DoctorChannelingData/>}/>
          <Route exact path="/issueddrug" element={<IssuedDrugs/>}/>
          <Route exact path="/mrdata" element={<MedicalReportData/>}/>
          <Route exact path="/opdpdata" element={<OpdPatientData/>}/>
          <Route exact path="/patdata" element={<PatientData/>}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;

//beautiful blue color: #007aff
