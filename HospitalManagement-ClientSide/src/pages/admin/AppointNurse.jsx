import React, { useEffect, useState } from 'react'
import SideBarAdmin from '../../components/SideBarAdmin'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AppointNurse() {
  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

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
      const response = await axios.post('http://localhost:8080/nurseAppoint/add', searchResult);
      
      console.log('Nurse appointing successfully:', response.data);
      setMessage({ text: 'Nurse appointing successfully', color: 'green' });

      setSearchResult({
        userRole: '',
        nurseEmail: '',
        doctorName: '',
        roomNumber: '',
        addedDate: '',
        appointedTime: '',
      });

    } catch (error) {
      console.error('Error inserting data:', error);
      setMessage({ text: 'Error inserting data', color: 'red' });
    }
  };
  //clear data inthe text boxes
  const handleCler = () => {
    setSearchResult({
      userRole: '',
      nurseEmail: '',
      appointedDoctor: '',
      roomNumber: '',
      addedDate: '',
      appointedTime: '',
    });
    setMessage('');
  };

  //navigate
  const handleNavigate = () => {
    navigate('/nursedata');
  };

  useEffect(() => {
    fetch('http://localhost:8080/user/searchAll')
      .then(response => response.json())
      .then(data => {
        const nurseRoles = data
          .filter(user => user.userRole.includes('Nurse'))
          .map(nurse => nurse.systemUserName);

          setUserRoles(nurseRoles);
      })
      .catch(error => console.error('Error fetching nurse data:', error));
  }, []);

  return (
    <div>
        <SideBarAdmin/>
        <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
        </div>
        <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Appoint nurse for doctors</span></div>
            <form>
            <div className='input-fields-labels'>
                <div className='left-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Nurse's Name</label>
                        <select
                            name='userRole'
                            value={searchResult.userRole}
                            onChange={handleChange}
                            className='input-opd-textboc'
                            >
                            <option value="">All</option>
                            {userRoles.map((role, index) => (
                                    <option key={index} value={role}>
                                    {role}
                                    </option>
                            ))}
                        </select>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Appointed doctor</label>
                        <input className='input-opd-textboc' type="text" name='appointedDoctor' value={searchResult.appointedDoctor} onChange={handleChange} placeholder='Doctor name here'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Appointed time</label>
                        <input className='input-opd-textboc' type="text" name="appointedTime" value={searchResult.appointedTime} onChange={handleChange} placeholder='HH:MM'/>
                    </div>
                </div>
                <div className='right-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Nurse's Email</label>
                        <input className='input-opd-textboc' type="text" name="nurseEmail" value={searchResult.nurseEmail} onChange={handleChange} placeholder='nurse@gmail.com'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Room number</label>
                        <input className='input-opd-textboc' type="text" name="roomNumber" value={searchResult.roomNumber} onChange={handleChange} placeholder='###'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Appointed date</label>
                        <input className='input-opd-textboc' type="text" name="addedDate" value={searchResult.addedDate} onChange={handleChange} placeholder='YYYY-MM-DD'/>
                    </div>
                </div>
            </div>
            </form>
      </div>
        <div className='button-fields-labels p-2'>
          <button className='btn btn-success' onClick={handleSubmit}>Add drug</button>
          <button className='btn btn-primary mx-2' onClick={handleNavigate}>View drugs</button>
          <button className='btn btn-warning' onClick={handleCler}>Clear</button>
        </div>
    </div>
  )
}
