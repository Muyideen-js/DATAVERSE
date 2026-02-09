import { motion } from 'framer-motion';
import './Header.css';

function Header() {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="logo-section"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="logo-icon"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" fill="#8b5cf6" />
                <path d="M12 6L15 12L12 18L9 12L12 6Z" fill="white" />
                <circle cx="12" cy="12" r="2" fill="white" opacity="0.6" />
              </svg>
            </motion.div>
            <div className="logo-text">
              <h1>DataVerse</h1>
              <p>Generative UI Analytics</p>
            </div>
          </motion.div>
          <div className="header-actions">
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Export
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
