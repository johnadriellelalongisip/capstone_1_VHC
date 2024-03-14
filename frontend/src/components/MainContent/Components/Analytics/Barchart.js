import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,  Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { useContext } from 'react';
import { colorTheme } from '../../../../App';
import tinycolor from 'tinycolor2';

const Linechart = () => {
  const [selectedTheme] = useContext(colorTheme);
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  const patientChartOptions = {
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
  const PatientData = {
    labels,
    datasets: [
      {
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: tinycolor(selectedTheme).toRgbString(), 
      }
    ],
  };

  return (
    <>
    <Bar options={patientChartOptions} data={PatientData}/>
    </>
  );
}
 
export default Linechart;