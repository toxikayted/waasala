import { useState, useEffect } from 'react'
import { useRevealAll } from '../hooks/useReveal'

const TYPE_COLORS = {
  Cultural:  '#8a1f1f',
  Dining:    '#7c4d00',
  Wellness:  '#1a5c3a',
  Excursion: '#1a3a5c',
  Festival:  '#7a4a90',
}

const FALLBACK = [
  { id:1, title:'Traditional Kandyan Dance Night',   date:'2026-06-27', time:'7:00 PM',  location:'Garden Amphitheatre', type:'Cultural',  spots:40, price:'$15', description:'A live performance of fire dances, drumming and the famed Kandyan dance, followed by a short storytelling session on Sri Lanka\u2019s ancient temple traditions.', image:'https://images.pexels.com/photos/18161079/pexels-photo-18161079.jpeg' },
  { id:2, title:'Full Moon Poya Lantern Evening',     date:'2026-07-01', time:'6:30 PM',  location:'Lotus Pond Lawn',     type:'Festival',  spots:60, price:'Free', description:'Mark the Poya with our guests \u2014 lantern lighting, a short meditation, and traditional sweets served beneath the full moon over the lotus pond.', image:'https://images.pexels.com/photos/16695887/pexels-photo-16695887.jpeg' },
  { id:3, title:'Candlelit Garden Dinner for Two',    date:'2026-07-05', time:'7:30 PM',  location:'Royal Garden',        type:'Dining',    spots:8,  price:'$95', description:'A private, candlelit five-course dinner among 200 flowering plants, prepared by our Executive Chef and paired with Ceylon arrack cocktails.', image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop' },
  { id:4, title:'Sunrise Yoga & Meditation',          date:'2026-07-08', time:'6:00 AM',  location:'Garden Yoga Pavilion',type:'Wellness',  spots:12, price:'$20', description:'Greet the day with a gentle guided practice as the sun rises over the gardens, led by our resident wellness instructor.', image:'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&q=80&auto=format&fit=crop' },
  { id:5, title:'Anuradhapura Heritage Day Trip',     date:'2026-07-12', time:'8:00 AM',  location:'Ancient City Sites',  type:'Excursion', spots:15, price:'$45', description:'A guided tour of the sacred city\u2019s dagobas, ancient irrigation tanks and the Sri Maha Bodhi tree, with a traditional rice-and-curry lunch.', image:'https://images.pexels.com/photos/6840389/pexels-photo-6840389.jpeg' },
  { id:6, title:'Ayurveda Wellness Workshop',         date:'2026-07-19', time:'10:00 AM', location:'Spa Pavilion',        type:'Wellness',  spots:10, price:'$30', description:'An introduction to ancient Ayurvedic principles with our spa therapists \u2014 herbal blends, self-massage techniques, and a tasting of healing teas.', image:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop' },
]

/* ── Event Card ── */
function EventCard({ ev, onBook }) {
  const [hov, setHov] = useState(false)
  const d    = new Date(ev.date)
  const day  = d.toLocaleDateString('en-LK', { day: '2-digit' })
  const mon  = d.toLocaleDateString('en-LK', { month: 'short' }).toUpperCase()
  const acct = TYPE_COLORS[ev.type] || '#b4a00a'
  const desc = ev.description || ev.desc || ''

  return (
    <div
      className="rv"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--bg2)',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow .35s, transform .35s cubic-bezier(.16,1,.3,1)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${acct}44` : 'none',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={ev.image || `https://images.unsplash.com/photo-1583244532610-2a5f1fcc8c66?w=800&q=80&auto=format&fit=crop`}
          alt={ev.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform .6s cubic-bezier(.16,1,.3,1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
        }} />
        <span style={{
          position: 'absolute', top: 14, left: 14,
          fontFamily: 'var(--caps)', fontSize: 7, letterSpacing: '.3em',
          padding: '4px 12px', background: acct, color: '#fff',
        }}>{ev.type}</span>
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(14,12,10,0.85)', backdropFilter: 'blur(8px)',
          padding: '8px 12px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{day}</div>
          <div style={{ fontFamily: 'var(--caps)', fontSize: 7, letterSpacing: '.3em', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{mon}</div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, background: acct,
          transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
          transition: 'transform .4s cubic-bezier(.16,1,.3,1)',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2vw, 22px)',
          fontWeight: 400, color: 'var(--text)',
          marginBottom: 10, lineHeight: 1.25,
        }}>{ev.title}</h3>

        <p style={{
          fontFamily: 'var(--sans)', fontSize: 13,
          color: 'var(--text-dim)', lineHeight: 1.7,
          marginBottom: 18, flex: 1,
        }}>{desc}</p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 10,
          marginBottom: 20, fontSize: 12,
          color: 'rgba(232,226,214,0.5)', fontFamily: 'var(--sans)',
        }}>
          <span>⏰ {ev.time}</span>
          <span>📍 {ev.location}</span>
          <span>👥 {ev.spots} spots</span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span style={{
            fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700,
            color: ev.price === 'Free' ? '#4a9c5d' : 'var(--text)',
          }}>{ev.price}</span>
          <button
            data-h className="btn-red"
            onClick={() => onBook(ev)}
            style={{ fontSize: 8, padding: '10px 20px' }}
          >Reserve Spot</button>
        </div>
      </div>
    </div>
  )
}

