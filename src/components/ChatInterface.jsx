import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSend, FiCpu, FiUser } from 'react-icons/fi';
import './ChatInterface.css';
import TopBar from './TopBar';
import InsightsPanel from './InsightsPanel';
import SuggestedQueries from './SuggestedQueries';
import LineChartComponent from './charts/LineChartComponent';
import BarChartComponent from './charts/BarChartComponent';
import PieChartComponent from './charts/PieChartComponent';
import DataTableComponent from './charts/DataTableComponent';
import StatsCard from './charts/StatsCard';
import AlertCard from './charts/AlertCard';

// Tambo AI component selector
const selectComponent = (query, data) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('trend') || lowerQuery.includes('over time') || lowerQuery.includes('timeline')) {
    return { type: 'line', reason: 'Detected temporal pattern analysis' };
  }
  
  if (lowerQuery.includes('compare') || lowerQuery.includes('which') || lowerQuery.includes('most') || lowerQuery.includes('highest') || lowerQuery.includes('lowest')) {
    return { type: 'bar', reason: 'Detected comparison query' };
  }
  
  if (lowerQuery.includes('distribution') || lowerQuery.includes('percentage') || lowerQuery.includes('proportion') || lowerQuery.includes('breakdown')) {
    return { type: 'pie', reason: 'Detected distribution analysis' };
  }
  
  if (lowerQuery.includes('anomal') || lowerQuery.includes('outlier') || lowerQuery.includes('weird') || lowerQuery.includes('unusual')) {
    return { type: 'alert', reason: 'Detected anomaly detection request' };
  }
  
  if (lowerQuery.includes('show') || lowerQuery.includes('data') || lowerQuery.includes('table') || lowerQuery.includes('list')) {
    return { type: 'table', reason: 'Detected raw data request' };
  }
  
  if (lowerQuery.includes('summary') || lowerQuery.includes('overview') || lowerQuery.includes('stats')) {
    return { type: 'stats', reason: 'Detected summary statistics request' };
  }
  
  return { type: 'bar', reason: 'General query - showing comparison view' };
};

function ChatInterface() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  useEffect(() => {
    if (!data) {
      navigate('/');
    }
  }, [data, navigate]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (data) {
      setMessages([
        {
          type: 'ai',
          text: `Welcome! I've loaded **${data.fileName}** with ${data.data.length} rows and ${data.columns.length} columns. What would you like to explore?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (queryText = null) => {
    const query = queryText || input;
    if (!query.trim()) return;

    const userMessage = {
      type: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const componentSelection = selectComponent(query, data);
      
      const aiResponse = {
        type: 'ai',
        text: `${componentSelection.reason}. Here's what I found:`,
        component: componentSelection.type,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1500);
  };

  const renderComponent = (type) => {
    const componentMap = {
      line: <LineChartComponent data={data} />,
      bar: <BarChartComponent data={data} />,
      pie: <PieChartComponent data={data} />,
      table: <DataTableComponent data={data} />,
      stats: <StatsCard data={data} />,
      alert: <AlertCard data={data} />
    };
    return componentMap[type] || null;
  };

  if (!data) return null;

  return (
    <div className="redesigned-analysis-page">
      <TopBar data={data} />
      
      <div className="analysis-layout">
        {/* Main Chat Area */}
        <div className="main-chat-area">
          <div className="messages-container">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`chat-message ${message.type}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.type === 'ai' ? <FiCpu /> : <FiUser />}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">
                        {message.type === 'DATAVERSE' ? 'DATAVERSE' : 'You'}
                      </span>
                      <span className="message-time">
                        {message.timestamp.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="message-text">{message.text}</div>
                    {message.component && (
                      <motion.div 
                        className="chart-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {renderComponent(message.component)}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isThinking && (
              <motion.div
                className="chat-message ai thinking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="message-avatar">
                  <FiCpu className="thinking-icon" />
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-sender">DATAVERSE</span>
                  </div>
                  <div className="thinking-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="input-area">
            {messages.length === 1 && (
              <SuggestedQueries onQuerySelect={handleSend} />
            )}
            
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about your data..."
                className="chat-input"
              />
              <button 
                className="send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isThinking}
              >
                <FiSend />
              </button>
            </div>
            <div className="input-hint">
              Press Enter to send • Powered by Tambo AI
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <InsightsPanel data={data} messages={messages} />
      </div>
    </div>
  );
}

export default ChatInterface;
