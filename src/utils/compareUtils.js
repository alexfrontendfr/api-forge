import * as diffLib from "diff";

export const compareResponses = (oldResponse, newResponse) => {
  const differences = diffLib.diffJson(oldResponse, newResponse);

  return differences.map((part) => ({
    ...part,
    type: part.added ? "addition" : part.removed ? "deletion" : "unchanged",
    displayValue: JSON.stringify(part.value, null, 2),
  }));
};

export const getChangeSummary = (differences) => {
  return {
    additions: differences.filter((d) => d.type === "addition").length,
    deletions: differences.filter((d) => d.type === "deletion").length,
    changes: differences.filter((d) => d.type !== "unchanged").length,
  };
};

export const highlightDifferences = (text, type) => {
  const colors = {
    addition: "bg-green-500/10 text-green-400",
    deletion: "bg-red-500/10 text-red-400",
    unchanged: "text-gray-300",
  };

  return {
    className: colors[type] || colors.unchanged,
    text,
  };
};
