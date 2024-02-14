import { useContext, useState } from "react";
import { colorTheme } from "../../../App";
import { MdBugReport } from "react-icons/md";
import { FiPaperclip } from "react-icons/fi";

const ReportForm = ({ reportFormRef, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  const [formData, setFormData] = useState({
    details: '',
    severity: '',
    imageReport: null
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'imageReport' ? files[0] : value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload(true);
  };

  //  HANDLE SPAM BY ONLY MAKING THE USER SUBMIT ONLY ONE REPORT FOR THE ADMIN TO ACCEPT FOR THE USER REQUEST TO REFRESH BACK TO 1
  return (
    <dialog ref={reportFormRef} className={`rounded-lg bg-${selectedTheme}-100 drop-shadow-lg`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdBugReport className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold">Report a problem</strong>
          </div>
        </div>
        <p className={`font-bold text-${selectedTheme}-700 m-2 pl-2`}>
          What seems to be the problem
        </p>
        <form onSubmit={handleSubmit} className={`flex flex-col gap-0 mx-5 my-2 w-72 md:w-80 lg:w-[500px]`}>
          <div className={`p-2`}>
            <label htmlFor="details" className={`block mb-2 text-${selectedTheme}-600 font-semibold`}>Details</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Describe what happened. . . . ."
              className="w-full rounded-lg text-xs md:text-sm lg:text-base"
              rows={4}
              maxLength={255}
            />
          </div>
          <div className={`p-2`}>
            <label htmlFor="severity" className={`block mb-2 text-${selectedTheme}-600 font-semibold`}>Severity:</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full rounded-lg text-xs md:text-sm lg:text-base"
              required
            >
              <option value="" disabled>Select Severity</option>
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="Crucial">Crucial</option>
            </select>
          </div>
          <div className="mt-4 m-2">
            <label htmlFor="imageReport" className={`block mb-2 text-${selectedTheme}-600 font-normal flex gap-1 items-center`}><FiPaperclip className="w-6 h-6 md:h-7 md:w-7 lg:w-8 lg:h-8"/>Upload a screenshot</label>
            <input
              type="file"
              id="imageReport"
              name="imageReport"
              onChange={handleChange}
              className="block w-full rounded-lg text-xs md:text-sm lg:text-base bg-gray-50 border-[1px] border-gray-900 shadow-sm"
              accept="image/*"
            />
          </div>
          <p className={`text-xs text-${selectedTheme}-700 font-thin mt-4 p-2 bg-${selectedTheme}-50 rounded-lg text-right`}>
            Caution: You can only submit a single report per account. Use your report wisely. You can submit a report again after a developer reviews your complaint. You will be notified upon review.
          </p>
          <div className="flex justify-end items-center gap-2 mt-4">
            <button onClick={(e) => { e.preventDefault(); toggle(); }} className={`py-2 px-4 hover:shadow-md font-semibold text-${selectedTheme}-600 rounded-lg hover:bg-${selectedTheme}-100 transition-colors duration-200`}>Cancel</button>
            <button type="submit" className={`py-2 px-4 hover:shadow-md font-semibold rounded-lg transition-colors duration-200 ${formData.details && formData.severity && formData.imageReport ? `text-${selectedTheme}-100 bg-${selectedTheme}-600 hover:cursor-pointer shadow-sm` : `shadow-inner text-${selectedTheme}-100 bg-${selectedTheme}-400 hover:cursor-not-allowed`}`} disabled={!formData.details && !formData.severity && !formData.imageReport}>Submit Report</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
 
export default ReportForm;