import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import useDropdown from '../Elements/DropdownButton';
import { useContext } from 'react';
import { colorTheme } from '../../../../App';
import tinycolor from 'tinycolor2';

const DonorChart = ({ title }) => {
  const [selectedTheme] = useContext(colorTheme);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  const BarOptions = {
    indexAxis: 'y',
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
        display: true,
      },
    },
  };
  const topDonors = Array.from({ length: 4 }, () => ({
    firstName: faker.name.firstName(),
    units: faker.datatype.number({ min: 0, max: 1000 }),
  }));
  const sortedData = topDonors.sort(( a, b) => b.units - a.units);
  const DonorData = {
    labels: sortedData.map((don) => don.firstName),
    datasets: [
      {
        data: sortedData.map((don) => don.units),
        backgroundColor: tinycolor(selectedTheme).toRgbString(),
        // backgroundColor: 'rgba(135, 206, 235, 1)',
      },
    ],
  };

  const { DropdownButton } = useDropdown({
    options: ['All', 'February', 'August', 'November'],
    defaultOption: 'All',
    onSelect: (selected) => {
      console.log(`Custom logic for ${selected}`);
    },
  });

  return (
    <div className={`col-span-2 md:col-span-2 lg:col-span-1 p-2 md:p-3 lg:p-5 bg-${selectedTheme}-50 rounded-md`}>
    <div className="flex flex-row justify-between items-center p-3">
      <p className='text-base font-semibold'>{ title }</p>
      <DropdownButton />
    </div>
    <Bar options={BarOptions} data={DonorData}/>
  </div>
  );
}
 
export default DonorChart;