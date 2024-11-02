import React, { useMemo } from "react";
import { motion } from "framer-motion";
import * as diffLib from "diff";
import { PlusCircle, MinusCircle, Circle } from "lucide-react";

const CompareView = ({ left, right, mode = "split" }) => {
  const diff = useMemo(() => {
    return diffLib.diffJson(left, right);
  }, [left, right]);

  const DiffLine = ({ part }) => {
    const getIcon = () => {
      if (part.added)
        return <PlusCircle size={16} className="text-green-400" />;
      if (part.removed)
        return <MinusCircle size={16} className="text-red-400" />;
      return <Circle size={16} className="text-gray-400" />;
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-2 rounded-md font-mono text-sm flex items-start gap-2 ${
          part.added
            ? "bg-green-500/10"
            : part.removed
            ? "bg-red-500/10"
            : "bg-gray-800/30"
        }`}
      >
        {getIcon()}
        <pre
          className={`flex-1 whitespace-pre-wrap ${
            part.added
              ? "text-green-400"
              : part.removed
              ? "text-red-400"
              : "text-gray-300"
          }`}
        >
          {part.value}
        </pre>
      </motion.div>
    );
  };

  if (mode === "split") {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Left side */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-400 mb-2">
            Current Response
          </div>
          <div className="space-y-1">
            {diff.map(
              (part, i) => !part.added && <DiffLine key={i} part={part} />
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-400 mb-2">
            Comparison Response
          </div>
          <div className="space-y-1">
            {diff.map(
              (part, i) => !part.removed && <DiffLine key={i} part={part} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {diff.map((part, i) => (
        <DiffLine key={i} part={part} />
      ))}
    </div>
  );
};

export default CompareView;