/* ── Booking Modal ── */
function BookingModal({ ev, onClose }) {
  const [form, setForm]     = useState({ name: '', email: '', notes: '' })
  const [status, setStatus] = useState('idle')
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/book-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: ev.id, ...form }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch { setStatus('error') }
  }

  const inp = {
    width: '100%', padding: '12px 14px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
    color: '#e8e2d6', fontFamily: 'var(--sans)', fontSize: 15, outline: 'none', borderRadius: 2,
  }

  return (
    <div
      style={{ position:'fixed', inset:0, zIndex:600, background:'rgba(10,9,7,.88)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={onClose}
    >
      <div
        style={{ background:'var(--bg2)', border:'1px solid rgba(255,255,255,0.1)', padding:40, width:'100%', maxWidth:460, maxHeight:'90vh', overflowY:'auto', borderRadius:2 }}
        onClick={e => e.stopPropagation()}
      >
        {status === 'success' ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:48, marginBottom:16, color:'var(--red)' }}>✓</div>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:400, color:'#fff', marginBottom:12 }}>You're booked!</h3>
            <p style={{ color:'rgba(232,226,214,0.6)', fontSize:14, marginBottom:28 }}>Confirmation sent to {form.email}.</p>
            <button onClick={onClose} className="btn-red">Done</button>
          </div>
        ) : (
          <>
            {ev.image && (
              <div style={{ margin:'-40px -40px 28px', height:140, overflow:'hidden' }}>
                <img src={ev.image} alt={ev.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            )}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
              <div>
                <h3 style={{ fontFamily:'var(--serif)', fontSize:22, fontWeight:400, color:'#fff', marginBottom:4 }}>{ev.title}</h3>
                <p style={{ fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.3em', color:'var(--red)' }}>{ev.date} · {ev.time} · {ev.price}</p>
              </div>
              <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', fontSize:20, cursor:'pointer', padding:4 }}>✕</button>
            </div>
            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[['name','Your Name','text'],['email','Email','email']].map(([k,lbl,t]) => (
                <div key={k}>
                  <label style={{ display:'block', fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.35em', color:'rgba(232,226,214,0.45)', marginBottom:8 }}>{lbl}</label>
                  <input required type={t} style={inp} value={form[k]} onChange={upd(k)} placeholder={lbl} />
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.35em', color:'rgba(232,226,214,0.45)', marginBottom:8 }}>Room Number (if a guest)</label>
                <textarea rows={3} style={{ ...inp, resize:'none' }} value={form.notes} onChange={upd('notes')} placeholder="Anything we should know?" />
              </div>
              {status === 'error' && <p style={{ color:'var(--red)', fontSize:12 }}>Something went wrong. Try again.</p>}
              <button type="submit" className="btn-red" disabled={status==='loading'} style={{ marginTop:8, opacity:status==='loading'?.6:1, width:'100%', justifyContent:'center' }}>
                {status === 'loading' ? 'Reserving…' : 'Confirm Booking'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function Events() {
  const [events,  setEvents]  = useState(FALLBACK)
  const [filter,  setFilter]  = useState('All')
  const [booking, setBooking] = useState(null)
  useRevealAll()

  useEffect(() => {
    fetch('/api/events').then(r => r.json()).then(d => { if (d && d.length) setEvents(d) }).catch(() => {})
  }, [])

  const types    = ['All', ...new Set(events.map(e => e.type))]
  const filtered = filter === 'All' ? events : events.filter(e => e.type === filter)

  return (
    <main style={{ paddingTop:80, overflowX:'hidden' }}>
      {booking && <BookingModal ev={booking} onClose={() => setBooking(null)} />}

      {/* Hero */}
      <section className="page-hero-grid" style={{
        padding:'100px 60px 80px', borderBottom:'1px solid rgba(19,17,9,0.12)',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'flex-end',
      }}>
        <div>
          <p className="label rv">What's On</p>
          <h1 className="h-giant rv" style={{ color:'var(--bg2)' }}>
            EVENTS &amp;<br /><em style={{ fontStyle:'italic', fontWeight:400 }}>EXPERIENCES</em>
          </h1>
        </div>
        <p className="body-text rv-r" style={{ fontSize:15, lineHeight:2, maxWidth:420 }}>
          Cultural performances, candlelit dinners, sunrise wellness sessions and guided heritage excursions — curated experiences that bring the spirit of Anuradhapura to every stay.
        </p>
      </section>

      {/* Filter bar */}
      <div className="events-filter" style={{
        padding:'28px 60px', background:'var(--bg)',
        borderBottom:'1px solid rgba(19,17,9,0.1)',
        display:'flex', gap:10, flexWrap:'wrap', alignItems:'center',
      }}>
        <span style={{ fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.35em', color:'var(--red)', marginRight:8 }}>Filter:</span>
        {types.map(t => (
          <button key={t} data-h onClick={() => setFilter(t)} style={{
            fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.3em', textTransform:'uppercase',
            padding:'8px 18px', border:'1px solid', cursor:'pointer',
            borderColor: filter===t ? 'var(--red)' : 'rgba(19,17,9,0.2)',
            background:   filter===t ? 'var(--red)' : 'transparent',
            color:        filter===t ? '#fff'       : 'var(--bg2)',
            transition:'all .25s',
          }}>{t}</button>
        ))}
      </div>

      {/* Grid */}
      <section className="section" style={{ background:'var(--bg)' }}>
        <div className="three-col-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {filtered.map((ev) => (
            <EventCard key={ev.id} ev={ev} onBook={setBooking} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--bg3)' }}>
            <p style={{ fontFamily:'var(--serif)', fontSize:24, fontWeight:400 }}>No {filter} events scheduled yet.</p>
            <p style={{ fontFamily:'var(--sans)', fontSize:13, marginTop:8, opacity:.6 }}>Check back soon or contact us to request a private experience.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-band" style={{
        padding:'80px 60px', background:'var(--bg2)',
        display:'flex', justifyContent:'space-between',
        alignItems:'center', gap:40,
        borderTop:'1px solid var(--border)',
      }}>
        <div className="rv-l">
          <h2 className="h-med" style={{ color:'var(--text)', marginBottom:12 }}>Planning a wedding or private celebration?</h2>
          <p style={{ fontFamily:'var(--sans)', fontSize:13, color:'var(--text-dim)' }}>Our gardens and amphitheatre host intimate weddings, anniversaries and corporate retreats.</p>
        </div>
        <a href="/contact" className="btn rv-r"><span>Enquire About Private Events</span></a>
      </section>
    </main>
  )
}
