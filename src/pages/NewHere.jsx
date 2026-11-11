import React, { useState } from 'react';
import { Clock, MapPin, Sparkles, Plus, Minus, CheckCircle, ArrowRight, ShieldCheck, Heart, Car } from 'lucide-react';
import { api } from '../utils/api';
import AnimatedSection, { RH1, RH2 } from '../components/AnimatedSection';

export default function NewHere({ siteData }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', visitDate: '', serviceTime: 'Sunday 9:00 AM', guestsCount: '1' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: "Where is THN Church located and is there parking?",
      a: "Our headquarters is located at Giants Theatre, Plot 9, Block A, Oluyole Main Estate, Ibadan, Nigeria (Beside Ibadan Progressive Union). Free, secure on-site parking is available for all worshippers and guests with traffic marshals to guide you."
    },
    {
      q: "What times are your services and how long do they last?",
      a: "Our main weekly Sunday Giant Service begins at 9:00 AM (West Africa Time) and runs for approximately 2 hours filled with atmospheric prophetic worship, apostolic teaching, and prayers. We also host Midweek Bible Study on Wednesdays at 6:00 PM."
    },
    {
      q: "Is there a dedicated church for my children?",
      a: "Absolutely! THN Kids (overseen by Co-Lead Pastor Olamide Tomiwa-Oluyen) operates a fun, highly secure, and faith-filled children's church during our Sunday services. Children enjoy age-appropriate Bible lessons, worship, and games under the care of certified teachers."
    },
    {
      q: "What should I wear? Is there a strict dress code?",
      a: "We welcome you just as you are! Some members prefer traditional or formal attire, while many others wear clean, casual clothes. On specific celebratory Sundays (like Thanksgiving or All-White Sunday), special themes are announced ahead of time, but you are always free to dress comfortably."
    },
    {
      q: "Will I be called out or made to stand up awkwardly?",
      a: "Not at all. We value your comfort and privacy. While we joyfully welcome first-time visitors and have a dedicated hospitality lounge with refreshments and a gift package, you will never be put on the spot or made uncomfortable."
    }
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        form_type: 'plan_visit',
        ...formData
      };
      const res = await api.submitForm(payload);
      if (res.success) {
        setStatus({ type: 'success', message: "Hallelujah! Your visit has been scheduled. Our hospitality team can't wait to welcome you home!" });
        setFormData({ name: '', email: '', phone: '', visitDate: '', serviceTime: 'Sunday 9:00 AM', guestsCount: '1' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Failed to submit plan. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const churchInfo = siteData?.churchInfo || {};
  const address = churchInfo.address || {};

  return (
    <div className="section-padding container">
      {/* Page Header */}
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          Your First Visit Guide
        </span>
        <RH1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '20px' }}>
          Welcome Home to THN
        </RH1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto', lineHeight: '1.8' }}>
          Whether you are exploring Christianity for the first time or seeking a vibrant spiritual family to grow with, there is a seat saved for you at The HAvEN Nation.
        </p>
      </AnimatedSection>

      {/* Community Photo Frame with Gradient Scrim */}
      <AnimatedSection direction="up" delay={0.1} style={{ marginBottom: '72px' }}>
        <div className="editorial-frame" style={{ height: '420px' }}>
          <img 
            src="/images/thn_community_life.png" 
            alt="THN Church Community Gathering" 
          />
          <div className="editorial-scrim"></div>
          <div className="editorial-badge" style={{ top: '24px', left: '24px' }}>
            <Heart size={14} />
            <span>Real People<span className="hide-sm"> &bull; Authentic Community</span> &bull; Spiritual Growth</span>
          </div>
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '6px' }}>Giants Theatre &bull; Oluyole, Ibadan</h3>
            <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
              Sundays at 9:00 AM (WAT) &bull; Midweek Bible Study Wednesdays at 6:00 PM
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Perks Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '72px' }}>
        <div className="white-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '24px' }}>
          <Car size={26} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>Free Safe Parking</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>Secure on-site parking at Giants Theatre</p>
          </div>
        </div>

        <div className="white-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '24px' }}>
          <ShieldCheck size={26} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>Kids Church Active</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>Safe, creative faith learning for children</p>
          </div>
        </div>

        <div className="white-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '24px' }}>
          <Sparkles size={26} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>Welcome Gift Pack</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>A special token & reception for all guests</p>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '56px', alignItems: 'start', marginBottom: '80px' }}>
        
        {/* Left Column: What to Expect & FAQ */}
        <AnimatedSection direction="right">
          <RH2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>Frequently Asked Questions</RH2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.75', marginBottom: '32px' }}>
            Got questions before attending? We've answered the most common ones below to help you feel right at home.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="white-card" 
                style={{ padding: '24px 28px', cursor: 'pointer', transition: 'var(--transition-fast)' }} 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <h4 style={{ fontSize: '1.08rem', color: 'var(--text-main)', margin: 0, fontWeight: '700' }}>{faq.q}</h4>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', background: activeFaq === idx ? 'var(--primary)' : 'var(--bg-secondary)', 
                    color: activeFaq === idx ? '#FFFFFF' : 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                  }}>
                    {activeFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>
                {activeFaq === idx && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginTop: '16px', lineHeight: '1.75', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px', background: 'var(--bg-cream)', padding: '24px 28px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(140, 4, 104, 0.2)' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-main)' }}>Location Details</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', margin: 0, lineHeight: '1.65' }}>
              <strong>{address.venue || "Giants Theatre"}</strong><br />
              {address.location || "Plot 9, Block A, Oluyole Main Estate, Ibadan, Nigeria"}<br />
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Landmark: {address.landmark || "Beside Ibadan Progressive Union"}</span>
            </p>
          </div>
        </AnimatedSection>

        {/* Right Column: Schedule Visit Interactive Form */}
        <AnimatedSection direction="left" className="white-card" style={{ padding: '40px', borderTop: '4px solid var(--primary)' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
            VIP Guest Experience
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '12px' }}>
            Plan Your Visit
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '28px', lineHeight: '1.7' }}>
            Fill out this quick form and our hospitality team will save your seat, meet you at the door, and ensure you have an unforgettable first Sunday.
          </p>

          {status.message && (
            <div style={{ 
              padding: '16px 20px', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: '24px',
              background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${status.type === 'success' ? '#10B981' : '#EF4444'}`,
              color: status.type === 'success' ? '#065F46' : '#991B1B',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle size={18} />
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                className="form-control" 
                value={formData.name} 
                onChange={handleFormChange} 
                placeholder="e.g. David Adeleke" 
                required 
              />
            </div>

            <div className="stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control" 
                  value={formData.email} 
                  onChange={handleFormChange} 
                  placeholder="name@example.com" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="form-control" 
                  value={formData.phone} 
                  onChange={handleFormChange} 
                  placeholder="0801 234 5678" 
                  required 
                />
              </div>
            </div>

            <div className="stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="visitDate" className="form-label">Intended Date</label>
                <input 
                  type="date" 
                  id="visitDate" 
                  className="form-control" 
                  value={formData.visitDate} 
                  onChange={handleFormChange} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="guestsCount" className="form-label">How Many in Party?</label>
                <select 
                  id="guestsCount" 
                  className="form-control" 
                  value={formData.guestsCount} 
                  onChange={handleFormChange}
                >
                  <option value="1">Just Me (1)</option>
                  <option value="2">2 People</option>
                  <option value="3-4">Family / Group (3-4)</option>
                  <option value="5+">Large Group (5+)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="serviceTime" className="form-label">Service Choice</label>
              <select 
                id="serviceTime" 
                className="form-control" 
                value={formData.serviceTime} 
                onChange={handleFormChange}
              >
                <option value="Sunday 9:00 AM">Sunday Giant Service &bull; 9:00 AM (Physical)</option>
                <option value="Wednesday 6:00 PM">Midweek Bible Study &bull; Wednesday 6:00 PM</option>
                <option value="Online Livestream">Connecting Online First</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '10px' }} 
              disabled={submitting}
            >
              <Sparkles size={16} />
              <span>{submitting ? "Confirming Your Visit..." : "Schedule My Visit"}</span>
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textAlign: 'center', marginTop: '14px', margin: 0 }}>
              No spam. We will only send you a reminder text and directions.
            </p>
          </form>
        </AnimatedSection>

      </div>
    </div>
  );
}
