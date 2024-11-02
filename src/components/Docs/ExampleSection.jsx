import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import toast from "react-hot-toast";

const ExampleSection = ({ title, url, method, description, headers, body }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const copyExample = () => {
    const exampleText = `// ${title}
const response = await fetch('${url}', {
  method: '${method}',
  headers: ${JSON.stringify(headers, null, 2)},
  ${body ? `body: ${JSON.stringify(body, null, 2)}` : ""}
});

const data = await response.json();`;

    navigator.clipboard.writeText(exampleText);
    toast.success("Example copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 rounded text-xs ${
              method === "GET"
                ? "bg-green-500/20 text-green-400"
                : method === "POST"
                ? "bg-blue-500/20 text-blue-400"
                : method === "PUT"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {method}
          </span>
          <span className="font-medium">{title}</span>
        </div>
        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 border-t border-gray-700 space-y-3"
        >
          <p className="text-gray-400">{description}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Endpoint</span>
              <code className="text-sm bg-gray-900/50 px-2 py-1 rounded">
                {url}
              </code>
            </div>

            {headers && (
              <div className="space-y-1">
                <span className="text-sm text-gray-400">Headers</span>
                <pre className="text-sm bg-gray-900/50 p-2 rounded">
                  {JSON.stringify(headers, null, 2)}
                </pre>
              </div>
            )}

            {body && (
              <div className="space-y-1">
                <span className="text-sm text-gray-400">Request Body</span>
                <pre className="text-sm bg-gray-900/50 p-2 rounded">
                  {JSON.stringify(body, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyExample}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md text-sm"
          >
            <Copy size={14} />
            Copy Example
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExampleSection;
