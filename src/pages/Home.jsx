import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { upcomingEvents, formatEventDate } from '../utils/events';
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

  const socialTiles = [
    { plat: 'TikTok', big: 'Clips & Vibes', handle: socials.tiktok, url: handleUrl('https://tiktok.com/@', socials.tiktok), img: '/images/thn_worship_hero.png' },
    { plat: 'Instagram', big: 'Daily Word & Recaps', handle: socials.instagram, url: handleUrl('https://instagram.com/', socials.instagram), cls: 'c1' },
    { plat: 'YouTube', big: 'Full Services', handle: socials.youtube ? socials.youtube.replace(/^https?:\/\/(www\.)?youtube\.com/i, 'youtube.com').replace(/\/$/, '') : null, url: socials.youtube, img: '/images/thn_community_life.png' },
    { plat: 'Threads', big: 'Join the Convo', handle: socials.threads, url: handleUrl('https://threads.net/@', socials.threads), cls: 'c2' },
  ].filter((t) => t.url);

  return (
    <div className="h-root">
      {/* ================= HERO ================= */}
      <section className="h-hero grain">
        <div className="container h-hero-grid">
          <div>
            <div className="h-kicker"><span className="dot" />This Sunday · 9:00 AM · {address.venue || 'Giants Theatre'}</div>
            <h1>
              <span>Raising</span>
              <span className="o">Giants.</span>
              <span className="stroke">Loud.</span>
            </h1>
            <p className="h-hero-sub">
              A young, Spirit-filled family in Ibadan. <b>Real worship, real Word, real people.</b> Come as you are and leave with a family.
            </p>
            <div className="h-hero-ctas">
              <Link to="/new-here" className="btn btn-primary">Plan My First Visit <ArrowRight size={17} /></Link>
              <Link to="/watch" className="btn btn-ghost"><Play size={16} /> Watch Live</Link>
            </div>
          </div>

          <div className="h-collage" aria-hidden="true">
            <div className="h-polaroid h-p1"><img src="/images/thn_worship_hero.png" alt="" /><span className="cap">sunday energy 🔥</span></div>
            <div className="h-polaroid h-p2"><img src="/images/thn_community_life.png" alt="" /><span className="cap">the fam ✌🏾</span></div>
            <div className="h-sticker h-s-time">Every Sunday<span className="big">9AM</span></div>
            <div className="h-sticker h-s-tag">#RaisingGiants</div>
            <div className="h-sticker h-s-star">Est.<br />2016</div>
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
              <h2>Don't Miss<br />What's Next</h2>
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
              <StaggerItem className="h-ev-wrap" style={{ display: 'contents' }}>
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
              <StaggerItem key={ev.id} style={{ display: 'contents' }}>
                <Link to="/events" className={`h-ev ${i === 0 ? 'h-ev-b' : 'h-ev-c'}`}>
                  <span className="date">{formatEventDate(ev)}</span>
                  <h3>{ev.title}</h3>
                  <span className="pill">{ev.detail || ev.venue || 'Giants Theatre'}</span>
                </Link>
              </StaggerItem>
            ))}

            {rest.length > 0 && (
              <StaggerItem className="h-ev h-ev-d">
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
            <h2>Campus<br /><em>Giants</em></h2>
            <p className="lead">
              In uni, poly or still in secondary school? There's a squad for you. We pray, we build, we hang out, and we take campuses for Jesus.
            </p>
            <Link to="/contact" className="btn btn-primary">Join the Squad <ArrowRight size={17} /></Link>
          </AnimatedSection>
          <StaggerContainer className="h-chips">
            <StaggerItem className="h-chip"><span className="ico">🔥</span><h4>Fire Altars</h4><p>Prayer meetings on campus.</p></StaggerItem>
            <StaggerItem className="h-chip"><span className="ico">🎤</span><h4>Hot Seat</h4><p>Real questions about faith, money, relationships and life. Ask them out loud.</p></StaggerItem>
            <StaggerItem className="h-chip"><span className="ico">🧠</span><h4>Giants Academy</h4><p>Discipleship classes that actually go deep.</p></StaggerItem>
            <StaggerItem className="h-chip"><span className="ico">🎉</span><h4>Hangouts</h4><p>Picnics, movie nights and Feed &amp; Hug outreaches.</p></StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ================= FIRST TIME ================= */}
      <section className="section-padding">
        <div className="container">
          <AnimatedSection className="h-head">
            <div>
              <span className="h-label">First Time?</span>
              <h2>No Awkward<br />Vibes. Promise.</h2>
            </div>
            <span className="h-scribble">we'll save you a seat ↓</span>
          </AnimatedSection>
          <StaggerContainer className="h-steps">
            <StaggerItem className="h-step">
              <h3>Pull up at 9AM</h3>
              <p>{address.location || 'Oluyole Main Estate, Ibadan'}{address.landmark ? ` (${address.landmark.toLowerCase()})` : ''}. Free parking, and someone will meet you at the door.</p>
            </StaggerItem>
            <StaggerItem className="h-step">
              <h3>Come as you are</h3>
              <p>Jeans, agbada, jersey: whatever you wear is fine. Nobody will put you on the spot.</p>
            </StaggerItem>
            <StaggerItem className="h-step">
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
            <div className="h-pastors-img"><img src="/images/pastors_leadership.png" alt="Pastors Tomiwa and Olamide Oluyen" /></div>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <span className="h-label">Our Lead Pastors</span>
            <h2>Tomiwa &amp;<br />Olamide Oluyen</h2>
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
              <h2>Catch the Word<br />Anywhere</h2>
            </div>
            <Link to="/watch" className="btn btn-lime">All Messages <ArrowRight size={17} /></Link>
          </AnimatedSection>
          <div className="h-watch-grid">
            <a href={latestSermon?.link || socials.youtube || '#'} target="_blank" rel="noreferrer" className="h-player">
              <img src="/images/pastors_leadership.png" alt="" />
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
                <h2>God Did<br />That 🙌🏾</h2>
              </div>
            </AnimatedSection>
            <StaggerContainer className="h-testis">
              {testimonies.slice(0, 3).map((t) => (
                <StaggerItem key={t.id} className="h-testi">
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
                <h2>Follow<br />The Vibe</h2>
              </div>
            </AnimatedSection>
            <StaggerContainer className="h-socials">
              {socialTiles.map((t) => (
                <StaggerItem key={t.plat} style={{ display: 'contents' }}>
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
          <h2>There's A<br /><span>Seat</span> For You</h2>
          <p>Sundays at 9AM, {address.venue || 'Giants Theatre'}, Ibadan. Bring a friend.</p>
          <Link to="/new-here" className="btn btn-lime">Plan My First Visit <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
