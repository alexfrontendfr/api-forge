import React from "react";
import { motion } from "framer-motion";
import JsonView from "@uiw/react-json-view";

const MockPreview = ({ response }) => {
  if (!response) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <p>Generate mock data to preview</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/30 rounded-lg p-4"
    >
      <JsonView
        value={response}
        style={{
          background: "transparent",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
        collapsed={1}
        enableClipboard
        theme={{
          background: "transparent",
          fontSize: "14px",
          lineHeight: "1.5",
          valueColor: "#7dcfff",
          stringColor: "#9ece6a",
          numberColor: "#ff9e64",
          booleanColor: "#bb9af7",
          nullColor: "#737aa2",
          keyColor: "#73daca",
          bracket: "#565f89",
        }}
      />
    </motion.div>
  );
};

export default MockPreview;
