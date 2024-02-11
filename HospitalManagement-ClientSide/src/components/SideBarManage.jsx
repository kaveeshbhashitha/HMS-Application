import React from 'react'
import { Link } from 'react-router-dom';

export default function SideBarManage() {
  return (
    <div>
      <div className='sidebar-body'>
        <div className='sidebar-topic'>
        <h4>MediHelp</h4>
        <h6>Hospital Private Limited</h6>
        <h6>Management</h6>
        <div className='topic-underline'></div>
        </div>

        <div className='buttonlist'>
            <Link className='navbarbutton' to={'/manprof/:manEmail'}>Manager profile</Link>
            <Link className='navbarbutton' to={'/dashboard'}>Dashboard</Link>
            <Link className='navbarbutton' to={'/drugstock'}>Drug stock</Link>
            <Link className='navbarbutton' to={'/revanue'}>Revanue</Link>
            <Link className='navbarbutton' to={'/staff'}>Hospital staff</Link>
            <Link className='navbarbutton' to={'/patdata'}>Patient Data</Link>
            <Link className='signout' to={'/'}><div className='button-text'>Sign out</div></Link>
        </div>
      </div>
    </div>
  )
}
