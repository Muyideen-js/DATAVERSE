import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

function TopBar({ data }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recordCount, setRecordCount] = useState(0);
  const [fieldCount, setFieldCount] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update data stats in real-time when data changes
  useEffect(() => {
    if (data) {
      setRecordCount(data.data?.length || 0);
      setFieldCount(data.columns?.length || 0);
    }
  }, [data]);

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <motion.div 
      className="analysis-topbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="topbar-left">
        <div className="logo-section" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="dataset-info">
            <h1 className="dataset-name">DATAVERSE</h1>
            <span className="dataset-subtitle">Analysis Console</span>
          </div>
        </div>
      </div>

      <div className="topbar-center">
        <div className="quick-stat">
          <svg className="stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <div className="stat-content">
            <motion.span 
              className="stat-value"
              key={recordCount}
              initial={{ scale: 1.2, color: '#00ff88' }}
              animate={{ scale: 1, color: '#000' }}
              transition={{ duration: 0.3 }}
            >
              {recordCount}
            </motion.span>
            <span className="stat-label">Records</span>
          </div>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="quick-stat">
          <svg className="stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
          </svg>
          <div className="stat-content">
            <motion.span 
              className="stat-value"
              key={fieldCount}
              initial={{ scale: 1.2, color: '#00ff88' }}
              animate={{ scale: 1, color: '#000' }}
              transition={{ duration: 0.3 }}
            >
              {fieldCount}
            </motion.span>
            <span className="stat-label">Fields</span>
          </div>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="quick-stat time-stat">
          <svg className="stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div className="stat-content">
            <span className="stat-value">{formatTime()}</span>
            <span className="stat-label">{formatDate()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TopBar;
