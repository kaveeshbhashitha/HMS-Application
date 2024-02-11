import React from 'react'
import { Link } from 'react-router-dom';

export default function SideBarAdmin() {
  return (
    <div>
      <div className='sidebar-body'>
        <div className='sidebar-topic'>
        <h4>MediHelp</h4>
        <h6>Hospital Private Limited</h6>
        <h6>Admin</h6>
        <div className='topic-underline'></div>
        </div>

        <div className='buttonlist'>
            <Link className='navbarbutton' to={'/adminprofile/:adminEmail'}>Admin profile</Link>
            <Link className='navbarbutton' to={'/additem'}>Add new item</Link>
            <Link className='navbarbutton' to={'/newdoctor'}>Add new doctor</Link>
            <Link className='navbarbutton' to={'/scheddoct'}>Schedule doctor</Link>
            <Link className='navbarbutton' to={'/appointnurse'}>Appoint Nurse</Link>
            <Link className='navbarbutton' to={'/newdrug'}>Add new drug</Link>
            <Link className='navbarbutton' to={'/newuser'}>Add new user</Link>
            <Link className='signout' to={'/'}><div className='button-text'>Sign out</div></Link>
        </div>
      </div>
    </div>
  )
}
