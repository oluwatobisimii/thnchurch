import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import { api } from './utils/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ScrollProgress } from './components/AnimatedSection';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import NewHere from './pages/NewHere';
import Watch from './pages/Watch';
import Programs from './pages/Programs'; // Used for Events page
import Ministries from './pages/Ministries';
import Resources from './pages/Resources';
import Giving from './pages/Giving';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

export default function App() {
  const location = useLocation();
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Theme state: default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const loadSiteData = async () => {
    try {
      const data = await api.getSiteData();
      setSiteData(data);
    } catch (err) {
      console.error("Error loading site data:", err);
      setError("Failed to load website content. Please refresh or try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSiteData();
  }, []);

  // Update theme html attribute on change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid rgba(140,4,104,0.1)', 
            borderTopColor: 'var(--primary)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px auto'
          }}></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>Loading THN…</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
        <div className="glass-card" style={{ maxWidth: '480px', textAlign: 'center', padding: '40px 30px' }}>
          <h2 style={{ color: 'var(--orange)', fontSize: '2.2rem', marginBottom: '15px' }}>Connection Error</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px', lineHeight: '1.6' }}>{error}</p>
          <button onClick={() => { setLoading(true); setError(null); loadSiteData(); }} className="btn btn-primary">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="app-container">
      <Navbar theme={theme} toggleTheme={toggleTheme} programs={siteData?.programs} />
      <ScrollProgress />
      <main>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
        <Routes location={location}>
          <Route path="/" element={<Home siteData={siteData} />} />
          <Route path="/about" element={<About siteData={siteData} />} />
          <Route path="/new-here" element={<NewHere siteData={siteData} />} />
          <Route path="/watch" element={<Watch siteData={siteData} />} />
          <Route path="/events" element={<Programs siteData={siteData} />} />
          <Route path="/ministries" element={<Ministries siteData={siteData} />} />
          <Route path="/resources" element={<Resources siteData={siteData} />} />
          <Route path="/give" element={<Giving siteData={siteData} />} />
          <Route path="/contact" element={<Contact siteData={siteData} />} />
          <Route path="/admin" element={<Admin siteData={siteData} reloadSiteData={loadSiteData} />} />
        </Routes>
        </motion.div>
        </AnimatePresence>
      </main>
      <Footer churchInfo={siteData?.churchInfo} />
    </div>
    </MotionConfig>
  );
}
