const mockValues = {
  string: [
    "Lorem ipsum",
    "Hello World",
    "Sample Text",
    "Example String",
    "Test Data",
  ],
  number: () => Math.floor(Math.random() * 1000),
  boolean: () => Math.random() > 0.5,
  array: (schema, depth = 0) => {
    if (depth > 2) return []; // Prevent infinite recursion
    return Array.from({ length: 3 }, () =>
      generateMockData(schema.items, depth + 1)
    );
  },
};

export const generateMockData = (schema, depth = 0) => {
  if (depth > 5) return null; // Prevent infinite recursion

  switch (schema.type) {
    case "object":
      const obj = {};
      if (schema.properties) {
        Object.entries(schema.properties).forEach(([key, propSchema]) => {
          obj[key] = generateMockData(propSchema, depth + 1);
        });
      }
      return obj;

    case "array":
      return mockValues.array(schema, depth);

    case "string":
      return mockValues.string[
        Math.floor(Math.random() * mockValues.string.length)
      ];

    case "number":
      return mockValues.number();

    case "boolean":
      return mockValues.boolean();

    default:
      return null;
  }
};

export const generateMockResponse = (config) => {
  const count = config.responseType === "array" ? config.items : 1;
  const mockData = Array.from({ length: count }, (_, index) => {
    return Object.entries(config.schema.properties).reduce(
      (acc, [key, value]) => {
        acc[key] = generateMockValue(value.type, key, index);
        return acc;
      },
      {}
    );
  });

  return config.responseType === "array" ? mockData : mockData[0];
};

const generateMockValue = (type, key, index) => {
  switch (type) {
    case "string":
      if (key.includes("email")) return `user${index}@example.com`;
      if (key.includes("name")) return `User ${index}`;
      if (key.includes("id")) return `ID_${index}`;
      return `${key}_${index}`;

    case "number":
      if (key.includes("id")) return index;
      if (key.includes("age")) return 20 + Math.floor(Math.random() * 50);
      if (key.includes("price")) return Math.floor(Math.random() * 1000) / 100;
      return Math.floor(Math.random() * 100);

    case "boolean":
      return Math.random() > 0.5;

    default:
      return null;
  }
};
