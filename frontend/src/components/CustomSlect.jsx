import { useState } from "react";

const CustomSelect = ({ options, selected, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border px-3 py-2 rounded text-left bg-white"
      >
        {selected}
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto border bg-white rounded shadow">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-indigo-100 ${
                selected === option ? "bg-indigo-50 font-semibold" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect