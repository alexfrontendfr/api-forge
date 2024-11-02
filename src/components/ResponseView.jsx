import React, { useState } from "react";
import { motion } from "framer-motion";
import JsonView from "@uiw/react-json-view";
import {
  Copy,
  Code,
  FileJson,
  FileDown,
  Maximize2,
  History,
} from "lucide-react";
import toast from "react-hot-toast";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ResponseView = ({ response, error, loading }) => {
  const [viewMode, setViewMode] = useState("pretty"); // 'pretty', 'raw', 'code'
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const generateCode = (data, language) => {
    switch (language) {
      case "javascript":
        return `// JavaScript Fetch
const response = await fetch('${window.location.origin}/api/endpoint', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  body: ${JSON.stringify(data, null, 2)}
});
const data = await response.json();`;
      case "python":
        return `# Python Requests
import requests

response = requests.get(
    '${window.location.origin}/api/endpoint',
    json=${JSON.stringify(data, null, 2)}
)
data = response.json()`;
      case "curl":
        return `curl -X GET \\
  '${window.location.origin}/api/endpoint' \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify(data)}'`;
      default:
        return "";
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(
      typeof content === "string" ? content : JSON.stringify(content, null, 2)
    );
    toast.success("Copied to clipboard!");
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h3 className="text-red-400 font-medium mb-2">Error</h3>
          <pre className="text-red-300 whitespace-pre-wrap">
            {error.message}
          </pre>
        </div>
      );
    }

    if (!response) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <FileJson size={48} className="mb-4 opacity-50" />
          <p>Send a request to see the response here</p>
        </div>
      );
    }

    switch (viewMode) {
      case "pretty":
        return (
          <JsonView
            value={response}
            style={{
              background: "transparent",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
            collapsed={2}
            enableClipboard
            theme={{
              background: "#1a1b26",
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
        );
      case "raw":
        return (
          <SyntaxHighlighter
            language="json"
            style={atomOneDark}
            className="rounded-lg !bg-[#1a1b26]"
          >
            {JSON.stringify(response, null, 2)}
          </SyntaxHighlighter>
        );
      case "code":
        return (
          <div className="space-y-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-gray-700 rounded-md px-3 py-1"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="curl">cURL</option>
            </select>
            <SyntaxHighlighter
              language={selectedLanguage}
              style={atomOneDark}
              className="rounded-lg !bg-[#1a1b26]"
            >
              {generateCode(response, selectedLanguage)}
            </SyntaxHighlighter>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#1a1b26] rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("pretty")}
            className={`px-3 py-1 rounded-md ${
              viewMode === "pretty"
                ? "bg-blue-500/20 text-blue-400"
                : "hover:bg-gray-700"
            }`}
          >
            Pretty
          </button>
          <button
            onClick={() => setViewMode("raw")}
            className={`px-3 py-1 rounded-md ${
              viewMode === "raw"
                ? "bg-blue-500/20 text-blue-400"
                : "hover:bg-gray-700"
            }`}
          >
            Raw
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`px-3 py-1 rounded-md ${
              viewMode === "code"
                ? "bg-blue-500/20 text-blue-400"
                : "hover:bg-gray-700"
            }`}
          >
            Generate Code
          </button>
        </div>

        <div className="flex gap-2">
          {response && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(response)}
                className="p-2 hover:bg-gray-700 rounded-md tooltip"
                data-tip="Copy to clipboard"
              >
                <Copy size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const blob = new Blob([JSON.stringify(response, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `response-${new Date().toISOString()}.json`;
                  a.click();
                }}
                className="p-2 hover:bg-gray-700 rounded-md tooltip"
                data-tip="Download JSON"
              >
                <FileDown size={18} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      <div className="p-4 overflow-x-auto">{renderContent()}</div>
    </div>
  );
};

export default ResponseView;
