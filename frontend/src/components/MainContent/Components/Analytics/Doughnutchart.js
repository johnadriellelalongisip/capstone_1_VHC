import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colorTheme } from '../../../../App';
import faker from 'faker';

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnutchart = () => {
  const [selectedTheme] = useContext(colorTheme);
  // const years = [
  //   '2020', '2021', '2022', '2023', '2024'
  // ];
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true,
      },
    }
  };

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: Array.from({ length: 6 }, () => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`col-span-2 md:col-span-2 lg:col-span-1 p-2 md:p-3 lg:p-5 bg-${selectedTheme}-50 rounded-md`}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Doughnutchart;
