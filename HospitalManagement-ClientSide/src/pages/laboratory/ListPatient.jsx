import React, { useEffect, useState } from 'react'
import axios from "axios";
import SideBarLab from '../../components/SideBarLab'
import { useNavigate } from 'react-router-dom';

export default function ListPatient() {
    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');

    let navigate = useNavigate();

    const handleNavigate = (id) => {
      navigate(`/issuereport/${id}`);
    }
  
    const searchById = async () => {
      try {
        const response = await axios.get('http://localhost:8080/medicalReports/searchAll');
        setSearchResult(response.data); 
      } catch (error) {
        console.error('Error searching data', error);
        setMessage({ text: 'Error search a user', color: 'red' });
      }
    };
  
    useEffect(() => {
      searchById();
    }, []);
  
    //cancel remove patient from list
    const handleDelete = async (suId) => {
      try {
        const response = await axios.delete(`http://localhost:8080/medicalReports/delete/${suId}`);
        if (response.status === 200) {
          setMessage({ text: 'Patient was deleted successfully', color: 'green' });
          searchById();
        } else {
          setMessage({ text: 'Failed to cancel an delete user', color: 'red' });
          searchById();
        }
      } catch (error) {
        setMessage({ text: 'Error deleting user', color: 'red' });
      }
    };
  
  return (
    <div>
      <SideBarLab/>
      <div className='body-opd-content'>
        <div><span className='opd-reg-topic'>Pending Patients for tests</span></div>
          <div>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Report</th>
                        <th>Date</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Charge</th>
                        <th>Sample IS</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                {searchResult.length > 0 && (
                <tbody>
                    {searchResult.map((patient) => (
                    <tr>
                        <td>{patient.mRId}</td>
                        <td>{patient.patientName}</td>
                        <td>{patient.patientGender}</td>
                        <td>{patient.reportType}</td>
                        <td>{patient.reportDate}</td>
                        <td>{patient.patientAge}</td>
                        <td>{patient.patientEmail}</td>
                        <td>{patient.reportCharge}</td>
                        <td>{patient.sampleId}</td>
                        <td>
                            <button className='btn btn-warning mx-1' onClick={() => handleNavigate(patient.mRId)}>IS</button>
                            <button className='btn btn-danger' onClick={() => handleDelete(patient.mRId)}>D</button>
                        </td> 
                    </tr>
                    ))}
                </tbody>
                )}
            </table>
            </div>
        </div>
        <div className='button-fields-message'>
            { message && <div style={{ color: message.color }}>{message.text}</div>}
        </div>
    </div>
  )
}
