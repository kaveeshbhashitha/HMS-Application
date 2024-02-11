import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import SideBarManage from '../../components/SideBarManage'
import PaymentChartSeperate from '../../components/PaymentChartSeperate'
import PaymentServiceTypeChart from '../../components/PaymentServiceTypeChart'
import '../../styles/manager.css'
import '../../styles/dashboard.css'

export default function Revanue() {

  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState('');
  const [totalCharges, setTotalCharges] = useState({
    hospitalCharge: 0,
    doctorCharges: 0,
    otherCharges: 0,
    reportCharge: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/payments/searchAll');
        const data = await response.json();

        // Calculate total charges
        const sumCharges = data.reduce(
          (acc, payment) => {
            acc.hospitalCharge += payment.hospitalCharge || 0;
            acc.doctorCharges += payment.doctorCharges || 0;
            acc.otherCharges += payment.otherCharges || 0;
            acc.reportCharge += payment.reportCharge || 0;
            return acc;
          },
          {
            hospitalCharge: 0,
            doctorCharges: 0,
            otherCharges: 0,
            reportCharge: 0,
          }
        );

        setTotalCharges(sumCharges);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const searchById = async () => {
    try {
      const response = await axios.get('http://localhost:8080/payments/searchAll');
      setSearchResult(response.data); 
    } catch (error) {
      console.error('Error searching data', error);
      setMessage({ text: 'Error search a user', color: 'red' });
    }
  };

  useEffect(() => {
    searchById();
  }, []);

  const handleDelete = async (payId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/payments/delete/${payId}`);
      if (response.status === 200) {
        setMessage({ text: 'Drug was deleted successfully', color: 'green' });
        searchById();
      } else {
        setMessage({ text: 'Failed to delete Drug', color: 'red' });
        searchById();
      }
    } catch (error) {
      setMessage({ text: 'Error deleting Drug', color: 'red' });
    }
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <SideBarManage/>
      <div className='manager-box-set'>
        <h3 className='text-primary font-weight-bold'>Income and Financial Statistics</h3>
      </div>
      <div className='manager-box'>
        <div className='content-in-dash'> 
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Hospital Charges</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{totalCharges.hospitalCharge}</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Doctor Charges</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{totalCharges.doctorCharges}</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Drugs Charges</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{totalCharges.otherCharges}</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Testing Charges</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{totalCharges.reportCharge}</h2></div>
            </div>
        </div>
      </div>
      <div className='manager-box-set justify-content-center'>
        <PaymentChartSeperate/>
        <PaymentServiceTypeChart/>
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
            filename="incomeData"
            sheet="incomeData"
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
                <th scope="col">Service</th>
                <th scope="col">Hospital</th>
                <th scope="col">Doctor</th>
                <th scope="col">Drugs</th>
                <th scope="col">Report</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {searchResult.length > 0 && (
              <tbody>
                {searchResult.map((pay) => (
                  <tr>
                  <th scope="row">{pay.payId}</th>
                  <td>{pay.patientName}</td>
                  <td>{pay.patientEmail}</td>
                  <td>{pay.serviceType}</td>
                  <td>{pay.hospitalCharge}</td>
                  <td>{pay.doctorCharges}</td>
                  <td>{pay.otherCharges}</td>
                  <td>{pay.reportCharge}</td>
                  <td>{pay.paymentDate}</td>
                  <td><button className='btn btn-warning' onClick={() => handleDelete(pay.payId)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                      </button>
                  </td>
                </tr>
                ))}
            </tbody>
            )}
          </table>
        </div>
    </div>
  )
}
