import React from 'react'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';

export default function SideBar() {

  return (
    <div>
        <div className='sidebar-body'>

          <div className='sidebar-topic'>
            <h4>MediHelp</h4>
            <h6>Hospital Private Limited</h6>
            <h6>Reception</h6>
            <div className='topic-underline'></div>
          </div>

          <div className='buttonlist'>
              <Link className='navbarbutton' to={'/rdashboard'}>Dashboard</Link>
              <Link className='navbarbutton' to={'/opd'}>OPD Patient</Link>
              <Link className='navbarbutton' to={'/recprofile/:recepEmail'}>Profile</Link>
              <Link className='navbarbutton' to={'/dchanel'}>Doctor Channeling</Link>
              <Link className='navbarbutton' to={'/hadmit'}>Hospital Admissions</Link>
              <Link className='navbarbutton' to={'/payment'}>Charges and Payments</Link>
              <Link className='navbarbutton' to={'/mreport'}>Medical Reports</Link>
              <Link className='navbarbutton' to={'/other'}>Other services</Link>
              <Link className='signout' to={'/'}><div className='button-text'>Sign out</div></Link>
          </div>
        </div>
    </div>
  )
}
