import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Trash2, FolderOpen } from "lucide-react";

const ApiConfigManager = ({ onLoadConfig }) => {
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [configName, setConfigName] = useState("");

  useEffect(() => {
    const configs = JSON.parse(localStorage.getItem("apiConfigs") || "[]");
    setSavedConfigs(configs);
  }, []);

  const saveConfig = (config) => {
    if (!configName) return;

    const newConfigs = [...savedConfigs, { name: configName, ...config }];
    localStorage.setItem("apiConfigs", JSON.stringify(newConfigs));
    setSavedConfigs(newConfigs);
    setConfigName("");
    toast.success("Configuration saved!");
  };

  const deleteConfig = (index) => {
    const newConfigs = savedConfigs.filter((_, i) => i !== index);
    localStorage.setItem("apiConfigs", JSON.stringify(newConfigs));
    setSavedConfigs(newConfigs);
    toast.success("Configuration deleted!");
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          placeholder="Configuration name"
          className="flex-grow px-3 py-2 bg-gray-700 rounded-md"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => saveConfig()}
          className="p-2 bg-blue-600 rounded-md"
        >
          <Save size={20} />
        </motion.button>
      </div>

      <div className="space-y-2">
        {savedConfigs.map((config, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
          >
            <span>{config.name}</span>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onLoadConfig(config)}
                className="p-1 hover:text-blue-400"
              >
                <FolderOpen size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteConfig(index)}
                className="p-1 hover:text-red-400"
              >
                <Trash2 size={18} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ApiConfigManager;
