import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { api } from '../utils/api';
import AnimatedSection, { StaggerContainer, StaggerItem, RH1, RH2 } from '../components/AnimatedSection';

export default function Contact({ siteData }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const churchInfo = siteData?.churchInfo || {};
  const address = churchInfo.address || {};
  const phones = churchInfo.phones || {};
  const emails = churchInfo.emails || {};

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setStatus({ type: 'success', message: "Your message has been received! Our ministry team will get back to you shortly." });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Failed to send message. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-padding container">
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          We Are Here For You
        </span>
        <RH1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '18px' }}>
          Contact Pastoral & Admin Team
        </RH1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto', lineHeight: '1.8' }}>
          Have a prayer request, testimony, or inquiry about our programs? Reach out to us. We would love to hear from you.
        </p>
      </AnimatedSection>

      <div className="stack-md" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '56px', alignItems: 'start' }}>
        
        {/* Contact Details */}
        <AnimatedSection direction="right">
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Channels</span>
          <RH2 style={{ fontSize: '2.2rem', marginBottom: '28px', color: 'var(--text-main)' }}>
            Get In Touch
          </RH2>

          <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <StaggerItem className="white-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '28px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.12rem', color: 'var(--text-main)', marginBottom: '4px' }}>Care & Helpline</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', margin: 0 }}>{phones.careLine1} / {phones.careLine2}</p>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.84rem', marginTop: '4px', margin: 0 }}>Media Suite: {phones.mediaSuite}</p>
              </div>
            </StaggerItem>

            <StaggerItem className="white-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '28px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.12rem', color: 'var(--text-main)', marginBottom: '4px' }}>Official Email</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', margin: 0 }}>
                  <a href={`mailto:${emails.official}`} style={{ color: 'var(--primary-hover)', fontWeight: '600', textDecoration: 'none' }}>{emails.official}</a>
                </p>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.84rem', marginTop: '4px', margin: 0 }}>
                  Choir / Media: <a href={`mailto:${emails.ministry}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>{emails.ministry}</a>
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="white-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '28px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.12rem', color: 'var(--text-main)', marginBottom: '4px' }}>Headquarters Sanctuary</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.65', margin: 0 }}>
                  <strong>{address.venue}</strong> &bull; {address.location}
                </p>
                <span style={{ fontSize: '0.84rem', color: 'var(--primary)', fontWeight: '600' }}>({address.landmark})</span>
              </div>
            </StaggerItem>

            <StaggerItem className="white-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '28px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.12rem', color: 'var(--text-main)', marginBottom: '4px' }}>Office & Service Hours</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>Monday &mdash; Friday: 9:00 AM &mdash; 5:00 PM</p>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.84rem', marginTop: '4px', margin: 0 }}>Sunday Giant Service: 9:00 AM &mdash; 11:30 AM</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>

        {/* Messaging Form */}
        <AnimatedSection direction="left" className="white-card" style={{ borderTop: '4px solid var(--primary)', padding: '38px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Send A Note</span>
          <h3 style={{ fontSize: '1.7rem', color: 'var(--text-main)', marginBottom: '8px' }}>
            We'd Love To Hear From You
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '28px', lineHeight: '1.7' }}>
            Fill out the form below and our administrative office will respond to you promptly.
          </p>

          {status.message && (
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: 'var(--radius-sm)', marginBottom: '24px',
              background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${status.type === 'success' ? '#10B981' : '#EF4444'}`,
              color: status.type === 'success' ? '#065F46' : '#991B1B',
              fontSize: '0.92rem'
            }}>
              {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input className="form-control" type="text" id="name" required value={formData.name} onChange={handleFormChange} placeholder="e.g. David Adeleke" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input className="form-control" type="email" id="email" required value={formData.email} onChange={handleFormChange} placeholder="name@example.com" />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
                <input className="form-control" type="tel" id="phone" value={formData.phone} onChange={handleFormChange} placeholder="0801 234 5678" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input className="form-control" type="text" id="subject" value={formData.subject} onChange={handleFormChange} placeholder="Inquiry / Prayer Request" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message *</label>
              <textarea className="form-control" id="message" rows="5" required value={formData.message} onChange={handleFormChange} placeholder="Write your message here..."></textarea>
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '0.98rem' }}>
              <Send size={16} />
              <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </AnimatedSection>

      </div>
    </div>
  );
}
