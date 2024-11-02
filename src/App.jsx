import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { Send, GitCompare, Server, FileJson } from "lucide-react";
import RequestForm from "./components/RequestForm";
import ResponseView from "./components/ResponseView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResponseHistory from "./components/ResponseHistory";
import SchemaValidator from "./components/SchemaValidator";
import ResponseCompare from "./components/ResponseCompare";
import MockAPI from "./components/MockAPI";
import DocsModal from "./components/Docs/DocsModal";
import SettingsModal from "./components/Settings/SettingsModal";
import { useSettings } from "./contexts/SettingsContext";

const App = () => {
  // States
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState("request");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    if (settings.saveHistory) {
      const savedHistory = localStorage.getItem("requestHistory");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    }
  }, [settings.saveHistory]);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (settings.saveHistory) {
      localStorage.setItem("requestHistory", JSON.stringify(history));
    }
  }, [history, settings.saveHistory]);

  // Modal handlers
  const handleOpenDocs = () => setIsDocsOpen(true);
  const handleCloseDocs = () => setIsDocsOpen(false);
  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);

  // Response handlers
  const handleResponse = (data, requestDetails) => {
    setResponse(data);
    setLoading(false);
    setError(null);

    if (settings.saveHistory) {
      const historyItem = {
        ...requestDetails,
        timestamp: new Date().toISOString(),
        response: data,
      };
      const newHistory = [historyItem, ...history.slice(0, 9)];
      setHistory(newHistory);
    }

    toast.success("Request successful!");
  };

  const handleError = (err) => {
    setError(err);
    setLoading(false);
    setResponse(null);
    toast.error("Request failed: " + err.message);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("requestHistory");
    toast.success("History cleared");
  };

  // Tab button component
  const TabButton = ({ id, label, icon: Icon }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        activeTab === id ? "bg-blue-500 text-white" : "hover:bg-gray-700/50"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </motion.button>
  );

  return (
    <div
      className={`min-h-screen flex flex-col ${
        settings.theme === "dark" ? "dark" : ""
      } bg-gradient-to-br from-gray-900 to-gray-800 text-white`}
    >
      <Toaster position="top-right" />

      <Header onOpenDocs={handleOpenDocs} onOpenSettings={handleOpenSettings} />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col gap-6">
          {/* Tab Navigation */}
          <nav className="flex gap-2 overflow-x-auto pb-2">
            <TabButton id="request" label="Request" icon={Send} />
            <TabButton id="compare" label="Compare" icon={GitCompare} />
            <TabButton id="mock" label="Mock API" icon={Server} />
            <TabButton id="schema" label="Schema" icon={FileJson} />
          </nav>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-8 ${
              settings.layout === "split"
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            <AnimatePresence mode="wait">
              {/* Request Tab */}
              {activeTab === "request" && (
                <motion.div
                  key="request"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <RequestForm
                    onSubmit={() => setLoading(true)}
                    onResponse={handleResponse}
                    onError={handleError}
                  />
                  {settings.saveHistory && (
                    <ResponseHistory
                      history={history}
                      onSelect={(item) => {
                        setResponse(item.response);
                        toast.success("Historical response loaded");
                      }}
                      onClear={clearHistory}
                    />
                  )}
                </motion.div>
              )}

              {/* Compare Tab */}
              {activeTab === "compare" && (
                <motion.div
                  key="compare"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ResponseCompare
                    currentResponse={response}
                    history={history}
                  />
                </motion.div>
              )}

              {/* Mock API Tab */}
              {activeTab === "mock" && (
                <motion.div
                  key="mock"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <MockAPI
                    onGenerate={(mockResponse) => {
                      setResponse(mockResponse);
                      toast.success("Mock data generated");
                    }}
                  />
                </motion.div>
              )}

              {/* Schema Tab */}
              {activeTab === "schema" && (
                <motion.div
                  key="schema"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SchemaValidator
                    response={response}
                    onValidationComplete={(result) => {
                      if (result.valid) {
                        toast.success("Schema validation passed");
                      } else {
                        toast.error("Schema validation failed");
                      }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Response View (always visible) */}
            <div className="space-y-6">
              <ResponseView
                response={response}
                error={error}
                loading={loading}
                viewMode={settings.defaultView}
                syntaxHighlight={settings.syntaxHighlight}
              />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer onOpenDocs={handleOpenDocs} />

      {/* Modals */}
      <AnimatePresence>
        {isDocsOpen && (
          <DocsModal isOpen={isDocsOpen} onClose={handleCloseDocs} />
        )}

        {isSettingsOpen && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={handleCloseSettings}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
