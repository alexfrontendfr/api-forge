import React from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, Trash2 } from "lucide-react";

const ResponseHistory = ({ history, onSelect, onClear }) => {
  if (!history.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1b26] rounded-lg p-4 mt-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Clock size={18} />
          Recent Requests
        </h3>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 rounded-md bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-between group"
          >
            <div>
              <div className="text-sm font-medium">{item.url}</div>
              <div className="text-xs text-gray-400">
                {item.method} • {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
            <ChevronRight
              size={18}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ResponseHistory;
