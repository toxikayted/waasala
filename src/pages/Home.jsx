import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRevealAll } from '../hooks/useReveal'

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
function Hero() {
  const videoRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(t)
  }, [])

  /* Mouse parallax on video — desktop only */
  useEffect(() => {
    const el = videoRef.current
    if (!el || window.innerWidth < 768) return
    const move = e => {
      const dx = (e.clientX / window.innerWidth - .5) * 14
      const dy = (e.clientY / window.innerHeight - .5) * 8
      el.style.transform = `translate(${dx}px,${dy}px) scale(1.06)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section style={{
      height: '100dvh',          /* dynamic viewport height — fixes mobile browser chrome */
      minHeight: 560,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end',
    }}>
      {/* Background */}
      <video ref={videoRef} autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 1s cubic-bezier(.23,1,.32,1)',
          willChange: 'transform',
        }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      {/* Fallback image if video missing */}
      <img
        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=80&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(14,12,10,.5) 0%, rgba(14,12,10,.1) 40%, rgba(14,12,10,.82) 100%)',
      }} />

      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: '-50%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px', opacity: .03,
        animation: 'grain 8s steps(1) infinite',
        pointerEvents: 'none',
      }} />

      {/* Bottom content */}
      <div className="hero-bottom-grid" style={{
        position: 'relative', zIndex: 2, width: '100%',
        padding: '0 40px 52px',
        display: 'grid', gridTemplateColumns: '1fr auto',
        alignItems: 'flex-end', gap: 40,
      }}>
        {/* Left block */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 1s .8s cubic-bezier(.16,1,.3,1), transform 1s .8s cubic-bezier(.16,1,.3,1)',
        }}>
          <p style={{
            fontFamily: 'var(--caps)', fontSize: 9, letterSpacing: '.4em',
            textTransform: 'uppercase', color: 'rgba(232,226,214,.55)', marginBottom: 16,
          }}>Unique &amp; Sustainable</p>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(28px, 5vw, 64px)',
            fontWeight: 400, color: 'var(--text)',
            lineHeight: 1.15, maxWidth: 480,
          }}>
            ECO Luxury<br />
            <strong style={{ fontStyle: 'italic', fontWeight: 900 }}>Heaven</strong>
          </h1>
        </div>

        {/* Right block */}
        <div className="hero-right-block" style={{
          maxWidth: 340,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 1s 1.05s cubic-bezier(.16,1,.3,1), transform 1s 1.05s cubic-bezier(.16,1,.3,1)',
        }}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.85,
            color: 'rgba(232,226,214,.85)',
            textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 28,
          }}>
            Waasala Eco-Luxury Heaven is a unique sustainable retreat inspired by biodiversity, ancient knowledge, and mindful living. Nestled in the heart of Anuradhapura.
          </p>
          <Link to="/rooms" data-h className="btn">
            <span>Explore Rooms</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        width: 1, height: 52,
        background: 'linear-gradient(to bottom, transparent, rgba(180,10,10,.55))',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s 2s',
        animation: loaded ? 'scrollBounce 2.2s 2s ease-in-out infinite' : 'none',
      }} />
    </section>
  )
}

/* ═══════════════════════════════════════════════
   MARQUEE TICKER
═══════════════════════════════════════════════ */
function Ticker() {
  const items = [
    'Surrounded by Nature', 'Cultural & Spiritual Heritage', 'Ancient Technology',
    'Ancient irrigation & Agricultural systems', 'wildlife, biodiversity & natural ecosystems',

  ]
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid rgba(19,17,9,0.15)',
      borderBottom: '1px solid rgba(19,17,9,0.15)',
      padding: '15px 0', background: 'var(--bg2)',
    }}>
      <div className="mq-track">
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 22,
            padding: '0 22px',
            fontFamily: 'var(--caps)', fontSize: 9,
            letterSpacing: '.35em', textTransform: 'uppercase',
            color: i % 5 === 0 ? 'var(--red)' : 'var(--text-dim)',
          }}>
            {item}
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   STATS BAND
═══════════════════════════════════════════════ */
function StatsBand() {
  const stats = [
    { n: '9', label: 'Heritage Rooms' },
    { n: '12+', label: 'Acres of Gardens' },
    { n: '200+', label: 'Flowering Species' },
    { n: '98%', label: 'Guest Satisfaction' },
  ]
  return (
    <section className="stats-band" style={{
      background: 'var(--bg)', padding: '80px 60px',
      borderBottom: '1px solid rgba(19,17,9,0.1)',
    }}>
      <div className="four-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
        {stats.map((s, i) => (
          <div key={s.n} className="rv" data-delay={i + 1} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(36px, 5.5vw, 70px)',
              fontWeight: 900, color: 'var(--bg2)', lineHeight: 1, marginBottom: 10,
            }}>{s.n}</div>
            <div style={{
              fontFamily: 'var(--caps)', fontSize: 8,
              letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--red)',
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   ROOMS PREVIEW
═══════════════════════════════════════════════ */
function RoomsPreview() {
  const items = [
    { n: '01', title: 'Muragala', desc: 'The seven headed Cobra in “Muragala” picture of "MURAGALA" room has a virtual.connection with his home of 5ft tall old anthill in the adjoining land which is belongs to Meteorological Department.' },
    { n: '02', title: 'Sandakadapahana', desc: 'The Sandakadapahana room takes its name from the sacred moonstone carvings found at the entrances of ancient Anuradhapura temples, symbolizing the spiritual path of life.' },
    { n: '03', title: 'The Mask', desc: 'The Mask room draws inspiration from the vibrant Kolam masked dance traditions of the southern coastal villages, where each mask tells a story of spirits and folklore.' },
    { n: '04', title: 'Frescoes of Sigiriya', desc: 'The Frescoes of Sigiriya room is named after the 5th-century rock paintings of celestial maidens found at the Sigiriya Lion Fortress, capturing a glimpse of ancient royal beauty.' },
    { n: '05', title: 'The Kandy Perahera', desc: 'The Kandy Perahera room honors the grand annual procession of the sacred tooth relic, which takes place in the hill capital with drummers, dancers, and elephants.' },
    { n: '06', title: 'The Star Gate', desc: 'The Star Gate room references the ancient astronomical knowledge used in Sri Lanka’s early irrigation systems and temple alignments with celestial bodies.' },
    { n: '07', title: 'The Batik', desc: 'The Batik room celebrates the intricate wax-resist dyeing craft that has been passed down through generations along the island’s eastern coast.' },
    { n: '08', title: 'The King', desc: 'The King room evokes the majesty and authority of the ancient Sinhalese monarchs who ruled from great cities like Anuradhapura and Polonnaruwa.' },
    { n: '09', title: 'The Queen', desc: 'The Queen room reflects the grace and cultural patronage of the royal consorts, who were often depicted in ancient art as guardians of gardens and the arts.' }

  ]
  const [hov, setHov] = useState(null)

  return (
    <section style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div style={{
        padding: '0 60px', marginBottom: 56,
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <p className="label rv">What We Offer</p>
          <h2 className="h-large rv" style={{ color: 'var(--text)' }}>
            Our<em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dim)' }}> Rooms</em>
          </h2>
        </div>
        <Link to="/rooms" data-h className="btn rv"><span>View All</span></Link>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        {items.map((s, i) => (
          <Link to="/rooms" key={s.n} data-h
            className="services-row rv"
            data-delay={i + 1}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr auto',
              alignItems: 'center', gap: 40,
              padding: '30px 60px',
              borderBottom: '1px solid var(--border)',
              background: hov === i ? 'rgba(255,255,255,0.03)' : 'transparent',
              transition: 'background .3s',
              textDecoration: 'none',
            }}>
            <span style={{
              fontFamily: 'var(--caps)', fontSize: 11,
              color: hov === i ? 'var(--red)' : 'var(--text-dim)',
              letterSpacing: '.2em', transition: 'color .3s',
            }}>{s.n}</span>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(16px, 2.2vw, 28px)',
              fontWeight: 400, color: 'var(--text)',
            }}>{s.title}</h3>
            <p className="services-row-desc" style={{
              fontFamily: 'var(--sans)', fontSize: 13,
              color: 'var(--text-dim)', lineHeight: 1.7,
            }}>{s.desc}</p>
            <span style={{
              width: 38, height: 38,
              border: `1px solid ${hov === i ? 'var(--red-line)' : 'var(--border)'}`,
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--text-dim)', fontSize: 16,
              transform: hov === i ? 'rotate(45deg)' : 'none',
              transition: 'transform .35s, border-color .35s',
              flexShrink: 0,
            }}>→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   EVENTS PREVIEW
═══════════════════════════════════════════════ */
function EventsPreview() {
  const events = [
    { date: 'Jun 27', title: 'Kandyan Dance Night', type: 'Cultural', loc: 'Garden Amphitheatre' },
    { date: 'Jul 1',  title: 'Full Moon Poya Evening', type: 'Festival', loc: 'Lotus Pond Lawn' },
    { date: 'Jul 5',  title: 'Candlelit Garden Dinner', type: 'Dining', loc: 'Royal Garden' },
  ]
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', marginBottom: 52,
        flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <p className="label rv">Upcoming</p>
          <h2 className="h-large rv" style={{ color: 'var(--bg2)' }}>
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Events</em> &amp; Workshops
          </h2>
        </div>
        <Link to="/events" data-h className="btn rv"><span>All Events</span></Link>
      </div>

      <div className="events-grid three-col-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: 2, background: 'rgba(19,17,9,0.1)',
      }}>
        {events.map((ev, i) => (
          <EventCard key={i} ev={ev} i={i} />
        ))}
      </div>
    </section>
  )
}

function EventCard({ ev, i }) {
  const [hov, setHov] = useState(false)
  return (
    <Link to="/events" data-h
      className="rv"
      data-delay={i + 1}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onTouchStart={() => setHov(true)}
      onTouchEnd={() => setHov(false)}
      style={{
        display: 'block',
        background: hov ? 'var(--red)' : 'var(--bg2)',
        padding: 'clamp(24px,4vw,40px) clamp(20px,3vw,36px)',
        transition: 'background .35s cubic-bezier(.16,1,.3,1)',
        textDecoration: 'none',
      }}>
      <div style={{
        fontFamily: 'var(--caps)', fontSize: 10,
        color: hov ? 'rgba(255,255,255,.7)' : 'var(--red)',
        letterSpacing: '.3em', marginBottom: 18,
        transition: 'color .3s',
      }}>{ev.date}</div>
      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(17px, 2vw, 22px)',
        fontWeight: 400, color: 'var(--text)',
        marginBottom: 14, lineHeight: 1.25,
      }}>{ev.title}</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'var(--caps)', fontSize: 8,
          letterSpacing: '.25em', color: 'var(--text-dim)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '4px 10px',
        }}>{ev.type}</span>
        <span style={{
          fontFamily: 'var(--caps)', fontSize: 8,
          letterSpacing: '.2em', color: 'var(--text-dim)',
        }}>{ev.loc}</span>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════
   QUOTE BAND
═══════════════════════════════════════════════ */
function QuoteBand() {
  return (
    <section className="quote-band" style={{
      padding: '100px 60px',
      background: 'var(--bg3)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(180,10,10,.06) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)',
        animation: 'float 5s ease-in-out infinite', pointerEvents: 'none',
      }} />

      <div className="rv-blur" style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(15px, 2vw, 22px)',
        fontStyle: 'italic', fontWeight: 300,
        lineHeight: 1.75, color: 'var(--text-dim)',
        maxWidth: 680, margin: '0 auto', position: 'relative',
      }}>
        <span style={{
          fontSize: 'clamp(40px,8vw,60px)',
          color: 'var(--red)', opacity: .3,
          lineHeight: .5, display: 'block', marginBottom: 12,
        }}>"</span>
        For the first time in years, I felt truly unhurried. Waasala gave us a window into Sri Lanka's ancient soul — and the most restful sleep of our trip.
        <div className="rv" data-delay="2" style={{
          fontFamily: 'var(--caps)', fontSize: 8,
          letterSpacing: '.35em', color: 'var(--red)',
          marginTop: 28, textTransform: 'uppercase', fontStyle: 'normal',
        }}>— A.K., Guest, The Star Gate Suite</div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   CTA BAND
═══════════════════════════════════════════════ */
function CTABand() {
  return (
    <section className="cta-band" style={{
      padding: '100px 60px', background: 'var(--bg)',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', gap: 40,
    }}>
      <div className="rv-l">
        <h2 className="h-large" style={{ color: 'var(--bg3)' }}>
          Ready to begin<br />
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--bg2)' }}>your next Adventure?</em>
        </h2>
       
      </div>
      <div className="rv-r" style={{ flexShrink: 0 }}>
        <Link to="/contact" data-h className="btn-red">Reserve Your Stay</Link>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function Home() {
  useRevealAll()
  return (
    <>
      <Hero />
      <Ticker />
      <RoomsPreview />
      <EventsPreview />
      <QuoteBand />
      <CTABand />
    </>
  )
}
