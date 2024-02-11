import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const RecordCountChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsResponse = await fetch('http://localhost:8080/appointments/searchAll');
        const appointmentsData = await appointmentsResponse.json();

        const medicalReportsResponse = await fetch('http://localhost:8080/medicalReports/searchAll');
        const medicalReportsData = await medicalReportsResponse.json();

        const patientsResponse = await fetch('http://localhost:8080/patient/searchAll');
        const patientsData = await patientsResponse.json();

        const prescriptionsResponse = await fetch('http://localhost:8080/prescription/searchAll');
        const prescriptionsData = await prescriptionsResponse.json();

        const chartData = [
          ['Category', 'Number of Records'],
          ['Appointments', appointmentsData.length],
          ['Medical Reports', medicalReportsData.length],
          ['OPD Patients', patientsData.length],
          ['Prescriptions', prescriptionsData.length],
        ];

        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: 'Number Patient of Records in Hospital',
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Number of Records',
          minValue: 0,
        },
        vAxis: {
          title: 'Table',
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default RecordCountChart;
