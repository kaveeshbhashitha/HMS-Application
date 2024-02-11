import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const DrugStockChart = () => {
  const [drugData, setDrugData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/drugs/searchAll');
        const data = await response.json();

        const chartData = data.map((drug) => [drug.drugName, drug.drugQuantity]);

        setDrugData(chartData);
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
      data={[['Drug Name', 'Available Quantity'], ...drugData]}
      options={{
        title: 'Drug Stock Availability',
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Available Quantity',
          minValue: 0,
        },
        vAxis: {
          title: 'Drug Name',
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default DrugStockChart;
