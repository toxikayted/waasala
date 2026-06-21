import { useState, useEffect } from 'react'
import { useRevealAll } from '../hooks/useReveal'

const TYPE_COLORS = {
  Deluxe: '#7c4d00',
  Suite:  '#b4a00a',
  Royal:  '#8a1f1f',
}

const FALLBACK = [
  { id:1, title:'Muragala',              type:'Deluxe', price:'$180', size:'42 m²', beds:'King Bed', capacity:2, description:'Named after the seven-headed cobra of local legend, Muragala connects you to the ancient anthill beside the temple grounds — earthy tones and quiet strength.', amenities:['Garden View','Free WiFi','Air Conditioning','Rain Shower'], image:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80&auto=format&fit=crop' },
  { id:2, title:'Sandakadapahana',       type:'Deluxe', price:'$180', size:'42 m²', beds:'King Bed', capacity:2, description:'Inspired by the sacred moonstone carvings of ancient Anuradhapura temples — a room designed around the spiritual path of life, calm and grounded.', amenities:['Garden View','Free WiFi','Air Conditioning','Rain Shower'], image:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop' },
  { id:3, title:'The Mask',              type:'Deluxe', price:'$190', size:'44 m²', beds:'King Bed', capacity:2, description:'Drawing on the vibrant Kolam masked-dance traditions of the southern coast, every detail in this room tells a story of spirits and folklore.', amenities:['Pool View','Free WiFi','Air Conditioning','Mini Bar'], image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop' },
  { id:4, title:'Frescoes of Sigiriya',  type:'Suite',  price:'$240', size:'58 m²', beds:'King Bed + Lounge', capacity:3, description:'Named after the 5th-century rock paintings of celestial maidens at the Sigiriya Lion Fortress — a glimpse of ancient royal beauty, rendered in soft golds.', amenities:['Balcony','Free WiFi','Air Conditioning','Rain Shower','Mini Bar'], image:'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80&auto=format&fit=crop' },
  { id:5, title:'The Kandy Perahera',    type:'Suite',  price:'$240', size:'58 m²', beds:'King Bed + Lounge', capacity:3, description:'Honouring the grand annual procession of the sacred tooth relic — drummers, dancers and elephants — this suite is rich in colour and ceremony.', amenities:['Balcony','Free WiFi','Air Conditioning','Rain Shower','Mini Bar'], image:'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80&auto=format&fit=crop' },
  { id:6, title:'The Star Gate',         type:'Suite',  price:'$250', size:'60 m²', beds:'King Bed + Lounge', capacity:3, description:'References the ancient astronomical knowledge used in Sri Lanka\u2019s early irrigation systems and temple alignments with the night sky.', amenities:['Garden View','Free WiFi','Air Conditioning','Soaking Tub'], image:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80&auto=format&fit=crop&sat=-20' },
  { id:7, title:'The Batik',             type:'Suite',  price:'$250', size:'60 m²', beds:'King Bed + Lounge', capacity:3, description:'Celebrates the intricate wax-resist dyeing craft passed down through generations along the island\u2019s eastern coast, woven into every textile here.', amenities:['Pool View','Free WiFi','Air Conditioning','Soaking Tub'], image:'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80&auto=format&fit=crop&sat=-15' },
  { id:8, title:'The King',              type:'Royal',  price:'$420', size:'95 m²', beds:'Royal King + Living Room', capacity:4, description:'Evokes the majesty of the ancient Sinhalese monarchs who ruled from Anuradhapura and Polonnaruwa. Our most commanding suite, fit for royalty.', amenities:['Private Terrace','Free WiFi','Air Conditioning','Jacuzzi','Butler Service','Mini Bar'], image:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=80&auto=format&fit=crop' },
  { id:9, title:'The Queen',             type:'Royal',  price:'$420', size:'95 m²', beds:'Royal King + Living Room', capacity:4, description:'Reflects the grace and cultural patronage of the royal consorts, often depicted in ancient art as guardians of gardens and the arts.', amenities:['Private Terrace','Free WiFi','Air Conditioning','Jacuzzi','Butler Service','Mini Bar'], image:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=80&auto=format&fit=crop&sat=-15' },
]

/* ── Room Card ── */
function RoomCard({ room, onBook }) {
  const [hov, setHov] = useState(false)
  const acct = TYPE_COLORS[room.type] || '#b4a00a'

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
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov ? `0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px ${acct}55` : 'none',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={room.image}
          alt={room.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform .7s cubic-bezier(.16,1,.3,1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 100%)',
        }} />
        <span style={{
          position: 'absolute', top: 14, left: 14,
          fontFamily: 'var(--caps)', fontSize: 7, letterSpacing: '.3em',
          padding: '4px 12px', background: acct, color: '#fff',
        }}>{room.type}</span>
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          background: 'rgba(14,12,10,0.85)', backdropFilter: 'blur(8px)',
          padding: '8px 14px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 900, lineHeight: 1 }} className="price-shimmer">{room.price}</div>
          <div style={{ fontFamily: 'var(--caps)', fontSize: 6, letterSpacing: '.25em', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>PER NIGHT</div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, background: acct,
          transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
          transition: 'transform .4s cubic-bezier(.16,1,.3,1)',
        }} />
      </div>

      <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 400, color: 'var(--text)', marginBottom: 10, lineHeight: 1.25 }}>{room.title}</h3>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 18, flex: 1 }}>{room.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {room.amenities.slice(0, 4).map(a => (
            <span key={a} style={{ fontFamily: 'var(--caps)', fontSize: 7, letterSpacing: '.18em', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 9px', color: 'var(--text-dim)' }}>{a}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(232,226,214,0.5)' }}>{room.size} · {room.beds} · up to {room.capacity}</span>
          <button data-h className="btn-red" onClick={() => onBook(room)} style={{ fontSize: 8, padding: '10px 20px' }}>Reserve Room</button>
        </div>
      </div>
    </div>
  )
}

/* ── Booking Modal ── */
function BookingModal({ room, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', checkIn: '', checkOut: '', notes: '' })
  const [status, setStatus] = useState('idle')
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/book-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: room.id, ...form }),
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
    <div style={{ position:'fixed', inset:0, zIndex:600, background:'rgba(10,9,7,.88)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={onClose}>
      <div style={{ background:'var(--bg2)', border:'1px solid rgba(255,255,255,0.1)', padding:40, width:'100%', maxWidth:480, maxHeight:'90vh', overflowY:'auto', borderRadius:2 }} onClick={e => e.stopPropagation()}>
        {status === 'success' ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:48, marginBottom:16, color:'var(--red)' }}>✓</div>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:400, color:'#fff', marginBottom:12 }}>Reservation requested!</h3>
            <p style={{ color:'rgba(232,226,214,0.6)', fontSize:14, marginBottom:28 }}>Our reservations team will confirm availability with you at {form.email} within 24 hours.</p>
            <button onClick={onClose} className="btn-red">Done</button>
          </div>
        ) : (
          <>
            {room.image && (
              <div style={{ margin:'-40px -40px 28px', height:150, overflow:'hidden' }}>
                <img src={room.image} alt={room.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            )}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
              <div>
                <h3 style={{ fontFamily:'var(--serif)', fontSize:22, fontWeight:400, color:'#fff', marginBottom:4 }}>{room.title}</h3>
                <p style={{ fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.3em', color:'var(--red)' }}>{room.type} · {room.price} / night</p>
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
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label style={{ display:'block', fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.35em', color:'rgba(232,226,214,0.45)', marginBottom:8 }}>Check-in</label>
                  <input required type="date" style={inp} value={form.checkIn} onChange={upd('checkIn')} />
                </div>
                <div>
                  <label style={{ display:'block', fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.35em', color:'rgba(232,226,214,0.45)', marginBottom:8 }}>Check-out</label>
                  <input required type="date" style={inp} value={form.checkOut} onChange={upd('checkOut')} />
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.35em', color:'rgba(232,226,214,0.45)', marginBottom:8 }}>Notes (optional)</label>
                <textarea rows={3} style={{ ...inp, resize:'none' }} value={form.notes} onChange={upd('notes')} placeholder="Anything we should know?" />
              </div>
              {status === 'error' && <p style={{ color:'var(--red)', fontSize:12 }}>Something went wrong. Try again.</p>}
              <button type="submit" className="btn-red" disabled={status==='loading'} style={{ marginTop:8, opacity:status==='loading'?.6:1, width:'100%', justifyContent:'center' }}>
                {status === 'loading' ? 'Reserving…' : 'Confirm Reservation'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function Rooms() {
  const [rooms,   setRooms]   = useState(FALLBACK)
  const [filter,  setFilter]  = useState('All')
  const [booking, setBooking] = useState(null)
  useRevealAll()

  useEffect(() => {
    fetch('/api/rooms').then(r => r.json()).then(d => { if (d && d.length) setRooms(d) }).catch(() => {})
  }, [])

  const types    = ['All', ...new Set(rooms.map(r => r.type))]
  const filtered = filter === 'All' ? rooms : rooms.filter(r => r.type === filter)

  return (
    <main style={{ paddingTop:80, overflowX:'hidden' }}>
      {booking && <BookingModal room={booking} onClose={() => setBooking(null)} />}

      {/* Hero */}
      <section className="page-hero-grid" style={{
        padding:'100px 60px 80px', borderBottom:'1px solid rgba(19,17,9,0.12)',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'flex-end',
      }}>
        <div>
          <p className="label rv">Where You'll Stay</p>
          <h1 className="h-giant rv" style={{ color:'var(--bg2)' }}>
            ROOMS &amp;<br /><em style={{ fontStyle:'italic', fontWeight:400 }}>SUITES</em>
          </h1>
        </div>
        <p className="body-text rv-r" style={{ fontSize:15, lineHeight:2, maxWidth:420 }}>
          Nine rooms, each named for a different thread of Sri Lankan heritage — from royal courts to sacred carvings. Every stay is a small journey through the island's history.
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
          {filtered.map(room => (
            <RoomCard key={room.id} room={room} onBook={setBooking} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" style={{
        padding:'80px 60px', background:'var(--bg2)',
        display:'flex', justifyContent:'space-between',
        alignItems:'center', gap:40,
        borderTop:'1px solid var(--border)',
      }}>
        <div className="rv-l">
          <h2 className="h-med" style={{ color:'var(--text)', marginBottom:12 }}>Travelling with family or a larger group?</h2>
          <p style={{ fontFamily:'var(--sans)', fontSize:13, color:'var(--text-dim)' }}>We can combine adjoining rooms or arrange a bespoke multi-room itinerary.</p>
        </div>
        <a href="/contact" className="btn rv-r"><span>Enquire About Group Stays</span></a>
      </section>
    </main>
  )
}
