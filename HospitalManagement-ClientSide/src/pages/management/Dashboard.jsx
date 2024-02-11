import React, { useEffect, useState } from 'react'
import SideBarManage from '../../components/SideBarManage'
import RecordCountChart from '../../components/RecordCountChart'
import PaymentChartSeperate from '../../components/PaymentChartSeperate'
import UserRolePieChart from '../../components/UserRolePieChart'
import DrugStockChart from '../../components/DrugStockChart'
import '../../styles/manager.css'

export default function Dashboard() {
  const [medicalReportsCount, setMedicalReportsCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [emaployeeData, setEmployeeData] = useState(0);
  const [drugData, setDrugData] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const medicalReportsResponse = await fetch('http://localhost:8080/medicalReports/searchAll');
          const medicalReportsData = await medicalReportsResponse.json();
          setMedicalReportsCount(medicalReportsData.length);

          const systemUserResponse = await fetch('http://localhost:8080/user/searchAll');
          const staffData = await systemUserResponse.json();
          setEmployeeData(staffData.length);

          const drugsResponse = await fetch('http://localhost:8080/drugs/searchAll');
          const drugRecordData = await drugsResponse.json();
          setDrugData(drugRecordData.length);

          const doctorResponse = await fetch('http://localhost:8080/doctor/searchAll');
          const doctorData = await doctorResponse.json();
          setTotalData(doctorData.length);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

fetchData();
}, []);

  return (
    <div>
      <SideBarManage/>
      <div className='manager-box-set'>
        <h3 className='text-primary font-weight-bold'>Manager Dashboard</h3>
      </div>
      <div className='manager-box'>
        <div className='content-in-dash'> 
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Doctors</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{totalData} +</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Hospital Staff</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{emaployeeData} +</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Available Drugs</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{drugData} +</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Medical Services</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{medicalReportsCount} +</h2></div>
            </div>
        </div>
      </div>
      <div className='manager-box-set'>
        <div className='d-flex'>
          <div className='shadow graph-box mx-1'><RecordCountChart/></div>
          <div className='shadow graph-box'><UserRolePieChart/></div>
        </div>
        <div className='d-flex my-1'>
          <div className='shadow graph-box mx-1'><PaymentChartSeperate/></div>
          <div className='shadow graph-box'><DrugStockChart/></div>
        </div>
      </div>
    </div>
  )
}
