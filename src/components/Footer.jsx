import { Link } from 'react-router-dom'

const cols = [
  { title:'Stay',    links:[['Rooms & Suites','/rooms'],['Services','/services'],['Events','/events'],['Book Your Stay','/contact']] },
  { title:'Hotel',   links:[['Our Story','/about'],['Our People','/about'],['Events','/events'],['Contact','/contact']] },
  { title:'Guest Info', links:[['Reservations','/contact'],['FAQ','/contact'],['Plan an Event','/events'],['Privacy Policy','#']] },
]

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', padding:'72px 60px 36px' }}>
      <div className="footer-grid" style={{
        display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr',
        gap:60, marginBottom:56,
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily:'var(--serif)', fontSize:'clamp(18px,2.5vw,24px)',
            fontWeight:900, color:'var(--text)', marginBottom:14, letterSpacing:'-.01em',
          }}>
            WAASALA <em style={{ fontStyle:'italic', fontWeight:400, color:'var(--text-dim)' }}>Eco Luxury Heaven</em>
          </div>
          <p style={{ fontFamily:'var(--sans)', fontSize:13, lineHeight:1.8, color:'var(--text-dim)', maxWidth:260, marginBottom:28 }}>
            A unique & sustainable retreat inspired by biodiversity, ancient knowledge, and mindful living. Nestled in the heart of Anuradhapura, Sri Lanka.
          </p>
          <p style={{ fontFamily:'var(--sans)', fontSize:12, color:'var(--text-dim)', marginBottom:3 }}>reservations@waasalaecoluxury.lk</p>
          <p style={{ fontFamily:'var(--sans)', fontSize:12, color:'var(--text-dim)', marginBottom:3 }}>+94 25 222 0140</p>
          <p style={{ fontFamily:'var(--sans)', fontSize:12, color:'var(--text-dim)' }}>Anuradhapura, Sri Lanka.</p>

          <div style={{ display:'flex', gap:8, marginTop:24 }}>
            {['IG','FB','TW'].map(s => (
              <a key={s} href="#" data-h style={{
                fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.25em',
                border:'1px solid var(--border)', padding:'6px 10px',
                color:'var(--text-dim)',
                transition:'border-color .25s, color .25s',
                WebkitTapHighlightColor:'transparent',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--red-line)'; e.currentTarget.style.color='var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)';    e.currentTarget.style.color='var(--text-dim)' }}
              >{s}</a>
            ))}
          </div>
        </div>

        {/* Nav cols */}
        {cols.map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.4em', textTransform:'uppercase', color:'var(--red)', marginBottom:20 }}>{col.title}</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} data-h style={{
                    fontFamily:'var(--sans)', fontSize:13,
                    color:'var(--text-dim)', transition:'color .25s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color='var(--text-dim)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        paddingTop:20, borderTop:'1px solid var(--border)',
        flexWrap:'wrap', gap:10,
      }}>
        <p style={{ fontFamily:'var(--sans)', fontSize:11, color:'var(--text-faint)', letterSpacing:'.05em' }}>
          © {new Date().getFullYear()} Waasala Eco Luxury Heaven. All rights reserved.
        </p>
        <p style={{ fontFamily:'var(--caps)', fontSize:8, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--text-faint)' }}>
          Anuradhapura, Sri Lanka
        </p>
      </div>
    </footer>
  )
}
