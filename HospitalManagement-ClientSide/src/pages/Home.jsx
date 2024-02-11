import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  
  return (
    <div className="d-flex">
        <div className='left-home-box'>
          <div className='text-on-home'>
            <h1>Welcome to,</h1>
            <h1 className='font-size-cahne'>MediHelp Hospital</h1>
            <h5>We care your life forever with love</h5>
            <div className='underline-border1'></div>
            <div className='underline-border2'></div>
            <div className='underline-border3'></div>
            <br />
            <div className='d-flex'>
              <Link className='btn btn-outline-primary' to={'/login'}>Get Started..!</Link>
            </div>
          </div>
        </div>
        <div className='right-home-box'></div>
    </div>
  )
}