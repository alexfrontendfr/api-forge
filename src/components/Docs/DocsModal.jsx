import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Book, Terminal, Server, Gift } from "lucide-react";
import ExampleSection from "./ExampleSection";

const DocsModal = ({ isOpen, onClose }) => {
  const examples = [
    {
      title: "Basic REST API Testing",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      method: "GET",
      description: "Simple GET request to fetch a blog post",
      headers: {
        "Content-Type": "application/json",
      },
    },
    {
      title: "Creating a New Resource",
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
      description: "Create a new post with custom data",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title: "New Post",
        body: "This is the content of the post",
        userId: 1,
      },
    },
    {
      title: "GitHub Repository Search",
      url: "https://api.github.com/search/repositories?q=react",
      method: "GET",
      description: "Search GitHub repositories using their public API",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  ];

  const features = [
    {
      icon: <Terminal size={24} />,
      title: "Schema Validation",
      description:
        "Validate API responses against JSON schemas to ensure data consistency",
    },
    {
      icon: <Gift size={24} />,
      title: "Response Comparison",
      description:
        "Compare different API responses to spot changes and differences",
    },
    {
      icon: <Server size={24} />,
      title: "Mock API Generation",
      description:
        "Generate mock APIs with customizable endpoints and response structures",
    },
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
          className="bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Book className="text-blue-400" size={24} />
              <h2 className="text-xl font-semibold">Documentation</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">
                Getting Started
              </h3>
              <p className="text-gray-300">
                API Response Formatter is a powerful tool designed for frontend
                developers to test, validate, and format API responses. Whether
                you're developing a new application or debugging existing
                endpoints, this tool helps you understand and work with API data
                more effectively.
              </p>
            </section>

            {/* Features */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-800/50 rounded-lg space-y-2"
                  >
                    <div className="text-blue-400">{feature.icon}</div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Examples */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Examples</h3>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <ExampleSection key={index} {...example} />
                ))}
              </div>
            </section>

            {/* Usage Guide */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">
                Usage Guide
              </h3>
              <div className="space-y-2">
                <h4 className="font-medium">1. Testing an API</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Enter the API endpoint URL</li>
                  <li>Select the HTTP method (GET, POST, etc.)</li>
                  <li>Add any required headers</li>
                  <li>Include a request body for POST/PUT requests</li>
                  <li>Click "Send Request" to test the endpoint</li>
                </ul>

                <h4 className="font-medium mt-4">2. Working with Responses</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>View formatted response data</li>
                  <li>Validate against a schema</li>
                  <li>Compare with other responses</li>
                  <li>Export in various formats</li>
                  <li>Generate code snippets</li>
                </ul>

                <h4 className="font-medium mt-4">3. Creating Mock APIs</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Define the endpoint structure</li>
                  <li>Configure response schema</li>
                  <li>Generate mock data</li>
                  <li>Export mock API code</li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocsModal;
