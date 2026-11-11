import React from 'react';
import { Users, ShieldAlert, Award } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';

export default function Leadership({ siteData }) {
  const leadership = siteData?.leadership || [];
  const ministries = siteData?.ministries || [];
  const departments = siteData?.departments || [];

  return (
    <div className="section-padding container">
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '72px' }}>
        <span className="badge badge-purple" style={{ marginBottom: '18px', display: 'inline-flex' }}>
          Leadership & Ministries
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.8rem', marginBottom: '22px', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
          Church Leadership Team
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.18rem', maxWidth: '760px', margin: '0 auto', lineHeight: '1.8' }}>
          Meet the dedicated ministers, department heads, and elders serving in The HAvEN Nation Inc
        </p>
      </AnimatedSection>

      {/* Leadership Section */}
      <section style={{ marginBottom: '88px' }}>
        <StaggerContainer className="grid-3" style={{ gap: '36px' }}>
          {leadership.map((leader, index) => (
            <StaggerItem key={index} className="white-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 28px' }}>
              <div style={{ 
                width: '96px', 
                height: '96px', 
                borderRadius: '50%', 
                background: '#161722',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                color: '#FFD2A4',
                boxShadow: 'var(--card-shadow)',
                marginBottom: '20px'
              }}>
                {leader.name.split(' ').filter(n => !n.includes('.')).map(n => n[0]).join('').slice(0, 2)}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '10px' }}>{leader.name}</h3>
              <span className="badge badge-purple" style={{ fontSize: '0.82rem' }}>
                {leader.role}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Ministries & Departments Grid */}
      <div className="grid-2" style={{ gap: '48px' }}>
        {/* Ministries */}
        <AnimatedSection direction="right">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-main)' }}>
              Ministries in THN
            </h2>
            <span className="badge badge-growth">{ministries.length} Ministries</span>
          </div>

          <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ministries.map((min, index) => (
              <StaggerItem key={index} className="white-card" style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '6px' }}>{min.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
                    Leader / Overseer: <span style={{ color: '#161722', fontWeight: '700' }}>{min.leader}</span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* Departments */}
        <AnimatedSection direction="left">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-main)' }}>
              Departments in THN
            </h2>
            <span className="badge badge-purple">{departments.length} Departments</span>
          </div>

          <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {departments.map((dept, index) => (
              <StaggerItem key={index} className="white-card" style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '6px' }}>{dept.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
                    Head of Department (HOD): <span style={{ color: '#161722', fontWeight: '700' }}>{dept.leader}</span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>
      </div>
    </div>
  );
}
