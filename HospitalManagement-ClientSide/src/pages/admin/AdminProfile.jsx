import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBarAdmin from '../../components/SideBarAdmin'
import '../../styles/doctorprofile.css'
import { useParams } from 'react-router-dom';

export default function AdminProfile() {

  const {userEmail} = useParams();
  const [adminData, setAdminData] = useState('');

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser=async () => {
    const result = await axios.get(`http://localhost:8080/user/searchByEmail/${userEmail}`)
    setAdminData(result.data)
  };

  return (
    <div>
      <SideBarAdmin/>
      <div className='doctor-box-set'>
            <div>Hello {adminData.systemUserName}</div>
        </div>
        <div className='doctor-box-set'>
          <div className='admin-pic-ad'></div>
          <div className='dic-dec-box'>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Admin Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Admin Service ID </td>
                    <td>{adminData.userId}</td>
                  </tr>
                  <tr>
                    <td>Admin Name</td>
                    <td>{adminData.systemUserName}</td>
                  </tr>
                  <tr>
                    <td>Admin Email</td>
                    <td>{adminData.userEmail}</td>
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
