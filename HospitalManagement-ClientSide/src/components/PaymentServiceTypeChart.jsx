import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const PaymentServiceTypeChart = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/payments/searchAll');
        const data = await response.json();

        // Group data by serviceType
        const groupedData = data.reduce((acc, payment) => {
          const serviceType = payment.serviceType || 'Unknown';
          if (!acc[serviceType]) {
            acc[serviceType] = {
              hospitalCharge: 0,
              doctorCharges: 0,
              otherCharges: 0,
              reportCharge: 0,
            };
          }
          acc[serviceType].hospitalCharge += payment.hospitalCharge || 0;
          acc[serviceType].doctorCharges += payment.doctorCharges || 0;
          acc[serviceType].otherCharges += payment.otherCharges || 0;
          acc[serviceType].reportCharge += payment.reportCharge || 0;

          return acc;
        }, {});

        // Convert grouped data to chart format
        const chartData = Object.entries(groupedData).map(([serviceType, charges]) => [
          serviceType,
          charges.hospitalCharge,
          charges.doctorCharges,
          charges.otherCharges,
          charges.reportCharge,
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
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Service Type', 'Hospital Charge', 'Doctor Charges', 'Other Charges', 'Report Charge'],
        ...paymentData,
      ]}
      options={{
        title: 'Payment Breakdown by Service Type',
        chartArea: { width: '70%' },
        hAxis: {
          title: 'Service Type',
        },
        vAxis: {
          title: 'Amount',
          minValue: 0,
        },
        isStacked: true,
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default PaymentServiceTypeChart;
