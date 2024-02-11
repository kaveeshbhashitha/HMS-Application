import React, { useState } from 'react'
import SideBar from '../../components/SideBarRecep'
import '../../styles/payments.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Payments() {
  const [serviceType, setServiceType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [doctorCharge, setDoctorCharge] = useState('');
  const [hospitalCharge, setHospitalCharge] = useState('');
  const [testCharge, setTestCharge] = useState('');
  const [totalCharge, setTotalCharge] = useState('');
  const [drugCharge, setDrugCharge] = useState('');
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if(serviceType === 'opd'){
        try {
            const response = await axios.get(`http://localhost:8080/patient/searchByPatientEmail/${searchText}`);
            const foundPatientData = response.data;
      
            if (foundPatientData) {
                setSearchResult(foundPatientData);
                setServiceType('');
                setSearchText('');
                setCheckInDate(foundPatientData.dateCheckIn);
                setDoctorCharge(foundPatientData.opdCharge);
                setHospitalCharge('00.00');
                setTestCharge('00.00');
                setDrugCharge('00.00');

                setTotalCharge(foundPatientData.opdCharge);

            } else {
              setMessage({ text: 'Patient not found', color: 'red' });
            }
        } catch (error) {
        setMessage({ text: 'Error searching patient data', color: 'red' });
        }
    }else if(serviceType === 'channeling'){
        try {
            const response = await axios.get(`http://localhost:8080/appointments/searchByPatientEmail/${searchText}`);
            const foundPatientData = response.data;
      
            if (foundPatientData) {
                setSearchResult(foundPatientData);
                setServiceType('');
                setSearchText('');
                setCheckInDate(foundPatientData.availableDate);
                setDoctorCharge(foundPatientData.doctorCharge);
                setHospitalCharge(foundPatientData.hospitalCharge);
                setTestCharge('00.00');
                setDrugCharge('00.00');

                const calculatedTotalCharge =
                    parseFloat(foundPatientData.doctorCharge) +
                    parseFloat(foundPatientData.hospitalCharge)

                setTotalCharge(calculatedTotalCharge.toFixed(2));

            } else {
              setMessage({ text: 'Patient not found', color: 'red' });
            }
        } catch (error) {
        setMessage({ text: 'Error searching patient data', color: 'red' });
        }
    }else if(serviceType === 'test'){
        try {
            const response = await axios.get(`http://localhost:8080/medicalReports/searchByPatientEmail/${searchText}`);
            const foundPatientData = response.data;
      
            if (foundPatientData) {
                setSearchResult(foundPatientData);
                setServiceType('');
                setSearchText('');
                setCheckInDate(foundPatientData.reportDate);
                setDoctorCharge('00.00');
                setHospitalCharge('1500.00');
                setTestCharge(foundPatientData.reportCharge);
                setDrugCharge('00.00');

                const calculatedTotalCharge =
                    parseFloat(foundPatientData.reportCharge) +
                    parseFloat('1500.00')

                setTotalCharge(calculatedTotalCharge.toFixed(2));

            } else {
              setMessage({ text: 'Patient not found', color: 'red' });
            }
        } catch (error) {
        setMessage({ text: 'Error searching patient data', color: 'red' });
        }
    }else if(serviceType === 'medicine'){
        try {
            const response = await axios.get(`http://localhost:8080/prescription/searchByPatientEmail/${searchText}`);
            const foundPatientData = response.data;
      
            if (foundPatientData) {
                setSearchResult(foundPatientData);
                setServiceType('');
                setSearchText('');
                setDoctorCharge('00.00');
                setHospitalCharge('00.00');
                setTestCharge('00.00');

                const now = new Date();
                const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                const randomDecimal = Math.floor(Math.random() * 100) / 100;

                const formattedRandomValue = `${randomNumber}${randomDecimal.toFixed(2)}`;

                setTotalCharge(formattedRandomValue);
                setDrugCharge(formattedRandomValue);
                setCheckInDate(formattedDate);

            } else {
              setMessage({ text: 'Patient not found', color: 'red' });
            }
        } catch (error) {
        setMessage({ text: 'Error searching patient data', color: 'red' });
        }
    }else if(serviceType === 'admit'){
        setMessage({ text: 'Admit patient operations not yet implemented', color: 'orange' });
    }else{
        setMessage({ text: 'Select service type for make a payment', color: 'red' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //form validation
    const isFormValid = Object.values(searchResult).every((value) => value !== '');
    if (!isFormValid) {
        setMessage({ text: 'All fields are required', color: 'red' });
        return;
    }
    try {
      const response = await axios.post('http://localhost:8080/payments/add', searchResult);
      
      console.log('Drug inserted successfully:', response.data);
      setMessage({ text: 'Drug inserted successfully', color: 'green' });
      handleClear();
      

    } catch (error) {
      console.error('Error inserting data:', error);
      setMessage({ text: 'Error inserting data', color: 'red' });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchResult({
      ...searchResult,
      [name]: value,
    });
  };

  const handleClear = () => {
    setSearchResult('');
    setCheckInDate('');
    setDoctorCharge('');
    setHospitalCharge('');
    setTestCharge('');
    setTotalCharge('');
    setDrugCharge('');
  };

  const handleNavigate = () => {
    navigate(`/printbill/${searchResult.patientEmail}`);
  };

  return (
    <div>
      <SideBar/>
      <div className='button-fields-message'>
        <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <form>
      <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Payments and hospital charges</span></div>
            <div className='search-field-opd'>
                <select className='search-textbox-opd mx-2' name="serviceType" value={searchResult.serviceType} onChange={(e) => setServiceType(e.target.value)}>
                    <option value="">Select payment service</option>
                    <option value="opd">OPD treatments</option>
                    <option value="channeling">Doctor Channeling</option>
                    <option value="test">Test services</option>
                    <option value="medicine">Medicine Charges</option>
                    <option value="admit">Hospital Admission</option>
                </select>
                <input className='search-textbox-opd mx-1' type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search medical report by email..' name='searchText'/>
                
                <button className='search-button-opd' onClick={handleSearch}>
                    <div className='search-sent-opd'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
                    </div><span className='search-but-opd-text'>Search</span>
                </button>
            </div>
            <div className='input-fields-labels'>
                <div className='left-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Patient Name</label>
                        <input className='input-opd-textboc' type="text" placeholder='Jahn Smith' value={searchResult.patientName} onChange={handleChange}/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Payment Date</label>
                        <input className='input-opd-textboc' type="text" placeholder='YYYY-MM-DD' value={checkInDate} onChange={handleChange}/>
                    </div>
                </div>
                <div className='right-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Patient Email</label>
                        <input className='input-opd-textboc' type="email" placeholder='john@gmail.com' value={searchResult.patientEmail} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className='charge-box-payment'>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Doctor Charge</label>
                  <input className='input-payment-textboc' type="text" value={doctorCharge}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Hospital Charge</label>
                  <input className='input-payment-textboc' type="email" value={hospitalCharge}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Report charge</label>
                  <input className='input-payment-textboc' type="text" value={testCharge}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Drug Charges</label>
                  <input className='input-payment-textboc' type="text" value={drugCharge}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Total Charge</label>
                  <input className='input-payment-textboc total-charge' type="text"  value={totalCharge}/>
              </div>
            </div>
        </div>
        <div className='button-fields-labels'>
            <button className='opd-operation-btn opd-record' onClick={handleSubmit}>Pay</button>
            <button className='opd-operation-btn opd-update' onClick={handleNavigate}>Print</button>
            <button className='opd-operation-btn opd-clear' onClick={handleClear}>Clear</button>
        </div>
        <div className='body-opd-content'>
            <div className='charge-box-payment'>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Doctor Charge</label>
                  <input className='input-payment-textboc' type="text" name='doctorCharges' placeholder='Rs.200.00' value={searchResult.doctorCharges} onChange={handleChange}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Hospital Charge</label>
                  <input className='input-payment-textboc' type="text" name='hospitalCharge' placeholder='Rs.200.00' value={searchResult.hospitalCharge} onChange={handleChange}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Report charge</label>
                  <input className='input-payment-textboc' type="text" name='reportCharge' placeholder='Rs.200.00' value={searchResult.reportCharge} onChange={handleChange}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Drug Charges</label>
                  <input className='input-payment-textboc' type="text" name='otherCharges' placeholder='Rs.200.00' value={searchResult.otherCharges} onChange={handleChange}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Confirm Date</label>
                  <input className='input-payment-textboc' type="text" name='paymentDate' placeholder='YYYY-MM-DD' value={searchResult.paymentDate} onChange={handleChange}/>
              </div>
              <div className='left-input-set'>
                  <label className='input-opd-label'>Confirm service</label>
                  <select className='input-payment-textboc' name="serviceType" value={searchResult.serviceType} onChange={handleChange}>
                    <option value="">Select payment service</option>
                    <option value="opd">OPD treatments</option>
                    <option value="channeling">Doctor Channeling</option>
                    <option value="test">Test services</option>
                    <option value="medicine">Medicine Charges</option>
                    <option value="admit">Hospital Admission</option>
                </select>
              </div>
            </div>
        </div>
        </form>
    </div>
  )
}
