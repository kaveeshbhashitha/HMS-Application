import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import '../../styles/manager.css'
import SideBarPatientData from '../../components/SideBarPatientData'

export default function IssuedDrugs() {

  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState('');
  
  const searchById = async () => {
    try {
      const response = await axios.get('http://localhost:8080/prescription/searchAll');
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
        <h3 className='text-primary font-weight-bold'>Issued drugs to patients</h3>
      </div>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='button-fields-message'>
          <button onClick={handlePrint} className='btn btn-danger mx-2'>Export as PDF</button>

          <ReactHTMLTableToExcel
            id="excelButton"
            className="btn btn-success"
            table="table-to-xls"
            filename="prescribedData"
            sheet="prescribedData"
            buttonText="Export as Excel"
          />
        </div>
      <div className='button-fields-message'>
          <table class="table table-hover" ref={componentRef} id="table-to-xls">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Patient</th>
                <th scope="col">D01</th>
                <th scope="col">D02</th>
                <th scope="col">D03</th>
                <th scope="col">D04</th>
                <th scope="col">D05</th>
                <th scope="col">D06</th>
                <th scope="col">D07</th>
              </tr>
            </thead>
            {searchResult.length > 0 && (
              <tbody>
                {searchResult.map((presc) => (
                  <tr>
                  <th scope="row">{presc.pRecId}</th>
                  <td>{presc.patientName}</td>
                  <td>{presc.drug01}</td>
                  <td>{presc.drug02}</td>
                  <td>{presc.drug03}</td>
                  <td>{presc.drug04}</td>
                  <td>{presc.drug05}</td>
                  <td>{presc.drug06}</td>
                  <td>{presc.drug07}</td>
                </tr>
                ))}
            </tbody>
            )}
          </table>
        </div>
    </div>
  )
}