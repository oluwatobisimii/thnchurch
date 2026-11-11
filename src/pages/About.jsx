import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, Heart, Shield, Sparkles } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem, RH1, RH2 } from '../components/AnimatedSection';

export default function About() {
  return (
    <div className="section-padding container">
      {/* Introduction */}
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          Who We Are & What Drives Us
        </span>
        <RH1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '20px' }}>
          The HAvEN Nation Inc
        </RH1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '820px', margin: '0 auto', lineHeight: '1.8' }}>
          We are more than just a church; we are a prophetic movement commissioned by God to recover lost destinies, raise spiritual giants, and establish kingdom dominance across territories.
        </p>
      </AnimatedSection>

      {/* Editorial Framed Visual */}
      <AnimatedSection direction="up" delay={0.1} style={{ marginBottom: '80px' }}>
        <div className="editorial-frame" style={{ height: '440px' }}>
          <img 
            src="/images/pastors_leadership.png" 
            alt="THN Church Visionaries" 
          />
          <div className="editorial-scrim"></div>
          <div className="editorial-badge" style={{ top: '24px', left: '24px' }}>
            <Sparkles size={14} />
            <span>Apostolic Mandate<span className="hide-sm"> &bull; Raising Kingdom Giants</span></span>
          </div>
          <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px', color: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '6px' }}>Pastors Tomiwa & Olamide Oluyen</h3>
            <p style={{ fontSize: '0.94rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0, maxWidth: '640px' }}>
              Commissioned on March 6, 2016, to lead an apostolic people into recovery, spiritual authority, and marketplace leadership.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Grid: Vision & Mission */}
      <StaggerContainer className="grid-2" style={{ gap: '36px', marginBottom: '88px' }}>
        <StaggerItem className="white-card" style={{ display: 'flex', gap: '24px', alignItems: 'start', padding: '38px', borderTop: '4px solid var(--primary)' }}>
          <div style={{ 
            background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', 
            width: '60px', height: '60px', borderRadius: '16px', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', flexShrink: 0 
          }}>
            <Target size={30} />
          </div>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '12px', fontSize: '0.74rem' }}>Our Vision</span>
            <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '12px' }}>Raising Spiritual Giants</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.75' }}>
              To raise a generation of spiritual giants who walk in prophetic authority, impeccable moral character, and kingdom excellence to lead and dominate in every sector of human endeavor.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem className="white-card" style={{ display: 'flex', gap: '24px', alignItems: 'start', padding: '38px', borderTop: '4px solid #1C0016' }}>
          <div style={{ 
            background: 'rgba(14, 16, 23, 0.08)', color: 'var(--text-main)', 
            width: '60px', height: '60px', borderRadius: '16px', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', flexShrink: 0 
          }}>
            <Compass size={30} />
          </div>
          <div>
            <span className="badge badge-dark" style={{ marginBottom: '12px', fontSize: '0.74rem' }}>Our Mission</span>
            <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '12px' }}>Recovering Destinies</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.75' }}>
              To restore lost destinies through the teaching of the uncompromised word of God, systematic discipleship in the Giants Academy, atmospheric prophetic encounters, and hands-on community care.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Story Timeline */}
      <section style={{ marginBottom: '88px' }}>
        <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Our Journey</span>
          <RH2 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)' }}>
            The Story of The HAvEN Nation
          </RH2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.08rem', maxWidth: '640px', margin: '12px auto 0 auto' }}>
            Faithful stewardship from a visionary fellowship to an apostolic headquarters
          </p>
        </AnimatedSection>

        <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', left: '26px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border-color)'
          }}></div>

          <StaggerItem className="white-card" style={{ display: 'flex', gap: '28px', position: 'relative', zIndex: '1', marginLeft: '12px', padding: '32px' }}>
            <div style={{ 
              background: '#1C0016', color: '#C2D971', width: '50px', height: '50px', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontWeight: '800', fontSize: '0.9rem', flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' 
            }}>
              2016
            </div>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '8px', fontSize: '0.72rem' }}>Foundation</span>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '8px' }}>
                Foundation Day &mdash; March 6, 2016
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.7', margin: 0 }}>
                The HAvEN Nation Inc was birthed under a distinct apostolic mandate to gather hungry believers, ignite revival altars, and establish deep teaching of scripture.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="white-card" style={{ display: 'flex', gap: '28px', position: 'relative', zIndex: '1', marginLeft: '12px', padding: '32px' }}>
            <div style={{ 
              background: '#1C0016', color: '#C2D971', width: '50px', height: '50px', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontWeight: '800', fontSize: '0.9rem', flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' 
            }}>
              2020
            </div>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '8px', fontSize: '0.72rem' }}>Expansion</span>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '8px' }}>
                Church Anniversary &mdash; September 6, 2020
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.7', margin: 0 }}>
                Structuring our specialized ministry arms (THN Kids, Blissful Ladies, Giants Delight, Real Men), launching digital broadcasts, and expanding discipleship curriculums.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="white-card" style={{ display: 'flex', gap: '28px', position: 'relative', zIndex: '1', marginLeft: '12px', padding: '32px' }}>
            <div style={{ 
              background: '#1C0016', color: '#C2D971', width: '50px', height: '50px', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontWeight: '800', fontSize: '0.9rem', flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' 
            }}>
              2021
            </div>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '8px', fontSize: '0.72rem' }}>Headquarters</span>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '8px' }}>
                Physical Planting &mdash; January 17, 2021
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.7', margin: 0 }}>
                Established our physical worship facility at the Giants Theatre in Oluyole Main Estate, Ibadan, creating a central sanctuary for worship, media suites, and worker empowerment.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Kingdom Culture / Pillars */}
      <section style={{ marginBottom: '64px' }}>
        <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Core Pillars</span>
          <RH2 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)' }}>
            Our Kingdom Culture
          </RH2>
        </AnimatedSection>

        <StaggerContainer className="grid-3" style={{ gap: '32px' }}>
          <StaggerItem className="white-card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ 
              background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', 
              width: '60px', height: '60px', borderRadius: '16px', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' 
            }}>
              <Award size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '12px' }}>Raising Giants</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              We reject mediocrity. Every believer carries divine potential, and we systematically equip disciples to excel in spiritual authority and professional life.
            </p>
          </StaggerItem>

          <StaggerItem className="white-card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ 
              background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', 
              width: '60px', height: '60px', borderRadius: '16px', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' 
            }}>
              <Shield size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '12px' }}>Restoration Focus</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              We are an oasis of recovery. Through the prophetic word, lost years are restored and lives are transitioned from endless labor into unmerited favor.
            </p>
          </StaggerItem>

          <StaggerItem className="white-card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ 
              background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', 
              width: '60px', height: '60px', borderRadius: '16px', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' 
            }}>
              <Heart size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '12px' }}>Kingdom Excellence</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              We serve an excellent God. In all our operations &mdash; from media broadcast suites to welfare support &mdash; we model kingdom diligence and integrity.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Action CTA */}
      <AnimatedSection direction="up" style={{ textAlign: 'center' }}>
        <div style={{ 
          background: 'var(--bg-cream)', padding: '48px 36px', borderRadius: 'var(--radius-lg)', 
          border: '1px solid rgba(140, 4, 104, 0.25)', maxWidth: '800px', margin: '0 auto' 
        }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '12px' }}>Experience The Family This Sunday</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '28px' }}>
            Join us at Giants Theatre in Ibadan at 9:00 AM (WAT). We can't wait to meet you.
          </p>
          <Link to="/new-here" className="btn btn-primary" style={{ padding: '15px 36px' }}>
            <Sparkles size={16} />
            <span>Plan Your First Visit</span>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
