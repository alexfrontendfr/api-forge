import React from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const MockBuilder = ({ config, onChange, onGenerate }) => {
  const addProperty = () => {
    const newSchema = {
      ...config.schema,
      properties: {
        ...config.schema.properties,
        [`newProperty${Object.keys(config.schema.properties).length}`]: {
          type: "string",
        },
      },
    };
    onChange({ ...config, schema: newSchema });
  };

  const removeProperty = (key) => {
    const newProperties = { ...config.schema.properties };
    delete newProperties[key];
    onChange({
      ...config,
      schema: {
        ...config.schema,
        properties: newProperties,
      },
    });
  };

  const updateProperty = (key, updates) => {
    onChange({
      ...config,
      schema: {
        ...config.schema,
        properties: {
          ...config.schema.properties,
          [key]: {
            ...config.schema.properties[key],
            ...updates,
          },
        },
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Endpoint
          </label>
          <input
            type="text"
            value={config.endpoint}
            onChange={(e) => onChange({ ...config, endpoint: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800/50 rounded-md"
            placeholder="/api/endpoint"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Method
          </label>
          <select
            value={config.method}
            onChange={(e) => onChange({ ...config, method: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800/50 rounded-md"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Response Type
          </label>
          <select
            value={config.responseType}
            onChange={(e) =>
              onChange({ ...config, responseType: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-800/50 rounded-md"
          >
            <option value="object">Single Object</option>
            <option value="array">Array of Objects</option>
          </select>
        </div>
        {config.responseType === "array" && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Number of Items
            </label>
            <input
              type="number"
              value={config.items}
              onChange={(e) =>
                onChange({ ...config, items: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 bg-gray-800/50 rounded-md"
              min="1"
              max="100"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-400">
            Properties
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addProperty}
            className="p-1 hover:bg-gray-700 rounded-md"
          >
            <Plus size={18} />
          </motion.button>
        </div>

        <div className="space-y-2">
          {Object.entries(config.schema.properties).map(([key, prop]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-gray-800/30 p-2 rounded-md"
            >
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newProps = { ...config.schema.properties };
                  delete newProps[key];
                  newProps[e.target.value] = prop;
                  onChange({
                    ...config,
                    schema: {
                      ...config.schema,
                      properties: newProps,
                    },
                  });
                }}
                className="flex-1 px-2 py-1 bg-gray-700/50 rounded"
                placeholder="Property name"
              />
              <select
                value={prop.type}
                onChange={(e) => updateProperty(key, { type: e.target.value })}
                className="px-2 py-1 bg-gray-700/50 rounded"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="array">Array</option>
                <option value="object">Object</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeProperty(key)}
                className="p-1 hover:bg-gray-700 rounded-md text-red-400"
              >
                <Minus size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
      >
        Generate Mock Data
      </motion.button>
    </div>
  );
};

export default MockBuilder;
