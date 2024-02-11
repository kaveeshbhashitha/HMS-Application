import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarNurse from '../../components/SideBarNurse'

export default function NurseProfile() {
  const {nurseEmail} = useParams();
  const [nurseData, setNurseData] = useState('');

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser=async () => {
    const result = await axios.get(`http://localhost:8080/user/searchByEmail/${nurseEmail}`)
    setNurseData(result.data)
  };

  const handleAlert = () => {
    alert("Request update directly from admin");
  };
  return (
    <div>
      <SideBarNurse/>
      <div className='doctor-box-set'>
            <div>Hello {nurseData.systemUserName}</div>
      </div>
      <div className='doctor-box-set'>
        <div className='nurse-pic-nur'></div>
        <div className='dic-dec-box'>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Nurse's Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nurse's Service ID </td>
                  <td>{nurseData.userId}</td>
                </tr>
                <tr>
                  <td>Nurse's Name</td>
                  <td>{nurseData.systemUserName}</td>
                </tr>
                <tr>
                  <td>Nurse's Email</td>
                  <td>{nurseData.userEmail}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='button-container-docp'>
            <button className='doc-up-rec-btn' onClick={handleAlert}>Request Update</button>
          </div>
          <Link className='btn btn-secondary mx-3' to={`/nurseappoint/${nurseEmail}`}>Appointments</Link>
        </div>
        
      </div>
    </div>
  )
}
