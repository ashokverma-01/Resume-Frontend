import React from "react";
import DateInput from "../../utils/DateInput";
import { FiPlus, FiTrash2, FiBookOpen } from "react-icons/fi";

// Props mein userData aur setUserData zaroor lein
const Step4Education = ({
  onNext,
  onBack,
  userData,
  setUserData,
  updateResumeData,
}) => {
  // List hamesha userData se fetch karein, default empty array fallback ke saath
  const educationList = userData.education || [
    { institute: "", degree: "", startDate: "", endDate: "" },
  ];

  // LIVE CHANGE: Direct array update in parent state
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...educationList];
    newEducation[index] = { ...newEducation[index], [name]: value };

    setUserData((prev) => ({
      ...prev,
      education: newEducation,
    }));
  };

  const handleAdd = () => {
    const newEducation = [
      ...educationList,
      { institute: "", degree: "", startDate: "", endDate: "" },
    ];
    setUserData((prev) => ({ ...prev, education: newEducation }));
  };

  const handleRemove = (index) => {
    const newEducation = educationList.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, education: newEducation }));
  };

  const handleNextAction = () => {
    updateResumeData({ education: educationList });
    onNext();
  };

  return (
    <div className="bg-white p-4 sm:p-7 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiBookOpen size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Education
        </h2>
      </div>

      <div className="space-y-6">
        {educationList.map((edu, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 border border-gray-100 rounded-2xl relative bg-gray-50/50 hover:bg-white transition-all duration-300"
          >
            {educationList.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            )}

            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Institute / University"
                name="institute"
                placeholder="e.g. University of Delhi"
                value={edu.institute || ""}
                onChange={(e) => handleChange(index, e)}
              />

              <Input
                label="Degree / Course"
                name="degree"
                placeholder="e.g. Bachelor of Technology"
                value={edu.degree || ""}
                onChange={(e) => handleChange(index, e)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase ml-1">
                    Start Date
                  </label>
                  <DateInput
                    value={edu.startDate ? edu.startDate.substring(0, 7) : ""}
                    onChange={(e) =>
                      handleChange(index, {
                        target: { name: "startDate", value: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase ml-1">
                    End Date
                  </label>
                  <DateInput
                    value={edu.endDate ? edu.endDate.substring(0, 7) : ""}
                    onChange={(e) =>
                      handleChange(index, {
                        target: { name: "endDate", value: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full mt-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100"
      >
        <FiPlus size={18} /> Add Education
      </button>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed border border-transparent hover:border-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleNextAction}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition border border-transparent hover:border-green-500"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-sm"
    />
  </div>
);

export default Step4Education;
