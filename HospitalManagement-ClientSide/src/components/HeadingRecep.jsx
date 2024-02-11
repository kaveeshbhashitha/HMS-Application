import React, { useState, useEffect } from 'react'
import '../styles/topbarrec.css'
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function HeadingRecep() {
  const [searchResults, setSearchResult] = useState('');
  const{email} = useParams;

  const searchById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/searchByEmail/${email}`);
      setSearchResult(response.data); 
    } catch (error) {
      console.error('Error searching data', error);
    }
  };

  useEffect(() => {
    searchById();
  }, []);

  return (
    <div>
      <div className='opd-body'>
        <div className='rec-heading-content'>
            <div className='welcome-rec'><div className='rec-user-icon'></div><span className='hi-text'>Hi! {searchResults.systemUserName}</span></div>
            <div><span className='hi-text'>Email: {searchResults.userEmail}</span></div>
            <div><button className='help-button'>Help</button></div>
        </div>
      </div>
    </div>
  )
}
