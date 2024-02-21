import { useLocation } from "react-router-dom";
import { MdAnalytics, MdOutlineArrowDropDown } from "react-icons/md";
import { useContext } from "react";
import { colorTheme } from "../../../../App";
import { FaPlusCircle } from "react-icons/fa";

import Header from "../../Header";
import Linechart from "./Linechart";
import Verticalbarchart from "./Verticalbarchart";
import Horizontalbarchart from "./Horizontalbarchart";
// import Doughnutchart from "./Doughnutchart";

const Analytics = () => {
  const [selectedTheme] = useContext(colorTheme);
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  const Container = ({ component }) => {
    return (
      <>
        <div className={`flex justify-between py-3 text-${selectedTheme}-800 text-start font-bold flex gap-2`}>
          <div className="flex gap-2">
            <FaPlusCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
            <span>Line Chart Data Here</span>
          </div>
          <div className={``}>
            <button className="p-2 flex justify-between items-center">
              <p className={`text-${selectedTheme}-800/50 font-bold text-sm md:text-base lg:text-lg`}>Select Here</p>
              <MdOutlineArrowDropDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"/>
            </button>
          </div>
        </div>
        {component}
      </>
    )
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title={ title } icon={<MdAnalytics />}/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-60 md:mb-72 lg:mb-80">
            <div className={`w-auto h-auto`}>
              <div className={`p-4 flex flex-col gap-2 bg-${selectedTheme}-300 rounded-lg text-base md:text-lg lg:text-xl`}>
                <Container component={<Linechart />}/>
              </div>
            </div>
            <div className="w-auto h-auto">
              <div className={`p-4 flex flex-col gap-2 bg-${selectedTheme}-300 rounded-lg text-base md:text-lg lg:text-xl`}>
                <Container component={<Verticalbarchart />}/>
              </div>
            </div>
            <div className="col-span-0 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-4">
                {/* <Doughnutchart />
                <Doughnutchart />
                <Doughnutchart /> */}
              </div>
            </div>
            <div className="col-span-0 md:col-span-2 lg:col-span-2 w-auto h-auto">
              <Horizontalbarchart />
            </div>
            <div className="text-center col-span-1 md:col-span-2 lg:col-span-2 rounded-xl bg-slate-500 border-dashed border-2 border-slate-700 overflow-x-auto">
              <table className="table-auto block text-xs md:text-sm lg:text-base">
                <thead>
                  <tr>
                    <th>HEADER 1</th>
                    <th>HEADER 2</th>
                    <th>HEADER 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ROW DATA 1</td>
                    <td>ROW DATA 2</td>
                    <td>ROW DATA 3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
 
export default Analytics;