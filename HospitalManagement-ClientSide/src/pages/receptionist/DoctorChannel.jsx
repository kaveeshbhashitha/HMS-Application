import React, { useState } from 'react'
import SideBar from '../../components/SideBarRecep'
import '../../styles/dchanneling.css'
import '../../styles/payments.css'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'

export default function DoctorChannel() {

    const [message, setMessage] = useState(null);
    const [specialization, setSpecialization] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [searchResult, setSearchResult] = useState('');

    let navigate = useNavigate();

    //search doctor data by patient-email
    const searchBySpecialization = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/schedule/searchBySpecialization/${specialization}`);
            const data = response.data;
      
            if (data.length === 0) {
              setMessage({ text: 'No doctors found with the specified specialization.', color: 'orange' });
            } else {
              setMessage({ text: 'Take this result for reservation', color: 'green' });
              setSearchResult(data);
            }
            setSpecialization('');
        } catch (error) {
          console.error('Error searching by specialization:', error);
          setMessage({ text: 'Error searching by specialization', color: 'red' });
        }
      };
    
      const searchByDoctorName = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/schedule/searchByDoctorName/${doctorName}`);
          const data = response.data;
      
            if (data.length === 0) {
              setMessage({ text: 'No doctors found with the specified specialization.', color: 'orange' });
            } else {
              setMessage({ text: 'Take this result for reservation', color: 'green' });
              setSearchResult(data);
            }
            setDoctorName('');
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
        }else if(doctorName === '' || specialization === ''){
          setMessage({ text: 'Select specilization or give doctor name to search a doctor to channeling', color: 'red' });
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

      const goToAppointments = () => {
        navigate('/appointments');
      }

  return (
    <div>
        <SideBar/>
        <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
        </div>
        <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Reserve time for doctor channeling</span></div>
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
            </div>
        <div className='button-fields-message'>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Speciality</th>
                <th>Email</th>
                <th>Room #</th>
                <th>Doctor Rs.</th>
                <th>Hospital Rs.</th> 
                <th>Date</th>
                <th>Time</th> 
                <th>#</th> 
                <th>Action</th> 
              </tr>
            </thead>
            {searchResult.length > 0 && (
            <tbody>
              {searchResult.map((doctor) => (
                <tr key={doctor.schId}>
                <td>{doctor.schId}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.doctorSpecialization}</td>
                <td>{doctor.doctorEmail}</td>
                <td>{doctor.doctorRoom}</td>
                <td>{doctor.doctorCharge}</td>
                <td>{doctor.hospitalCharge}</td>
                <td>{doctor.availableDate}</td>
                <td>{doctor.availableTime}</td>
                <td>{doctor.schId+1}</td>
                <td><Link className='btn btn-primary' to={`/pchanel/${doctor.schId}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg></Link>
                </td>
              </tr>
                ))}
          </tbody>
          )}
          </table>
        </div>
        <div className='button-fields-labels'>
            <button className='opd-operation-btn opd-record' onClick={goToAppointments}>Appointments</button>
            <button className='opd-operation-btn opd-update' onClick={handleCler}>Clear</button>
        </div>
    </div>
  )
}

