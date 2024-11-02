import React from "react";
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const SchemaEditor = ({ value, onChange, onValidate }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">JSON Schema</label>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onValidate}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-md text-sm"
        >
          Validate
        </motion.button>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-48 bg-gray-800/50 rounded-lg p-4 font-mono text-sm resize-none"
          placeholder="{
  'type': 'object',
  'properties': {
    'name': { 'type': 'string' },
    'age': { 'type': 'number' }
  }
}"
        />

        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-500">Paste your JSON schema here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaEditor;
