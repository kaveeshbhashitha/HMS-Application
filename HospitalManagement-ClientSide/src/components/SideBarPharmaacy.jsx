import React from 'react'
import { Link } from 'react-router-dom';

export default function SideBarPharmaacy() {
  return (
    <div>
      <div className='sidebar-body'>
        <div className='sidebar-topic'>
        <h4>MediHelp</h4>
        <h6>Hospital Private Limited</h6>
        <h6>Pharmasist</h6>
        <div className='topic-underline'></div>
        </div>

        <div className='buttonlist'>
            <Link className='navbarbutton' to={'/phamaprof/:phamaEmail'}>Pharmasist profile</Link>
            <Link className='navbarbutton' to={'/issuedrug'}>Issue Drugs</Link>
            <Link className='navbarbutton' to={'/availabledrug'}>Available Drugs</Link>
            <Link className='signout' to={'/'}><div className='button-text'>Sign out</div></Link>
        </div>
      </div>
    </div>
  )
}
