import React, { useState } from "react";
import { motion } from "framer-motion";
import CompareView from "./CompareView";
import { ArrowLeftRight, Upload } from "lucide-react";

const ResponseCompare = ({ currentResponse }) => {
  const [compareWith, setCompareWith] = useState(null);
  const [diffView, setDiffView] = useState("split"); // 'split' or 'unified'

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setCompareWith(json);
        } catch (error) {
          toast.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1a1b26] rounded-lg p-4 space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Response Comparison</h3>
        <div className="flex gap-2">
          <select
            value={diffView}
            onChange={(e) => setDiffView(e.target.value)}
            className="bg-gray-800 rounded-md px-3 py-1 text-sm"
          >
            <option value="split">Split View</option>
            <option value="unified">Unified View</option>
          </select>

          <label className="cursor-pointer px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center gap-2">
            <Upload size={16} />
            <span className="text-sm">Upload Comparison</span>
            <input
              type="file"
              accept="application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {currentResponse && compareWith ? (
        <CompareView
          left={currentResponse}
          right={compareWith}
          mode={diffView}
        />
      ) : (
        <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-700 rounded-lg">
          <div className="text-center text-gray-400">
            <ArrowLeftRight size={32} className="mx-auto mb-2" />
            <p>Upload a JSON file to compare with current response</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResponseCompare;
