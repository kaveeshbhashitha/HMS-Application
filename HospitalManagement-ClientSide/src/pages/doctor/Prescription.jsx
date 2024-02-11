import React, { useEffect, useState } from 'react'
import SideBarDoctor from '../../components/SideBarDoctor'
import '../../styles/prescriptionDoc.css'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function Prescription() {
  const [isVisible, setIsVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [message, setMessage] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [prescData, setPrescData] = useState('');

  let navigate = useNavigate();

  const searchById = async () => {
    try {
      const response = await axios.get('http://localhost:8080/medicalReports/searchAll');
      setSearchResult(response.data); 
    } catch (error) {
      console.error('Error searching data', error);
      setMessage({ text: 'Error search a user', color: 'red' });
    }
  };
  
  let currentDate = new Date();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRole({
      ...selectedRole,
      [name]: value,
    });
  };

  const toggleVisibility1 = () => {
    setIsVisible(!isVisible);
    searchById();
  };
  const toggleVisibility2 = () => {
    setIsShow(!isShow);
  };

  const searchChannelingPatients = async () => {
    
    try {
      const response = await axios.get(`http://localhost:8080/appointments/searchByPatientEmail/${searchEmail}`);
      const data = response.data;
      if(data){
        setSearchResults(data);
        searchPrescData();
        setSearchEmail('');
        setMessage('');
      }else{
        setMessage({ text: 'No data for this patient email', color: 'red' });
      }
    } catch (error) {
      setMessage({ text: 'Error searching by patient email', color: 'red' });
    }
  };

  const searchPrescData = async () => {
    
    try {
      const response = await axios.get(`http://localhost:8080/prescription/searchByPatientEmail/${searchEmail}`);
      const data = response.data;
      setPrescData(data);
      setSearchEmail('');
    } catch (error) {
      setMessage({ text: 'Error searching by patient email', color: 'red' });
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/drugs/searchAll')
      .then(response => response.json())
      .then(data => {
        const drugs = data.map(drug => drug.drugName);
        const uniqueDrug = Array.from(new Set(drugs));
        setUserRoles(uniqueDrug);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  //insert data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/prescription/add', selectedRole);
      console.log('Prescription data inserted successfully:', response.data);
      setMessage({ text: 'Prescription data inserted successfully', color: 'green' });
      setSelectedRole({
        patientName: '',
        patientAge: '',
        patientEmail: '',
        doctorName: '',
        doctorNote: '',
        patientDiagnosis: '',
        drug01: '',
        drug02: '',
        drug03: '',
        drug04: '',
        drug05: '',
        drug06: '',
        drug07: '',
        drug08: '',
        drug09: '',
        drug10: '',
      });
    } catch (error) {
      console.error('Error inserting data:', error);
      setMessage({ text: 'Error inserting data', color: 'red' });
    }
  };
  //clear data inthe text boxes
  const handleCler = () => {
    setMessage('');
    setSelectedRole({
      patientName: '',
      patientAge: '',
      patientEmail: '',
      doctorName: '',
      doctorNote: '',
      patientDiagnosis: '',
      drug01: '',
      drug02: '',
      drug03: '',
      drug04: '',
      drug05: '',
      drug06: '',
      drug07: '',
      drug08: '',
      drug09: '',
      drug10: '',
    });
  };

  const handleNavigate = () => {
    navigate('/treat');
  }

  return (
    <div>
      <SideBarDoctor/>
      <div className='prescription-box-set'>
        <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='prescription-box-set prescription-search-area'>
        <input type="text" placeholder='Search prescription by email' className='presc-patient-search' value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}/>
        <button className='presc-patient-search-btn' onClick={searchChannelingPatients}>Search</button>
      </div>
      
      <div className='prescription-box-set'>
        <table>
          <thead className='table-heading-prescription'>
            <tr>
              <td>#</td>
              <td>Patient name</td>
              <td>Patient age</td>
              <td>Patient gender</td>
              <td>Patient email</td>
              <td>Check-in date</td>
              <td>Action</td>
            </tr>
          </thead>
          {searchResults.length > 0 && (
            <tbody>
            {searchResults.map((patient) => (
            <tr>
              <td>{patient.appId}</td>
              <td>{patient.patientName}</td>
              <td>{patient.patientAge}</td>
              <td>{patient.patientGender}</td>
              <td>{patient.patientEmail}</td>
              <td>{currentDate.toDateString()}</td>
              <td><Link className='btn btn-warning' to={`/trequest/${patient.appId}`}>Request</Link></td>
            </tr>
            ))}
          </tbody>
          )}
        </table>
      </div>
      <div className='prescription-box-set'>
        <span className='presc-topic'>Doctor description and prescription</span>
          <div className='d-flex justify-content-between'>
            <div className='sick-detail-input'>
              <label>Patient Name</label>
              <input type="text" placeholder='Patient name here' className='diagnosis-name' name='patientName' value={selectedRole.patientName} onChange={handleChange}/>
            </div>
            <div className='sick-detail-input'>
              <label>Patient Email</label>
              <input type="text" placeholder='Patient email here' className='diagnosis-name' name='patientEmail' value={selectedRole.patientEmail} onChange={handleChange}/>
            </div>
            <div className='sick-detail-input'>
              <label>Patient age</label>
              <input type="text" placeholder='Patient age here' className='diagnosis-name' name='patientAge' value={selectedRole.patientAge} onChange={handleChange}/>
            </div>
            <div className='sick-detail-input'>
              <label>Doctor name</label>
              <input type="text" placeholder='Doctor name here' className='diagnosis-name' name='doctorName' value={selectedRole.doctorName} onChange={handleChange}/>
            </div>
          </div>
          <div className='sick-detail-input'>
            <label>Enter patient diagnosis</label>
            <input type="text" placeholder='Patient diagnosis' className='diagnosis-name' name='patientDiagnosis' value={selectedRole.patientDiagnosis} onChange={handleChange}/>
          </div>
          <div className='sick-detail-input'>
            <label>Doctor notes</label>
            <textarea type="text" placeholder='Notes here..' className='doctor-notes' name='doctorNote' value={selectedRole.doctorNote} onChange={handleChange}/>
          </div>
          <div className='drug-name-set'>
            <div className='sick-detail-input'>
              <label>Drug 1</label>
              <select name='drug01' value={selectedRole.drug01} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 2</label>
              <select name='drug02' value={selectedRole.drug02} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 3</label>
              <select name='drug03' value={selectedRole.drug03} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 4</label>
              <select name='drug04' value={selectedRole.drug04} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='drug-name-set'>
            <div className='sick-detail-input'>
              <label>Drug 5</label>
              <select name='drug05' value={selectedRole.drug05} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 6</label>
              <select name='drug06' value={selectedRole.drug06} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 7</label>
              <select name='drug07' value={selectedRole.drug07} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 8</label>
              <select name='drug08' value={selectedRole.drug08} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='drug-name-set'>
            <div className='sick-detail-input'>
              <label>Drug 9</label>
              <select name='drug09' value={selectedRole.drug09} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 10</label>
              <select name='drug10' value={selectedRole.drug10} onChange={handleChange} className='drug-name-inputs'>
                <option value="">All</option>
                {userRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className='sick-detail-input'>
              <button className='button-doctor-help' onClick={toggleVisibility1}>{isVisible ? 'Hide reports' : 'Show Medical Reports'}</button>
            </div>
            <div className='sick-detail-input'>
              <button className='button-doctor-help' onClick={toggleVisibility2}>{isShow ? 'Hide details' : 'Show Additional Details'}</button>
            </div>
          </div>
      </div>
      <div className='prescription-button-set'>
        <button className='presc-operation-btn presc-record' onClick={handleSubmit}>Issue prescription</button>
        <button className='presc-operation-btn presc-review' onClick={handleNavigate}>Review prescription</button>
        <button className='presc-operation-btn presc-clear' onClick={handleCler}>Clear all</button>
      </div>

      {isVisible && (
        <div className='prescription-box-set'>
          <div className='mx-1 p-1'>
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Report type</th>
                <th scope="col">Charge Rs.</th>
                <th scope="col">Date</th>
                <th scope="col">Sample Id</th>
                </tr>
            </thead>
            {searchResult.length > 0 && (
            <tbody>
                {searchResult.map((report) => (
                <tr>
                <th scope="row">{report.mRId}</th>
                <td>{report.patientName}</td>
                <td>{report.patientAge}</td>
                <td>{report.patientGender}</td>
                <td>{report.patientEmail}</td>
                <td>{report.reportType}</td>
                <td>{report.reportCharge}</td>
                <td>{report.reportDate}</td>
                <td>{report.sampleId}</td>
                </tr>
                ))}
            </tbody>
            )}
            </table>
          </div>
        </div>
      )}
      {isShow && (
        <div className='prescription-box-set'>
          <div className='mx-1 p-1'>
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Diagnosis</th>
                <th scope="col">Doctor</th>
                <th scope="col">Note</th>
                <th scope="col">Drug-01</th>
                <th scope="col">Drug 02 Id</th>
              </tr>
            </thead>
            {prescData.length > 0 && (
            <tbody>
                {prescData.map((presc) => (
                <tr>
                  <th scope="row">{presc.pRecId}</th>
                  <td>{presc.patientName}</td>
                  <td>{presc.patientAge}</td>
                  <td>{presc.patientEmail}</td>
                  <td>{presc.patientDiagnosis}</td>
                  <td>{presc.doctorName}</td>
                  <td>{presc.doctorNote}</td>
                  <td>{presc.drug01}</td>
                  <td>{presc.drug02}</td>
                </tr>
                ))}
            </tbody>
            )}
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
