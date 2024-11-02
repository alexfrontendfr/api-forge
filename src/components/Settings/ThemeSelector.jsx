import React from "react";
import { motion } from "framer-motion";

const ThemeSelector = ({ options, value, onChange }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800/50 rounded-lg">
      {options.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(option.value)}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md ${
            value === option.value
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-700/50"
          }`}
        >
          {option.icon}
          <span className="text-sm">{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeSelector;
