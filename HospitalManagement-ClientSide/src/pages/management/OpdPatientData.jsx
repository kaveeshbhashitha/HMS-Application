import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import OpdPatientDataChart from '../../components/OpdPatientDataChart'
import '../../styles/manager.css'
import SideBarPatientData from '../../components/SideBarPatientData'

export default function OpdPatientData() {

  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState('');
  
  const searchById = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patient/searchAll');
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
        <h3 className='text-primary font-weight-bold'>OPD patient data</h3>
      </div>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='manager-box-set'>
        <OpdPatientDataChart/>
      </div>
      <div className='button-fields-message'>
          <button onClick={handlePrint} className='btn btn-danger mx-2'>Export as PDF</button>

          <ReactHTMLTableToExcel
            id="excelButton"
            className="btn btn-success"
            table="table-to-xls"
            filename="opdPatient"
            sheet="opdPatient"
            buttonText="Export as Excel"
          />
        </div>
      <div className='button-fields-message'>
          <table class="responsive-table" ref={componentRef} id="table-to-xls">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Patient</th>
                <th scope="col">Email</th>
                <th scope="col">Doctor</th>
                <th scope="col">Doctor Charge</th>
                <th scope="col">Hospital Charge</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            {searchResult.length > 0 && (
              <tbody>
                {searchResult.map((patient) => (
                  <tr>
                  <th scope="row">{patient.pId}</th>
                  <td>{patient.patientName}</td>
                  <td>{patient.patientEmail}</td>
                  <td>{patient.patientGender}</td>
                  <td>{patient.patientAge}</td>
                  <td>{patient.dateCheckIn}</td>
                  <td>{patient.opdCharge}</td>
                </tr>
                ))}
            </tbody>
            )}
          </table>
        </div>
    </div>
  )
}
