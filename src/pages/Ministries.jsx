import React, { useState } from 'react';
import { 
  CheckCircle2, X, Users, Music, Heart, Shield, 
  BookOpen, Sparkles, GraduationCap, Compass, ArrowRight 
} from 'lucide-react';
import { api } from '../utils/api';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';

export default function Ministries({ siteData }) {
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', comments: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const ministries = siteData?.ministries || [];

  const icons = {
    "THN Impact Ministry": <Compass size={28} />,
    "THN Care Foundation": <Heart size={28} />,
    "THN Music & Arts Ministry": <Music size={28} />,
    "THN Men’s Ministry (Real Men)": <Shield size={28} />,
    "THN Women’s Ministry (Blissful Ladies)": <Sparkles size={28} />,
    "THN Children Ministry": <Users size={28} />,
    "THN Campus Ministry": <GraduationCap size={28} />,
    "THN Seniors Ministry": <BookOpen size={28} />
  };

  const descriptions = {
    "THN Impact Ministry": "Reaching out to professionals, corporate leaders, entrepreneurs, and workers. Career mentoring, workplace faith, and marketplace dominance.",
    "THN Care Foundation": "The humanitarian arm coordinating initiatives like 'Feed & Hug', Agodi prison visitations, medical outreach, and compassionate welfare relief.",
    "THN Music & Arts Ministry": "Home of 'Giants Delight' choir. Stewarding prophetic worship encounters, vocal training, dynamic instrumentation, and studio media.",
    "THN Men’s Ministry (Real Men)": "Led by Pastor Tomiwa Oluyen. Gathering men for accountability, strategic brotherhood congresses, character development, and leading the home.",
    "THN Women’s Ministry (Blissful Ladies)": "Led by Pastor Olamide Tomiwa-Oluyen. Empowering women in purpose, marriage, parenting, prayer campaigns, and entrepreneurship.",
    "THN Children Ministry": "Led by Pastor Olamide. Nurturing faith, character, and deep love for scripture in our kids through creative, interactive programs.",
    "THN Campus Ministry": "Mobilizing student giants across tertiary institutions and universities for campus fire altars, evangelism, and leadership development.",
    "THN Seniors Ministry": "Dedicated to elderly believers, offering fellowship, pastoral care, wellness programs, and spiritual companionship."
  };

  const handleOpenJoin = (minName) => {
    setSelectedMinistry(minName);
    setStatus({ type: '', message: '' });
    setFormData({ name: '', email: '', phone: '', comments: '' });
  };

  const handleCloseJoin = () => {
    setSelectedMinistry(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        form_type: 'join_ministry',
        ministry_name: selectedMinistry,
        ...formData
      };
      const res = await api.submitForm(payload);
      if (res.success) {
        setStatus({ type: 'success', message: "Hallelujah! Your registration was saved. The ministry leaders will connect with you shortly!" });
        setFormData({ name: '', email: '', phone: '', comments: '' });
        setTimeout(() => handleCloseJoin(), 2500);
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Failed to register. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-padding container">
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          Find Your Tribe & Community
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '20px' }}>
          Connect, Grow & Serve
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto', lineHeight: '1.8' }}>
          At THN, every member is a giant in training. Discover a tribe where you can build lifelong friendships, grow in spiritual authority, and make an eternal impact.
        </p>
      </AnimatedSection>

      {/* Grid of Ministries */}
      <StaggerContainer className="grid-3" style={{ gap: '32px' }}>
        {ministries.map((min, index) => {
          const desc = descriptions[min.name] || "Serving the church body through specialized programs, prayer groups, and local outreaches.";
          const icon = icons[min.name] || <Users size={28} />;

          return (
            <StaggerItem key={index} className="white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                  <div style={{ 
                    width: '56px', height: '56px', borderRadius: '16px', 
                    background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    {icon}
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                    Active Tribe
                  </span>
                </div>

                <h3 style={{ fontSize: '1.38rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                  {min.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7', marginBottom: '24px' }}>
                  {desc}
                </p>

                {min.leader && min.leader !== "Vacant" && (
                  <div style={{ 
                    padding: '8px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', 
                    fontSize: '0.84rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '28px',
                    display: 'inline-block' 
                  }}>
                    Overseer: {min.leader}
                  </div>
                )}
              </div>

              <button 
                onClick={() => handleOpenJoin(min.name)} 
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '13px 0', fontSize: '0.92rem', justifyContent: 'center' }}
              >
                <span>Connect With This Tribe</span>
                <ArrowRight size={15} />
              </button>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Join Overlay Dialog */}
      {selectedMinistry && (
        <div style={{ 
          position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', 
          background: 'rgba(14, 16, 23, 0.75)', backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '200', padding: '20px' 
        }}>
          <div className="white-card" style={{ width: '100%', maxWidth: '500px', position: 'relative', borderTop: '4px solid var(--primary)', padding: '38px' }}>
            <button 
              onClick={handleCloseJoin} 
              style={{ position: 'absolute', top: '22px', right: '22px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>

            <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Tribe Registration</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '8px' }}>
              Connect With {selectedMinistry}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '24px', lineHeight: '1.65' }}>
              Let us know you'd like to get involved. A ministry leader will reach out to welcome you.
            </p>

            {status.message && (
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: 'var(--radius-sm)', marginBottom: '24px',
                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${status.type === 'success' ? '#10B981' : '#EF4444'}`,
                color: status.type === 'success' ? '#065F46' : '#991B1B',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={18} />
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input className="form-control" type="text" id="name" required value={formData.name} onChange={handleFormChange} placeholder="e.g. Samuel Adekunle" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input className="form-control" type="email" id="email" required value={formData.email} onChange={handleFormChange} placeholder="name@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone *</label>
                  <input className="form-control" type="tel" id="phone" required value={formData.phone} onChange={handleFormChange} placeholder="0801 234 5678" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="comments">Experience or Interests (Optional)</label>
                <textarea className="form-control" id="comments" rows="3" placeholder="Tell us about yourself or how you'd like to help..." value={formData.comments} onChange={handleFormChange}></textarea>
              </div>

              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '0.96rem' }}>
                {submitting ? 'Connecting...' : 'Submit Tribe Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
