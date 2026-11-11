import React, { useState } from 'react';
import { Wallet, CreditCard, Heart, CheckCircle2, Copy, Check, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Giving({ siteData }) {
  const giving = siteData?.churchInfo?.giving || {};
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  return (
    <div className="section-padding container">
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          Kingdom Partnership
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '20px' }}>
          Giving & Sowing
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto', lineHeight: '1.8' }}>
          Your cheerful giving fuels kingdom transformation, gospel propagation, and compassion outreaches across Ibadan, Nigeria, and beyond.
        </p>
      </AnimatedSection>

      <div className="grid-2" style={{ gap: '56px', alignItems: 'start' }}>
        
        {/* Why We Give / Vision Alignment */}
        <AnimatedSection direction="right" className="white-card" style={{ padding: '40px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
            Why We Give
          </span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '18px', color: 'var(--text-main)' }}>
            Partner In Kingdom Impact
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '32px' }}>
            Every seed, tithe, and partnership offering you sow directly empowers gospel expansion, campus revival crusades, discipleship schools, and compassionate neighborhood welfare.
          </p>

          <div style={{ display: 'grid', gap: '20px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(140, 4, 104, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <CheckCircle2 size={18} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', margin: 0 }}>
                <strong>Community Relief:</strong> Powering humanitarian drives like <em>Feed & Hug</em>, medical aid, and Agodi prison outreach.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(140, 4, 104, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <CheckCircle2 size={18} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', margin: 0 }}>
                <strong>Youth & Campus Missions:</strong> Equipping university fire altars and raising the next generation of spiritual giants.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(140, 4, 104, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <CheckCircle2 size={18} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', margin: 0 }}>
                <strong>Global Broadcast Facilities:</strong> Expanding high-definition video suites and lightweight low-data audio channels.
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'var(--bg-cream)', 
            display: 'flex', 
            gap: '18px', 
            alignItems: 'center', 
            padding: '24px 28px', 
            borderLeft: '4px solid var(--primary)', 
            borderRadius: 'var(--radius-sm)' 
          }}>
            <Heart size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <p style={{ fontSize: '0.96rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
              "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." &mdash; 2 Corinthians 9:7
            </p>
          </div>
        </AnimatedSection>

        {/* Giving Channels */}
        <AnimatedSection direction="left" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Paystack Channel */}
          {giving.paystack && (
            <div className="white-card" style={{ borderTop: '4px solid var(--primary)', padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={24} style={{ color: 'var(--primary)' }} />
                  Paystack (Nigeria / Local Transfer)
                </h3>
                <span className="badge badge-gold">NGN &bull; Cards & Transfer</span>
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '22px', lineHeight: '1.7' }}>
                Sow your tithes, general offering, building seed, or sacrificial offering securely via Paystack.
              </p>

              <div style={{ 
                background: 'var(--bg-secondary)', 
                padding: '16px 20px', 
                borderRadius: 'var(--radius-sm)', 
                border: '1px dashed var(--border-color)', 
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-subtle)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Account ID / Payment Email:</span>
                  <span style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '700', fontFamily: 'monospace' }}>{giving.paystack}</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(giving.paystack, 'paystack')}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  {copiedKey === 'paystack' ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                  <span>{copiedKey === 'paystack' ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <a 
                href={`mailto:${giving.paystack}?subject=Sowing Seeds / Kingdom Partnership Inquiry`} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '14px', fontSize: '0.94rem', justifyContent: 'center' }}
              >
                Request Paystack Payment Invoice
              </a>
            </div>
          )}

          {/* PayPal Channel */}
          {giving.paypal && (
            <div className="white-card" style={{ borderTop: '4px solid #1C0016', padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Wallet size={24} style={{ color: 'var(--primary)' }} />
                  PayPal (International / Global)
                </h3>
                <span className="badge badge-dark">USD &bull; Global</span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '22px', lineHeight: '1.7' }}>
                For partners, diaspora members, and well-wishers living outside Nigeria who wish to sow in USD, GBP, EUR, or CAD.
              </p>

              <div style={{ 
                background: 'var(--bg-secondary)', 
                padding: '16px 20px', 
                borderRadius: 'var(--radius-sm)', 
                border: '1px dashed var(--border-color)', 
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-subtle)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>PayPal Handle:</span>
                  <span style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '700', fontFamily: 'monospace' }}>{giving.paypal}</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(`https://${giving.paypal}`, 'paypal')}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  {copiedKey === 'paypal' ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                  <span>{copiedKey === 'paypal' ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>

              <a 
                href={`https://${giving.paypal}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '14px', fontSize: '0.94rem', justifyContent: 'center' }}
              >
                <span>Give via PayPal</span>
                <ExternalLink size={15} />
              </a>
            </div>
          )}

        </AnimatedSection>

      </div>
    </div>
  );
}
