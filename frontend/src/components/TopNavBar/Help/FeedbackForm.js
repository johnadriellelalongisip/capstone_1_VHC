import { useContext, useState } from "react";
import { colorTheme } from "../../../App";
import { MdFeedback } from "react-icons/md";

const FeedbackForm = ({ feedbackRef, toggle }) => {
  const [selectedTheme] = useContext(colorTheme);
  const options = [
    {
      label: "User Interface (UI) / User Experience (UX)",
      areas: [
        "Design/Layout",
        "Navigation",
        "Responsiveness",
        "Accessibility"
      ]
    },
    {
      label: "Functionality",
      areas: [
        "Features",
        "Performance",
        "Reliability",
        "Compatibility"
      ]
    },
    {
      label: "Content",
      areas: [
        "Clarity",
        "Relevance",
        "Accuracy",
        "Completeness"
      ]
    },
    {
      label: "Interactivity",
      areas: [
        "Forms",
        "Buttons/Links",
        "Error Handling",
        "Feedback Mechanisms"
      ]
    },
    {
      label: "Security",
      areas: [
        "Login/Authentication",
        "Data Protection",
        "Permissions",
        "Vulnerability Awareness",
      ]
    },
    {
      label: "Support/Documentation",
      areas: [
        "Help/Support Center",
        "Documentation/FAQs",
        "Tutorials/Guides",
        "Community/Forums",
      ]
    },
    {
      label: "Performance",
      areas: [
        "Page Load Times",
        "Responsiveness",
        "Resource Consumption",
        "Error Handling",
      ]
    },
    {
      label: "Integration",
      areas: [
        "Third-party Services/APIs",
        "Compatibility with Other Systems",
        "Data Exchange",
      ]
    },
    {
      label: "Customization/Personalization",
      areas: [
        "User Preferences",
        "Settings",
        "Profile Management",
        "Tailored Experiences",
      ]
    },
    {
      label: "Communication/Notifications",
      areas: [
        "Alerts",
        "Notifications",
        "Messaging",
        "Updates",
      ]
    }
  ];
  const [formData, setFormData] = useState({
    details: '',
    area: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload(true);
  };
  const toggleClose = (e) => {
    e.preventDefault();
    if (formData.details || formData.area) {
      
    } else {
      toggle();
      setFormData({
        details: '',
        area: '',
      });
    }
  };

  //  HANDLE SPAM BY ONLY MAKING THE USER SUBMIT ONLY ONE REPORT FOR THE ADMIN TO ACCEPT FOR THE USER REQUEST TO REFRESH BACK TO 1
  return (
    <dialog ref={feedbackRef} className={`rounded-lg bg-${selectedTheme}-100 drop-shadow-lg`}>
      <div className="flex flex-col text-xs md:text-sm lg:text-base">
        <div className={`flex justify-between items-center p-2 text-${selectedTheme}-600 border-b-[1px] border-solid border-${selectedTheme}-500 shadow-md shadow-${selectedTheme}-600 mb-2`}>
          <div className="flex items-center p-1 gap-1">
            <MdFeedback className='w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' />
            <strong className="font-semibold">Submit a Feedback</strong>
          </div>
        </div>
        <p className={`font-bold text-${selectedTheme}-700 m-2 pl-2`}>
          Share your thoughts
        </p>
        <form onSubmit={handleSubmit} className={`flex flex-col gap-0 mx-5 my-2 w-72 md:w-80 lg:w-[500px]`}>
          <div className={`p-2`}>
            <label htmlFor="area" className={`block mb-2 text-${selectedTheme}-600 font-semibold`}>Area:</label>
            <select
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full rounded-lg text-xs md:text-sm lg:text-base"
              required
            >
              <option value="" disabled>Select an Area</option>
              {options.map((category, index) => (
                <optgroup key={index} label={category.label}>
                  {category.areas.map((area, idx) => (
                    <option key={idx} value={area}>{area}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className={`p-2`}>
            <label htmlFor="details1" className={`block mb-2 text-${selectedTheme}-600 font-semibold`}>Details</label>
            <textarea
              id="details1"
              name="details1"
              value={formData.details}
              onChange={handleChange}
              placeholder="Share what you want. . . . ."
              className="w-full rounded-lg text-xs md:text-sm lg:text-base"
              rows={4}
              maxLength={255}
            />
          </div>
          <p className={`text-xs text-${selectedTheme}-700 font-thin mb-4 p-2 bg-${selectedTheme}-50 rounded-lg text-center`}>
            Let us know if you have ideas that can help make our system better. If you need help with solving a specific problem or if you think that there are things that can further have some improvement. Share your ideas with us.
          </p>
          <div className="flex justify-end items-center gap-2 mt-4">
            <button onClick={toggleClose} className={`py-2 px-4 hover:shadow-md font-semibold text-${selectedTheme}-600 rounded-lg hover:bg-${selectedTheme}-100 transition-colors duration-200`}>Cancel</button>
            <button type="submit" className={`py-2 px-4 hover:shadow-md font-semibold rounded-lg transition-colors duration-200 ${formData.details && formData.area ? `text-${selectedTheme}-100 bg-${selectedTheme}-600 hover:cursor-pointer shadow-sm` : `shadow-inner text-${selectedTheme}-200 bg-${selectedTheme}-500 hover:cursor-not-allowed`}`} disabled={!formData.details && !formData.area}>Submit Feedback</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
 
export default FeedbackForm;