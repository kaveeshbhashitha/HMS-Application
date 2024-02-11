import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBarDoctor from '../../components/SideBarDoctor'
import '../../styles/doctorprofile.css'
import { useParams } from 'react-router-dom';

export default function DoctorProfile() {
  const {doctorEmail} = useParams();
  const [doctorData, setDoctorData] = useState('');

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser=async () => {
    const result = await axios.get(`http://localhost:8080/doctor/searchByDoctorEmail/${doctorEmail}`)
    setDoctorData(result.data)
  };

  return (
    <div>
        <SideBarDoctor/>
        <div className='doctor-box-set'>
            <div>Hello {doctorData.doctorName}</div>
        </div>
        <div className='doctor-box-set'>
          <div className='doc-pic-boc'></div>
          <div className='dic-dec-box'>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Doctor Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Doctor Service ID </td>
                    <td>{doctorData.doctorId}</td>
                  </tr>
                  <tr>
                    <td>Doctor Name</td>
                    <td>{doctorData.doctorName}</td>
                  </tr>
                  <tr>
                    <td>Doctor Specialization</td>
                    <td>{doctorData.doctorSpecialization}</td>
                  </tr>
                  <tr>
                    <td>Doctor Room</td>
                    <td>{doctorData.doctorRoom}</td>
                  </tr>
                  <tr>
                    <td>Doctor Email</td>
                    <td>{doctorData.doctorEmail}</td>
                  </tr>
                  <tr>
                    <td>Doctor Charge</td>
                    <td>Rs.{doctorData.doctorCharge}</td>
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
