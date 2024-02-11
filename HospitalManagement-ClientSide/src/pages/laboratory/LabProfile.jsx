import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarLab from '../../components/SideBarLab'
import '../../styles/doctorprofile.css'

export default function LabProfile() {

  const {labEmail} = useParams();
  const [labData, setLabData] = useState('');

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser=async () => {
    const result = await axios.get(`http://localhost:8080/user/searchByEmail/${labEmail}`)
    setLabData(result.data)
  };

  return (
    <div>
      <SideBarLab/>
      <div className='doctor-box-set'>
            <div>Hello {labData.systemUserName}</div>
        </div>
        <div className='doctor-box-set'>
          <div className='labora-pic-lab'></div>
          <div className='dic-dec-box'>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Lab technician's Information</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Lab technician's Service ID </td>
                    <td>{labData.userId}</td>
                  </tr>
                  <tr>
                    <td>Lab technician's Name</td>
                    <td>{labData.systemUserName}</td>
                  </tr>
                  <tr>
                    <td>Lab technician's Email</td>
                    <td>{labData.userEmail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='button-container-docp'>
            <button className='doc-up-rec-btn'>Request Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}
