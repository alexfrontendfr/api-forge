import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const RequestForm = ({ onSubmit, onResponse, onError }) => {
  const [formData, setFormData] = useState({
    url: "",
    method: "GET",
    headers: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit();

    try {
      // Parse headers string into object
      const headers = formData.headers
        .split("\n")
        .filter((line) => line.trim())
        .reduce((acc, line) => {
          const [key, value] = line.split(":").map((str) => str.trim());
          if (key && value) acc[key] = value;
          return acc;
        }, {});

      // Parse body if present
      let parsedBody = null;
      if (formData.body.trim()) {
        try {
          parsedBody = JSON.parse(formData.body);
        } catch (err) {
          onError(new Error("Invalid JSON in request body"));
          return;
        }
      }

      const response = await axios({
        url: formData.url,
        method: formData.method,
        headers,
        data: parsedBody,
      });

      onResponse(response.data);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-xl"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          API Endpoint URL
        </label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, url: e.target.value }))
          }
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://api.example.com/endpoint"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Request Method
        </label>
        <select
          value={formData.method}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, method: e.target.value }))
          }
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Headers (one per line, format: key: value)
        </label>
        <textarea
          value={formData.headers}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, headers: e.target.value }))
          }
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24"
          placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Request Body (JSON)
        </label>
        <textarea
          value={formData.body}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, body: e.target.value }))
          }
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32"
          placeholder='{\n  "key": "value"\n}'
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-md hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Send Request
      </motion.button>
    </motion.form>
  );
};

export default RequestForm;
