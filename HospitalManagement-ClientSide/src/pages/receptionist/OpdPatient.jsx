import React, { useState } from 'react'
import '../../styles/opd.css'
import SideBar from '../../components/SideBarRecep'
import axios from "axios";

export default function OpdPatient() {
    //object variables
    const [searchEmail, setSearchEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [patientData, setPatientData] = useState({
        patientName: '',
        patientAge: '',
        patientGender: '',
        patientEmail: '',
        dateCheckIn: '',
        opdCharge: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData({
          ...patientData,
          [name]: value,
        });
      };
      //insert data 
      const handleSubmit = async (e) => {
        e.preventDefault();
        //form validation
        const isFormValid = Object.values(patientData).every((value) => value !== '');
        if (!isFormValid) {
            setMessage({ text: 'All fields are required', color: 'red' });
            return;
        }
        try {
          const response = await axios.post('http://localhost:8080/patient/add', patientData);
          
          console.log('Data inserted successfully:', response.data);
          setMessage({ text: 'Data inserted successfully', color: 'green' });

          setPatientData({
            patientName: '',
            patientAge: '',
            patientGender: '',
            patientEmail: '',
            dateCheckIn: '',
            opdCharge: '',
          });

        } catch (error) {
          console.error('Error inserting data:', error);
          setMessage({ text: 'Error inserting data', color: 'red' });
        }
      };

      //search patient data by patient-email
      const handleChanges = (e) => {
        setSearchEmail(e.target.value);
      };

      const handleSearch = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.get(`http://localhost:8080/patient/searchByPatientEmail/${searchEmail}`);
          const foundPatientData = response.data;
    
          if (foundPatientData) {
            setPatientData(foundPatientData);
            setMessage(null); // Clear any previous error message
          } else {
            setMessage({ text: 'Patient not found', color: 'red' });
            setPatientData({
                patientName: '',
                patientAge: '',
                patientGender: '',
                patientEmail: '',
                dateCheckIn: '',
                opdCharge: '',
              });
          }
        } catch (error) {
          console.error('Error searching patient data:', error);
          setMessage({ text: 'Error searching patient data', color: 'red' });
          setPatientData({
            patientName: '',
            patientAge: '',
            patientGender: '',
            patientEmail: '',
            dateCheckIn: '',
            opdCharge: '',
          });
        }
      };
      //clear data inthe text boxes
      const handleCler = () => {
        setPatientData({
            patientName: '',
            patientAge: '',
            patientGender: '',
            patientEmail: '',
            dateCheckIn: '',
            opdCharge: '',
          });
        setMessage('');
      };

  return (
    <div>
        <SideBar/>
        <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
        </div>
        <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>OPD patient Registration</span></div>
            <div className='search-field-opd'>
                <input className='search-textbox-opd' type="text" placeholder='Search patient by email..' value={searchEmail} onChange={handleChanges}/>
                
                <button className='search-button-opd' onClick={handleSearch}>
                    <div className='search-sent-opd'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
                    </div><span className='search-but-opd-text'>Search</span>
                </button>

            </div>
            <form>
            <div className='input-fields-labels'>
                <div className='left-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Patient Name</label>
                        <input className='input-opd-textboc' type="text" name="patientName" value={patientData.patientName} onChange={handleChange} placeholder='Jahn Smith'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Patient Email</label>
                        <input className='input-opd-textboc' type="email" name="patientEmail" value={patientData.patientEmail} onChange={handleChange} placeholder='john@gmail.com'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Patient Gender</label>
                        <select className='input-opd-textboc' name="patientGender" value={patientData.patientGender} onChange={handleChange}>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className='right-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Patient Age</label>
                        <input className='input-opd-textboc' type="text" name="patientAge" value={patientData.patientAge} onChange={handleChange} placeholder='24Y'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Check-in Date</label>
                        <input className='input-opd-textboc' type="text" name="dateCheckIn" value={patientData.dateCheckIn} onChange={handleChange} placeholder='YYYY-MM-DD'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>OPD charge</label>
                        <select className='input-opd-textboc' name="opdCharge" value={patientData.opdCharge} onChange={handleChange}>
                            <option value="">Select treatment</option>
                            <option value="500.00">Day time treatments</option>
                            <option value="1000.00">Night time treatments</option>
                            <option value="1500.00">Emergency treatments</option>
                        </select>
                    </div>
                </div>
            </div>
            </form>
        </div>
        <div className='button-fields-labels'>
            <button className='opd-operation-btn opd-record' onClick={handleSubmit}>Record</button>
            <button className='opd-operation-btn opd-update' onClick={handleCler}>Clear</button>
        </div>
    </div>
  )
}
