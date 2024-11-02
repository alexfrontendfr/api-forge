import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Coffee } from "lucide-react";

const Footer = ({ onOpenDocs }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-20 border-t border-gray-800 bg-gray-900/50"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">API Forge</h3>
            <p className="text-gray-400">
              Built with modern web technologies for developers who care about
              productivity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenDocs}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/alexfrontendfr/api-forge#examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/alexfrontendfr/api-forge/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/alexfrontendfr/api-forge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/alex-iulian-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.buymeacoffee.com/alexfrontend"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Coffee size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            © 2024 API Forge. Built with React, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
