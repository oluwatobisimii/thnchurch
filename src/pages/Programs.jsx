import React, { useState } from 'react';
import ProgramCard from '../components/ProgramCard';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';

const MONTHS = [
  'All', 'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Programs({ siteData }) {
  const [selectedMonth, setSelectedMonth] = useState('All');

  const programs = siteData?.programs || [];

  const filteredPrograms = selectedMonth === 'All'
    ? programs
    : programs.filter(p => p.month.toLowerCase() === selectedMonth.toLowerCase());

  return (
    <div className="section-padding container">
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          Year 2026 Calendar
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '18px' }}>
          Events & Special Programs
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '740px', margin: '0 auto', lineHeight: '1.8' }}>
          Mark your calendar for our upcoming corporate fasts, prophetic conferences, and thanksgiving services.
        </p>
      </AnimatedSection>

      {/* Month Filters */}
      <AnimatedSection direction="up" delay={0.1} style={{ 
        display: 'flex', 
        gap: '10px', 
        overflowX: 'auto', 
        paddingBottom: '16px', 
        marginBottom: '48px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {MONTHS.map(month => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`btn ${selectedMonth === month ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '10px 22px', 
              fontSize: '0.88rem',
              whiteSpace: 'nowrap'
            }}
          >
            {month}
          </button>
        ))}
      </AnimatedSection>

      {/* Grid of Programs */}
      {filteredPrograms.length > 0 ? (
        <StaggerContainer className="grid-3" style={{ gap: '32px' }}>
          {filteredPrograms.map(program => (
            <StaggerItem key={program.id}>
              <ProgramCard program={program} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="white-card" style={{ textAlign: 'center', padding: '64px 32px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>
            No special programs scheduled for {selectedMonth} yet. Check back soon or view all scheduled events.
          </p>
          <button 
            className="btn btn-primary" 
            style={{ marginTop: '24px', padding: '13px 30px' }}
            onClick={() => setSelectedMonth('All')}
          >
            Show All Events
          </button>
        </div>
      )}
    </div>
  );
}
