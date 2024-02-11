import React, { useEffect, useState } from 'react'
import axios from "axios";
import SideBarPharmaacy from '../../components/SideBarPharmaacy'
import { Link } from 'react-router-dom';

export default function IssueDrugs() {
    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');

    const searchById = async () => {
        try {
        const response = await axios.get('http://localhost:8080/prescription/searchAll');
        setSearchResult(response.data); 
        } catch (error) {
        console.error('Error searching data', error);
        setMessage({ text: 'Error search a user', color: 'red' });
        }
    };

  useEffect(() => {
    searchById();
  }, []);

  return (
    <div>
      <SideBarPharmaacy/>
      <div className='button-fields-message'>
        <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Issue drugs</span></div>
            <div>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Diagnosis</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {searchResult.length > 0 && (
                <tbody>
                    {searchResult.map((presc) => (
                        <tr>
                            <th scope="row">{presc.pRecId}</th>
                            <td>{presc.patientName}</td>
                            <td>{presc.patientEmail}</td>
                            <td>{presc.patientEmail}</td>
                            <td>{presc.patientGender}</td>
                            <td>{presc.patientDiagnosis}</td>
                            <td>{presc.doctorName}</td>
                            <td><Link className='btn btn-primary' to={`/precribe/${presc.pRecId}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                </svg></Link>
                            </td>
                        </tr>
                        ))}
                </tbody>
                )}
            </table>
            </div>
        </div>
    </div>
  )
}
