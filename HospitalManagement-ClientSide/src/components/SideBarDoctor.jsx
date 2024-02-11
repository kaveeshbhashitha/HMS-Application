import React from 'react'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';

export default function SideBarDoctor() {
  return (
    <div>
        <div className='sidebar-body'>

          <div className='sidebar-topic'>
            <h4>MediHelp</h4>
            <h6>Hospital Private Limited</h6>
            <h6>Doctor</h6>
            <div className='topic-underline'></div>
          </div>

          <div className='buttonlist'>
              <Link className='navbarbutton' to={'/dprofile/:doctorEmail'}>Doctor Profile</Link>
              <Link className='navbarbutton' to={'/prescripe'}>Prescription</Link>
              <Link className='navbarbutton' to={'/treatment'}>Medical Treatments</Link>
              <Link className='navbarbutton' to={'/appoints'}>Appointments</Link>
              <Link className='signout' to={'/'}><div className='button-text'>Sign out</div></Link>
          </div>
        </div>
    </div>
  )
}
