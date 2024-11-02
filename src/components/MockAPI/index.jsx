import React, { useState } from "react";
import { motion } from "framer-motion";
import MockBuilder from "./MockBuilder";
import MockPreview from "./MockPreview";
import { Server, Copy, Download } from "lucide-react";
import toast from "react-hot-toast";

const MockAPI = () => {
  const [mockConfig, setMockConfig] = useState({
    endpoint: "/api/users",
    method: "GET",
    responseType: "array",
    items: 5,
    schema: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        email: { type: "string" },
        active: { type: "boolean" },
      },
    },
  });

  const [mockResponse, setMockResponse] = useState(null);

  const generateMockData = () => {
    const data =
      mockConfig.responseType === "array"
        ? Array.from({ length: mockConfig.items }, (_, index) =>
            generateMockItem(mockConfig.schema, index)
          )
        : generateMockItem(mockConfig.schema);

    setMockResponse(data);
  };

  const generateMockItem = (schema, index = 0) => {
    const result = {};

    Object.entries(schema.properties).forEach(([key, prop]) => {
      switch (prop.type) {
        case "string":
          result[key] =
            key === "email" ? `user${index}@example.com` : `${key}_${index}`;
          break;
        case "number":
          result[key] = index;
          break;
        case "boolean":
          result[key] = Math.random() > 0.5;
          break;
        case "array":
          result[key] = Array.from({ length: 3 }, (_, i) =>
            generateMockItem(prop.items, i)
          );
          break;
        case "object":
          result[key] = generateMockItem(prop, index);
          break;
        default:
          result[key] = null;
      }
    });

    return result;
  };

  const copyMockCode = () => {
    const code = `
// Mock API Setup
const mockEndpoint = '${mockConfig.endpoint}';
const mockResponse = ${JSON.stringify(mockResponse, null, 2)};

// Example usage with Express
app.${mockConfig.method.toLowerCase()}(mockEndpoint, (req, res) => {
  res.json(mockResponse);
});
    `;

    navigator.clipboard.writeText(code);
    toast.success("Mock code copied to clipboard!");
  };

  const downloadMock = () => {
    const mockData = {
      config: mockConfig,
      response: mockResponse,
    };

    const blob = new Blob([JSON.stringify(mockData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mock-api-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1a1b26] rounded-lg p-4 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="text-blue-400" size={24} />
          <h3 className="text-lg font-medium">Mock API Generator</h3>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyMockCode}
            className="p-2 hover:bg-gray-700 rounded-md tooltip"
            data-tip="Copy mock code"
          >
            <Copy size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadMock}
            className="p-2 hover:bg-gray-700 rounded-md tooltip"
            data-tip="Download mock"
          >
            <Download size={18} />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MockBuilder
          config={mockConfig}
          onChange={setMockConfig}
          onGenerate={generateMockData}
        />
        <MockPreview response={mockResponse} />
      </div>
    </motion.div>
  );
};

export default MockAPI;
