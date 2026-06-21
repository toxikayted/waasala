import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRevealAll } from '../hooks/useReveal'

const fallback = [
  { id:1, title:'Infinity Pool',          desc:'A sun-drenched infinity pool overlooking the gardens, with a swim-up bar and private cabanas for the afternoon.', duration:'6 AM – 9 PM', modalities:['Towel Service','Pool Bar','Cabanas'] },
  { id:2, title:'The Royal Pub',          desc:'Craft cocktails, Lion lager on tap and Ceylon arrack, served in a wood-panelled bar with a curated playlist and garden terrace.', duration:'4 PM – Late', modalities:['Live Music Fri','Garden Terrace','Cocktails'] },
  { id:3, title:'Saffron Restaurant',     desc:'Fine dining built around heirloom rice, lagoon seafood and forgotten Sri Lankan spices, alongside an international à la carte menu.', duration:'7 AM – 10:30 PM', modalities:['Breakfast Buffet','À la Carte','Private Dining'] },
  { id:4, title:'Ayurveda Spa & Wellness',desc:'Traditional Ayurvedic treatments, herbal steam baths and full-body massages using oils blended on-site by our resident therapists.', duration:'60–120 min', modalities:['Ayurveda','Massage','Herbal Steam'] },
  { id:5, title:'Cultural Heritage Tours',desc:'Guided excursions to the sacred city\u2019s ancient dagobas, ruins and irrigation tanks, led by local historians who know every stone\u2019s story.', duration:'Half / Full Day', modalities:['Private Guide','Transport Included'] },
  { id:6, title:'Garden & Nature Walks',  desc:'A self-guided or escorted walk through 12 acres of royal gardens, home to over 200 flowering species and resident birdlife.', duration:'45 min', modalities:['Self-Guided','Escorted'] },
  { id:7, title:'Bicycle & E-Bike Rentals',desc:'Explore the flat, shaded roads around Anuradhapura at your own pace, with route maps to nearby temples and lakes.', duration:'Per Hour / Day', modalities:['Helmets Included','Route Maps'] },
  { id:8, title:'Airport Transfers',      desc:'Private air-conditioned transfers between Bandaranaike International Airport and Waasala, arranged to match your flight times.', duration:'3.5 hrs (one way)', modalities:['Private Car','Meet & Greet'] },
  { id:9, title:'Concierge & Laundry',    desc:'Same-day laundry and pressing, plus a concierge desk for excursion bookings, restaurant reservations and local recommendations.', duration:'24/7', modalities:['Same-Day','Concierge Desk'] },
]

const approach = [
  { n:'01', title:'Warm Arrival',        body:'A welcome drink, cool herbal towel and a short orientation to the grounds the moment you step through our gates.' },
  { n:'02', title:'Tailored Itinerary',  body:'Together we shape your stay around your interests — heritage, wellness, dining or simply doing nothing at all.' },
  { n:'03', title:'Immersive Days',      body:'Pool mornings, garden walks, spa afternoons and cultural evenings, each handled by a dedicated member of our team.' },
  { n:'04', title:'A Fond Farewell',     body:'A late checkout where possible, a parting gift from our gardens, and an open invitation to return to Waasala.' },
]

