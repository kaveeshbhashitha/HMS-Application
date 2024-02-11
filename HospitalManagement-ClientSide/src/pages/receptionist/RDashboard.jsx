import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import SideBar from '../../components/SideBarRecep'
import MyCalendar from '../../components/MyCalendar'
import '../../styles/rdashboard.css'

const localizer = momentLocalizer(moment);

export default function RDashboard() {
    const [appointments, setAppointments] = useState([]);
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

    useEffect(() => {
      // Fetch appointment data from your API
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/appointments/searchAll');
          const data = await response.json();
          setAppointments(data);
        } catch (error) {
          console.error('Error fetching appointment data:', error);
        }
      };

      fetchData();
    }, []);


  return (
    <div>
      <SideBar/>
      <div className='r-topic-date'>Progress of the day</div>
      <div className='r-dashboard-boxset'>
        <div className='r-box-cont'>
            <div className='box-icons-data'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-calendar-week-fill" viewBox="0 0 16 16">
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </div>
            <div className='data-value-r'>{appointmentsCount}</div>
        </div>
        <div className='r-box-cont'>
            <div className='box-icons-data'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2-pulse-fill" viewBox="0 0 16 16">
                <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
                <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z"/>
                </svg>
            </div>
            <div className='data-value-r'>{medicalReportsCount}</div>
        </div>
        <div className='r-box-cont'>
            <div className='box-icons-data'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-lungs-fill" viewBox="0 0 16 16">
                <path d="M8 1a.5.5 0 0 1 .5.5v5.243L9 7.1V4.72C9 3.77 9.77 3 10.72 3c.524 0 1.023.27 1.443.592.431.332.847.773 1.216 1.229.736.908 1.347 1.946 1.58 2.48.176.405.393 1.16.556 2.011.165.857.283 1.857.24 2.759-.04.867-.232 1.79-.837 2.33-.67.6-1.622.556-2.741-.004l-1.795-.897A2.5 2.5 0 0 1 9 11.264V8.329l-1-.715-1 .715V7.214c-.1 0-.202.03-.29.093l-2.5 1.786a.5.5 0 1 0 .58.814L7 8.329v2.935A2.5 2.5 0 0 1 5.618 13.5l-1.795.897c-1.12.56-2.07.603-2.741.004-.605-.54-.798-1.463-.838-2.33-.042-.902.076-1.902.24-2.759.164-.852.38-1.606.558-2.012.232-.533.843-1.571 1.579-2.479.37-.456.785-.897 1.216-1.229C4.257 3.27 4.756 3 5.28 3 6.23 3 7 3.77 7 4.72V7.1l.5-.357V1.5A.5.5 0 0 1 8 1Zm3.21 8.907a.5.5 0 1 0 .58-.814l-2.5-1.786A.498.498 0 0 0 9 7.214V8.33l2.21 1.578Z"/>
                </svg>
            </div>
            <div className='data-value-r'>{patientsCount}</div>
        </div>
        <div className='r-box-cont'>
            <div className='box-icons-data'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-virus" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v1.402c0 .511.677.693.933.25l.7-1.214a1 1 0 0 1 1.733 1l-.701 1.214c-.256.443.24.939.683.683l1.214-.701a1 1 0 0 1 1 1.732l-1.214.701c-.443.256-.262.933.25.933H15a1 1 0 1 1 0 2h-1.402c-.512 0-.693.677-.25.933l1.214.701a1 1 0 1 1-1 1.732l-1.214-.7c-.443-.257-.939.24-.683.682l.701 1.214a1 1 0 1 1-1.732 1l-.701-1.214c-.256-.443-.933-.262-.933.25V15a1 1 0 1 1-2 0v-1.402c0-.512-.677-.693-.933-.25l-.701 1.214a1 1 0 0 1-1.732-1l.7-1.214c.257-.443-.24-.939-.682-.683l-1.214.701a1 1 0 1 1-1-1.732l1.214-.701c.443-.256.261-.933-.25-.933H1a1 1 0 1 1 0-2h1.402c.511 0 .693-.677.25-.933l-1.214-.701a1 1 0 1 1 1-1.732l1.214.701c.443.256.939-.24.683-.683l-.701-1.214a1 1 0 0 1 1.732-1l.701 1.214c.256.443.933.261.933-.25V1a1 1 0 0 1 1-1Zm2 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM6 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5-3a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"/>
                </svg>
            </div>
            <div className='data-value-r'>{prescriptionsCount}</div>
        </div>
      </div>
      <div className='calandar-space'>
        <MyCalendar appointments={appointments} />
      </div>
    </div>
  )
}
