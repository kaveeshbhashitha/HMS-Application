import React, { useState } from 'react'
import SideBarAdmin from '../../components/SideBarAdmin'
import '../../styles/opd.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewUser() {

  const [message, setMessage] = useState(null);
  const [user, setUser] = useState('');

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  //insert data 
  const handleSubmit = async (e) => {
    e.preventDefault();
    //form validation
    const isFormValid = Object.values(user).every((value) => value !== '');
    if (!isFormValid) {
        setMessage({ text: 'All fields are required', color: 'red' });
        return;
    }
    try {
      const response = await axios.post('http://localhost:8080/user/add', user);
      
      console.log('User inserted successfully:', response.data);
      setMessage({ text: 'User inserted successfully', color: 'green' });

      setUser({
        userId: '',
        systemUserName: '',
        userEmail: '',
        userRole: '',
        userPassword: '',
      });

    } catch (error) {
      console.error('Error inserting data:', error);
      setMessage({ text: 'Error inserting data', color: 'red' });
    }
  };
  //clear data inthe text boxes
  const handleCler = () => {
    setUser({
      userId: '',
      systemUserName: '',
      userEmail: '',
      userRole: '',
      userPassword: '',
    });
    setMessage('');
  };

  //navigate
  const handleNavigate = () => {
    navigate('/users');
  }
  return (
    <div>
      <SideBarAdmin/>
      <div className='button-fields-message'>
          <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>

      <div className='body-opd-content'>
        <div><span className='opd-reg-topic'>Add new user into system</span></div>
          <form>
          <div className='input-fields-labels'>
              <div className='left-input-set'>
                  <div className='left-input-set'>
                      <label className='input-opd-label'>User ID</label>
                      <input className='input-opd-textboc' type="text" name="userId" value={user.userId} onChange={handleChange} placeholder='D1234'/>
                  </div>
                  <div className='left-input-set'>
                      <label className='input-opd-label'>Employee Email</label>
                      <input className='input-opd-textboc' type="text" name="userEmail" value={user.userEmail} onChange={handleChange} placeholder='john@gmail.com'/>
                  </div>
                  <div className='left-input-set'>
                      <label className='input-opd-label'>Employee role</label>
                      <select className='input-opd-textboc' name="userRole" value={user.userRole} onChange={handleChange}>
                          <option value="">Select role</option>
                          <option value="Receptionist">Receptionist</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Nurse">Nurse</option>
                          <option value="Admin">Admin</option>
                          <option value="Laboratory">Laboratory</option>
                          <option value="Phamacy">Phamacy</option>
                          <option value="Management">Management</option>
                      </select>
                  </div>
              </div>
              <div className='right-input-set'>
                  <div className='left-input-set'>
                      <label className='input-opd-label'>Employee Name</label>
                      <input className='input-opd-textboc' type="text" name="systemUserName" value={user.systemUserName} onChange={handleChange} placeholder='Ann Perera'/>
                  </div>
                  <div className='left-input-set'>
                      <label className='input-opd-label'>Password</label>
                      <input className='input-opd-textboc' type="text" name="userPassword" value={user.userPassword} onChange={handleChange} placeholder='####.##'/>
                  </div>
              </div>
          </div>
          </form>
      </div>
      <div className='button-fields-labels p-2'>
        <button className='btn btn-success' onClick={handleSubmit}>Add user</button>
        <button className='btn btn-primary mx-2' onClick={handleNavigate}>View users</button>
        <button className='btn btn-warning' onClick={handleCler}>Clear</button>
      </div>
    </div>
  )
}
