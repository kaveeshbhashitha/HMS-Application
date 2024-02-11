import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarRecap from '../../components/SideBarRecep'

export default function RecProfile() {
  const {recepEmail} = useParams();
  const [recepData, setRecepData] = useState('');

  const email = recepEmail;

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser=async () => {
    const result = await axios.get(`http://localhost:8080/user/searchByEmail/${email}`)
    setRecepData(result.data)
  };
  return (
    <div>
        <SideBarRecap/>
        <div className='doctor-box-set'>
            <div>Hello {recepData.systemUserName}</div>
        </div>
        <div className='doctor-box-set'>
          <div className='recep-pic-rec'></div>
          <div className='dic-dec-box'>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Receptionist's Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Receptionist's Service ID </td>
                    <td>{recepData.userId}</td>
                  </tr>
                  <tr>
                    <td>Receptionist's Name</td>
                    <td>{recepData.systemUserName}</td>
                  </tr>
                  <tr>
                    <td>Receptionist's Email</td>
                    <td>{recepData.userEmail}</td>
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
