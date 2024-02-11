import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBarRecep'
import '../../styles/opd.css'
import '../../styles/dchanneling.css'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'

export default function ChanelPatient() {

    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');
    
    const {id} = useParams();
    let navigate = useNavigate()

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
          const response = await axios.post('http://localhost:8080/appointments/add', searchResult);
          
          console.log('Data inserted successfully:', response.data);
          setMessage({ text: 'Appointment added successfully', color: 'green' });
          navigate("/appointments");

          setSearchResult({
            patientName: '',
            patientEmail: '',
            patientGender: '',
            patientAge: '',
            doctorName: '',
            doctorSpecialization: '',
            doctorEmail: '',
            doctorRoom: '',
            doctorCharge: '',
            hospitalCharge: '',
            availableTime: '',
            availableDate: '',
            appointmentNumber: '',
          });

        } catch (error) {
          console.error('Error inserting data:', error);
          setMessage({ text: 'Error inserting data', color: 'red' });
        }
      };

      //search doctor data by schedule id

      const searchById = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/schedule/searchById/${id}`);
          setSearchResult(response.data); 

        } catch (error) {
          console.error('Error searching by specialization:', error);
          setMessage({ text: 'Error search a doctor to make reservation', color: 'red' });
        }
      };

      useEffect(() => {
        searchById();
    }, []);

    //clear search results
    const clearHandle = () => {
        setSearchResult({
            patientName: '',
            patientEmail: '',
            patientGender: '',
            patientAge: '',
            doctorName: '',
            doctorSpecialization: '',
            doctorEmail: '',
            doctorRoom: '',
            doctorCharge: '',
            hospitalCharge: '',
            availableTime: '',
            availableDate: '',
            appointmentNumber: '',
        });
    } 

  return (
    <div>
      <SideBar/>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Doctor Channeling</span></div>
            <form>
                <div className='input-fields-labels'>
                    <div className='left-input-set'>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Patient Name</label>
                            <input className='input-opd-textboc' type="text" name="patientName" value={searchResult.patientName} onChange={handleChange} placeholder='John Snow'/>
                        </div>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Patient Email</label>
                            <input className='input-opd-textboc' type="email" name="patientEmail" value={searchResult.patientEmail} onChange={handleChange} placeholder='john@gmail.com'/>
                        </div>
                    </div>
                    <div className='right-input-set'>
                        <div className='left-input-set'>
                            <label className='input-opd-label'>Patient Age</label>
                            <input className='input-opd-textboc' type="text" name="patientAge" value={searchResult.patientAge} onChange={handleChange} placeholder='##'/>
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
                    </div>
                </div>
            </form>
        </div>
        <div className='button-fields-labels'>
            <button className='channel-operation-btn opd-record' onClick={handleSubmit}>Make Appointment</button>
            <button className='channel-operation-btn opd-update' onClick={clearHandle}>Clear</button>
        </div>
        <div className='content-box-dchanl'>
            <div className='first-chanel-box'>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Doctor name</label>
                    <input className='input-payment-textboc' type="text" name="doctorName" value={searchResult.doctorName} onChange={handleChange}/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Specialization</label>
                    <input className='input-payment-textboc' type="text" name="doctorSpecialization" value={searchResult.doctorSpecialization} onChange={handleChange}/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Doctor room</label>
                    <input className='input-payment-textboc' type="text" name="doctorRoom" value={searchResult.doctorRoom} onChange={handleChange}/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Doctor charge</label>
                    <input className='input-payment-textboc' type="text" name="doctorCharge" value={searchResult.doctorCharge} onChange={handleChange}/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Hospital charge</label>
                    <input className='input-payment-textboc' type="text" name="hospitalCharge" value={searchResult.hospitalCharge} onChange={handleChange}/>
                </div>
            </div>
            <div className='first-chanel-box'>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Appointment date</label>
                    <input className='input-payment-textboc' type="text" name="availableDate" value={searchResult.availableDate} onChange={handleChange}/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Appointment time</label>
                    <input className='input-payment-textboc' type="text" name="availableTime" value={searchResult.availableTime} onChange={handleChange}/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Appointment number</label>
                    <input className='input-payment-textboc' type="text" name="appointmentNumber" value={searchResult.schId+1} onChange={handleChange}/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'></label>
                    <input className='no-need-one' type="text"/>
                </div>
                <div className='left-input-set'>
                    <label className='input-opd-label'>Total charge</label>
                    <input className='input-payment-textboc' type="text" name="totalCharge" value={searchResult.doctorCharge+searchResult.hospitalCharge} onChange={handleChange}/>
                </div>
            </div>
        </div>
    </div>
  )
}
