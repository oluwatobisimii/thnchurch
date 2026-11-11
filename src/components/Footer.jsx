import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const socialUrl = (platform, handle) => {
  if (!handle) return null;
  if (/^https?:\/\//.test(handle)) return handle;
  const h = handle.replace(/^@|@$/g, '');
  return {
    facebook: `https://facebook.com/${h}`,
    instagram: `https://instagram.com/${h}`,
    threads: `https://threads.net/@${h}`,
    twitter: `https://x.com/${h}`,
    telegram: `https://t.me/${h}`,
    tiktok: `https://tiktok.com/@${h}`,
    linktree: `https://linktr.ee/${h}`,
  }[platform] || null;
};

export default function Footer({ churchInfo }) {
  const giantRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: giantRef, offset: ['start end', 'end end'] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ['-18%', '0%']), { stiffness: 80, damping: 20 });

  if (!churchInfo) return null;
  const { phones = {}, emails = {}, socials = {}, address = {} } = churchInfo;

  const socialLinks = [
    ['TikTok', socialUrl('tiktok', socials.tiktok)],
    ['Instagram', socialUrl('instagram', socials.instagram)],
    ['YouTube', socials.youtube],
    ['Facebook', socialUrl('facebook', socials.facebook)],
    ['Threads', socialUrl('threads', socials.threads)],
    ['X', socialUrl('twitter', socials.twitter)],
    ['Telegram', socialUrl('telegram', socials.telegram)],
    ['Linktree', socialUrl('linktree', socials.linktree)],
  ].filter(([, url]) => url);

  const mainHandle = (socials.instagram || 'thnchurch').replace(/^@|@$/g, '');

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="nav-logo">
              <img src="/thnlogo.png" alt="" />
              <span className="wordmark">THN Church</span>
            </Link>
            <p style={{ marginTop: 16, maxWidth: 320 }}>
              The HAvEN Nation Inc. A young, Spirit-filled family in Ibadan, raising giants since 2016.
            </p>
            <p style={{ marginTop: 18, color: '#fff', fontWeight: 800 }}>
              <span style={{ color: 'var(--lime)' }}>@{mainHandle}</span> on all platforms
            </p>
            <div className="footer-socials" style={{ marginTop: 12 }}>
              {socialLinks.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer">{label}</a>
              ))}
            </div>
          </div>

          <div>
            <h5>Gather</h5>
            <ul>
              <li>Sundays · 9:00 AM</li>
              <li>Wednesdays · 6:00 PM</li>
              <li>{address.venue || 'Giants Theatre'}, Ibadan</li>
              <li><Link to="/new-here">Plan your visit →</Link></li>
            </ul>
          </div>

          <div>
            <h5>Explore</h5>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">What's On</Link></li>
              <li><Link to="/ministries">Ministries</Link></li>
              <li><Link to="/watch">Watch &amp; Listen</Link></li>
              <li><Link to="/resources">Giants Academy</Link></li>
              <li><Link to="/give">Give</Link></li>
            </ul>
          </div>

          <div>
            <h5>Find &amp; Reach Us</h5>
            <ul>
              <li>{address.location}</li>
              {address.landmark && <li style={{ color: 'var(--lime)' }}>{address.landmark}</li>}
              {phones.careLine1 && <li><a href={`tel:${phones.careLine1.replace(/\s/g, '')}`}>{phones.careLine1}</a></li>}
              {phones.careLine2 && <li><a href={`tel:${phones.careLine2.replace(/\s/g, '')}`}>{phones.careLine2}</a></li>}
              {emails.official && <li><a href={`mailto:${emails.official}`}>{emails.official}</a></li>}
            </ul>
          </div>
        </div>

        <div className="footer-giant" aria-hidden="true" ref={giantRef}><motion.div style={{ x }}>Raising Giants</motion.div></div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The HAvEN Nation Inc. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <Link to="/contact">Contact</Link>
            <Link to="/admin">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
