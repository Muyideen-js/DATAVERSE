import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import Lanyard from './Lanyard';
import ClickSpark from './ClickSpark';
import './WelcomeScreen.css';

function WelcomeScreen() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      processFile(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const structuredData = {
            fileName: file.name,
            data: results.data,
            columns: results.meta.fields || Object.keys(results.data[0])
          };
          navigate('/analysis', { state: { data: structuredData } });
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  };

  const loadSampleData = () => {
    const sampleData = [
      { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
      { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
      { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
      { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
      { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
      { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000 }
    ];
    
    const structuredData = {
      fileName: 'Sample Data',
      data: sampleData,
      columns: Object.keys(sampleData[0])
    };
    
    navigate('/analysis', { state: { data: structuredData } });
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-left">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>POWERED BY DATAVERSE</span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform Data Into
              <span className="gradient-text"> Intelligence</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Upload your CSV data and unlock AI-powered insights through natural language. 
              Our generative UI creates perfect visualizations instantly—no coding required.
            </motion.p>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Datasets Analyzed</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">&lt; 1s</div>
                <div className="stat-label">Response Time</div>
              </div>
            </motion.div>

            <motion.div
              className="upload-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <ClickSpark sparkColor="#5227FF" sparkCount={12} sparkRadius={25}>
                <div
                  className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <motion.div
                    className="upload-icon"
                    animate={{
                      y: isDragging ? -10 : [0, -8, 0],
                      scale: isDragging ? 1.1 : 1
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 0.3 }
                    }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </motion.div>
                  <h3>Drop Your CSV Here</h3>
                  <p>or</p>
                  <label className="btn btn-primary">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileInput}
                      style={{ display: 'none' }}
                    />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Browse Files
                  </label>
                  <p className="upload-hint">Supports CSV files up to 10MB</p>
                </div>
              </ClickSpark>
            </motion.div>
          </motion.div>
        </div>

        <div className="welcome-right">
          <motion.div
            className="lanyard-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} fov={75} />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default WelcomeScreen;
