import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  Settings, Calendar, Users, Eye, Lock, 
  LogOut, Plus, Trash2, Edit2, CheckCircle2, 
  AlertCircle, MailOpen, CalendarClock, BookOpen, 
  Tv, Sparkles, GraduationCap 
} from 'lucide-react';

export default function Admin({ siteData, reloadSiteData }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Tabs: 'settings' | 'programs' | 'leadership' | 'declarations' | 'sermons' | 'devotionals' | 'testimonies' | 'courses' | 'messages' | 'security'
  const [activeTab, setActiveTab] = useState('settings');
  const [localData, setLocalData] = useState(null);
  
  // States for messages & registrations
  const [messages, setMessages] = useState([]);
  const [submissions, setSubmissions] = useState({ visits: [], ministry: [], academy: [], testimonies: [] });
  const [activeSubTab, setActiveSubTab] = useState('messages'); // 'messages' | 'visits' | 'ministry' | 'academy' | 'testimonies'
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [selectedInboxItem, setSelectedInboxItem] = useState(null);

  // States for CRUD forms
  const [editingProgram, setEditingProgram] = useState(null);
  const [programForm, setProgramForm] = useState({ id: '', name: '', description: '', date: '', time: '', venue: '', host: '', month: 'January' });

  const [editingSermon, setEditingSermon] = useState(null);
  const [sermonForm, setSermonForm] = useState({ id: '', title: '', speaker: 'Pastor Tomiwa Oluyen', series: '', topic: '', date: '', notes: '', link: '' });

  const [editingDevotional, setEditingDevotional] = useState(null);
  const [devotionalForm, setDevotionalForm] = useState({ id: '', title: '', scripture: '', keyPoint: '', writeup: '', date: '' });

  const [editingTestimony, setEditingTestimony] = useState(null);
  const [testimonyForm, setTestimonyForm] = useState({ id: '', name: '', category: 'General', title: '', content: '', date: '' });

  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ id: '', title: '', instructor: '', duration: '', description: '' });

  // Security Form
  const [securityForm, setSecurityForm] = useState({ current: '', new: '', confirm: '' });

  // Status Alerts
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await api.checkSession();
        if (res.authenticated) {
          setAuthenticated(true);
        }
      } catch (err) {
        console.error("Session check failed", err);
      } finally {
        setAuthLoading(false);
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (siteData) {
      setLocalData(JSON.parse(JSON.stringify(siteData)));
    }
  }, [siteData]);

  useEffect(() => {
    if (activeTab === 'messages' && authenticated) {
      loadInboxes();
    }
  }, [activeTab, authenticated]);

  const loadInboxes = async () => {
    setMessagesLoading(true);
    try {
      const msgs = await api.getMessages();
      setMessages(msgs);
      const subs = await api.getSubmissions();
      setSubmissions(subs);
    } catch (err) {
      console.error("Failed to load inboxes", err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    try {
      const res = await api.login(password);
      if (res.success) {
        setAuthenticated(true);
        setPassword('');
      }
    } catch (err) {
      setAuthError(err.message || 'Login failed. Verify password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setAuthenticated(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSaveData = async (e) => {
    if (e) e.preventDefault();
    setSaveStatus({ type: '', message: '' });
    setSubmitting(true);
    try {
      const res = await api.saveSiteData(localData);
      if (res.success) {
        setSaveStatus({ type: 'success', message: 'Website database updated successfully.' });
        reloadSiteData();
      }
    } catch (err) {
      setSaveStatus({ type: 'error', message: err.message || 'Failed to update website settings.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 4000);
    }
  };

  const updateNestedProperty = (parentKey, childKey, value) => {
    setLocalData(prev => {
      const updated = { ...prev };
      updated[parentKey][childKey] = value;
      return updated;
    });
  };

  const updateTripleNestedProperty = (parentKey, childKey, subKey, value) => {
    setLocalData(prev => {
      const updated = { ...prev };
      updated[parentKey][childKey][subKey] = value;
      return updated;
    });
  };

  const updateGiving = (key, value) => {
    setLocalData(prev => ({
      ...prev,
      churchInfo: { ...prev.churchInfo, giving: { ...(prev.churchInfo.giving || {}), [key]: value } },
    }));
  };

  // --- CRUD SAVING PIPELINES ---

  // Programs CRUD
  const handleSaveProgram = (e) => {
    e.preventDefault();
    setLocalData(prev => {
      const updated = { ...prev };
      if (editingProgram === 'new') {
        const newProg = { ...programForm, id: 'prog_' + Date.now() };
        updated.programs.push(newProg);
      } else {
        const idx = updated.programs.findIndex(p => p.id === editingProgram);
        if (idx !== -1) updated.programs[idx] = { ...programForm };
      }
      return updated;
    });
    setEditingProgram(null);
    setSaveStatus({ type: 'success', message: 'Program updated in local draft. Click Save Site Changes to publish.' });
  };

  const handleDeleteProgram = (id) => {
    if (window.confirm("Are you sure?")) {
      setLocalData(prev => {
        const updated = { ...prev };
        updated.programs = updated.programs.filter(p => p.id !== id);
        return updated;
      });
      setSaveStatus({ type: 'success', message: 'Program deleted. Click Save Site Changes to publish.' });
    }
  };

  // Sermons CRUD
  const handleSaveSermon = (e) => {
    e.preventDefault();
    setLocalData(prev => {
      const updated = { ...prev };
      if (!updated.sermons) updated.sermons = [];
      if (editingSermon === 'new') {
        const newSerm = { ...sermonForm, id: 'serm_' + Date.now() };
        updated.sermons.unshift(newSerm); // Newest first
      } else {
        const idx = updated.sermons.findIndex(s => s.id === editingSermon);
        if (idx !== -1) updated.sermons[idx] = { ...sermonForm };
      }
      return updated;
    });
    setEditingSermon(null);
    setSaveStatus({ type: 'success', message: 'Sermon updated in local draft. Click Save Site Changes to publish.' });
  };

  const handleDeleteSermon = (id) => {
    if (window.confirm("Are you sure?")) {
      setLocalData(prev => {
        const updated = { ...prev };
        updated.sermons = updated.sermons.filter(s => s.id !== id);
        return updated;
      });
      setSaveStatus({ type: 'success', message: 'Sermon deleted. Click Save Site Changes to publish.' });
    }
  };

  // Devotionals CRUD
  const handleSaveDevotional = (e) => {
    e.preventDefault();
    setLocalData(prev => {
      const updated = { ...prev };
      if (!updated.devotionals) updated.devotionals = [];
      if (editingDevotional === 'new') {
        const newDev = { ...devotionalForm, id: 'dev_' + Date.now() };
        updated.devotionals.unshift(newDev);
      } else {
        const idx = updated.devotionals.findIndex(d => d.id === editingDevotional);
        if (idx !== -1) updated.devotionals[idx] = { ...devotionalForm };
      }
      return updated;
    });
    setEditingDevotional(null);
    setSaveStatus({ type: 'success', message: 'Devotional updated in local draft. Click Save Site Changes to publish.' });
  };

  const handleDeleteDevotional = (id) => {
    if (window.confirm("Are you sure?")) {
      setLocalData(prev => {
        const updated = { ...prev };
        updated.devotionals = updated.devotionals.filter(d => d.id !== id);
        return updated;
      });
      setSaveStatus({ type: 'success', message: 'Devotional deleted. Click Save Site Changes to publish.' });
    }
  };

  // Testimonies CRUD
  const handleSaveTestimony = (e) => {
    e.preventDefault();
    setLocalData(prev => {
      const updated = { ...prev };
      if (!updated.testimonies) updated.testimonies = [];
      if (editingTestimony === 'new') {
        const newTest = { ...testimonyForm, id: 'test_' + Date.now() };
        updated.testimonies.unshift(newTest);
      } else {
        const idx = updated.testimonies.findIndex(t => t.id === editingTestimony);
        if (idx !== -1) updated.testimonies[idx] = { ...testimonyForm };
      }
      return updated;
    });
    setEditingTestimony(null);
    setSaveStatus({ type: 'success', message: 'Testimony saved in draft. Click Save Site Changes to publish.' });
  };

  const handleDeleteTestimony = (id) => {
    if (window.confirm("Are you sure?")) {
      setLocalData(prev => {
        const updated = { ...prev };
        updated.testimonies = updated.testimonies.filter(t => t.id !== id);
        return updated;
      });
      setSaveStatus({ type: 'success', message: 'Testimony deleted. Click Save Site Changes to publish.' });
    }
  };

  // Courses CRUD
  const handleSaveCourse = (e) => {
    e.preventDefault();
    setLocalData(prev => {
      const updated = { ...prev };
      if (!updated.courses) updated.courses = [];
      if (editingCourse === 'new') {
        const newCourse = { ...courseForm, id: 'crs_' + Date.now() };
        updated.courses.push(newCourse);
      } else {
        const idx = updated.courses.findIndex(c => c.id === editingCourse);
        if (idx !== -1) updated.courses[idx] = { ...courseForm };
      }
      return updated;
    });
    setEditingCourse(null);
    setSaveStatus({ type: 'success', message: 'Course saved in draft. Click Save Site Changes to publish.' });
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure?")) {
      setLocalData(prev => {
        const updated = { ...prev };
        updated.courses = updated.courses.filter(c => c.id !== id);
        return updated;
      });
      setSaveStatus({ type: 'success', message: 'Course deleted. Click Save Site Changes to publish.' });
    }
  };

  // List Editor Helper for Prophecies
  const handleProphecyLineChange = (category, idx, val) => {
    setLocalData(prev => {
      const updated = { ...prev };
      updated.prophecies[category][idx] = val;
      return updated;
    });
  };

  // Admin Security Password Change
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus({ type: '', message: '' });
    if (securityForm.new !== securityForm.confirm) {
      setSaveStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.changePassword(securityForm.current, securityForm.new);
      if (res.success) {
        setSaveStatus({ type: 'success', message: 'Portal security password updated successfully.' });
        setSecurityForm({ current: '', new: '', confirm: '' });
      }
    } catch (err) {
      setSaveStatus({ type: 'error', message: err.message || 'Failed to update security password.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="container section-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Checking session details...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="container section-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
            <div style={{ background: 'var(--primary-glow)', padding: '15px', borderRadius: '50%', marginBottom: '15px' }}>
              <Lock style={{ color: 'var(--primary)' }} size={28} />
            </div>
            <h2 className="font-serif text-gradient" style={{ fontSize: '1.8rem' }}>Admin Portal Login</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', marginTop: '5px' }}>
              Enter your authentication password.
            </p>
          </div>

          {authError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#fca5a5', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '20px' }}>
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-pass">Dashboard Password</label>
              <input 
                className="form-control" 
                type="password" 
                id="admin-pass" 
                required 
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%' }}>
              {submitting ? 'Authenticating...' : 'Enter CMS Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding animate-fade-in stack-md" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px', alignItems: 'start' }}>
      
      {/* Sidebar navigation */}
      <aside className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid var(--border-glass)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CMS Dashboard</span>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onMouseOver={e => e.currentTarget.style.color = '#ef4444'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <LogOut size={16} />
          </button>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <button onClick={() => setActiveTab('settings')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'settings' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'settings' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <Settings size={16} /> General Info
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('programs')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'programs' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'programs' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <Calendar size={16} /> Programs CRUD
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('sermons')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'sermons' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'sermons' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <Tv size={16} /> Sermons Manager
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('devotionals')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'devotionals' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'devotionals' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <BookOpen size={16} /> Devotionals / Notes
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('testimonies')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'testimonies' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'testimonies' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <Sparkles size={16} /> Testimonies CRUD
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('courses')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'courses' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'courses' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <GraduationCap size={16} /> Giants Academy
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('leadership')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'leadership' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'leadership' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <Users size={16} /> Officers & Departments
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('declarations')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'declarations' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'declarations' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <CalendarClock size={16} /> Theme & Prophecies
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('messages')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'messages' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'messages' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <Eye size={16} /> Inboxes & Registers
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('security')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: activeTab === 'security' ? 'var(--primary-glow)' : 'none', border: 'none', borderRadius: '8px', color: activeTab === 'security' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}>
              <Lock size={16} /> Security Settings
            </button>
          </li>
        </ul>

        {localData && (
          <button onClick={handleSaveData} disabled={submitting} className="btn btn-primary" style={{ width: '100%', marginTop: '25px', padding: '8px 0', fontSize: '0.85rem' }}>
            {submitting ? 'Saving DB...' : 'Save Site Changes'}
          </button>
        )}
      </aside>

      {/* Main CMS panel */}
      <main style={{ padding: '0' }}>
        {saveStatus.message && (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', borderRadius: '8px', marginBottom: '20px',
            background: saveStatus.type === 'success' ? 'rgba(45, 212, 191, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${saveStatus.type === 'success' ? 'var(--secondary)' : '#ef4444'}`,
            color: saveStatus.type === 'success' ? 'var(--secondary)' : '#fca5a5',
            fontSize: '0.85rem'
          }}>
            {saveStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{saveStatus.message}</span>
          </div>
        )}

        {localData ? (
          <>
            {/* General settings tab */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveData} className="glass-card">
                <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Site Configuration</h2>
                <div className="form-group">
                  <label className="form-label">Church Name</label>
                  <input className="form-control" type="text" value={localData.churchInfo.name} onChange={e => updateNestedProperty('churchInfo', 'name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Yearly Theme</label>
                  <input className="form-control" type="text" value={localData.churchInfo.theme2026} onChange={e => updateNestedProperty('churchInfo', 'theme2026', e.target.value)} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '28px 0 6px' }}>Giving Details</h3>
                <p style={{ fontSize: '0.88rem', marginBottom: '16px' }}>Each payment method only appears on the Give page once its details are filled in. Leave a field empty to hide it.</p>
                {[
                  ['bankName', 'Bank Name', 'e.g. Zenith Bank'],
                  ['accountName', 'Account Name', 'e.g. The Haven Nation Inc'],
                  ['accountNumber', 'Account Number', '10-digit NUBAN'],
                  ['paystackLink', 'Paystack Payment Page Link', 'https://paystack.com/pay/...'],
                  ['paypal', 'PayPal.Me Link', 'https://paypal.me/...'],
                ].map(([key, label, ph]) => (
                  <div className="form-group" key={key}>
                    <label className="form-label">{label}</label>
                    <input className="form-control" type="text" placeholder={ph} value={localData.churchInfo.giving?.[key] || ''} onChange={e => updateGiving(key, e.target.value)} />
                  </div>
                ))}
                <h3 style={{ fontSize: '1.15rem', margin: '28px 0 6px' }}>Form Emails</h3>
                <div className="form-group">
                  <label className="form-label">Official Email (contact & sign-up forms are sent here)</label>
                  <input className="form-control" type="email" value={localData.churchInfo.emails?.official || ''} onChange={e => updateTripleNestedProperty('churchInfo', 'emails', 'official', e.target.value)} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary">Save Settings</button>
              </form>
            )}

            {/* Programs Manager CRUD */}
            {activeTab === 'programs' && (
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="font-serif" style={{ fontSize: '1.5rem' }}>Calendar Schedules</h2>
                  {!editingProgram && <button onClick={() => { setEditingProgram('new'); setProgramForm({ id: '', name: '', description: '', date: '', time: '', venue: '', host: '', month: 'January' }); }} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Plus size={14} /> Add Program</button>}
                </div>

                {editingProgram && (
                  <form onSubmit={handleSaveProgram} style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', border: '1px solid var(--border-glass)', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Program Name</label>
                      <input className="form-control" type="text" required value={programForm.name} onChange={e => setProgramForm({...programForm, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="2" required value={programForm.description} onChange={e => setProgramForm({...programForm, description: e.target.value})}></textarea>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <input className="form-control" type="text" required value={programForm.date} onChange={e => setProgramForm({...programForm, date: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Time</label>
                        <input className="form-control" type="text" required value={programForm.time} onChange={e => setProgramForm({...programForm, time: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid-3">
                      <div className="form-group">
                        <label className="form-label">Venue</label>
                        <input className="form-control" type="text" required value={programForm.venue} onChange={e => setProgramForm({...programForm, venue: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Host</label>
                        <input className="form-control" type="text" value={programForm.host} onChange={e => setProgramForm({...programForm, host: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Month</label>
                        <select className="form-control" value={programForm.month} onChange={e => setProgramForm({...programForm, month: e.target.value})}>
                          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Save</button>
                      <button type="button" onClick={() => setEditingProgram(null)} className="btn btn-secondary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {localData.programs.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{p.name} <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>({p.month})</span></h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.date} &bull; {p.venue}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => { setEditingProgram(p.id); setProgramForm({...p}); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteProgram(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sermons CRUD */}
            {activeTab === 'sermons' && (
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="font-serif" style={{ fontSize: '1.5rem' }}>Sermons Catalog</h2>
                  {!editingSermon && <button onClick={() => { setEditingSermon('new'); setSermonForm({ id: '', title: '', speaker: 'Pastor Tomiwa Oluyen', series: '', topic: '', date: '', notes: '', link: '' }); }} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Plus size={14} /> Add Sermon</button>}
                </div>

                {editingSermon && (
                  <form onSubmit={handleSaveSermon} style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', border: '1px solid var(--border-glass)', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Sermon Title</label>
                      <input className="form-control" type="text" required value={sermonForm.title} onChange={e => setSermonForm({...sermonForm, title: e.target.value})} />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Speaker</label>
                        <input className="form-control" type="text" required value={sermonForm.speaker} onChange={e => setSermonForm({...sermonForm, speaker: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Series Name</label>
                        <input className="form-control" type="text" required value={sermonForm.series} onChange={e => setSermonForm({...sermonForm, series: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid-3">
                      <div className="form-group">
                        <label className="form-label">Topic</label>
                        <input className="form-control" type="text" required placeholder="e.g. Faith" value={sermonForm.topic} onChange={e => setSermonForm({...sermonForm, topic: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date (YYYY-MM-DD)</label>
                        <input className="form-control" type="date" required value={sermonForm.date} onChange={e => setSermonForm({...sermonForm, date: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">YouTube Video Link</label>
                        <input className="form-control" type="url" placeholder="https://..." value={sermonForm.link} onChange={e => setSermonForm({...sermonForm, link: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sermon Notes / Key Takeaways</label>
                      <textarea className="form-control" rows="3" required value={sermonForm.notes} onChange={e => setSermonForm({...sermonForm, notes: e.target.value})}></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Save Sermon</button>
                      <button type="button" onClick={() => setEditingSermon(null)} className="btn btn-secondary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(localData.sermons || []).map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{s.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.speaker} &bull; Series: {s.series}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => { setEditingSermon(s.id); setSermonForm({...s}); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteSermon(s.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Devotionals CRUD */}
            {activeTab === 'devotionals' && (
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="font-serif" style={{ fontSize: '1.5rem' }}>Devotionals (Impact Notes)</h2>
                  {!editingDevotional && <button onClick={() => { setEditingDevotional('new'); setDevotionalForm({ id: '', title: '', scripture: '', keyPoint: '', writeup: '', date: '' }); }} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Plus size={14} /> Add Devotional</button>}
                </div>

                {editingDevotional && (
                  <form onSubmit={handleSaveDevotional} style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', border: '1px solid var(--border-glass)', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Devotional Title</label>
                      <input className="form-control" type="text" required value={devotionalForm.title} onChange={e => setDevotionalForm({...devotionalForm, title: e.target.value})} />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Anchor Scripture Reference</label>
                        <input className="form-control" type="text" required value={devotionalForm.scripture} onChange={e => setDevotionalForm({...devotionalForm, scripture: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date (YYYY-MM-DD)</label>
                        <input className="form-control" type="date" required value={devotionalForm.date} onChange={e => setDevotionalForm({...devotionalForm, date: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Key point / Golden Nugget</label>
                      <input className="form-control" type="text" required value={devotionalForm.keyPoint} onChange={e => setDevotionalForm({...devotionalForm, keyPoint: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Writeup Message</label>
                      <textarea className="form-control" rows="5" required value={devotionalForm.writeup} onChange={e => setDevotionalForm({...devotionalForm, writeup: e.target.value})}></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Save Devotional</button>
                      <button type="button" onClick={() => setEditingDevotional(null)} className="btn btn-secondary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(localData.devotionals || []).map(d => (
                    <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{d.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date: {d.date} &bull; Scripture: {d.scripture}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => { setEditingDevotional(d.id); setDevotionalForm({...d}); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteDevotional(d.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonies CRUD */}
            {activeTab === 'testimonies' && (
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="font-serif" style={{ fontSize: '1.5rem' }}>Testimony Portal</h2>
                  {!editingTestimony && <button onClick={() => { setEditingTestimony('new'); setTestimonyForm({ id: '', name: '', category: 'General', title: '', content: '', date: '' }); }} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Plus size={14} /> Add Testimony</button>}
                </div>

                {editingTestimony && (
                  <form onSubmit={handleSaveTestimony} style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', border: '1px solid var(--border-glass)', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Testimony Header / Title</label>
                      <input className="form-control" type="text" required value={testimonyForm.title} onChange={e => setTestimonyForm({...testimonyForm, title: e.target.value})} />
                    </div>
                    <div className="grid-3">
                      <div className="form-group">
                        <label className="form-label">Brother/Sister Name</label>
                        <input className="form-control" type="text" required value={testimonyForm.name} onChange={e => setTestimonyForm({...testimonyForm, name: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select className="form-control" value={testimonyForm.category} onChange={e => setTestimonyForm({...testimonyForm, category: e.target.value})}>
                          {['General', 'Healing', 'Deliverance', 'Finance', 'Career', 'Family'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date (YYYY-MM-DD)</label>
                        <input className="form-control" type="date" required value={testimonyForm.date} onChange={e => setTestimonyForm({...testimonyForm, date: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Testimony Body Content</label>
                      <textarea className="form-control" rows="4" required value={testimonyForm.content} onChange={e => setTestimonyForm({...testimonyForm, content: e.target.value})}></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Save Testimony</button>
                      <button type="button" onClick={() => setEditingTestimony(null)} className="btn btn-secondary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(localData.testimonies || []).map(t => (
                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{t.title} <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>({t.category})</span></h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Name: {t.name} &bull; Date: {t.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => { setEditingTestimony(t.id); setTestimonyForm({...t}); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteTestimony(t.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courses CRUD */}
            {activeTab === 'courses' && (
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="font-serif" style={{ fontSize: '1.5rem' }}>Giants Academy Courses</h2>
                  {!editingCourse && <button onClick={() => { setEditingCourse('new'); setCourseForm({ id: '', title: '', instructor: '', duration: '', description: '' }); }} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Plus size={14} /> Add Course</button>}
                </div>

                {editingCourse && (
                  <form onSubmit={handleSaveCourse} style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', border: '1px solid var(--border-glass)', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Course Title</label>
                      <input className="form-control" type="text" required value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Instructor</label>
                        <input className="form-control" type="text" required value={courseForm.instructor} onChange={e => setCourseForm({...courseForm, instructor: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Duration (e.g. 6 Weeks)</label>
                        <input className="form-control" type="text" required value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" required value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})}></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Save Course</button>
                      <button type="button" onClick={() => setEditingCourse(null)} className="btn btn-secondary" style={{ padding: '6px 15px', fontSize: '0.82rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(localData.courses || []).map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{c.title} <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>({c.duration})</span></h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instructor: {c.instructor}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => { setEditingCourse(c.id); setCourseForm({...c}); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteCourse(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leadership units tab */}
            {activeTab === 'leadership' && (
              <div className="glass-card">
                <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Officers & Departmental Heads</h2>
                
                <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '15px' }}>Pastors & Leadership</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                  {localData.leadership.map((l, i) => (
                    <div key={i} className="grid-2" style={{ gap: '15px' }}>
                      <input className="form-control" type="text" value={l.role} readOnly style={{ opacity: '0.6' }} />
                      <input className="form-control" type="text" value={l.name} onChange={e => {
                        const copy = [...localData.leadership];
                        copy[i].name = e.target.value;
                        setLocalData({...localData, leadership: copy});
                      }} />
                    </div>
                  ))}
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '15px' }}>Ministries</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                  {localData.ministries.map((m, i) => (
                    <div key={i} className="grid-2" style={{ gap: '15px' }}>
                      <input className="form-control" type="text" value={m.name} readOnly style={{ opacity: '0.6' }} />
                      <input className="form-control" type="text" value={m.leader} onChange={e => {
                        const copy = [...localData.ministries];
                        copy[i].leader = e.target.value;
                        setLocalData({...localData, ministries: copy});
                      }} />
                    </div>
                  ))}
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '15px' }}>Departments</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {localData.departments.map((d, i) => (
                    <div key={i} className="grid-2" style={{ gap: '15px' }}>
                      <input className="form-control" type="text" value={d.name} readOnly style={{ opacity: '0.6' }} />
                      <input className="form-control" type="text" value={d.leader} onChange={e => {
                        const copy = [...localData.departments];
                        copy[i].leader = e.target.value;
                        setLocalData({...localData, departments: copy});
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Declarations & Prophecies */}
            {activeTab === 'declarations' && (
              <div className="glass-card">
                <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Yearly Prophecies</h2>
                
                {['havenNation', 'global', 'family', 'general'].map(category => (
                  <div key={category} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h4 style={{ textTransform: 'capitalize', color: 'var(--text-main)', fontSize: '0.98rem' }}>{category === 'havenNation' ? 'Haven Nation Inc' : category} Prophecies</h4>
                      <button type="button" onClick={() => {
                        const copy = { ...localData };
                        copy.prophecies[category].push('');
                        setLocalData(copy);
                      }} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', gap: '2px' }}><Plus size={12} /> Add Line</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {localData.prophecies[category].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                          <input className="form-control" type="text" value={item} onChange={e => handleProphecyLineChange(category, idx, e.target.value)} />
                          <button type="button" onClick={() => {
                            const copy = { ...localData };
                            copy.prophecies[category] = copy.prophecies[category].filter((_, i) => i !== idx);
                            setLocalData(copy);
                          }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inboxes & Registers Tab */}
            {activeTab === 'messages' && (
              <div className="glass-card">
                <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Signups & Inboxes</h2>
                
                {/* Nested sub-tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', gap: '10px', marginBottom: '20px', overflowX: 'auto' }}>
                  {[
                    { key: 'messages', label: `Contact Inbox (${messages.length})` },
                    { key: 'visits', label: `Planned Visits (${submissions.visits?.length || 0})` },
                    { key: 'ministry', label: `Ministry Signups (${submissions.ministry?.length || 0})` },
                    { key: 'academy', label: `Giants Academy (${submissions.academy?.length || 0})` },
                    { key: 'testimonies', label: `testimonies Submitted (${submissions.testimonies?.length || 0})` }
                  ].map(sub => (
                    <button 
                      key={sub.key} 
                      onClick={() => { setActiveSubTab(sub.key); setSelectedInboxItem(null); }}
                      style={{
                        background: 'none', border: 'none', 
                        borderBottom: activeSubTab === sub.key ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeSubTab === sub.key ? '#fff' : 'var(--text-muted)',
                        padding: '10px 15px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap'
                      }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {messagesLoading ? (
                  <p style={{ color: 'var(--text-muted)' }}>Loading registries...</p>
                ) : (
                  <div className="stack-md" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px', alignItems: 'start' }}>
                    {/* Left register list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '450px', overflowY: 'auto' }}>
                      {activeSubTab === 'messages' && messages.map(msg => (
                        <div key={msg.id} onClick={() => setSelectedInboxItem(msg)} className="glass-card" style={{ padding: '12px', cursor: 'pointer', background: selectedInboxItem?.id === msg.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.01)', borderColor: selectedInboxItem?.id === msg.id ? 'var(--primary)' : 'var(--border-glass)' }}>
                          <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{msg.name}</h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{msg.subject.slice(0, 30)}...</span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--primary)', marginTop: '4px' }}>{msg.timestamp}</span>
                        </div>
                      ))}

                      {activeSubTab === 'visits' && (submissions.visits || []).map(item => (
                        <div key={item.id} onClick={() => setSelectedInboxItem(item)} className="glass-card" style={{ padding: '12px', cursor: 'pointer', background: selectedInboxItem?.id === item.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.01)', borderColor: selectedInboxItem?.id === item.id ? 'var(--primary)' : 'var(--border-glass)' }}>
                          <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{item.data.name}</h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Date: {item.data.visitDate} ({item.data.guestsCount} guests)</span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--primary)', marginTop: '4px' }}>{item.timestamp}</span>
                        </div>
                      ))}

                      {activeSubTab === 'ministry' && (submissions.ministry || []).map(item => (
                        <div key={item.id} onClick={() => setSelectedInboxItem(item)} className="glass-card" style={{ padding: '12px', cursor: 'pointer', background: selectedInboxItem?.id === item.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.01)', borderColor: selectedInboxItem?.id === item.id ? 'var(--primary)' : 'var(--border-glass)' }}>
                          <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{item.data.name}</h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dept: {item.data.ministry_name}</span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--primary)', marginTop: '4px' }}>{item.timestamp}</span>
                        </div>
                      ))}

                      {activeSubTab === 'academy' && (submissions.academy || []).map(item => (
                        <div key={item.id} onClick={() => setSelectedInboxItem(item)} className="glass-card" style={{ padding: '12px', cursor: 'pointer', background: selectedInboxItem?.id === item.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.01)', borderColor: selectedInboxItem?.id === item.id ? 'var(--primary)' : 'var(--border-glass)' }}>
                          <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{item.data.name}</h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Course: {item.data.course_title}</span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--primary)', marginTop: '4px' }}>{item.timestamp}</span>
                        </div>
                      ))}

                      {activeSubTab === 'testimonies' && (submissions.testimonies || []).map(item => (
                        <div key={item.id} onClick={() => setSelectedInboxItem(item)} className="glass-card" style={{ padding: '12px', cursor: 'pointer', background: selectedInboxItem?.id === item.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.01)', borderColor: selectedInboxItem?.id === item.id ? 'var(--primary)' : 'var(--border-glass)' }}>
                          <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{item.data.name}</h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cat: {item.data.category} &bull; {item.data.title.slice(0, 20)}...</span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--primary)', marginTop: '4px' }}>{item.timestamp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Right detail view pane */}
                    <div className="glass-card" style={{ minHeight: '300px', background: 'rgba(0,0,0,0.15)' }}>
                      {selectedInboxItem ? (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px', marginBottom: '15px' }}>
                            <div>
                              <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>
                                {activeSubTab === 'messages' && selectedInboxItem.subject}
                                {activeSubTab === 'visits' && `Plan Visit Request from ${selectedInboxItem.data.name}`}
                                {activeSubTab === 'ministry' && `Ministry Join Request: ${selectedInboxItem.data.ministry_name}`}
                                {activeSubTab === 'academy' && `Academy Registration: ${selectedInboxItem.data.course_title}`}
                                {activeSubTab === 'testimonies' && `Testimony: ${selectedInboxItem.data.title}`}
                              </h3>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                                Submitted: {selectedInboxItem.timestamp}
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                            {activeSubTab === 'messages' ? (
                              <>
                                <p><strong>From:</strong> {selectedInboxItem.name} ({selectedInboxItem.email})</p>
                                <p><strong>Phone:</strong> {selectedInboxItem.phone || 'N/A'}</p>
                                <p style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                                  {selectedInboxItem.message}
                                </p>
                              </>
                            ) : (
                              <>
                                <p><strong>Sender Email:</strong> {selectedInboxItem.data.email}</p>
                                <p><strong>Phone Line:</strong> {selectedInboxItem.data.phone}</p>
                                {activeSubTab === 'visits' && (
                                  <>
                                    <p><strong>Scheduled Date:</strong> {selectedInboxItem.data.visitDate}</p>
                                    <p><strong>Service:</strong> {selectedInboxItem.data.serviceTime}</p>
                                    <p><strong>Total Guests:</strong> {selectedInboxItem.data.guestsCount}</p>
                                  </>
                                )}
                                {activeSubTab === 'academy' && (
                                  <p><strong>Education Background:</strong> {selectedInboxItem.data.educationLevel}</p>
                                )}
                                {activeSubTab === 'ministry' && selectedInboxItem.data.comments && (
                                  <p style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
                                    <strong>Bios/Skill Details:</strong><br />{selectedInboxItem.data.comments}
                                  </p>
                                )}
                                {activeSubTab === 'testimonies' && (
                                  <>
                                    <p><strong>Category:</strong> {selectedInboxItem.data.category}</p>
                                    <p style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                                      {selectedInboxItem.data.content}
                                    </p>
                                    <button 
                                      onClick={() => {
                                        // Approve testimony -> push to localData testimony catalogue!
                                        const newTest = {
                                          id: 'test_' + Date.now(),
                                          name: selectedInboxItem.data.name,
                                          category: selectedInboxItem.data.category,
                                          title: selectedInboxItem.data.title,
                                          content: selectedInboxItem.data.content,
                                          date: selectedInboxItem.timestamp.split(' ')[0]
                                        };
                                        setLocalData(prev => {
                                          const copy = { ...prev };
                                          if (!copy.testimonies) copy.testimonies = [];
                                          copy.testimonies.unshift(newTest);
                                          return copy;
                                        });
                                        alert("Testimony added to website draft. Remember to click Save Site Changes to publish!");
                                      }}
                                      className="btn btn-primary" 
                                      style={{ fontSize: '0.8rem', padding: '6px 12px', marginTop: '15px', width: 'fit-content' }}
                                    >
                                      Approve & Publish to Public Site
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '260px', color: 'var(--text-muted)' }}>
                          <MailOpen size={30} style={{ marginBottom: '8px' }} />
                          <p style={{ fontSize: '0.85rem' }}>Select an inquiry from the list to preview detailed parameters.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Portal security settings */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordChangeSubmit} className="glass-card" style={{ maxWidth: '480px' }}>
                <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Change Admin Password</h2>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="form-control" type="password" required value={securityForm.current} onChange={e => setSecurityForm({...securityForm, current: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input className="form-control" type="password" required value={securityForm.new} onChange={e => setSecurityForm({...securityForm, new: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input className="form-control" type="password" required value={securityForm.confirm} onChange={e => setSecurityForm({...securityForm, confirm: e.target.value})} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary">Update Security Password</button>
              </form>
            )}
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>Loading local configs...</p>
        )}
      </main>
    </div>
  );
}
