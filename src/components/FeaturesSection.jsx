import { motion } from 'framer-motion';
import { FaBrain, FaChartLine, FaBolt, FaFileUpload, FaChartBar, FaShareAlt } from 'react-icons/fa';
import './FeaturesSection.css';

const features = [
  {
    icon: <FaBrain />,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI algorithms automatically analyze your data and uncover hidden patterns and insights.'
  },
  {
    icon: <FaChartLine />,
    title: 'Interactive Visualizations',
    description: 'Beautiful, interactive charts and graphs that make your data come alive and tell a story.'
  },
  {
    icon: <FaBolt />,
    title: 'Real-time Insights',
    description: 'Get instant insights and recommendations as soon as you upload your data.'
  },
  {
    icon: <FaFileUpload />,
    title: 'Easy Data Upload',
    description: 'Simply drag and drop your CSV or Excel files. No complex setup or configuration required.'
  },
  {
    icon: <FaChartBar />,
    title: 'Multiple Chart Types',
    description: 'Choose from bar charts, line graphs, pie charts, scatter plots, and more.'
  },
  {
    icon: <FaShareAlt />,
    title: 'Export & Share',
    description: 'Export your visualizations and insights to share with your team or stakeholders.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Powerful Features</h2>
          <p>Everything you need to transform your data into actionable insights</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
