import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/opd.css'
import { useParams, useNavigate } from 'react-router-dom';

export default function UpDoct() {
    
    let navigate = useNavigate();

    const {id} = useParams();

    const [doctorData, setDoctorData] = useState({
      doctorId: '',
      doctorName: '',
      doctorEmail: '',
      doctorSpecialization: '',
      doctorCharge: '',
      doctorRoom: '',
    });

    const handleChange = (e) =>{
      doctorData({...doctorData,[e.target.name]:e.target.value})
    };

    useEffect(() => {
        loadUser()
    }, []);

    const onSubmit = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/doctor/update/${id}`, doctorData)
        navigate("/");
    };

    const loadUser=async () => {
        const result = await axios.get(`http://localhost:8080/doctor/searchById/${id}`)
        setDoctorData(result.data)
    };

  return (
    <div>
      <div className='button-fields-message'>
            <div></div>
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
          <button className='opd-operation-btn show-data' onClick={onSubmit}>Update</button>
          <button className='opd-operation-btn hide-data' >Clear</button>
        </div>
    </div>
  )
}

