import React, { useState } from 'react'
import axios from "axios";
import '../../styles/opd.css'
import SideBar from '../../components/SideBarAdmin'

export default function ScheduleDoctor() {
    const [message, setMessage] = useState(null);
    const [specialization, setSpecialization] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [searchResult, setSearchResult] = useState('');
    
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
          const response = await axios.post('http://localhost:8080/schedule/add', searchResult);
          
          console.log('Data inserted successfully:', response.data);
          setMessage({ text: 'Schedule added successfully', color: 'green' });

          setSearchResult({
            doctorName: '',
            doctorSpecialization: '',
            doctorEmail: '',
            doctorRoom: '',
            doctorCharge: '',
            hospitalCharge: '',
            availableTime: '',
            availableDate: '',
          });

        } catch (error) {
          console.error('Error inserting data:', error);
          setMessage({ text: 'Error inserting data', color: 'red' });
        }
      };

      //search doctor data by patient-email
      const searchBySpecialization = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/doctor/searchByDoctorSpecialization/${specialization}`);
          setSearchResult(response.data); 
          setSpecialization("");
        } catch (error) {
          console.error('Error searching by specialization:', error);
          setMessage({ text: 'Error searching by specialization', color: 'red' });
        }
      };
    
      const searchByDoctorName = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/doctor/searchByDoctorName/${doctorName}`);
          setSearchResult(response.data); 
          setDoctorName("");
        } catch (error) {
          console.error('Error searching by doctor name:', error);
          setMessage({ text: 'Error searching by doctor name', color: 'red' });
        }
      };
    
      const handleSearch = () => {
        if (specialization) {
          searchBySpecialization();

        } else if (doctorName) {
          searchByDoctorName();
        }
      };

      //clear data inthe text boxes
      const handleCler = () => {
        setSearchResult({
            doctorName: '',
            doctorSpecialization: '',
            doctorEmail: '',
            doctorRoom: '',
            doctorCharge: '',
            hospitalCharge: '',
            availableTime: '',
            availableDate: '',
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
            <div><span className='opd-reg-topic'>Schedule doctor for channelings</span></div>
            <div className='search-botton-set'>
                <div>
                    <input className='search-by-name' type="text" placeholder='Search by doctor name' value={doctorName} onChange={(e) => setDoctorName(e.target.value)}/>
                    <button className='search-btn-logo' onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
                <div>
                    <select className='search-by-name' name="doctorSpecialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                        <option value="">Select specialization</option>
                        <option value="Physician">Physician</option>
                        <option value="Anesthesiology">Anesthesiology</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Pediatric">Pediatric</option>
                        <option value="Chiropractic">Chiropractic</option>
                        <option value="Optometry">Optometry</option>
                        <option value="Radiology">Radiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Ophthalmology">Ophthalmology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Audiology">Audiology</option>
                        <option value="ENT">ENT</option>
                    </select>
                    <button className='search-btn-logo' onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <form>
            <div className='input-fields-labels'>
                <div className='left-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor Name</label>
                        <input className='input-opd-textboc' type="text" name="doctorName" value={searchResult.doctorName} onChange={handleChange} placeholder='Jahn Smith'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor Email</label>
                        <input className='input-opd-textboc' type="email" name="doctorEmail" value={searchResult.doctorEmail} onChange={handleChange} placeholder='john@gmail.com'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor charge</label>
                        <input className='input-opd-textboc' type="text" name="doctorCharge" value={searchResult.doctorCharge} onChange={handleChange} placeholder='####.##'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Available date</label>
                        <input className='input-opd-textboc' type="text" name="availableDate" value={searchResult.availableDate} onChange={handleChange} placeholder='YYYY-MM-DD'/>
                    </div>
                </div>

                <div className='right-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor specialization</label>
                        <input className='input-opd-textboc' type="text" name="doctorSpecialization" value={searchResult.doctorSpecialization} onChange={handleChange} placeholder='Cardiologist'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor room number</label>
                        <input className='input-opd-textboc' type="text" name="doctorRoom" value={searchResult.doctorRoom} onChange={handleChange} placeholder='###'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Hospital charge</label>
                        <input className='input-opd-textboc' type="text" name="hospitalCharge" value={searchResult.hospitalCharge} onChange={handleChange} placeholder='####.##'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Available time</label>
                        <input className='input-opd-textboc' type="text" name="availableTime" value={searchResult.availableTime} onChange={handleChange} placeholder='HH:MM AM/PM'/>
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




