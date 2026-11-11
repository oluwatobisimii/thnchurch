import React, { useState } from 'react';
import ProgramCard from '../components/ProgramCard';
import AnimatedSection, { StaggerContainer, StaggerItem, RH1 } from '../components/AnimatedSection';
import { parseDateRange } from '../utils/events';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const UP_NEXT = 'Up Next';
const MONTHS = [UP_NEXT, ...MONTH_NAMES, 'All'];

// "Not much on" this month = fewer than this many events, so next month is added too.
const MIN_EVENTS = 3;

function overlapsMonth(range, year, month) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59);
  return range.start <= end && range.end >= start;
}

// Events still to come this month, topped up with next month's when it's quiet.
function upNext(programs, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const withRange = programs
    .map((p) => ({ p, range: parseDateRange(p.date) }))
    .filter((x) => x.range)
    .sort((a, b) => a.range.start - b.range.start);

  const thisMonth = withRange.filter(
    (x) => overlapsMonth(x.range, now.getFullYear(), now.getMonth()) && x.range.end >= today
  );
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonth = withRange.filter(
    (x) => overlapsMonth(x.range, next.getFullYear(), next.getMonth()) && !thisMonth.includes(x)
  );

  const months = [MONTH_NAMES[now.getMonth()]];
  let list = thisMonth;
  if (thisMonth.length < MIN_EVENTS && nextMonth.length) {
    list = [...thisMonth, ...nextMonth];
    months.push(MONTH_NAMES[next.getMonth()]);
  }
  return { list: list.map((x) => x.p), months: thisMonth.length ? months : months.slice(-1) };
}

export default function Programs({ siteData }) {
  const [selectedMonth, setSelectedMonth] = useState(UP_NEXT);

  const programs = siteData?.programs || [];
  const coming = upNext(programs);

  const filteredPrograms = selectedMonth === UP_NEXT
    ? coming.list
    : selectedMonth === 'All'
      ? programs
      : programs.filter(p => p.month.toLowerCase() === selectedMonth.toLowerCase());

  const viewTitle = selectedMonth === UP_NEXT
    ? `Happening in ${coming.months.join(' & ')}`
    : selectedMonth === 'All' ? 'The full 2026 calendar' : `${selectedMonth} 2026`;

  return (
    <div className="section-padding container">
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          Year 2026 Calendar
        </span>
        <RH1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '18px' }}>
          Events & Special Programs
        </RH1>
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

      <AnimatedSection style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.5rem' }}>{viewTitle}</h3>
        {selectedMonth === UP_NEXT && (
          <button className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.86rem' }} onClick={() => setSelectedMonth('All')}>
            See the full year
          </button>
        )}
      </AnimatedSection>

      {/* Grid of Programs */}
      {filteredPrograms.length > 0 ? (
        <StaggerContainer key={selectedMonth} className="grid-3" style={{ gap: '32px' }}>
          {filteredPrograms.map(program => (
            <StaggerItem key={program.id}>
              <ProgramCard program={program} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="white-card" style={{ textAlign: 'center', padding: '64px 32px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>
            {selectedMonth === UP_NEXT
              ? 'Nothing special on the calendar right now. Join us Sundays at 9AM and Wednesdays at 6PM.'
              : `No special programs scheduled for ${selectedMonth} yet. Check back soon or view all scheduled events.`}
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
