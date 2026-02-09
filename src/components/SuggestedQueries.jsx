import { motion } from 'framer-motion';
import { FiTrendingUp, FiMap, FiSearch, FiPieChart, FiFileText, FiAward } from 'react-icons/fi';
import './SuggestedQueries.css';

function SuggestedQueries({ onQuerySelect }) {
  const suggestions = [
    { text: 'Show revenue trends over time', icon: <FiTrendingUp /> },
    { text: 'Compare sales by region', icon: <FiMap /> },
    { text: 'Find anomalies in the data', icon: <FiSearch /> },
    { text: 'Show data distribution', icon: <FiPieChart /> },
    { text: 'Summary statistics', icon: <FiFileText /> },
    { text: 'Top performing products', icon: <FiAward /> }
  ];

  return (
    <div className="suggested-queries">
      <span className="suggestions-label">TRY ASKING:</span>
      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            className="suggestion-pill"
            onClick={() => onQuerySelect(suggestion.text)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="suggestion-icon">{suggestion.icon}</span>
            <span className="suggestion-text">{suggestion.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedQueries;
