import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import TestDataPatientChart from '../../components/TestDataPatientChart'
import '../../styles/manager.css'
import SideBarPatientData from '../../components/SideBarPatientData'

export default function MedicalReportData() {

  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState('');
  
  const searchById = async () => {
    try {
      const response = await axios.get('http://localhost:8080/medicalReports/searchAll');
      setSearchResult(response.data); 
    } catch (error) {
      console.error('Error searching data', error);
      setMessage({ text: 'Error search a user', color: 'red' });
    }
  };

  useEffect(() => {
    searchById();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <SideBarPatientData/>
      <div className='manager-box-set'>
        <h3 className='text-primary font-weight-bold'>Pending patients for medical reports and services</h3>
      </div>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='manager-box-set'>
        <TestDataPatientChart/>
      </div>
      <div className='button-fields-message'>
          <button onClick={handlePrint} className='btn btn-danger mx-2'>Export as PDF</button>

          <ReactHTMLTableToExcel
            id="excelButton"
            className="btn btn-success"
            table="table-to-xls"
            filename="medicalReport"
            sheet="medicalReport"
            buttonText="Export as Excel"
          />
        </div>
      <div className='button-fields-message'>
      <table class="responsive-table" ref={componentRef} id="table-to-xls">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Report</th>
                        <th>Date</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Charge</th>
                        <th>Sample IS</th>
                    </tr>
                </thead>
                {searchResult.length > 0 && (
                <tbody>
                    {searchResult.map((patient) => (
                    <tr>
                        <td>{patient.mRId}</td>
                        <td>{patient.patientName}</td>
                        <td>{patient.patientGender}</td>
                        <td>{patient.reportType}</td>
                        <td>{patient.reportDate}</td>
                        <td>{patient.patientAge}</td>
                        <td>{patient.patientEmail}</td>
                        <td>{patient.reportCharge}</td>
                        <td>{patient.sampleId}</td>
                    </tr>
                    ))}
                </tbody>
                )}
            </table>
        </div>
    </div>
  )
}