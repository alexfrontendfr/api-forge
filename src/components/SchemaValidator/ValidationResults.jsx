import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const ValidationResults = ({ results }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div
        className={`p-4 rounded-lg ${
          results.valid
            ? "bg-green-500/10 border border-green-500/20"
            : "bg-red-500/10 border border-red-500/20"
        }`}
      >
        <div className="flex items-center gap-2">
          {results.valid ? (
            <CheckCircle className="text-green-400" size={20} />
          ) : (
            <XCircle className="text-red-400" size={20} />
          )}
          <span className={results.valid ? "text-green-400" : "text-red-400"}>
            {results.valid
              ? "Schema validation passed"
              : "Schema validation failed"}
          </span>
        </div>
      </div>

      {!results.valid && results.errors.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Validation Errors:</h4>
          {results.errors.map((error, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-800/50 rounded-md"
            >
              <div className="text-sm text-red-400">{error.message}</div>
              <div className="text-xs text-gray-400">Path: {error.path}</div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ValidationResults;
