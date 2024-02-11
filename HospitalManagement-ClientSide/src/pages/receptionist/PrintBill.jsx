import React, { useState } from 'react'
import axios from "axios";
import { Link, useParams } from 'react-router-dom'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PrintBill() {

    const{email} = useParams();
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [totalCharge, setTotalCharge] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if(type === 'opd'){
            try {
                const response = await axios.get(`http://localhost:8080/patient/searchByPatientEmail/${email}`);
                const foundPatientData = response.data;
          
                if (foundPatientData) {
                    setSearchResult(foundPatientData);
                    setCheckInDate(foundPatientData.dateCheckIn);
                    setTotalCharge(foundPatientData.opdCharge);
    
                } else {
                  setMessage({ text: 'Patient not found', color: 'red' });
                }
            } catch (error) {
            setMessage({ text: 'Error searching patient data', color: 'red' });
            }
        }else if(type === 'channeling'){
            try {
                const response = await axios.get(`http://localhost:8080/appointments/searchByPatientEmail/${email}`);
                const foundPatientData = response.data;
          
                if (foundPatientData) {
                    setSearchResult(foundPatientData);

                    setCheckInDate(foundPatientData.availableDate);
    
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
        }else if(type === 'test'){
            try {
                const response = await axios.get(`http://localhost:8080/medicalReports/searchByPatientEmail/${email}`);
                const foundPatientData = response.data;
          
                if (foundPatientData) {
                    setSearchResult(foundPatientData);
                    setCheckInDate(foundPatientData.reportDate);
    
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
        }else if(type === 'medicine'){
            try {
                const response = await axios.get(`http://localhost:8080/prescription/searchByPatientEmail/${email}`);
                const foundPatientData = response.data;
          
                if (foundPatientData) {
                    setSearchResult(foundPatientData);
    
                    const now = new Date();
                    const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                    const randomDecimal = Math.floor(Math.random() * 100) / 100;
    
                    const formattedRandomValue = `${randomNumber}${randomDecimal.toFixed(2)}`;
    
                    setTotalCharge(formattedRandomValue);
                    setCheckInDate(formattedDate);
    
                } else {
                  setMessage({ text: 'Patient not found', color: 'red' });
                }
            } catch (error) {
            setMessage({ text: 'Error searching patient data', color: 'red' });
            }
        }else if(type === 'admit'){
            setMessage({ text: 'Admit patient operations not yet implemented', color: 'orange' });
        }else{
            setMessage({ text: 'Select service type for make a payment', color: 'red' });
        }
      };
      const captureAndDownload = () => {
        const elementToCapture = document.getElementById('contentToCapture');

        html2canvas(elementToCapture)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${searchResult.patientEmail}.pdf`);
        });
    };
    const handleDelete = () => {
        setSearchResult('');
        
    }

  return (
    <div className='justify-content-center'>
        <div className='issuereport-box-set'>
            <div className='search-field-opd'>
                <select className='search-textbox-opd mx-2' name="serviceType" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select payment service</option>
                    <option value="opd">OPD treatments</option>
                    <option value="channeling">Doctor Channeling</option>
                    <option value="test">Test services</option>
                    <option value="medicine">Medicine Charges</option>
                    <option value="admit">Hospital Admission</option>
                </select>
                
                <button className='search-button-opd my-2' onClick={handleSearch}>
                    <div className='search-sent-opd'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
                    </div><span className='search-but-opd-text'>Search</span>
                </button>

            </div>
            <Link className='btn btn-secondary' to={'/payment'}>Back</Link> 
        </div>
        <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      <form id="contentToCapture">
        <br />
        <br />
        <div className='issuereport-box-set'>
            <h3 className='heaing-color'>MediHelp Hospitals (pvt). ltd</h3>
            <div>Invoice for medical services</div>
        </div>
        <div className='issuereport-head'>
            <h5 className='text-center'>Invoice</h5>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h6>Patient name : <input type="text" className='test-report-input' value={searchResult.patientName}/></h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Patient email : <input type="email" name="patientName" className='test-report-input' value={searchResult.patientEmail}/></h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Patient gender : <input type="text" name="patientName"  className='test-report-input' value={searchResult.patientGender}/></h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Issue date : <input type="text"  className='test-report-input' value={checkInDate}/></h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Total charge : <input type="text" className='test-report-input' value={totalCharge}/></h6>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='issuereport-box-set'>
            <div>Medihelp Hospital</div>
            <div>Tel: 011-2920114 Email: medihelp.health@hospital.lk</div>
            <div>Kandy Rd. Dalugama, Kelaniya</div>
        </div>
      </form>
        <div className='button-fields-pdf my-1 p-2'>
            <button className='btn btn-primary mx-2' onClick={handleDelete}>Clear</button>
            <button className='btn btn-outline-primary' onClick={captureAndDownload}>Record</button>
        </div>
    </div>
  )
}
