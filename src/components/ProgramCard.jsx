import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export default function ProgramCard({ program }) {
  if (!program) return null;

  return (
    <div className="white-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px', borderTop: '4px solid var(--primary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge badge-gold" style={{ fontSize: '0.74rem' }}>
          {program.month} 2026
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '12px', lineHeight: '1.3' }}>
        {program.name}
      </h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '24px', flexGrow: 1, lineHeight: '1.68' }}>
        {program.description}
      </p>

      <div style={{ display: 'grid', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '18px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calendar size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>{program.date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Clock size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>{program.time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MapPin size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>{program.venue}</span>
        </div>
        {program.host && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span>Host: {program.host}</span>
          </div>
        )}
      </div>
    </div>
  );
}
