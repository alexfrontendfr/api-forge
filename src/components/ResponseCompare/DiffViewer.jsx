import React from "react";
import { motion } from "framer-motion";
import { diffJson, diffLines } from "diff";

const DiffViewer = ({ oldValue, newValue, type = "json" }) => {
  const getDiff = () => {
    if (type === "json") {
      try {
        const oldJson =
          typeof oldValue === "string" ? JSON.parse(oldValue) : oldValue;
        const newJson =
          typeof newValue === "string" ? JSON.parse(newValue) : newValue;
        return diffJson(oldJson, newJson);
      } catch (error) {
        return diffLines(String(oldValue), String(newValue));
      }
    }
    return diffLines(String(oldValue), String(newValue));
  };

  const diff = getDiff();

  const DiffLine = ({ part }) => {
    const getLineStyle = () => {
      if (part.added)
        return "bg-green-500/10 text-green-400 border-l-2 border-green-500";
      if (part.removed)
        return "bg-red-500/10 text-red-400 border-l-2 border-red-500";
      return "text-gray-300";
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`font-mono text-sm p-2 ${getLineStyle()}`}
      >
        <pre className="whitespace-pre-wrap break-all">
          {part.added && "+ "}
          {part.removed && "- "}
          {part.value}
        </pre>
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-700">
        {diff.map((part, index) => (
          <DiffLine key={index} part={part} />
        ))}
      </div>
    </div>
  );
};

export default DiffViewer;
