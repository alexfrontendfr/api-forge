import React, { useState } from "react";
import { motion } from "framer-motion";
import SchemaEditor from "./SchemaEditor";
import ValidationResults from "./ValidationResults";
import { AlertTriangle, CheckCircle } from "lucide-react";

const SchemaValidator = ({ response }) => {
  const [schema, setSchema] = useState("");
  const [validationResults, setValidationResults] = useState(null);

  const validateSchema = () => {
    try {
      const schemaObj = JSON.parse(schema);
      const results = validateResponseAgainstSchema(response, schemaObj);
      setValidationResults(results);
    } catch (error) {
      setValidationResults({
        valid: false,
        errors: [
          {
            message: "Invalid schema format",
            path: "root",
          },
        ],
      });
    }
  };

  const validateResponseAgainstSchema = (response, schema) => {
    const errors = [];
    const validate = (obj, schemaObj, path = "") => {
      if (!obj || !schemaObj) return;

      Object.keys(schemaObj).forEach((key) => {
        const currentPath = path ? `${path}.${key}` : key;

        // Check if property exists
        if (!(key in obj)) {
          errors.push({
            message: `Missing required property: ${key}`,
            path: currentPath,
          });
          return;
        }

        // Check type
        const expectedType = schemaObj[key].type;
        const actualType = Array.isArray(obj[key]) ? "array" : typeof obj[key];

        if (expectedType && expectedType !== actualType) {
          errors.push({
            message: `Type mismatch for ${key}. Expected ${expectedType}, got ${actualType}`,
            path: currentPath,
          });
        }

        // Recursive validation for nested objects
        if (expectedType === "object" && schemaObj[key].properties) {
          validate(obj[key], schemaObj[key].properties, currentPath);
        }
      });
    };

    validate(response, schema);
    return {
      valid: errors.length === 0,
      errors,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1a1b26] rounded-lg p-4 space-y-4"
    >
      <h3 className="text-lg font-medium mb-4">Schema Validator</h3>

      <SchemaEditor
        value={schema}
        onChange={setSchema}
        onValidate={validateSchema}
      />

      {validationResults && <ValidationResults results={validationResults} />}

      <div className="mt-4 p-4 rounded-lg bg-gray-800/50">
        <h4 className="text-sm font-medium mb-2">Quick Template</h4>
        <button
          onClick={() =>
            setSchema(
              JSON.stringify(
                {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    active: { type: "boolean" },
                  },
                },
                null,
                2
              )
            )
          }
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Load Basic Schema Template
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <AlertTriangle size={16} />
        <span>
          Schema validation is performed client-side and supports basic type
          checking
        </span>
      </div>
    </motion.div>
  );
};

export default SchemaValidator;
