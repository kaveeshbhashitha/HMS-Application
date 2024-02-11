import React, { useEffect, useState } from 'react'
import RecordCountChart from '../../components/RecordCountChart'
import SideBarPatientData from '../../components/SideBarPatientData'
import '../../styles/dashboard.css'

export default function PatientData() {
    const [appointmentsCount, setAppointmentsCount] = useState(0);
    const [medicalReportsCount, setMedicalReportsCount] = useState(0);
    const [patientsCount, setPatientsCount] = useState(0);
    const [prescriptionsCount, setPrescriptionsCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentsResponse = await fetch('http://localhost:8080/appointments/searchAll');
                const appointmentsData = await appointmentsResponse.json();
                setAppointmentsCount(appointmentsData.length);

                const medicalReportsResponse = await fetch('http://localhost:8080/medicalReports/searchAll');
                const medicalReportsData = await medicalReportsResponse.json();
                setMedicalReportsCount(medicalReportsData.length);

                const patientsResponse = await fetch('http://localhost:8080/patient/searchAll');
                const patientsData = await patientsResponse.json();
                setPatientsCount(patientsData.length);

                const prescriptionsResponse = await fetch('http://localhost:8080/prescription/searchAll');
                const prescriptionsData = await prescriptionsResponse.json();
                setPrescriptionsCount(prescriptionsData.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

    fetchData();
    }, []);
return (
    <div>
      <SideBarPatientData />
      <div className='manager-box-set'>
        <h3 className='text-primary font-weight-bold'>Patient data dashboard</h3>
      </div>
      <div className='manager-box'>
        <div className='content-in-dash'> 
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>OPD Patients</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{patientsCount}</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Doctor Channeling</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{appointmentsCount}</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Testing Services</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{medicalReportsCount}</h2></div>
            </div>
            <div className='dashboard-box shadow p-3 mb-5 bg-white rounded'>
                <div><h4 className='text-secondary'>Prescribed Patients</h4></div>
                <div><h2 className='text-secondary text-end font-weight-bold'>{prescriptionsCount}</h2></div>
            </div>
        </div>
        <RecordCountChart />
      </div>
    </div>
  )
}
