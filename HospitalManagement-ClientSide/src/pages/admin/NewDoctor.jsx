import React, { useEffect, useState} from 'react';
import axios from 'axios';
import '../../styles/opd.css'
import SideBarAdmin from '../../components/SideBarAdmin'
import { useNavigate } from "react-router-dom";

export default function NewDoctor() {
  const [showTable, setShowTable] = useState(false);
  const [message, setMessage] = useState(null);
    const [doctorData, setDoctorData] = useState({
        doctorId: '',
        doctorName: '',
        doctorEmail: '',
        doctorSpecialization: '',
        doctorCharge: '',
        doctorRoom: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({
          ...doctorData,
          [name]: value,
        });
      };
      //insert data 
      const handleSubmit = async (e) => {
        e.preventDefault();
        //form validation
        const isFormValid = Object.values(doctorData).every((value) => value !== '');
        if (!isFormValid) {
            setMessage({ text: 'All fields are required', color: 'red' });
            return;
        }
        try {
          const response = await axios.post('http://localhost:8080/doctor/add', doctorData);
          
          console.log('Data inserted successfully:', response.data);
          setMessage({ text: 'Data inserted successfully', color: 'green' });

          setDoctorData({
            doctorId: '',
            doctorName: '',
            doctorEmail: '',
            doctorSpecialization: '',
            doctorCharge: '',
            doctorRoom: '',
          });

        } catch (error) {
          console.error('Error inserting data:', error);
          setMessage({ text: 'Error inserting data', color: 'red' });
        }
      };
      //clear data inthe text boxes
      const handleCler = () => {
        setDoctorData({
          doctorId: '',
          doctorName: '',
          doctorEmail: '',
          doctorSpecialization: '',
          doctorCharge: '',
          doctorRoom: '',
        });
        setMessage('');
      };

      //show all doctors
      const ShowDataTable = () => {
        axios.get('http://localhost:8080/doctor/searchAll')
          .then(response => {
            setDoctorData(response.data);
            setShowTable(true);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };
    
      const closeTable = () => {
        setShowTable(false);
      };

      //delete doctor by id
      useEffect(()=>{
        ShowDataTable();
      }, []);

      const handleDelete = async (dId) => {
        try {
          const response = await axios.delete(`http://localhost:8080/doctor/delete/${dId}`);
          if (response.status === 200) {
            ShowDataTable();
            console.log('Doctor deleted successfully');
            setMessage({ text: 'Doctor deleted successfully', color: 'green' });
          } else {
            console.error('Failed to delete doctor');
            setMessage({ text: 'Failed to delete doctor', color: 'red' });
          }
        } catch (error) {
          console.error('Error deleting doctor', error);
          setMessage({ text: 'Error deleting doctor', color: 'red' });
        }
      };

      const navigate = useNavigate();

      const handleNext = (dId) => {
        navigate(`/pages/admin/updoc/${dId}`);
      };

  return (
    <div>
      <SideBarAdmin/>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
        </div>
        <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Add new doctor into system</span></div>
            <form>
            <div className='input-fields-labels'>
                <div className='left-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor ID</label>
                        <input className='input-opd-textboc' type="text" name="doctorId" value={doctorData.doctorId} onChange={handleChange} placeholder='D1234'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor Name</label>
                        <input className='input-opd-textboc' type="text" name="doctorName" value={doctorData.doctorName} onChange={handleChange} placeholder='Dr.John Smith'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor specialization</label>
                        <select className='input-opd-textboc' name="doctorSpecialization" value={doctorData.doctorSpecialization} onChange={handleChange}>
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
                    </div>
                </div>
                <div className='right-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor Email</label>
                        <input className='input-opd-textboc' type="text" name="doctorEmail" value={doctorData.doctorEmail} onChange={handleChange} placeholder='john@gmail.com'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor Charge</label>
                        <input className='input-opd-textboc' type="text" name="doctorCharge" value={doctorData.doctorCharge} onChange={handleChange} placeholder='####.##'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Doctor room</label>
                        <input className='input-opd-textboc' type="text" name="doctorRoom" value={doctorData.doctorRoom} onChange={handleChange} placeholder='##'/>
                    </div>
                </div>
            </div>
            </form>
        </div>
        <div className='button-fields-labels'>
          <button className='opd-operation-btn opd-record' onClick={ShowDataTable}>Show data</button>
          <button className='opd-operation-btn opd-update' onClick={closeTable}>Hide data</button>
          <button className='opd-operation-btn show-data' onClick={handleSubmit}>Record</button>
          <button className='opd-operation-btn hide-data' onClick={handleCler}>Clear</button>
        </div>
        {showTable && (
        <div className='button-fields-message'>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Speciality</th>
                <th>Email</th>
                <th>Room #</th>
                <th>Charge Rs.</th>
                <th>Action</th> 
              </tr>
            </thead>
            {doctorData.length > 0 && (
            <tbody>
              {doctorData.map((doctor) => (
                <tr key={doctor.did}>
                <td>{doctor.doctorId}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.doctorSpecialization}</td>
                <td>{doctor.doctorEmail}</td>
                <td>{doctor.doctorRoom}</td>
                <td>{doctor.doctorCharge}</td>
                <td className="d-flex">
                  <button type="button" class="btn btn-danger" onClick={() => handleDelete(doctor.dId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                  </button>
                  <div className='m-1'></div>
                  <button type="button" class="btn btn-warning" onClick={() => handleNext(doctor.dId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-sticky" viewBox="0 0 16 16">
                    <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z"/>
                    </svg>
                  </button>
                </td>
              </tr>
                ))}
          </tbody>
          )}
          </table>
        </div>
        )}

    </div>
  )
}

