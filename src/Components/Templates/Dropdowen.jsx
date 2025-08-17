import React from "react";

function Dropdown({ title, option = [] , fun }) {
  return (
    <div className="relative w-50 hidden md:block">
      <select  onChange={fun}
        className="w-full px-4 py-2  bg-gradient-to-br from-[#545457d6] to-[#3e3e60] rounded-lg text-white shadow-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option className="text-red" value="" disabled>{title}</option>
        {option.map((opt, index) => (
          < option className="text-black  border-b-amber-700" key={index} value={opt}>{opt.toUpperCase()}
          
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