export default function Services() {
  const [services, setServices] = useState(fallback)
  const [hov, setHov] = useState(null)
  useRevealAll()

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(d => { if (d && d.length) setServices(d) }).catch(() => {})
  }, [])

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="page-hero-grid" style={{ padding:'100px 60px 80px', borderBottom:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'flex-end' }}>
        <div>
          <p className="label rv">What We Offer</p>
          <h1 className="h-giant rv" style={{ color:'var(--bg2)' }}>OUR<br /><em style={{ fontStyle:'italic', fontWeight:400, color:'var(--bg2)' }}>SERVICES</em></h1>
        </div>
        <p className="body-text rv-r" style={{ fontSize:16, lineHeight:2, maxWidth:420 }}>
          From the pool to the pub to the table, every part of Waasala is designed around your comfort. Explore the amenities woven into your stay — or simply ask our concierge.
        </p>
      </section>

      {/* Service list */}
      <section style={{ background:'var(--bg2)', borderBottom:'1px solid var(--border)' }}>
        {services.map((s,i) => (
          <div key={s.id} className="rv services-row" data-h
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ display:'grid', gridTemplateColumns:'72px 1fr 2fr 1fr auto', alignItems:'center', gap:40, padding:'40px 60px', borderBottom:'1px solid var(--border)', background: hov===i ? 'var(--surface)' : 'transparent', transition:'background .3s' }}
          >
            <span style={{ fontFamily:'var(--caps)', fontSize:10, color: hov===i ? 'var(--red)' : 'var(--text-dim)', letterSpacing:'.2em', transition:'color .3s' }}>0{i+1}</span>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(18px,2vw,26px)', fontWeight:400, color:'var(--text)' }}>{s.title}</h3>
            <p className="services-row-desc" style={{ fontFamily:'var(--sans)', fontSize:13, color:'var(--text-dim)', lineHeight:1.7 }}>{s.desc || s.description}</p>
            <div className="services-row-tags" style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {(s.modalities || []).map(m => (
                <span key={m} style={{ fontFamily:'var(--caps)', fontSize:7, letterSpacing:'.2em', border:'1px solid var(--border-h)', padding:'3px 8px', color:hov===i ? 'var(--red)' : 'var(--text-dim)', transition:'color .3s, border-color .3s', borderColor: hov===i ? 'var(--red-line)' : 'var(--border-h)' }}>{m}</span>
              ))}
            </div>
            <div style={{ width:40, height:40, border:'1px solid var(--border)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-dim)', fontSize:15, transform: hov===i ? 'rotate(45deg)' : 'none', borderColor: hov===i ? 'var(--red-line)' : 'var(--border)', transition:'transform .35s, border-color .35s' }}>→</div>
          </div>
        ))}
      </section>

      {/* Approach */}
      <section className="section approach-grid" style={{ background:'rgba(20,18,9,0.97)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80 }}>
        <div>
          <p className="label rv" style={{ color:'white' }}>The Guest Experience</p>
          <h2 className="h-large rv" style={{ color:'var(--text)', marginBottom:16 }}>How a stay <em style={{ fontStyle:'italic', fontWeight:400, color:'var(--text-dim)' }}>unfolds</em></h2>
          <p className="body-text rv" style={{ maxWidth:380, color:'rgba(255,255,255,0.7)' }}>Every stay at Waasala follows a thoughtful arc — designed to be effortless from the moment you arrive to the moment you reluctantly leave.</p>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.15)' }}>
          {approach.map((a,i) => (
            <div key={a.n} className="rv" data-delay={i+1} style={{ display:'grid', gridTemplateColumns:'56px 1fr', gap:24, padding:'30px 0', borderBottom:'1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontFamily:'var(--caps)', fontSize:10, color:'rgba(255,255,255,0.5)', letterSpacing:'.2em', paddingTop:2 }}>{a.n}</span>
              <div>
                <h4 style={{ fontFamily:'var(--serif)', fontSize:20, fontWeight:400, color:'var(--text)', marginBottom:6 }}>{a.title}</h4>
                <p style={{ fontFamily:'var(--sans)', fontSize:13, lineHeight:1.7, color:'rgba(255,255,255,0.6)' }}>{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" style={{ padding:'100px 60px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:40, background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
        <h2 className="h-med rv-l" style={{ color:'var(--bg2)' }}>
          Not sure what's included in your stay?<br />
          <em style={{ fontStyle:'italic', color:'var(--red)' }}>Let's talk it through.</em>
        </h2>
        <Link to="/contact" data-h className="btn-red rv-r">Ask Our Concierge</Link>
      </section>
    </main>
  )
}
