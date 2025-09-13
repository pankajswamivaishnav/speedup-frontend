import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Labels
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Data
const data = {
  labels,
  datasets: [
    {
      label: 'Commision',
      data: [320000, 590000, 400000, 81000, 560000, 55000, 400000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
};

// Options
const options = {
  responsive: true, // makes chart responsive
  maintainAspectRatio: false, // allows custom height & width
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Total Commision '
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const BarChart: React.FC = () => {
  return (
    <div className="w-full md:w-full lg:w-[600px] xl:w-[600px] h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
