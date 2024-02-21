import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { useContext } from 'react';
import tinycolor from 'tinycolor2';
import { colorTheme } from '../../../../App';

const Verticalbarchart = () => {
  const [selectedTheme] = useContext(colorTheme);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const data = {
    labels: months,
    datasets: [
      { 
        label: 'Dataset 3',
        data: months.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: tinycolor(selectedTheme).toRgbString(),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div className={`col-span-2 md:col-span-2 lg:col-span-1 p-2 md:p-3 lg:p-5 bg-${selectedTheme}-50 rounded-md`}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Verticalbarchart;
