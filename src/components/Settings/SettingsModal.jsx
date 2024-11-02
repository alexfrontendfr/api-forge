import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Sun, Monitor, Layout, Eye, Code } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useSettings } from "../../contexts/SettingsContext";

const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();

  const appearanceOptions = [
    { icon: <Sun size={18} />, label: "Light", value: "light" },
    { icon: <Moon size={18} />, label: "Dark", value: "dark" },
    { icon: <Monitor size={18} />, label: "System", value: "system" },
  ];

  const layoutOptions = [
    { icon: <Layout size={18} />, label: "Split", value: "split" },
    { icon: <Code size={18} />, label: "Stacked", value: "stacked" },
  ];

  const viewOptions = [
    { icon: <Eye size={18} />, label: "Formatted", value: "formatted" },
    { icon: <Code size={18} />, label: "Raw", value: "raw" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gray-900 rounded-xl shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold">Settings</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Theme Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Appearance</h3>
              <ThemeSelector
                options={appearanceOptions}
                value={settings.theme}
                onChange={(theme) => updateSettings({ theme })}
              />
            </div>

            {/* Layout Preference */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Layout</h3>
              <ThemeSelector
                options={layoutOptions}
                value={settings.layout}
                onChange={(layout) => updateSettings({ layout })}
              />
            </div>

            {/* Default View Mode */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">
                Default View
              </h3>
              <ThemeSelector
                options={viewOptions}
                value={settings.defaultView}
                onChange={(defaultView) => updateSettings({ defaultView })}
              />
            </div>

            {/* Additional Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.autoFormat}
                    onChange={(e) =>
                      updateSettings({ autoFormat: e.target.checked })
                    }
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span>Auto-format responses</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.saveHistory}
                    onChange={(e) =>
                      updateSettings({ saveHistory: e.target.checked })
                    }
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span>Save request history</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.syntaxHighlight}
                    onChange={(e) =>
                      updateSettings({ syntaxHighlight: e.target.checked })
                    }
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span>Enable syntax highlighting</span>
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;
