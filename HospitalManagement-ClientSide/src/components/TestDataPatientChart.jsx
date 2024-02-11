import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const TestDataPatientChart = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/medicalReports/searchAll');
        const data = await response.json();

        const checkInData = data.map((patient) => ({
          date: new Date(patient.reportDate).toLocaleDateString(),
        }));

        const countByDate = checkInData.reduce((acc, patient) => {
          acc[patient.date] = (acc[patient.date] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(countByDate).map(([date, count]) => [date, count]);

        setPatientData(chartData);
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
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[['Date', 'Number of Check-Ins'], ...patientData]}
      options={{
        title: 'Patients Medical testing Over Time',
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Date',
        },
        vAxis: {
          title: 'Number of test check-ins',
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default TestDataPatientChart;