import React from 'react'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SideBarPatientData() {

  const navigate = useNavigate();

  const logoutUser = () => {
    navigate('/dashboard');
  };

  return (
    <div>
        <div className='sidebar-body'>

          <div className='sidebar-topic'>
            <h4>MediHelp</h4>
            <h6>Hospital Private Limited</h6>
            <h6>Patient Data</h6>
            <div className='topic-underline'></div>
          </div>

          <div className='buttonlist'>
              <Link className='navbarbutton' to={'/patdata'}>Patient Dashboard</Link>
              <Link className='navbarbutton' to={'/opdpdata'}>OPD Patients</Link>
              <Link className='navbarbutton' to={'/doctorCdata'}>Channeling Patient</Link>
              <Link className='navbarbutton' to={'/mrdata'}>Testing Patients</Link>
              <Link className='navbarbutton' to={'/issueddrug'}>Prescribed Patients</Link>
              <button className='signout' onClick={logoutUser}><div className='button-text'>Go Back</div></button>
          </div>
        </div>
    </div>
  )
}
