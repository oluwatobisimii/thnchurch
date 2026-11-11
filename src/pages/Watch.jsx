import React, { useState } from 'react';
import { Play, Search, Video, Download, Radio, Calendar, User, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { getYouTubeThumb } from '../utils/youtube';
import AnimatedSection, { StaggerContainer, StaggerItem, RH1, RH2 } from '../components/AnimatedSection';

export default function Watch({ siteData }) {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  
  const sermons = siteData?.sermons || [];
  const churchInfo = siteData?.churchInfo || {};
  const socials = churchInfo.socials || {};

  // Extract unique topics for filters
  const topics = ['All', ...new Set(sermons.map(s => s.topic))];

  // Filter sermons
  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = 
      sermon.title.toLowerCase().includes(search.toLowerCase()) || 
      sermon.series.toLowerCase().includes(search.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(search.toLowerCase());
      
    const matchesTopic = selectedTopic === 'All' || sermon.topic === selectedTopic;
    
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="section-padding container">
      {/* Page Header */}
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
          Media & Broadcast Hub
        </span>
        <RH1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '18px' }}>
          Watch & Listen Live
        </RH1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '740px', margin: '0 auto', lineHeight: '1.8' }}>
          Encounter life-transforming apostolic teachings and atmospheric worship anytime, anywhere.
        </p>
      </AnimatedSection>

      {/* Main Broadcast Broadcast Cards */}
      <section style={{ marginBottom: '80px' }}>
        <StaggerContainer className="stack-md" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '36px' }}>
          
          {/* Main Livestream Card */}
          <StaggerItem className="white-card" style={{ 
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden', padding: '40px', borderTop: '4px solid var(--primary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }}></span>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-main)' }}>
                  Live Broadcast Center
                </span>
              </div>
              <span className="badge badge-dark">Sundays @ 9:00 AM</span>
            </div>

            <div style={{ margin: '20px 0' }}>
              <h3 style={{ fontSize: '1.7rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                Sunday Giant Service & Prophetic Conferences
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.75', maxWidth: '520px', marginBottom: '28px' }}>
                We stream our full physical Sunday service live from Giants Theatre, Ibadan with the Giants Delight choir and Pastor Tomiwa Oluyen.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
              {socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '13px 26px', fontSize: '0.92rem' }}>
                  <Video size={16} />
                  <span>Join YouTube Live</span>
                </a>
              )}
              {socials.mixlr && (
                <a href={socials.mixlr} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '13px 24px', fontSize: '0.92rem' }}>
                  <Radio size={16} />
                  <span>Listen on Mixlr Audio</span>
                </a>
              )}
            </div>
          </StaggerItem>

          {/* Low Bandwidth Audio Broadcast Highlight */}
          <StaggerItem className="white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
                Data-Saving Audio Stream
              </span>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '12px', color: 'var(--text-main)' }}>
                Mixlr Audio Stream
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '24px' }}>
                On low data or moving on the road? Mixlr provides a lightweight, instant audio stream requiring less than 20MB for an entire service!
              </p>

              <div style={{ background: 'var(--bg-cream)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', marginBottom: '24px', border: '1px solid rgba(140, 4, 104, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: '600', fontSize: '0.9rem' }}>
                  <Radio size={16} style={{ color: 'var(--primary)' }} />
                  <span>Channel: mixlr.com/thnchurch</span>
                </div>
              </div>
            </div>

            {socials.mixlr && (
              <a href={socials.mixlr} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Launch Mixlr Player</span>
                <ExternalLink size={15} />
              </a>
            )}
          </StaggerItem>

        </StaggerContainer>
      </section>

      {/* Sermons Archive Section */}
      <section>
        <AnimatedSection direction="up" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div>
              <RH2 style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>Sermon Library</RH2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px' }}>Browse teachings by topic, series, or speaker</p>
            </div>
            <span className="badge badge-gold">{filteredSermons.length} Messages Available</span>
          </div>
          
          {/* Controls: Search and Filters */}
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ flexGrow: '1', minWidth: 'min(280px, 100%)', position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search by title, series, or speaker..." 
                className="form-control"
                style={{ padding: '15px 20px 15px 46px', borderRadius: 'var(--radius-pill)' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Search size={18} style={{ position: 'absolute', left: '18px', top: '16px', color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`btn ${selectedTopic === t ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '10px 22px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Sermon Cards Grid */}
        {filteredSermons.length > 0 ? (
          <StaggerContainer className="grid-2" style={{ gap: '32px' }}>
            {filteredSermons.map(sermon => (
              <StaggerItem key={sermon.id} className="white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px' }}>
                <div>
                  <a href={sermon.link} target="_blank" rel="noreferrer" className="sermon-thumb" aria-label={`Watch ${sermon.title}`}>
                    {getYouTubeThumb(sermon.link) ? (
                      <img src={getYouTubeThumb(sermon.link)} alt="" loading="lazy" />
                    ) : (
                      <span className="sermon-thumb-fallback">
                        <img src="/thnlogo.png" alt="" />
                        <span>{sermon.title}</span>
                      </span>
                    )}
                    <span className="sermon-play"><Play size={22} fill="#fff" color="#fff" /></span>
                  </a>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.74rem' }}>
                      {sermon.series}
                    </span>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-subtle)' }}>{sermon.date}</span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>{sermon.title}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '16px' }}>
                    <User size={14} />
                    <span>{sermon.speaker}</span>
                  </span>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '24px' }}>
                    {sermon.notes}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <a href={sermon.link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '12px 22px', fontSize: '0.88rem', flexGrow: '1' }}>
                    <Play size={15} />
                    <span>Watch Message</span>
                  </a>
                  <button 
                    onClick={() => alert(`Sermon Study Guide for "${sermon.title}" is ready in your devotional resources!`)} 
                    className="btn btn-secondary" 
                    style={{ padding: '12px 18px', fontSize: '0.88rem' }} 
                    title="Download Study Guide"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="white-card" style={{ textAlign: 'center', padding: '64px 24px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>No sermons match your current search query.</p>
          </div>
        )}
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
