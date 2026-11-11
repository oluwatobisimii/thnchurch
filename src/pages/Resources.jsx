import React, { useState } from 'react';
import { BookOpen, FileText, Download, GraduationCap, CheckCircle, X, ArrowRight, User } from 'lucide-react';
import { api } from '../utils/api';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';

export default function Resources({ siteData }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', educationLevel: 'Tertiary' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const devotionals = siteData?.devotionals || [];
  const courses = siteData?.courses || [];

  const [activeDevotionalIdx, setActiveDevotionalIdx] = useState(0);
  const activeDevotional = devotionals[activeDevotionalIdx];

  const handleOpenRegister = (course) => {
    setSelectedCourse(course);
    setStatus({ type: '', message: '' });
    setFormData({ name: '', email: '', phone: '', educationLevel: 'Tertiary' });
  };

  const handleCloseRegister = () => {
    setSelectedCourse(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        form_type: 'academy_register',
        course_title: selectedCourse.title,
        ...formData
      };
      const res = await api.submitForm(payload);
      if (res.success) {
        setStatus({ type: 'success', message: "Congratulations! You have enrolled in this Giants Academy course. Orientation details will be emailed to you." });
        setFormData({ name: '', email: '', phone: '', educationLevel: 'Tertiary' });
        setTimeout(() => handleCloseRegister(), 2500);
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Failed to register. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-padding container">
      {/* Header */}
      <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '18px' }}>
          Spiritual Growth & Training
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: '18px' }}>
          Resources & Giants Academy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto', lineHeight: '1.8' }}>
          Deepen your relationship with God through our daily Impact Notes devotional and systematic worker discipleship courses.
        </p>
      </AnimatedSection>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'start' }}>
        
        {/* Left Column: Daily Devotionals & Academy Courses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          
          {/* Daily Devotional Card */}
          {activeDevotional && (
            <AnimatedSection direction="up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                <div style={{ 
                  background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', 
                  width: '48px', height: '48px', borderRadius: '14px', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center' 
                }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: 0 }}>Daily Impact Note</h2>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Daily prophetic nourishment for giants</span>
                </div>
              </div>

              <div className="white-card" style={{ borderTop: '4px solid var(--primary)', padding: '38px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>{activeDevotional.title}</h3>
                  <span className="badge badge-gold">{activeDevotional.date}</span>
                </div>

                <div style={{ 
                  background: 'var(--bg-cream)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', 
                  marginBottom: '24px', borderLeft: '4px solid var(--primary)' 
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px', letterSpacing: '0.04em' }}>Anchor Scripture:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '1.02rem' }}>{activeDevotional.scripture}</span>
                </div>

                <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.85', whiteSpace: 'pre-wrap', marginBottom: '28px' }}>
                  {activeDevotional.writeup}
                </p>

                <div style={{ 
                  background: 'var(--bg-secondary)', padding: '18px 22px', borderRadius: 'var(--radius-sm)', 
                  border: '1px dashed var(--border-color)', fontSize: '0.96rem', color: 'var(--text-main)' 
                }}>
                  <strong style={{ color: 'var(--primary)' }}>Key Prophetic Takeaway:</strong> {activeDevotional.keyPoint}
                </div>

                {/* Devotional Index Navigation */}
                {devotionals.length > 1 && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '24px', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-subtle)', marginRight: '6px' }}>Read Other Days:</span>
                    {devotionals.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveDevotionalIdx(idx)}
                        style={{
                          width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                          background: activeDevotionalIdx === idx ? 'var(--primary)' : 'var(--bg-secondary)',
                          color: activeDevotionalIdx === idx ? '#FFFFFF' : 'var(--text-main)',
                          fontWeight: '700', fontSize: '0.86rem', cursor: 'pointer', transition: 'var(--transition-fast)'
                        }}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Giants Academy Section */}
          <section>
            <AnimatedSection direction="up" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div style={{ 
                background: 'rgba(140, 4, 104, 0.12)', color: 'var(--primary)', 
                width: '48px', height: '48px', borderRadius: '14px', display: 'flex', 
                alignItems: 'center', justifyContent: 'center' 
              }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: 0 }}>THN Giants Academy</h2>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Structured worker discipleship & theology modules</span>
              </div>
            </AnimatedSection>

            <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {courses.map(course => (
                <StaggerItem key={course.id} className="white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '34px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ color: 'var(--text-main)', fontSize: '1.35rem', margin: 0 }}>{course.title}</h3>
                      <span className="badge badge-gold">
                        {course.duration}
                      </span>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '16px' }}>
                      <User size={14} />
                      <span>Instructor: {course.instructor}</span>
                    </span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7', marginBottom: '24px' }}>
                      {course.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleOpenRegister(course)} 
                    className="btn btn-secondary" 
                    style={{ width: 'fit-content', padding: '10px 22px', fontSize: '0.88rem' }}
                  >
                    <span>Enroll in Course</span>
                    <ArrowRight size={14} />
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </div>

        {/* Right Column: Downloads Center */}
        <AnimatedSection direction="left" className="white-card" style={{ position: 'sticky', top: '120px', padding: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <FileText style={{ color: 'var(--primary)' }} size={24} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>Resources & Forms</h3>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '24px' }}>
            Download official ministry handbooks, marriage counseling request slips, and church policies.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              background: 'var(--bg-secondary)', padding: '16px 18px', borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-color)' 
            }}>
              <div>
                <h4 style={{ color: 'var(--text-main)', fontSize: '0.96rem', marginBottom: '2px' }}>Workforce Handbook</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>PDF &bull; 1.4 MB</span>
              </div>
              <button 
                onClick={() => alert("Downloading THN Workforce Handbook...")} 
                className="btn btn-secondary" 
                style={{ padding: '8px 12px', borderRadius: '50%' }}
                title="Download PDF"
              >
                <Download size={16} />
              </button>
            </div>

            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              background: 'var(--bg-secondary)', padding: '16px 18px', borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-color)' 
            }}>
              <div>
                <h4 style={{ color: 'var(--text-main)', fontSize: '0.96rem', marginBottom: '2px' }}>Marriage Request Slip</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>PDF &bull; 850 KB</span>
              </div>
              <button 
                onClick={() => alert("Downloading Marriage Counseling Slip...")} 
                className="btn btn-secondary" 
                style={{ padding: '8px 12px', borderRadius: '50%' }}
                title="Download PDF"
              >
                <Download size={16} />
              </button>
            </div>

            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              background: 'var(--bg-secondary)', padding: '16px 18px', borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-color)' 
            }}>
              <div>
                <h4 style={{ color: 'var(--text-main)', fontSize: '0.96rem', marginBottom: '2px' }}>Funeral Policy Slip</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>PDF &bull; 620 KB</span>
              </div>
              <button 
                onClick={() => alert("Downloading Funeral Policy Slip...")} 
                className="btn btn-secondary" 
                style={{ padding: '8px 12px', borderRadius: '50%' }}
                title="Download PDF"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        </AnimatedSection>

      </div>

      {/* Course Enrollment Modal */}
      {selectedCourse && (
        <div style={{ 
          position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', 
          background: 'rgba(14, 16, 23, 0.75)', backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '200', padding: '20px' 
        }}>
          <div className="white-card" style={{ width: '100%', maxWidth: '480px', position: 'relative', borderTop: '4px solid var(--primary)', padding: '36px' }}>
            <button 
              onClick={handleCloseRegister} 
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>

            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Academy Enrollment</span>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '8px' }}>
              {selectedCourse.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
              Classes run physically at Giants Theatre and via streaming links.
            </p>

            {status.message && (
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: 'var(--radius-sm)', marginBottom: '24px',
                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${status.type === 'success' ? '#10B981' : '#EF4444'}`,
                color: status.type === 'success' ? '#065F46' : '#991B1B',
                fontSize: '0.9rem'
              }}>
                <CheckCircle size={18} />
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input className="form-control" type="text" id="name" required value={formData.name} onChange={handleFormChange} placeholder="e.g. Samuel Adekunle" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input className="form-control" type="email" id="email" required value={formData.email} onChange={handleFormChange} placeholder="name@example.com" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input className="form-control" type="tel" id="phone" required value={formData.phone} onChange={handleFormChange} placeholder="0801 234 5678" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="educationLevel">Highest Qualification</label>
                <select className="form-control" id="educationLevel" value={formData.educationLevel} onChange={handleFormChange}>
                  <option value="Secondary">Secondary School Certificate</option>
                  <option value="Tertiary">BSC / HND / University Degree</option>
                  <option value="Postgraduate">Master's / Doctorate</option>
                </select>
              </div>

              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', marginTop: '10px', padding: '14px' }}>
                {submitting ? 'Registering...' : 'Confirm Enrollment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
