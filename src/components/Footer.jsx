import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3"/>
                <line x1="50" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <line x1="50" y1="50" x2="65" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="30" cy="40" r="3" fill="currentColor"/>
                <circle cx="70" cy="40" r="3" fill="currentColor"/>
                <circle cx="50" cy="70" r="3" fill="currentColor"/>
                <line x1="30" y1="40" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="70" y1="40" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="50" y1="70" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>DATAVERSE</span>
            </div>
            <p className="footer-description">
              Transform your data into actionable insights with AI-powered analysis and beautiful visualizations.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Email"><FaEnvelope /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#examples">Examples</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#tutorials">Tutorials</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#api">API</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} DataVerse. All rights reserved.</p>
          <p>Made with ❤️ for data enthusiasts</p>
        </div>
      </div>
    </footer>
  );
}
