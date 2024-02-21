import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { useContext } from 'react';
import tinycolor from 'tinycolor2';
import { colorTheme } from '../../../../App';

const Linechart = () => {
  const [selectedTheme] = useContext(colorTheme);
  const days = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 
  ];

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Dataset 1',
        data: days.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: tinycolor(selectedTheme).toRgbString(),
      },
      {
        label: 'Dataset 2',
        data: days.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
      <Line data={data} options={options} />
    </div>
  );
};

export default Linechart;
