import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { upcomingEvents, formatEventDate } from '../utils/events';

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/new-here', label: 'New Here' },
  { to: '/events', label: "What's On" },
  { to: '/ministries', label: 'Ministries' },
  { to: '/watch', label: 'Watch' },
  { to: '/resources', label: 'Academy' },
  { to: '/give', label: 'Give' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme, programs = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

  const tickerItems = [
    { text: 'Sundays 9AM · Giants Theatre, Ibadan', to: '/new-here' },
    ...upcomingEvents(programs).slice(0, 5).map((e) => ({ text: `${e.title} · ${formatEventDate(e)}`, to: '/events' })),
  ];

  // Rendered twice so the marquee loops seamlessly.
  const renderTicker = (keyPrefix, hidden) => tickerItems.map((item, i) => (
    <span className="tick-item" key={`${keyPrefix}${i}`} aria-hidden={hidden || undefined}>
      <Link to={item.to} tabIndex={hidden ? -1 : undefined}>{item.text}</Link>
    </span>
  ));

  return (
    <header className="site-header">
      <div className="top-ticker marquee" aria-label="Announcements">
        <div className="marquee-track">
          {renderTicker('a')}
          {renderTicker('b', true)}
        </div>
      </div>

      <nav className="navbar" aria-label="Main">
        <div className="container">
          <Link to="/" className="nav-logo" aria-label="The HAvEN Nation — home">
            <img src="/thnlogo.png" alt="" />
            <span className="wordmark">The HAvEN Nation</span>
          </Link>

          <ul className={`nav-menu ${isOpen ? 'open' : ''}`} id="main-menu">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-cta-item">
              <Link to="/new-here" className="btn btn-primary">Pull Up Sunday <ArrowRight size={16} /></Link>
            </li>
          </ul>

          <div className="nav-actions">
            <Link to="/new-here" className="btn btn-primary nav-cta">Pull Up Sunday <ArrowRight size={15} /></Link>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="main-menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
