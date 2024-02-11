import React from 'react'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SideBarLab() {

  const navigate = useNavigate();

  const logoutUser = () => {
    navigate('/');
  }

  return (
    <div>
        <div className='sidebar-body'>

          <div className='sidebar-topic'>
            <h4>MediHelp</h4>
            <h6>Hospital Private Limited</h6>
            <h6>Laboratory</h6>
            <div className='topic-underline'></div>
          </div>

          <div className='buttonlist'>
              <Link className='navbarbutton' to={'/labprof/:labEmail'}>Profile</Link>
              <Link className='navbarbutton' to={'/listpatient'}>Listed Patient</Link>
              <Link className='navbarbutton' to={'/drequest'}>Doctor Request</Link>
              <Link className='navbarbutton' to={'/issuereport'}>Issue Report</Link>
              <button className='signout' onClick={logoutUser}><div className='button-text'>Sign out</div></button>
          </div>
        </div>
    </div>
  )
}
