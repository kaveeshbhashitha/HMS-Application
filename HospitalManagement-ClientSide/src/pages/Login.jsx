import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";

export default function Login() {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = () => {

    fetch(`http://localhost:8080/user/login?userEmail=${userEmail}&userPassword=${userPassword}`)
      .then((response) => {
        if (!response.ok) {
          throw new alert("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.length !== 0) {
          switch (userRole) {
            case "Doctor":
              navigate(`/dprofile/${userEmail}`);
              alert('Login successful as a Doctor!');
              break;
            case 'Nurse':
              navigate(`/nurseprofile/${userEmail}`);
              alert('Login successful as a Nurse!');
              break;
            case 'Receptionist':
              navigate(`/recprofile/${userEmail}`);
              alert('Login successful as a Receptionist!');
              break;
            case 'Admin':
              navigate(`/adminprofile/${userEmail}`);
              alert('Login successful as a Admin!');
              break;
            case 'Laboratory':
              navigate(`/labprof/${userEmail}`);
              alert('Login successful as a Laboratory technicien!');
              break;
            case 'Phamacy':
              navigate(`/phamaprof/${userEmail}`);
              alert('Login successful as a Pharmacist!');
              break;
            case 'Management':
              navigate(`/manprof/${userEmail}`);
              alert('Login successful as a Manager!');
              break;
            default:
              alert('Unknown user role');
              break;
          }
        } else {
          alert('Invalid username or password');
          setUserEmail('');
          setUserPassword('');
        }
      })
      .catch((error) => console.error('Error during login:', error));
  };
  const handleBack = ()=>{
    navigate('/');
  };

  const handleAlert = ()=>{
    alert("Ask login credentials from admin or managment")
  };

  return (
    <div className='containter-login'>
      <div className='second-container'>
        <div className='box-login box-one'></div>
        <div className='box-login box-two'>
          <div className='topic-head'>
            <div className='logo-and-headin'>
              <div className='hospital-logo'></div>
              <h3 className='heading-text'>MediHelp Hospital</h3>
            </div>
            <h6 className='seconfhead'>Login to get started</h6>
            <h4>Login</h4>
            <span>Login with your username and password</span>
            
            <div className='unserline-text'></div>

            <label className='label-login'>Username</label>
            <input type="email" placeholder='Enter your username...' className='input-login' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>

            <label className='label-login'>Password</label>
            <input type="password" placeholder='Enter your password...' className='input-login' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>

            <label className='label-login'>User Role</label>
            <select className='input-login' value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="">Select role</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Admin">Admin</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Phamacy">Phamacy</option>
                <option value="Management">Management</option>
            </select>

            <div className='buttonset'>
              <button className='btn-login login' onClick={handleLogin}>Login</button>
              <button className='btn-login cancel' onClick={handleBack}>Cancel</button>
            </div>
            <div className='fogot-pass'><h6 className='fogot-text'>Forgot password? </h6><button className='forgotbtn' onClick={handleAlert}>Click here</button></div>
          </div>
        </div>
      </div>
    </div>
  )
}
