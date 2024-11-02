import React from "react";
import { motion } from "framer-motion";
import { Github, Settings, HelpCircle } from "lucide-react";

const Header = ({ onOpenDocs, onOpenSettings }) => {
  const handleGithubClick = (e) => {
    if (process.env.NODE_ENV !== "production") {
      e.preventDefault();
      window.open("https://github.com/alexfrontendfr/api-forge", "_blank");
    }
  };

  const navItems = [
    {
      icon: <Github />,
      label: "GitHub",
      href:
        process.env.NODE_ENV === "production"
          ? "https://github.com/alexfrontendfr/api-forge"
          : "#",
      onClick: handleGithubClick,
      external: true,
    },
    {
      icon: <HelpCircle />,
      label: "Docs",
      onClick: onOpenDocs,
    },
    {
      icon: <Settings />,
      label: "Settings",
      onClick: onOpenSettings,
    },
  ];

  return (
    <header className="relative overflow-hidden">
      {/* Background gradient with lower z-index */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-gradient pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content with higher z-index */}
      <div
        className="container mx-auto px-4 py-8 relative"
        style={{ zIndex: 10 }}
      >
        <nav className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <span className="text-xl font-bold text-white">API</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            {navItems.map((item, index) =>
              item.external ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={item.onClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.a>
              ) : (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              )
            )}
          </motion.div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            API Response Formatter
          </h1>
          <p className="text-gray-300 text-lg">
            A modern tool for testing APIs and formatting responses. Perfect for
            frontend developers who need to visualize and understand API data
            structures.
          </p>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
