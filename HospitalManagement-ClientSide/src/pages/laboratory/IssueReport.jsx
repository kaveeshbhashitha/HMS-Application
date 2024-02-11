import React, { useEffect, useState } from 'react';
import '../../styles/medicalreport.css'
import '../../styles/medicalreport.css'
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function IssueReport() {
    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');
    const{id} = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchResult({
          ...searchResult,
          [name]: value,
        });
    };

    const searchByPatientEmail = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/medicalReports/searchById/${id}`);
          const foundPatientData = response.data;
            if (foundPatientData) {
                setSearchResult(foundPatientData);
            } else {
                setMessage({ text: 'Patient not found', color: 'red' });
                setSearchResult({
                patientName: '',
                patientAge: '',
                patientEmail: '',
                patientGender: '',
                doctorName: '',
                reportType: '',
                partOfBody: '',
                });
            }
        } catch (error) {
          console.error('Error searching by patient email', error);
          setMessage({ text: 'Error searching by patient email', color: 'red' });
        }
    };

    useEffect(() => {
    searchByPatientEmail();
    }, []);

    const captureAndDownload = (email, id) => {
        const elementToCapture = document.getElementById('contentToCapture');

        html2canvas(elementToCapture)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${email}.pdf`);
            handleDelete(id);
        });
    };
    const handleClear = () => {
        setSearchResult({
            patientName: '',
            patientAge: '',
            patientEmail: '',
            patientGender: '',
            reportdate: '',
            reportType: '',
        });
    };

    //cancel remove patient from list
    const handleDelete = async (suId) => {
        try {
          const response = await axios.delete(`http://localhost:8080/medicalReports/delete/${suId}`);
          if (response.status === 200) {
            setMessage({ text: 'Patient was removed from test loby after test successfully', color: 'green' });
          } else {
            setMessage({ text: 'Failed to cancel an delete user', color: 'red' });
          }
        } catch (error) {
          setMessage({ text: 'Error deleting user', color: 'red' });
        }
      };

  return (
    <div className='justify-content-center'>
        <div className='issuereport-box-set'>
            <Link className='btn btn-secondary' to={'/listpatient'}>Back</Link> 
        </div>
      <div className='issuereport-box-set'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>  
      </div>
      <form id="contentToCapture">
        <br />
        <br />
        <div className='issuereport-box-set'>
            <h3 className='heaing-color'>MediHelp Hospitals (pvt). ltd</h3>
            <div>Medical report for {searchResult.reportType}</div>
        </div>
        <div className='issuereport-head'>
            <h5>Report content</h5>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h6>Patient name : <input type="text" className='test-report-input' placeholder='John Vernon' name="patientName" value={searchResult.patientName} onChange={handleChange}/></h6>
                        </td>
                        <td>
                            <input type="text" name='pname' className='test-report-input' placeholder='Report content-1'/> : <input type="text" name='pname' className='test-report-input' placeholder='John Vernon'/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Patient age : <input type="text" name="patientName" value={searchResult.patientAge} onChange={handleChange} className='test-report-input' placeholder='35'/></h6>
                        </td>
                        <td>
                            <input type="text" name='pname' className='test-report-input' placeholder='Report content-2'/> : <input type="text" name='pname' className='test-report-input' placeholder='John Vernon' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Patient gender : <select className='report-opd-textboc' name="patientName" value={searchResult.patientGender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select></h6>
                        </td>
                        <td>
                            <input type="text" name='pname' className='test-report-input' placeholder='Report content-3'/> : <input type="text" name='pname' className='test-report-input' placeholder='John Vernon'/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Issue date : <input type="date" name="patientName" value={searchResult.reportDate} onChange={handleChange} className='test-report-input'/></h6>
                        </td>
                        <td>
                            <input type="text" name='pname' className='test-report-input' placeholder='Report content-4'/> : <input type="text" name='pname' className='test-report-input' placeholder='John Vernon'/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Patient email : <input type="email" name="patientName" value={searchResult.patientEmail} onChange={handleChange} className='test-report-input' placeholder='john@gmail.com'/></h6>
                        </td>
                        <td>
                            <input type="text" name='pname' className='test-report-input' placeholder='Report content-5'/> : <input type="text" name='pname' className='test-report-input' placeholder='John Vernon'/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='issuereport-box-set'>
            <h5>Signature</h5>
            <br />
            <br />
            <br />
            <br />
            <h5>Date</h5>
            <br />
            <br />
        </div>
      </form>
      <div className='button-fields-pdf'>
            <button className='opd-operation-btn opd-update' onClick={handleClear}>Clear</button>
            <button className='opd-operation-btn opd-clear' onClick={() => captureAndDownload(searchResult.patientEmail, searchResult.mRId)}>Record</button>
        </div>
    </div>
  )
}
                        