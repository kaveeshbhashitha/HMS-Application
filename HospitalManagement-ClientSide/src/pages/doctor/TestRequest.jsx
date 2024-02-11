import React, { useEffect, useState } from 'react'
import axios from "axios";
import SideBarDoc from '../../components/SideBarDoctor'
import { useParams } from 'react-router-dom';

export default function TestRequest() {
    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');
    
    const{id} = useParams();

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
          const response = await axios.post('http://localhost:8080/doctorRequest/add', searchResult);
          
          console.log('Request sendding successfully', response.data);
          setMessage({ text: 'Request sendding successfully', color: 'green' });
          setSearchResult({
            patientName: '',
            patientAge: '',
            patientEmail: '',
            patientGender: '',
            doctorName: '',
            reportType: '',
            partOfBody: '',
          });

        } catch (error) {
          console.error('Error inserting data:', error);
          setMessage({ text: 'Error inserting data', color: 'red' });
        }
      };
    
      const searchByPatientEmail = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/appointments/searchById/${id}`);
          const foundPatientData = response.data;
          if (foundPatientData) {
            setSearchResult(foundPatientData);
          } else {
            setMessage({ text: 'Patient not found', color: 'red' });
            setSearchResult({
              patientName: '',
              patientAge: '',
              patientEmail: '',
              patientGender: '',
              doctorName: '',
              reportType: '',
              partOfBody: '',
              });
          }
        } catch (error) {
          console.error('Error searching by patient email', error);
          setMessage({ text: 'Error searching by patient email', color: 'red' });
        }
      };

      useEffect(() => {
        searchByPatientEmail();
      }, []);

      //clear data inthe text boxes
      const handleClear = () => {
        setSearchResult({
            patientName: '',
            patientAge: '',
            patientEmail: '',
            patientGender: '',
            doctorName: '',
            reportType: '',
            partOfBody: '',
          });
        setMessage('');
      };

  return (
    <div>
      <SideBarDoc/>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Medical Reports</span></div>
            
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
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Report type</label>
                            <select className='input-opd-textboc' name="reportType" value={searchResult.reportType} onChange={handleChange}>
                                <option value="none">Select test type</option>
                                <option value="CT Scan">CT Scane</option>
                                <option value="MRI Scan">MRI Scane</option>
                                <option value="US Scan">US Scane</option>
                                <option value="ECG Report">ECG Report</option>
                                <option value="PET Scan">PET Scane</option>
                                <option value="Urine Test for albumine">Urine Test for albumine</option>
                                <option value="Urine Test for other protenes">Urine Test for other protenes</option>
                                <option value="Blood Count Report">Blood Count Report</option>
                                <option value="Blood Type Report">Blood Type Report</option>
                                <option value="Blood Patlets Report">Blood Patlets Report</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Doctor name</label>
                            <input className='input-opd-textboc' type="email" name="doctorName" value={searchResult.doctorName} onChange={handleChange} placeholder='john@gmail.com'/>
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
                            <label className='input-opd-label'>Part of patient's body area</label>
                            <select className='input-opd-textboc' name="partOfBody" value={searchResult.partOfBody} onChange={handleChange}>
                                <option value="none">Select body area</option>
                                <option value="Arm">Arm</option>
                                <option value="Legn">Leg</option>
                                <option value="Head">Head</option>
                                <option value="Stomatch">Stomatch</option>
                                <option value="Blood">Blood</option>
                                <option value="Urine">Urine</option>
                                <option value="Heart">Heart</option>
                                <option value="Liver">Liver</option>
                                <option value="Kidney">Kidney</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>

        </div>
        <div className='button-fields-labels'>
            <button className='opd-operation-btn opd-record' onClick={handleSubmit}>Record</button>
            <button className='opd-operation-btn opd-update' onClick={handleClear}>Clear</button>
        </div>
    </div>
  )
}
