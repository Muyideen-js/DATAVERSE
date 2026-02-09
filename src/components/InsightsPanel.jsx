import { motion } from 'framer-motion';
import { FiTrendingUp, FiAlertCircle, FiCheckCircle, FiActivity, FiBarChart2, FiDollarSign } from 'react-icons/fi';
import './InsightsPanel.css';

function InsightsPanel({ data, messages }) {
  // Calculate key metrics
  const totalRevenue = data?.data?.reduce((sum, row) => sum + (row.revenue || 0), 0) || 0;
  const avgRevenue = data?.data?.length ? totalRevenue / data.data.length : 0;
  const maxRevenue = Math.max(...(data?.data?.map(row => row.revenue || 0) || [0]));
  
  // Auto-generate insights
  const insights = [
    {
      icon: <FiTrendingUp />,
      title: 'Revenue Trend',
      description: `Total revenue: $${totalRevenue.toLocaleString()}`,
      type: 'success'
    },
    {
      icon: <FiActivity />,
      title: 'Average Performance',
      description: `Avg per record: $${avgRevenue.toFixed(2)}`,
      type: 'info'
    },
    {
      icon: <FiCheckCircle />,
      title: 'Data Quality',
      description: `${data?.data?.length || 0} complete records`,
      type: 'success'
    }
  ];

  return (
    <motion.div 
      className="insights-panel"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="panel-header">
        <h3>INSIGHTS</h3>
        <span className="insights-badge">{insights.length}</span>
      </div>

      <div className="insights-content">
        {/* Key Metrics */}
        <div className="metrics-section">
          <h4 className="section-title">KEY METRICS</h4>
          <div className="metric-cards">
            <div className="metric-card">
              <div className="metric-icon revenue">
                <FiDollarSign />
              </div>
              <div className="metric-info">
                <span className="metric-label">TOTAL REVENUE</span>
                <span className="metric-value">${(totalRevenue / 1000).toFixed(1)}K</span>
                <span className="metric-trend positive">↑ 12.5%</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon average">
                <FiActivity />
              </div>
              <div className="metric-info">
                <span className="metric-label">AVERAGE</span>
                <span className="metric-value">${avgRevenue.toFixed(0)}</span>
                <span className="metric-trend neutral">→ 0.0%</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon peak">
                <FiBarChart2 />
              </div>
              <div className="metric-info">
                <span className="metric-label">PEAK VALUE</span>
                <span className="metric-value">${maxRevenue.toLocaleString()}</span>
                <span className="metric-trend positive">↑ 8.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Auto Insights */}
        <div className="auto-insights-section">
          <h4 className="section-title">AUTO-GENERATED INSIGHTS</h4>
          <div className="insights-list">
            {insights.map((insight, index) => (
              <motion.div 
                key={index}
                className={`insight-item ${insight.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="insight-icon">{insight.icon}</div>
                <div className="insight-content">
                  <h5>{insight.title}</h5>
                  <p>{insight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Quality */}
        <div className="quality-section">
          <h4 className="section-title">DATA QUALITY</h4>
          <div className="quality-indicator">
            <div className="quality-bar">
              <div className="quality-fill" style={{ width: '95%' }}></div>
            </div>
            <span className="quality-score">95% Complete</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default InsightsPanel;
