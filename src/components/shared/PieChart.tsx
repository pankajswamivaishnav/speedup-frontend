// PieChart.tsx
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Yearly', 'Weekly', 'Monthly'],
  datasets: [
    {
      label: 'Total Bilties',
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4
    }
  ]
};
const options = {
  maintainAspectRatio: false
};
const PieChart: React.FC = () => {
  return (
    <div className="w-full md:w-[300px] h-[300px]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
