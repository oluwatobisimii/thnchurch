import React, { useState } from 'react';
import { Award, Compass, HelpCircle, Star, Quote } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';

export default function Declarations({ siteData }) {
  const [activeTab, setActiveTab] = useState('declarations'); // 'declarations' or 'prophecies' or 'guides'
  
  const declarations = siteData?.declarations || {};
  const prophecies = siteData?.prophecies || {};
  const scripturalGuides = siteData?.declarations?.scripturalGuides || siteData?.scripturalGuides || [];

  return (
    <div className="section-padding container">
      <AnimatedSection direction="up" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
        <div style={{ background: 'rgba(255, 210, 164, 0.4)', padding: '16px', borderRadius: '18px', color: '#161722' }}>
          <Compass size={36} />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.6rem', color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: '1.1', marginBottom: '8px' }}>Prophecies & Declarations</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.12rem' }}>Positioning ourselves for divine visitation, growth, and supernatural alignment in 2026</p>
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection direction="up" delay={0.1} style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', marginBottom: '56px', gap: '8px' }}>
        <button 
          onClick={() => setActiveTab('declarations')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'declarations' ? '3px solid #161722' : '3px solid transparent',
            color: activeTab === 'declarations' ? '#161722' : 'var(--text-muted)',
            padding: '14px 28px',
            fontSize: '1.05rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
        >
          Giants Declaration
        </button>
        <button 
          onClick={() => setActiveTab('prophecies')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'prophecies' ? '3px solid #161722' : '3px solid transparent',
            color: activeTab === 'prophecies' ? '#161722' : 'var(--text-muted)',
            padding: '14px 28px',
            fontSize: '1.05rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
        >
          2026 Prophecies
        </button>
        <button 
          onClick={() => setActiveTab('guides')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'guides' ? '3px solid #161722' : '3px solid transparent',
            color: activeTab === 'guides' ? '#161722' : 'var(--text-muted)',
            padding: '14px 28px',
            fontSize: '1.05rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
        >
          Scriptural Guides
        </button>
      </AnimatedSection>

      {/* Declarations Tab Content */}
      {activeTab === 'declarations' && (
        <StaggerContainer className="grid-2" style={{ gap: '40px' }}>
          {/* Financial Declarations */}
          <StaggerItem className="white-card" style={{ padding: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Star size={24} style={{ color: '#161722' }} />
              Financial Declarations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '580px', overflowY: 'auto', paddingRight: '12px' }}>
              {declarations.financial?.map((dec, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #FFD2A4' }}>
                  <span style={{ color: '#161722', fontWeight: '700', fontSize: '0.94rem' }}>{idx + 1}.</span>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: '1.65' }}>{dec}</p>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Prophetic Declarations */}
          <StaggerItem className="white-card" style={{ padding: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Compass size={24} style={{ color: '#161722' }} />
              Prophetic Declarations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '580px', overflowY: 'auto', paddingRight: '12px' }}>
              {declarations.prophetic?.map((dec, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #161722' }}>
                  <span style={{ color: '#161722', fontWeight: '700', fontSize: '0.94rem' }}>{idx + 1}.</span>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: '1.65' }}>{dec}</p>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      )}

      {/* Prophecies Tab Content */}
      {activeTab === 'prophecies' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          <AnimatedSection direction="up" className="white-card bg-cream" style={{ textAlign: 'center', borderTop: '5px solid #FFD2A4', padding: '44px 32px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '14px' }}>2026 Core Theme Prophecy</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--text-main)', marginTop: '12px', marginBottom: '16px' }}>
              {prophecies.yearTheme || "2026: Rescue | Recovery | Restoration Experience All Through Year 2026"}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Joel 2:25-26 &mdash; "And I will restore or replace for you the years that the locust has eaten..."
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid-2" style={{ gap: '36px' }}>
            {/* Haven Nation Prophecies */}
            <StaggerItem className="white-card" style={{ padding: '36px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '24px' }}>Haven Nation Inc Prophecies</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {prophecies.havenNation?.map((prop, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <span style={{ background: '#161722', color: '#FFD2A4', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.84rem', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>
                      {idx + 1}
                    </span>
                    <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.7' }}>{prop}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Global Prophecies */}
            <StaggerItem className="white-card" style={{ padding: '36px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '24px' }}>Global & Territorial Prophecies</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {prophecies.global?.map((prop, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <span style={{ background: '#161722', color: '#FFD2A4', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.84rem', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>
                      {idx + 1}
                    </span>
                    <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.7' }}>{prop}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Family Prophecies */}
            <StaggerItem className="white-card" style={{ padding: '36px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '24px' }}>Family Prophecies</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {prophecies.family?.map((prop, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <span style={{ background: '#161722', color: '#FFD2A4', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.84rem', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>
                      {idx + 1}
                    </span>
                    <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.7' }}>{prop}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* General Instructions */}
            <StaggerItem className="white-card" style={{ padding: '36px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '24px' }}>General Prophetic Instructions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {prophecies.general?.map((prop, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <span style={{ background: '#161722', color: '#FFD2A4', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.84rem', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>
                      {idx + 1}
                    </span>
                    <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.7', fontWeight: '500' }}>{prop}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      )}

      {/* Scriptural Guides Tab Content */}
      {activeTab === 'guides' && (
        <div>
          <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', marginBottom: '14px', color: 'var(--text-main)' }}>
              10 Scriptural Guides Positioning You For Restoration
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.08rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.8' }}>
              Follow these scriptural pathways to stand aligned and anchored for the Rescue, Recovery, and Restoration Experience.
            </p>
          </AnimatedSection>

          <StaggerContainer style={{ display: 'grid', gap: '24px' }}>
            {scripturalGuides.map((guide, idx) => (
              <StaggerItem key={idx} className="white-card" style={{ display: 'flex', gap: '28px', alignItems: 'center', padding: '32px' }}>
                <div style={{ 
                  background: '#161722', 
                  color: '#FFD2A4', 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  {guide.number}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '6px' }}>{guide.title}</h3>
                  <span style={{ color: '#161722', fontSize: '0.92rem', fontWeight: '700' }}>Bible Reference: {guide.verse}</span>
                </div>
                <Quote size={32} style={{ opacity: '0.15', color: '#161722', flexShrink: 0 }} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
    </div>
  );
}
