import { motion } from 'framer-motion';
import { FaClock, FaCode, FaPalette, FaBullseye, FaLock } from 'react-icons/fa';
import './BenefitsSection.css';

const benefits = [
  {
    icon: <FaClock />,
    title: 'Save Time',
    description: 'Analyze data in minutes, not hours. Our AI does the heavy lifting so you can focus on insights.',
    stat: '10x Faster'
  },
  {
    icon: <FaCode />,
    title: 'No Coding Required',
    description: 'Zero programming knowledge needed. Our intuitive interface makes data analysis accessible to everyone.',
    stat: '100% No-Code'
  },
  {
    icon: <FaPalette />,
    title: 'Beautiful Visualizations',
    description: 'Create stunning, professional charts and graphs that make your data easy to understand.',
    stat: '20+ Chart Types'
  },
  {
    icon: <FaBullseye />,
    title: 'Actionable Insights',
    description: 'Get clear, actionable recommendations based on your data, not just numbers.',
    stat: 'AI-Powered'
  },
  {
    icon: <FaLock />,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. We never share your information with third parties.',
    stat: 'Bank-Level Security'
  }
];

export default function BenefitsSection() {
  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <motion.div
          className="benefits-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose DataVerse?</h2>
          <p>The smartest way to analyze and visualize your data</p>
        </motion.div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <div className="benefit-stat">{benefit.stat}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
