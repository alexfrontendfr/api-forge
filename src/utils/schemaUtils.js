export const validateJsonSchema = (schema, data) => {
  const errors = [];

  const validateType = (value, type) => {
    if (type === "array") return Array.isArray(value);
    if (type === "null") return value === null;
    return typeof value === type;
  };

  const validate = (schemaNode, dataNode, path = "") => {
    if (!schemaNode || !dataNode) return;

    // Check type
    if (schemaNode.type && !validateType(dataNode, schemaNode.type)) {
      errors.push({
        path,
        message: `Expected type ${schemaNode.type} but got ${typeof dataNode}`,
      });
    }

    // Check required properties
    if (schemaNode.required) {
      schemaNode.required.forEach((prop) => {
        if (!(prop in dataNode)) {
          errors.push({
            path: path ? `${path}.${prop}` : prop,
            message: `Missing required property: ${prop}`,
          });
        }
      });
    }

    // Check properties
    if (schemaNode.properties) {
      Object.keys(schemaNode.properties).forEach((key) => {
        const newPath = path ? `${path}.${key}` : key;
        if (dataNode[key] !== undefined) {
          validate(schemaNode.properties[key], dataNode[key], newPath);
        }
      });
    }

    // Check array items
    if (schemaNode.type === "array" && schemaNode.items) {
      dataNode.forEach((item, index) => {
        validate(schemaNode.items, item, `${path}[${index}]`);
      });
    }
  };

  validate(schema, data);
  return errors;
};

export const generateSchemaFromData = (data) => {
  const getType = (value) => {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    return typeof value;
  };

  const generateSchema = (value) => {
    const type = getType(value);
    let schema = { type };

    if (type === "object" && value !== null) {
      schema.properties = {};
      schema.required = [];

      Object.entries(value).forEach(([key, propValue]) => {
        schema.properties[key] = generateSchema(propValue);
        schema.required.push(key);
      });
    }

    if (type === "array" && value.length > 0) {
      const itemSchema = generateSchema(value[0]);
      schema.items = itemSchema;
    }

    return schema;
  };

  return generateSchema(data);
};
