import React, { useState } from 'react';
import { Wallet, CreditCard, Heart, CheckCircle2, Copy, Check, ExternalLink, Landmark, MessageCircle, Phone } from 'lucide-react';
import AnimatedSection, { RH1, RH2 } from '../components/AnimatedSection';

export default function Giving({ siteData }) {
  const giving = siteData?.churchInfo?.giving || {};
  const phones = siteData?.churchInfo?.phones || {};
  const [copiedKey, setCopiedKey] = useState(null);

  const hasBank = Boolean(giving.accountNumber);
  const paypalUrl = giving.paypal
    ? (/^https?:\/\//.test(giving.paypal) ? giving.paypal : `https://${giving.paypal}`)
    : null;
  // "+234 704 100 0492" or "0704..." -> "2347041000492" for WhatsApp links
  const toIntl = (n) => { const d = n.replace(/\D/g, ''); return d.startsWith('0') ? `234${d.slice(1)}` : d; };

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
        <RH1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '20px' }}>
          Giving & Sowing
        </RH1>
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
          <RH2 style={{ fontSize: '2.2rem', marginBottom: '18px', color: 'var(--text-main)' }}>
            Partner In Kingdom Impact
          </RH2>
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

        {/* Giving Channels: each one shows only when its details are filled in (Admin → Site Configuration) */}
        <AnimatedSection direction="left" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {hasBank && (
            <div className="white-card" style={{ borderTop: '4px solid var(--primary)', padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Landmark size={24} style={{ color: 'var(--primary)' }} />
                  Bank Transfer
                </h3>
                <span className="badge badge-gold">NGN</span>
              </div>
              <p style={{ fontSize: '0.96rem', marginBottom: '20px', lineHeight: '1.7' }}>
                Send your tithe, offering or seed straight to the church account.
              </p>
              {[
                ['Bank', giving.bankName, null],
                ['Account Name', giving.accountName, null],
                ['Account Number', giving.accountNumber, 'acct'],
              ].filter(([, v]) => v).map(([label, value, key]) => (
                <div key={label} className="give-row">
                  <div style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
                    <span className="give-label">{label}</span>
                    <span className={key ? 'give-value give-mono' : 'give-value'}>{value}</span>
                  </div>
                  {key && (
                    <button onClick={() => copyToClipboard(value, key)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                      {copiedKey === key ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedKey === key ? 'Copied!' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {giving.paystackLink && (
            <div className="white-card" style={{ borderTop: '4px solid var(--orange)', padding: '36px' }}>
              <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <CreditCard size={24} style={{ color: 'var(--primary)' }} />
                Card, USSD or Transfer
              </h3>
              <p style={{ fontSize: '0.96rem', marginBottom: '22px', lineHeight: '1.7' }}>
                Give securely online with Paystack.
              </p>
              <a href={giving.paystackLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                Give Online <ExternalLink size={15} />
              </a>
            </div>
          )}

          {paypalUrl && (
            <div className="white-card" style={{ borderTop: '4px solid var(--purple-deep)', padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Wallet size={24} style={{ color: 'var(--primary)' }} />
                  PayPal
                </h3>
                <span className="badge badge-dark">International</span>
              </div>
              <p style={{ fontSize: '0.96rem', marginBottom: '22px', lineHeight: '1.7' }}>
                For partners outside Nigeria giving in USD, GBP, EUR or CAD.
              </p>
              <a href={paypalUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
                Give via PayPal <ExternalLink size={15} />
              </a>
            </div>
          )}

          {!hasBank && !giving.paystackLink && !paypalUrl && (
            <div className="white-card" style={{ borderTop: '4px solid var(--primary)', padding: '36px' }}>
              <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Heart size={24} style={{ color: 'var(--primary)' }} />
                Get Giving Details
              </h3>
              <p style={{ fontSize: '0.96rem', marginBottom: '22px', lineHeight: '1.7' }}>
                Our online giving channels are being updated. Call or WhatsApp the care line and we'll send you the church account details straight away.
              </p>
              <div style={{ display: 'grid', gap: '12px' }}>
                {phones.careLine1 && (
                  <a href={`https://wa.me/${toIntl(phones.careLine1)}?text=${encodeURIComponent('Hello THN, please send me the church giving details.')}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                    <MessageCircle size={16} /> WhatsApp {phones.careLine1}
                  </a>
                )}
                {phones.careLine2 && (
                  <a href={`tel:${phones.careLine2.replace(/\s/g, '')}`} className="btn btn-secondary" style={{ width: '100%' }}>
                    <Phone size={16} /> Call {phones.careLine2}
                  </a>
                )}
              </div>
            </div>
          )}

        </AnimatedSection>

      </div>
    </div>
  );
}
