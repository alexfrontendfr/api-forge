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
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState("request");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (settings.saveHistory) {
      const savedHistory = localStorage.getItem("requestHistory");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    }
  }, [settings.saveHistory]);

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
      localStorage.setItem("requestHistory", JSON.stringify(newHistory));
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Toaster position="top-right" />

      <Header
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col gap-6">
          <nav className="flex gap-2 overflow-x-auto pb-2">
            <TabButton id="request" label="Request" icon={Send} />
            <TabButton id="compare" label="Compare" icon={GitCompare} />
            <TabButton id="mock" label="Mock API" icon={Server} />
            <TabButton id="schema" label="Schema" icon={FileJson} />
          </nav>

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
                      onSelect={(item) => setResponse(item.response)}
                      onClear={clearHistory}
                    />
                  )}
                </motion.div>
              )}

              {activeTab === "compare" && (
                <motion.div
                  key="compare"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ResponseCompare currentResponse={response} />
                </motion.div>
              )}

              {activeTab === "mock" && (
                <motion.div
                  key="mock"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <MockAPI />
                </motion.div>
              )}

              {activeTab === "schema" && (
                <motion.div
                  key="schema"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SchemaValidator response={response} />
                </motion.div>
              )}
            </AnimatePresence>

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

      <Footer />

      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
