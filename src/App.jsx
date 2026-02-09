import { Routes, Route, useLocation } from 'react-router-dom';
import CardNav from './components/CardNav';
import WelcomeScreen from './components/WelcomeScreen';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const navItems = [
    {
      label: "Features",
      bgColor: "#1a1a1a",
      textColor: "#ffffff",
      links: [
        { label: "Smart Visualizations", href: "/analysis", ariaLabel: "Smart Visualizations Feature" },
        { label: "Natural Language", href: "/analysis", ariaLabel: "Natural Language Feature" },
        { label: "Anomaly Detection", href: "/analysis", ariaLabel: "Anomaly Detection Feature" }
      ]
    },
    {
      label: "Resources",
      bgColor: "#1a1a1a",
      textColor: "#ffffff",
      links: [
        { label: "Documentation", href: "/", ariaLabel: "View Documentation" },
        { label: "API Reference", href: "/", ariaLabel: "API Reference" },
        { label: "Examples", href: "/analysis", ariaLabel: "View Examples" }
      ]
    },
    {
      label: "Connect",
      bgColor: "#1a1a1a",
      textColor: "#ffffff",
      links: [
        { label: "GitHub", href: "/", ariaLabel: "Visit GitHub" },
        { label: "Twitter", href: "/", ariaLabel: "Follow on Twitter" },
        { label: "Discord", href: "/", ariaLabel: "Join Discord" }
      ]
    }
  ];

  const location = useLocation();
  const isAnalysisPage = location.pathname === '/analysis';

  return (
    <div className="app">
      {!isAnalysisPage && (
        <CardNav
          items={navItems}
          baseColor="transparent"
          menuColor="#000000"
          buttonBgColor="#000000"
          buttonTextColor="#ffffff"
          ease="power3.out"
        />
      )}
      
      <main className={`main-content ${isAnalysisPage ? 'analysis-mode' : ''}`}>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/analysis" element={<ChatInterface />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
