import { Chart as ChartJS, CategoryScale, LinearScale,PointElement, LineElement,  Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import useDropdown from '../Elements/DropdownButton';
import { useContext, useState } from 'react';
import { colorTheme } from '../../../../App';
import tinycolor from 'tinycolor2';

const PatientChart = ({ title }) => {
  const [selectedTheme] = useContext(colorTheme);
  const periods = {
    yearly: [
      '2020', '2021', '2022', '2023', '2024'
    ],
    monthly: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    daily: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 
    ]
  };
  const [labels, setLabels] = useState(periods.yearly);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );
  const patientChartOptions = {
    responsive: true,
    plugins: {
      legend: false,
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
  const PatientData = {
    labels,
    datasets: [
      {
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: tinycolor(selectedTheme).toRgbString(), 
      },
      {
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: tinycolor(selectedTheme).toRgbString(),
      },
    ],
  };

  const { DropdownButton } = useDropdown({
    options: ['Yearly', 'Monthly', 'Daily'],
    defaultOption: 'Yearly',
    onSelect: (selected) => {
      selected === 'Yearly' ?
        setLabels(periods.yearly) :
      selected === 'Monthly' ?
        setLabels(periods.monthly) :
        setLabels(periods.daily);
      console.log(`Custom logic for ${selected}`);
    },
  });

  return (
    <div className={`col-span-2 md:col-span-2 lg:col-span-1 p-2 md:p-3 lg:p-5 bg-${selectedTheme}-50 rounded-md`}>
    <div className="flex flex-row justify-between items-center p-3">
      <p className='text-base font-semibold'>{ title }</p>
      <DropdownButton />
    </div>
    <Line options={patientChartOptions} data={PatientData}/>
  </div>
  );
}
 
export default PatientChart;