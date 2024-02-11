import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const UserRolePieChart = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/searchAll');
        const data = await response.json();

        // Count occurrences of each userRole
        const roleCounts = data.reduce((acc, user) => {
          const role = user.userRole || 'Unknown';
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {});

        // Convert data to chart format
        const chartData = Object.entries(roleCounts).map(([role, count]) => [role, count]);

        setUserData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      width={'600px'}
      height={'500px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[['User Role', 'Count'], ...userData]}
      options={{
        title: 'Distribution of User Roles in the Hospital',
        chartArea: { width: '80%' },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default UserRolePieChart;
