import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarManage from '../../components/SideBarManage'
import '../../styles/doctorprofile.css'

export default function ManProfile() {
  const {manEmail} = useParams();
  const [manData, setManData] = useState('');

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser=async () => {
    const result = await axios.get(`http://localhost:8080/user/searchByEmail/${manEmail}`)
    setManData(result.data)
  };
  return (
    <div>
      <SideBarManage/>
      <div className='doctor-box-set'>
            <div>Hello {manData.systemUserName}</div>
        </div>
        <div className='doctor-box-set'>
          <div className='manger-pic-man'></div>
          <div className='dic-dec-box'>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Manager's Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Manager's Service ID </td>
                    <td>{manData.userId}</td>
                  </tr>
                  <tr>
                    <td>Manager's Name</td>
                    <td>{manData.systemUserName}</td>
                  </tr>
                  <tr>
                    <td>Manager's Email</td>
                    <td>{manData.userEmail}</td>
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
