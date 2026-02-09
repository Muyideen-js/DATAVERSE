import { motion } from 'framer-motion';
import { FaUpload, FaBrain, FaLightbulb, FaChartPie, FaDownload } from 'react-icons/fa';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    icon: <FaUpload />,
    title: 'Upload Your Data',
    description: 'Drag and drop your CSV or Excel file, or paste your data directly into the platform.'
  },
  {
    number: '02',
    icon: <FaBrain />,
    title: 'AI Analyzes',
    description: 'Our advanced AI automatically processes and analyzes your data to find patterns and insights.'
  },
  {
    number: '03',
    icon: <FaLightbulb />,
    title: 'Get Insights',
    description: 'Receive instant, actionable insights and recommendations based on your data.'
  },
  {
    number: '04',
    icon: <FaChartPie />,
    title: 'Visualize & Explore',
    description: 'Interact with beautiful charts and graphs to explore your data from every angle.'
  },
  {
    number: '05',
    icon: <FaDownload />,
    title: 'Export & Share',
    description: 'Download your visualizations and insights to share with your team or stakeholders.'
  }
];

export default function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <motion.div
          className="how-it-works-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>How It Works</h2>
          <p>Get from data to insights in 5 simple steps</p>
        </motion.div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
