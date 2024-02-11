import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const PaymentChartSeperate = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/payments/searchAll');
        const data = await response.json();

        const chartData = data.map((payment) => [
          payment.paymentDate,
          payment.hospitalCharge || 0,
          payment.doctorCharges || 0,
          payment.otherCharges || 0,
          payment.reportCharge || 0,
        ]);

        setPaymentData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      width={'800px'}
      height={'400px'}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Payment Date', 'Hospital Charge', 'Doctor Charges', 'Other Charges', 'Report Charge'],
        ...paymentData,
      ]}
      options={{
        title: 'Payment Breakdown Over Time',
        chartArea: { width: '70%' },
        hAxis: {
          title: 'Amount',
          minValue: 0,
        },
        vAxis: {
          title: 'Payment Date',
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default PaymentChartSeperate;

