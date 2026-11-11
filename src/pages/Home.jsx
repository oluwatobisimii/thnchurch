import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem, RH2, Parallax, EASE } from '../components/AnimatedSection';
import { upcomingEvents, formatEventDate } from '../utils/events';
import { getYouTubeThumb } from '../utils/youtube';
import './Home.css';

const handleUrl = (base, handle) => (handle ? `${base}${String(handle).replace(/^@|@$/g, '')}` : null);

export default function Home({ siteData }) {
  const churchInfo = siteData?.churchInfo || {};
  const sermons = siteData?.sermons || [];
  const testimonies = siteData?.testimonies || [];
  const address = churchInfo.address || {};
  const socials = churchInfo.socials || {};

  const events = upcomingEvents(siteData?.programs || []);
  const [featured, second, third, ...rest] = events;
  const latestSermon = sermons[0] || null;

  const themeWords = (churchInfo.theme2026 || 'Rescue | Recovery | Restoration')
    .split('|')
    .map((w) => w.replace(/experience.*$/i, '').trim())
    .filter(Boolean);
  const bandWords = [...themeWords, 'Raising Giants', 'Worship', 'Word', 'Family'];

  // Hero: collage layers drift at different speeds as you scroll past
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const smooth = useSpring(heroP, { stiffness: 100, damping: 24, mass: 0.4 });
  const yBack = useTransform(smooth, [0, 1], [0, -70]);
  const yFront = useTransform(smooth, [0, 1], [0, 60]);
  const yStick = useTransform(smooth, [0, 1], [0, -150]);
  const pop = (delay, rotate = 0) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.85, rotate },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 140, damping: 16, delay },
  });
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const socialTiles = [
    { plat: 'TikTok', big: 'Clips & Vibes', handle: socials.tiktok, url: handleUrl('https://tiktok.com/@', socials.tiktok), img: '/images/thn_worship_hero.png' },
    { plat: 'Instagram', big: 'Daily Word & Recaps', handle: socials.instagram, url: handleUrl('https://instagram.com/', socials.instagram), cls: 'c1' },
    { plat: 'YouTube', big: 'Full Services', handle: socials.youtube ? socials.youtube.replace(/^https?:\/\/(www\.)?youtube\.com/i, 'youtube.com').replace(/\/$/, '') : null, url: socials.youtube, img: '/images/thn_community_life.png' },
    { plat: 'Threads', big: 'Join the Convo', handle: socials.threads, url: handleUrl('https://threads.net/@', socials.threads), cls: 'c2' },
  ].filter((t) => t.url);

  return (
    <div className="h-root">
      {/* ================= HERO ================= */}
      <section className="h-hero grain" ref={heroRef}>
        <div className="container h-hero-grid">
          <div>
            <motion.div className="h-kicker" {...rise(0)}><span className="dot" />This Sunday · 9:00 AM · {address.venue || 'Giants Theatre'}</motion.div>
            <h1>
              <span>Raising</span>
              <span className="o">Giants.</span>
              <span className="stroke">Loud.</span>
            </h1>
            <motion.p className="h-hero-sub" {...rise(0.3)}>
              A young, Spirit-filled family in Ibadan. <b>Real worship, real Word, real people.</b> Come as you are and leave with a family.
            </motion.p>
            <motion.div className="h-hero-ctas" {...rise(0.42)}>
              <Link to="/new-here" className="btn btn-primary">Plan My First Visit <ArrowRight size={17} /></Link>
              <Link to="/watch" className="btn btn-ghost"><Play size={16} /> Watch Live</Link>
            </motion.div>
          </div>

          <div className="h-collage" aria-hidden="true">
            <motion.div className="h-layer" style={{ y: yBack }} {...pop(0.15, 10)}>
              <div className="h-polaroid h-p1"><img src="/images/thn_worship_hero.png" alt="" /><span className="cap">sunday energy 🔥</span></div>
            </motion.div>
            <motion.div className="h-layer" style={{ y: yFront }} {...pop(0.3, -10)}>
              <div className="h-polaroid h-p2"><img src="/images/thn_community_life.png" alt="" /><span className="cap">the fam ✌🏾</span></div>
            </motion.div>
            <motion.div className="h-layer" style={{ y: yStick }} {...pop(0.55, -20)}>
              <div className="h-sticker h-s-time">Every Sunday<span className="big">9AM</span></div>
              <div className="h-sticker h-s-star">Est.<br />2016</div>
            </motion.div>
            <motion.div className="h-layer" style={{ y: yFront }} {...pop(0.7, 15)}>
              <div className="h-sticker h-s-tag">#RaisingGiants</div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-band marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...bandWords, ...bandWords].map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>

      {/* ================= WHAT'S ON ================= */}
      <section className="section-padding">
        <div className="container">
          <AnimatedSection className="h-head">
            <div>
              <span className="h-label">What's On</span>
              <RH2>Don't Miss<br />What's Next</RH2>
            </div>
            <Link to="/events" className="btn btn-lime">Full 2026 Calendar <ArrowRight size={17} /></Link>
          </AnimatedSection>

          <StaggerContainer className="h-bento">
            {!featured && (
              <StaggerItem className="h-ev h-empty">
                <span className="date">Every week</span>
                <h3>Sundays 9AM · Wednesdays 6PM</h3>
                <p>The new calendar drops soon. Pull up to a regular gathering in the meantime.</p>
              </StaggerItem>
            )}

            {featured && (
              <StaggerItem className="h-cell h-cell-a" tilt={-3}>
                <Link to="/events" className="h-ev h-ev-a">
                  {featured.emoji && <span className="emoji" aria-hidden="true">{featured.emoji}</span>}
                  <span className="date">{formatEventDate(featured)}{featured.time ? ` · ${featured.time}` : ''}</span>
                  <div>
                    <h3>{featured.title}</h3>
                    {featured.detail && <p style={{ marginTop: 12, maxWidth: 420 }}>{featured.detail}</p>}
                  </div>
                  <span className="pill">Up next</span>
                </Link>
              </StaggerItem>
            )}

            {[second, third].filter(Boolean).map((ev, i) => (
              <StaggerItem key={ev.id} className="h-cell" tilt={i === 0 ? 3 : -3}>
                <Link to="/events" className={`h-ev ${i === 0 ? 'h-ev-b' : 'h-ev-c'}`}>
                  <span className="date">{formatEventDate(ev)}</span>
                  <h3>{ev.title}</h3>
                  <span className="pill">{ev.detail || ev.venue || 'Giants Theatre'}</span>
                </Link>
              </StaggerItem>
            ))}

            {rest.length > 0 && (
              <StaggerItem className="h-ev h-ev-d" tilt={2}>
                <span className="date">Also coming up 👀</span>
                <ul className="h-more">
                  {rest.slice(0, 4).map((ev) => (
                    <li key={ev.id}>
                      <Link to="/events"><b>{formatEventDate(ev)}</b><span>{ev.title}{ev.detail ? ` · ${ev.detail}` : ''}</span></Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* ================= CAMPUS / YOUTH ================= */}
      <section className="section-padding h-campus grain">
        <div className="container h-campus-grid">
          <AnimatedSection>
            <span className="h-label">THN Campus &amp; Youth</span>
            <RH2>Campus<br /><em>Giants</em></RH2>
            <p className="lead">
              In uni, poly or still in secondary school? There's a squad for you. We pray, we build, we hang out, and we take campuses for Jesus.
            </p>
            <Link to="/contact" className="btn btn-primary">Join the Squad <ArrowRight size={17} /></Link>
          </AnimatedSection>
          <StaggerContainer className="h-chips">
            <StaggerItem className="h-chip" tilt={-4}><span className="ico">🔥</span><h4>Fire Altars</h4><p>Prayer meetings on campus.</p></StaggerItem>
            <StaggerItem className="h-chip" tilt={3}><span className="ico">🎤</span><h4>Hot Seat</h4><p>Real questions about faith, money, relationships and life. Ask them out loud.</p></StaggerItem>
            <StaggerItem className="h-chip" tilt={3}><span className="ico">🧠</span><h4>Giants Academy</h4><p>Discipleship classes that actually go deep.</p></StaggerItem>
            <StaggerItem className="h-chip" tilt={-4}><span className="ico">🎉</span><h4>Hangouts</h4><p>Picnics, movie nights and Feed &amp; Hug outreaches.</p></StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ================= FIRST TIME ================= */}
      <section className="section-padding">
        <div className="container">
          <AnimatedSection className="h-head">
            <div>
              <span className="h-label">First Time?</span>
              <RH2>No Awkward<br />Vibes. Promise.</RH2>
            </div>
            <span className="h-scribble">we'll save you a seat ↓</span>
          </AnimatedSection>
          <StaggerContainer className="h-steps">
            <StaggerItem className="h-step" tilt={-2}>
              <h3>Pull up at 9AM</h3>
              <p>{address.location || 'Oluyole Main Estate, Ibadan'}{address.landmark ? ` (${address.landmark.toLowerCase()})` : ''}. Free parking, and someone will meet you at the door.</p>
            </StaggerItem>
            <StaggerItem className="h-step" tilt={-2}>
              <h3>Come as you are</h3>
              <p>Jeans, agbada, jersey: whatever you wear is fine. Nobody will put you on the spot.</p>
            </StaggerItem>
            <StaggerItem className="h-step" tilt={-2}>
              <h3>Stay for the family</h3>
              <p>Meet the team after service and we'll link you up with your people.</p>
            </StaggerItem>
          </StaggerContainer>
          <div className="h-times">
            <span className="h-time"><b>Sundays</b> 9:00 AM · Worship &amp; Word</span>
            <span className="h-time"><b>Wednesdays</b> 6:00 PM · Bible Study</span>
            <Link to="/new-here" className="btn btn-secondary">Directions &amp; FAQs <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ================= PASTORS ================= */}
      <section className="section-padding h-pastors">
        <div className="container h-pastors-grid">
          <AnimatedSection direction="right">
            <div className="h-pastors-img"><Parallax speed={-70} className="h-parallax-img"><img src="/images/pastors_leadership.png" alt="Pastors Tomiwa and Olamide Oluyen" /></Parallax></div>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <span className="h-label">Our Lead Pastors</span>
            <RH2>Tomiwa &amp;<br />Olamide Oluyen</RH2>
            <p>Pastor Tomiwa leads THN with a heart for raising young believers into spiritual giants, teaching the Word with revelation and clarity.</p>
            <p>Pastor Olamide oversees THN Kids, Blissful Ladies and our care outreaches. Together they've built a church that feels like family.</p>
            <p className="h-quote">“To see every life recovered, trained in truth, and positioned for impact.”</p>
            <Link to="/about" className="btn btn-secondary">Our Story <ArrowRight size={16} /></Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ================= WATCH ================= */}
      <section className="section-padding h-watch grain">
        <div className="container">
          <AnimatedSection className="h-head">
            <div>
              <span className="h-label">Watch &amp; Listen</span>
              <RH2>Catch the Word<br />Anywhere</RH2>
            </div>
            <Link to="/watch" className="btn btn-lime">All Messages <ArrowRight size={17} /></Link>
          </AnimatedSection>
          <div className="h-watch-grid">
            <a href={latestSermon?.link || socials.youtube || '#'} target="_blank" rel="noreferrer" className="h-player">
              <img
                src={getYouTubeThumb(latestSermon?.link, 'maxresdefault') || '/images/pastors_leadership.png'}
                alt=""
                onError={(e) => {
                  const hq = getYouTubeThumb(latestSermon?.link, 'hqdefault');
                  if (hq && !e.currentTarget.src.endsWith('hqdefault.jpg')) e.currentTarget.src = hq;
                  else e.currentTarget.src = '/images/pastors_leadership.png';
                }}
              />
              <span className="h-play"><Play size={30} fill="#fff" color="#fff" /></span>
              <div className="meta">
                <span className="h-label" style={{ marginBottom: 6 }}>Latest{latestSermon?.series ? ` · ${latestSermon.series} series` : ''}</span>
                <h3>{latestSermon?.title || 'Sunday Service'}</h3>
                {latestSermon?.speaker && <p>{latestSermon.speaker}</p>}
              </div>
            </a>
            <div className="h-side">
              {socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noreferrer" className="yt">
                  <span className="h-label">YouTube</span>
                  <h4>Watch Sunday Live →</h4>
                </a>
              )}
              {socials.mixlr && (
                <a href={socials.mixlr} target="_blank" rel="noreferrer" className="mix">
                  <span className="h-label">Low on data? 📶</span>
                  <h4>Listen on Mixlr →</h4>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIES ================= */}
      {testimonies.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <AnimatedSection className="h-head">
              <div>
                <span className="h-label">Real Stories</span>
                <RH2>God Did<br />That 🙌🏾</RH2>
              </div>
            </AnimatedSection>
            <StaggerContainer className="h-testis">
              {testimonies.slice(0, 3).map((t, i) => (
                <StaggerItem key={t.id} className="h-testi" tilt={-4} rest={i % 2 ? 0.8 : -0.8}>
                  <span className="mark" aria-hidden="true">“</span>
                  {t.category && <span className="badge badge-orange">{t.category}</span>}
                  <h3>{t.title}</h3>
                  <p>{t.content}</p>
                  <div className="who"><span>{(t.name || '?').replace(/^(Brother|Sister|Bro\.?|Sis\.?)\s+/i, '').charAt(0)}</span>{t.name}</div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ================= SOCIALS ================= */}
      {socialTiles.length > 0 && (
        <section className="section-padding" style={{ paddingTop: testimonies.length ? 0 : undefined }}>
          <div className="container">
            <AnimatedSection className="h-head">
              <div>
                <span className="h-label">@{socials.instagram || 'thnchurch'}</span>
                <RH2>Follow<br />The Vibe</RH2>
              </div>
            </AnimatedSection>
            <StaggerContainer className="h-socials">
              {socialTiles.map((t) => (
                <StaggerItem key={t.plat} tilt={t.cls ? 4 : -4}>
                  <a href={t.url} target="_blank" rel="noreferrer" className={`h-social ${t.img ? 'photo' : t.cls}`}>
                    {t.img && <img src={t.img} alt="" />}
                    <span className="plat">{t.plat}</span>
                    <div>
                      <span className="big">{t.big}</span>
                      {t.handle && <span className="handle">{t.plat === 'YouTube' ? t.handle : `@${String(t.handle).replace(/^@|@$/g, '')}`} →</span>}
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ================= FINAL CTA ================= */}
      <section className="section-padding h-final grain">
        <div className="container">
          <RH2>There's A<br /><span>Seat</span> For You</RH2>
          <p>Sundays at 9AM, {address.venue || 'Giants Theatre'}, Ibadan. Bring a friend.</p>
          <AnimatedSection delay={0.25}><Link to="/new-here" className="btn btn-lime">Plan My First Visit <ArrowRight size={18} /></Link></AnimatedSection>
        </div>
      </section>
    </div>
  );
}
