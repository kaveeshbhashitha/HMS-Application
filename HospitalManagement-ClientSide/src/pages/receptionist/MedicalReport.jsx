import React, { useState } from 'react'
import axios from "axios";
import SideBarRecep from '../../components/SideBarRecep'
import { useNavigate } from 'react-router-dom';

export default function MedicalReport() {
    const [message, setMessage] = useState(null);
    const [patientEmail, setPatientEmail] = useState('');
    const [searchResult, setSearchResult] = useState('');
    
    let navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchResult({
          ...searchResult,
          [name]: value,
        });
      };
      //insert data 
      const handleSubmit = async (e) => {
        e.preventDefault();
        //form validation
        const isFormValid = Object.values(searchResult).every((value) => value !== '');
        if (!isFormValid) {
            setMessage({ text: 'All fields are required', color: 'red' });
            return;
        }
        try {
          const response = await axios.post('http://localhost:8080/medicalReports/add', searchResult);
          
          console.log('Data inserted successfully:', response.data);
          setMessage({ text: 'Schedule added successfully', color: 'green' });
          handleNavigate();
          setSearchResult({
            patientName: '',
            patientAge: '',
            patientEmail: '',
            patientGender: '',
            reportCharge: '',
            reportType: '',
            reportDate: '',
            sampleId: '',
          });

        } catch (error) {
          console.error('Error inserting data:', error);
          setMessage({ text: 'Error inserting data', color: 'red' });
        }
      };

      //search report data by patient-email
    
      const searchByPatientEmail = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/medicalReports/searchByPatientEmail/${patientEmail}`);
          
          const foundPatientData = response.data;
          if (foundPatientData) {
            setSearchResult(foundPatientData);
            setMessage({ text: 'Patient  found', color: 'green' }); 
          } else {
            setMessage({ text: 'Patient not found', color: 'red' });
            setSearchResult({
                patientName: '',
                patientAge: '',
                patientEmail: '',
                patientGender: '',
                reportCharge: '',
                reportType: '',
                reportDate: '',
                sampleId: '',
              });
          }
        } catch (error) {
          console.error('Error searching by patient email', error);
          setMessage({ text: 'Error searching by patient email', color: 'red' });
        }
      };

      //clear data inthe text boxes
      const handleClear = () => {
        setSearchResult({
            patientName: '',
            patientAge: '',
            patientEmail: '',
            patientGender: '',
            reportCharge: '',
            reportType: '',
            reportDate: '',
            sampleId: '',
          });
        setMessage('');
        setPatientEmail('');
      };

      const handleNavigate = () => {
        navigate('/preports');
      };

  return (
    <div>
      <SideBarRecep/>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Medical Reports</span></div>
            <div className='search-field-opd'>
                <input className='search-textbox-opd' type="text" name='patientEmail' value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} placeholder='Search medical report by email..'/>
                
                <button className='search-button-opd' onClick={searchByPatientEmail}>
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
                            <input className='input-opd-textboc' type="text" name="patientName" value={searchResult.patientName} onChange={handleChange} placeholder='Jahn Smith'/>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Patient Gender</label>
                            <select className='input-opd-textboc' name="patientGender" value={searchResult.patientGender} onChange={handleChange}>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Report type</label>
                            <select className='input-opd-textboc' name="reportType" value={searchResult.reportType} onChange={handleChange}>
                                <option value="none">Select test type</option>
                                <option value="CT Scan">CT Scan - Rs.10000.00</option>
                                <option value="MRI Scan">MRI Scan - Rs.20000.00</option>
                                <option value="US Scan">US Scan - Rs.1500.00</option>
                                <option value="ECG Report">ECG Report - Rs.1000.00</option>
                                <option value="PET Scan">PET Scan - Rs.30000.00</option>
                                <option value="Urine Test for albumine">Urine Test for albumine - Rs.3000.00</option>
                                <option value="Urine Test for other protenes">Urine Test for other protenes - Rs.2000.00</option>
                                <option value="Blood Count Report">Blood Count Report - Rs.1000.00</option>
                                <option value="Blood Type Report">Blood Type Report - Rs.1600.00</option>
                                <option value="Blood Patlets Report">Blood Patlets Report - Rs.2000.00</option>
                                <option value="Other">Other - Rs.5000.00</option>
                            </select>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Date</label>
                            <input className='input-opd-textboc' type="text" name="reportDate" value={searchResult.reportDate} onChange={handleChange} placeholder='YYYY-MM-DD'/>
                        </div>
                    </div>
                    <div className='right-input-set'>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Patient Age</label>
                            <input className='input-opd-textboc' type="text" name="patientAge" value={searchResult.patientAge} onChange={handleChange} placeholder='##'/>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Patient Email</label>
                            <input className='input-opd-textboc' type="email" name="patientEmail" value={searchResult.patientEmail} onChange={handleChange} placeholder='john@gmail.com'/>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Report charge</label>
                            <input className='input-opd-textboc' type="text" name="reportCharge" value={searchResult.reportCharge} onChange={handleChange} placeholder='Rs.####.##'/>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Sample ID</label>
                            <input className='input-opd-textboc' type="text" name="sampleId" value={searchResult.sampleId} onChange={handleChange} placeholder='SAM123'/>
                        </div>
                    </div>
                </div>
            </form>

        </div>
        <div className='button-fields-labels'>
            <button className='opd-operation-btn opd-record' onClick={handleSubmit}>Record</button>
            <button className='opd-operation-btn opd-update' onClick={handleNavigate}>See All</button>
            <button className='opd-operation-btn opd-clear' onClick={handleClear}>Clear</button>
        </div>
    </div>
  )
}
