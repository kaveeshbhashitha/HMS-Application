import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarPharmaacy from '../../components/SideBarPharmaacy'

export default function PhamaProfile() {
  const {phamaEmail} = useParams();
  const [phamaData, setPhamaData] = useState('');

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser=async () => {
    const result = await axios.get(`http://localhost:8080/user/searchByEmail/${phamaEmail}`)
    setPhamaData(result.data)
  };
  return (
    <div>
      <SideBarPharmaacy/>
      <div className='doctor-box-set'>
            <div>Hello {phamaData.systemUserName}</div>
      </div>
      <div className='doctor-box-set'>
        <div className='phama-pic-pham'></div>
        <div className='dic-dec-box'>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Pharmacist's Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pharmacist's Service ID </td>
                  <td>{phamaData.userId}</td>
                </tr>
                <tr>
                  <td>Pharmacist's Name</td>
                  <td>{phamaData.systemUserName}</td>
                </tr>
                <tr>
                  <td>Pharmacist's Email</td>
                  <td>{phamaData.userEmail}</td>
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
