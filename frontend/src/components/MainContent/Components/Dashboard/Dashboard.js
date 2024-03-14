import React, { useContext } from 'react';
import faker from 'faker';

import Header from "../../Header";

import { useLocation } from "react-router-dom";

import { MdEmergency, MdPeopleAlt, MdBloodtype, MdDashboard } from "react-icons/md";
import { RiNurseFill } from "react-icons/ri";
import PatientChart from './PatientChart';
import DonorChart from './DonorChart';
import { colorTheme } from '../../../../App';

const DashIcon = ({ Icon, title, value }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedTheme, setSelectedTheme] = useContext(colorTheme);

  return (
    <div className={`p-4 bg-${selectedTheme}-50 flex flex-row rounded-md`}>
      <div className="flex flex-col px-2 gap-2">
        <Icon className={`text-${selectedTheme}-600 w-6 h-6`}/>
        <p className="text-normal md:text-lg lg:text-xl font-normal text-slate-600 w-full">
          { title }
        </p>
      </div>
      <div className="flex w-full items-center justify-end">
        <p className="text-3xl font-semibold text-slate-600">
          { value }
        </p>
      </div>
    </div>
  )
};

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedTheme, setSelectedTheme] = useContext(colorTheme);

  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <Header title={ title } icon={<MdDashboard />}/>
        <div className="min-h-[80vh] h-[80vh] overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 col-span-2 gap-2 justify-between items-start">

              <DashIcon Icon={MdPeopleAlt} title="Patients" value={faker.datatype.number({ min: 0, max: 500 })}/>
              <DashIcon Icon={RiNurseFill} title="Staff" value={faker.datatype.number({ min: 0, max: 500 })}/>
              <DashIcon Icon={MdEmergency} title="Emergency" value={faker.datatype.number({ min: 0, max: 500 })}/>
              <DashIcon Icon={MdBloodtype} title="Donated" value={faker.datatype.number({ min: 0, max: 500 })}/>

            </div>

            <PatientChart title="Patient Frequency"/>
            <DonorChart title="Most Frequent Donor"/>

            <div className={`col-span-2 bg-${selectedTheme}-50 rounded-md`} >
              <div className="p-4">

                <table className="w-full h-full text-left">
                  <thead className='border-b-2 border-solid border-slate-500'>
                    <tr className='text-slate-500 font-bold text-base table-fixed text-nowrap'>
                      <th>Nurse</th>
                      <th>Office</th>
                      <th>Status</th>
                      <th>Activity</th>
                      <th>Last Activity</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y-2 divide-slate-500 text-slate-700 text-nowrap font-semibold'>
                    <tr>
                      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                      <td>Malcolm Lockyer</td>
                      <td>1961</td>
                    </tr>
                    <tr>
                      <td>Witchy Woman</td>
                      <td>The Eagles</td>
                      <td>1972</td>
                    </tr>
                    <tr>
                      <td>Shining Star</td>
                      <td>Earth, Wind, and Fire</td>
                      <td>1975</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Dashboard;