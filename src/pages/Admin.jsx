import { useState, useEffect } from 'react'

// ── auth helpers ──────────────────────────────────────────────
const TOKEN_KEY = 'waasala_admin_token'
const getToken  = () => localStorage.getItem(TOKEN_KEY)
const saveToken = t  => localStorage.setItem(TOKEN_KEY, t)

async function api(resource, { method = 'GET', body, id } = {}) {
  const url = id ? `/api/admin?resource=${resource}&id=${id}` : `/api/admin?resource=${resource}`
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'x-admin-token': getToken() },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

// ── design tokens ─────────────────────────────────────────────
const C = {
  bg:      '#0d0b09',
  surface: '#131109',
  card:    '#181510',
  border:  'rgba(255,255,255,0.07)',
  red:     '#b40a0a',
  text:    '#e8e2d6',
  dim:     'rgba(232,226,214,0.45)',
}

const st = {
  page:    { minHeight:'100vh', background:C.bg, color:C.text, fontFamily:"'DM Sans',sans-serif" },
  sidebar: { width:230, background:C.surface, borderRight:`1px solid ${C.border}`, position:'fixed', top:0, left:0, bottom:0, display:'flex', flexDirection:'column', zIndex:10 },
  main:    { marginLeft:230, padding:'44px 52px', minHeight:'100vh' },
  card:    { background:C.card, border:`1px solid ${C.border}`, borderRadius:3, padding:28, marginBottom:20 },
  input:   { width:'100%', background:'rgba(255,255,255,0.04)', border:`1px solid ${C.border}`, color:C.text, fontFamily:"'DM Sans',sans-serif", fontSize:14, padding:'11px 14px', borderRadius:2, outline:'none', boxSizing:'border-box', transition:'border-color .2s' },
  label:   { display:'block', fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.35em', textTransform:'uppercase', color:C.dim, marginBottom:8 },
  th:      { fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.3em', textTransform:'uppercase', color:C.dim, padding:'10px 16px', borderBottom:`1px solid ${C.border}`, textAlign:'left', whiteSpace:'nowrap' },
  td:      { padding:'13px 16px', borderBottom:`1px solid rgba(255,255,255,0.03)`, fontSize:13, color:C.text, verticalAlign:'middle' },
}

const Btn = ({ variant='default', children, style={}, ...p }) => {
  const base = {
    padding:'9px 20px', fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.3em', textTransform:'uppercase',
    border: variant==='danger' ? `1px solid rgba(180,10,10,0.4)` : variant==='primary' ? `1px solid ${C.red}` : `1px solid ${C.border}`,
    background: variant==='primary' ? C.red : 'transparent',
    color: C.text, cursor:'pointer', transition:'all .2s', borderRadius:2,
    ...style,
  }
  return <button style={base} {...p}>{children}</button>
}

// ── REAL WEBSITE DATA — pre-populated defaults ─────────────────
const DEFAULT_TEAM = [
  { name:'Ruwan Bandara',       role:'General Manager',          img:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&q=80&auto=format&fit=crop', sort_order:1 },
  { name:'Sanduni Wickrama',    role:'Guest Relations Manager',  img:'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop', sort_order:2 },
  { name:'Chef Dilshan Perera', role:'Executive Chef, Saffron',  img:'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80&auto=format&fit=crop', sort_order:3 },
  { name:'Anoma Jayasuriya',    role:'Spa & Wellness Director',  img:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format&fit=crop', sort_order:4 },
  { name:'Kasun Fernando',      role:'Front Office Manager',     img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop', sort_order:5 },
  { name:'Nimali Senanayake',   role:'Heritage Tour Curator',    img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop', sort_order:6 },
  { name:'Thilina Rathnayake',  role:'Head Gardener',            img:'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80&auto=format&fit=crop', sort_order:7 },
  { name:'Imesha Gunawardena',  role:'Head Housekeeper',         img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop&flip=h', sort_order:8 },
]

const DEFAULT_ROOMS = [
  { title:'Muragala',             type:'Deluxe', price:'$180', size:'42 m²', beds:'King Bed', capacity:2, amenities:['Garden View','Free WiFi','Air Conditioning','Rain Shower'], description:'Named after the seven-headed cobra of local legend, Muragala connects you to the ancient anthill beside the temple grounds — earthy tones and quiet strength.', image:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80&auto=format&fit=crop', sort_order:1, active:true },
  { title:'Sandakadapahana',      type:'Deluxe', price:'$180', size:'42 m²', beds:'King Bed', capacity:2, amenities:['Garden View','Free WiFi','Air Conditioning','Rain Shower'], description:'Inspired by the sacred moonstone carvings of ancient Anuradhapura temples — a room designed around the spiritual path of life, calm and grounded.', image:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop', sort_order:2, active:true },
  { title:'The Mask',             type:'Deluxe', price:'$190', size:'44 m²', beds:'King Bed', capacity:2, amenities:['Pool View','Free WiFi','Air Conditioning','Mini Bar'], description:'Drawing on the vibrant Kolam masked-dance traditions of the southern coast, every detail in this room tells a story of spirits and folklore.', image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop', sort_order:3, active:true },
  { title:'Frescoes of Sigiriya', type:'Suite',  price:'$240', size:'58 m²', beds:'King Bed + Lounge', capacity:3, amenities:['Balcony','Free WiFi','Air Conditioning','Rain Shower','Mini Bar'], description:'Named after the 5th-century rock paintings of celestial maidens at the Sigiriya Lion Fortress — a glimpse of ancient royal beauty, rendered in soft golds.', image:'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80&auto=format&fit=crop', sort_order:4, active:true },
  { title:'The Kandy Perahera',   type:'Suite',  price:'$240', size:'58 m²', beds:'King Bed + Lounge', capacity:3, amenities:['Balcony','Free WiFi','Air Conditioning','Rain Shower','Mini Bar'], description:'Honouring the grand annual procession of the sacred tooth relic — drummers, dancers and elephants — this suite is rich in colour and ceremony.', image:'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80&auto=format&fit=crop', sort_order:5, active:true },
  { title:'The Star Gate',        type:'Suite',  price:'$250', size:'60 m²', beds:'King Bed + Lounge', capacity:3, amenities:['Garden View','Free WiFi','Air Conditioning','Soaking Tub'], description:'References the ancient astronomical knowledge used in Sri Lanka\u2019s early irrigation systems and temple alignments with the night sky.', image:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80&auto=format&fit=crop&sat=-20', sort_order:6, active:true },
  { title:'The Batik',            type:'Suite',  price:'$250', size:'60 m²', beds:'King Bed + Lounge', capacity:3, amenities:['Pool View','Free WiFi','Air Conditioning','Soaking Tub'], description:'Celebrates the intricate wax-resist dyeing craft passed down through generations along the island\u2019s eastern coast, woven into every textile here.', image:'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80&auto=format&fit=crop&sat=-15', sort_order:7, active:true },
  { title:'The King',             type:'Royal',  price:'$420', size:'95 m²', beds:'Royal King + Living Room', capacity:4, amenities:['Private Terrace','Free WiFi','Air Conditioning','Jacuzzi','Butler Service','Mini Bar'], description:'Evokes the majesty of the ancient Sinhalese monarchs who ruled from Anuradhapura and Polonnaruwa. Our most commanding suite, fit for royalty.', image:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=80&auto=format&fit=crop', sort_order:8, active:true },
  { title:'The Queen',            type:'Royal',  price:'$420', size:'95 m²', beds:'Royal King + Living Room', capacity:4, amenities:['Private Terrace','Free WiFi','Air Conditioning','Jacuzzi','Butler Service','Mini Bar'], description:'Reflects the grace and cultural patronage of the royal consorts, often depicted in ancient art as guardians of gardens and the arts.', image:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=80&auto=format&fit=crop&sat=-15', sort_order:9, active:true },
]

const DEFAULT_EVENTS = [
  { title:'Traditional Kandyan Dance Night', date:'2026-06-27', time:'7:00 PM',  location:'Garden Amphitheatre',  type:'Cultural',  spots:40, price:'$15',  description:'A live performance of fire dances, drumming and the famed Kandyan dance, followed by storytelling on the island\u2019s temple traditions.', image:'https://images.unsplash.com/photo-1583244532610-2a5f1fcc8c66?w=800&q=80&auto=format&fit=crop', active:true },
  { title:'Full Moon Poya Lantern Evening',   date:'2026-07-01', time:'6:30 PM',  location:'Lotus Pond Lawn',      type:'Festival',  spots:60, price:'Free', description:'Mark the Poya with our guests — lantern lighting, a short meditation, and traditional sweets beneath the full moon.', image:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80&auto=format&fit=crop', active:true },
  { title:'Candlelit Garden Dinner for Two',  date:'2026-07-05', time:'7:30 PM',  location:'Royal Garden',         type:'Dining',    spots:8,  price:'$95',  description:'A private, candlelit five-course dinner among 200 flowering plants, paired with Ceylon arrack cocktails.', image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop', active:true },
  { title:'Sunrise Yoga & Meditation',        date:'2026-07-08', time:'6:00 AM',  location:'Garden Yoga Pavilion', type:'Wellness',  spots:12, price:'$20',  description:'Greet the day with a gentle guided practice as the sun rises over the gardens.', image:'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&q=80&auto=format&fit=crop', active:true },
  { title:'Anuradhapura Heritage Day Trip',   date:'2026-07-12', time:'8:00 AM',  location:'Ancient City Sites',   type:'Excursion', spots:15, price:'$45',  description:'A guided tour of the sacred city\u2019s dagobas, ancient irrigation tanks and the Sri Maha Bodhi tree, with lunch included.', image:'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80&auto=format&fit=crop', active:true },
  { title:'Ayurveda Wellness Workshop',       date:'2026-07-19', time:'10:00 AM', location:'Spa Pavilion',         type:'Wellness',  spots:10, price:'$30',  description:'An introduction to Ayurvedic principles with our spa therapists — herbal blends and a tasting of healing teas.', image:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop', active:true },
]

const DEFAULT_SERVICES = [
  { title:'Infinity Pool',           description:'A sun-drenched infinity pool overlooking the gardens, with a swim-up bar and private cabanas.', duration:'6 AM – 9 PM',     modalities:['Towel Service','Pool Bar','Cabanas'],            sort_order:1, active:true },
  { title:'The Royal Pub',           description:'Craft cocktails, Lion lager on tap and Ceylon arrack, served in a wood-panelled bar with a garden terrace.', duration:'4 PM – Late', modalities:['Live Music Fri','Garden Terrace','Cocktails'],   sort_order:2, active:true },
  { title:'Saffron Restaurant',      description:'Fine dining built around heirloom rice, lagoon seafood and forgotten Sri Lankan spices.', duration:'7 AM – 10:30 PM', modalities:['Breakfast Buffet','À la Carte','Private Dining'], sort_order:3, active:true },
  { title:'Ayurveda Spa & Wellness', description:'Traditional Ayurvedic treatments, herbal steam baths and full-body massages using house-blended oils.', duration:'60–120 min', modalities:['Ayurveda','Massage','Herbal Steam'],             sort_order:4, active:true },
  { title:'Cultural Heritage Tours', description:'Guided excursions to the sacred city\u2019s ancient dagobas, ruins and irrigation tanks with local historians.', duration:'Half / Full Day', modalities:['Private Guide','Transport Included'],         sort_order:5, active:true },
  { title:'Bicycle & E-Bike Rentals',description:'Explore the flat, shaded roads around Anuradhapura at your own pace, with route maps included.', duration:'Per Hour / Day', modalities:['Helmets Included','Route Maps'],                sort_order:6, active:true },
]

// ── Generic Form Modal ────────────────────────────────────────
function FormModal({ title, fields, initial, onSave, onClose }) {
  const [data, setData] = useState(initial || {})
  const upd = k => e => setData(d => ({ ...d, [k]: e.target.value }))

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(10,9,7,.88)', backdropFilter:'blur(8px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={onClose}>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:3, padding:40, width:'100%', maxWidth:580, maxHeight:'90vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:400, color:'#fff' }}>{title}</h3>
          <Btn onClick={onClose} style={{ padding:'6px 12px' }}>✕</Btn>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {fields.map(f => (
            <div key={f.key}>
              <label style={st.label}>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea style={{ ...st.input, resize:'vertical', minHeight:90 }} value={data[f.key] || ''} onChange={upd(f.key)} placeholder={f.placeholder} />
              ) : f.type === 'select' ? (
                <select style={{ ...st.input }} value={data[f.key] || ''} onChange={upd(f.key)}>
                  <option value="">Select…</option>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'image' ? (
                <div>
                  <input style={st.input} type="text" value={data[f.key] || ''} onChange={upd(f.key)} placeholder="Paste an image URL…" />
                  {data[f.key] && (
                    <img src={data[f.key]} alt="preview" style={{ marginTop:10, width:'100%', maxHeight:160, objectFit:'cover', borderRadius:2, border:`1px solid ${C.border}` }} onError={e => e.target.style.display='none'} />
                  )}
                </div>
              ) : (
                <input style={st.input} type={f.type || 'text'} value={data[f.key] || ''} onChange={upd(f.key)} placeholder={f.placeholder} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:12, marginTop:28 }}>
          <Btn variant="primary" style={{ flex:1, padding:'13px 0' }} onClick={() => onSave(data)}>Save</Btn>
          <Btn onClick={onClose} style={{ padding:'13px 20px' }}>Cancel</Btn>
        </div>
      </div>
    </div>
  )
}

// ── SEED BUTTON — seeds default data into Supabase ────────────
function SeedButton({ resource, data, onDone, label }) {
  const [st2, setSt] = useState('idle')
  const seed = async () => {
    setSt('loading')
    try {
      for (const row of data) {
        await api(resource, { method:'POST', body: row })
      }
      setSt('done')
      setTimeout(() => { setSt('idle'); onDone() }, 1200)
    } catch (e) {
      console.error(e); setSt('error')
    }
  }
  return (
    <Btn variant="primary" onClick={seed} style={{ fontSize:7 }} disabled={st2==='loading'}>
      {st2==='loading' ? 'Seeding…' : st2==='done' ? '✓ Done' : st2==='error' ? '✗ Error' : label}
    </Btn>
  )
}

// ── APPOINTMENTS TAB ──────────────────────────────────────────
function AppointmentsTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const load = () => {
    setLoading(true)
    api('appointments').then(setRows).catch(console.error).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const updateStatus = async (id, status) => {
    await api('appointments', { method:'PATCH', body:{ status }, id })
    setRows(r => r.map(x => x.id === id ? { ...x, status } : x))
  }

  const STATUS_COLOR = { new:'#b40a0a', contacted:'#c97d10', confirmed:'#4a9c5d', closed:'rgba(232,226,214,0.25)' }
  const filtered = filter === 'all' ? rows : rows.filter(r => r.status === filter)

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, flexWrap:'wrap', gap:16 }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:400 }}>Appointment Bookings</h2>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {['all','new','contacted','confirmed','closed'].map(f => (
            <Btn key={f} variant={filter===f?'primary':'default'} style={{ padding:'7px 14px', fontSize:7 }} onClick={() => setFilter(f)}>{f}</Btn>
          ))}
        </div>
      </div>
      {loading ? <p style={{ color:C.dim }}>Loading…</p> : (
        <div style={st.card}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'48px 0' }}>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:400, color:'#fff', marginBottom:8 }}>No bookings yet</p>
              <p style={{ color:C.dim, fontSize:13 }}>When visitors submit the contact form, they'll appear here.</p>
            </div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr>{['Name','Email','Service','Message','Status','Date','Action'].map(h => <th key={h} style={st.th}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td style={st.td}><strong>{r.name}</strong></td>
                    <td style={{ ...st.td, fontSize:12 }}>{r.email}</td>
                    <td style={{ ...st.td, fontSize:12, color:C.dim }}>{r.service || '—'}</td>
                    <td style={{ ...st.td, fontSize:12, maxWidth:200 }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.message}</div></td>
                    <td style={st.td}><span style={{ fontFamily:"'Cinzel',serif", fontSize:7, letterSpacing:'.2em', textTransform:'uppercase', border:`1px solid ${STATUS_COLOR[r.status]||C.border}`, color:STATUS_COLOR[r.status], padding:'3px 9px' }}>{r.status}</span></td>
                    <td style={{ ...st.td, fontSize:11, color:C.dim }}>{r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}</td>
                    <td style={st.td}>
                      <select style={{ ...st.input, padding:'6px 10px', fontSize:11, width:'auto' }} value={r.status} onChange={e => updateStatus(r.id, e.target.value)}>
                        {['new','contacted','confirmed','closed'].map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

// ── EVENTS TAB ────────────────────────────────────────────────
const EVENT_FIELDS = [
  { key:'title',       label:'Title' },
  { key:'date',        label:'Date',             type:'date' },
  { key:'time',        label:'Time (e.g. 10:00 AM)' },
  { key:'location',    label:'Location' },
  { key:'type',        label:'Type', type:'select', options:['Cultural','Dining','Wellness','Excursion','Festival','Other'] },
  { key:'spots',       label:'Spots Available',  type:'number' },
  { key:'price',       label:'Price (e.g. $15 or Free)' },
  { key:'image',       label:'Event Image',      type:'image', placeholder:'https://...' },
  { key:'description', label:'Description',      type:'textarea' },
]

function EventsTab() {
  const [rows, setRows]   = useState([])
  const [loading, setL]   = useState(true)
  const [modal, setModal] = useState(null)

  const load = () => { setL(true); api('events').then(setRows).catch(console.error).finally(() => setL(false)) }
  useEffect(load, [])

  const save = async data => {
    if (data.id) await api('events', { method:'PATCH', body:data, id:data.id })
    else await api('events', { method:'POST', body:{ ...data, active:true } })
    setModal(null); load()
  }
  const del = async id => { if (!confirm('Delete event?')) return; await api('events', { method:'DELETE', id }); load() }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, gap:16, flexWrap:'wrap' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:400 }}>Events</h2>
        <div style={{ display:'flex', gap:10 }}>
          {rows.length === 0 && <SeedButton resource="events" data={DEFAULT_EVENTS} onDone={load} label="⟳ Seed Default Events" />}
          <Btn variant="primary" onClick={() => setModal({})}>+ Add Event</Btn>
        </div>
      </div>
      {modal !== null && <FormModal title={modal.id ? 'Edit Event' : 'New Event'} fields={EVENT_FIELDS} initial={modal} onSave={save} onClose={() => setModal(null)} />}
      {loading ? <p style={{ color:C.dim }}>Loading…</p> : (
        <div>
          {rows.length === 0 ? (
            <div style={{ ...st.card, textAlign:'center', padding:'48px 0' }}>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#fff', marginBottom:8 }}>No events yet</p>
              <p style={{ color:C.dim, fontSize:13, marginBottom:20 }}>Click "Seed Default Events" to load the website's default events, or add one manually.</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
              {rows.map(r => (
                <div key={r.id} style={{ ...st.card, padding:0, overflow:'hidden' }}>
                  {r.image && <div style={{ height:140, overflow:'hidden' }}><img src={r.image} alt={r.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>}
                  <div style={{ padding:20 }}>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:7, letterSpacing:'.3em', color:C.red, marginBottom:6 }}>{r.type} · {r.date}</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:'#fff', marginBottom:6 }}>{r.title}</div>
                    <div style={{ fontSize:12, color:C.dim, marginBottom:14 }}>📍 {r.location} · {r.price}</div>
                    <div style={{ display:'flex', gap:8 }}>
                      <Btn style={{ flex:1, padding:'7px 0', fontSize:7 }} onClick={() => setModal(r)}>Edit</Btn>
                      <Btn variant="danger" style={{ padding:'7px 12px', fontSize:7 }} onClick={() => del(r.id)}>✕</Btn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── TEAM TAB ──────────────────────────────────────────────────
const TEAM_FIELDS = [
  { key:'name',           label:'Full Name' },
  { key:'role',           label:'Role / Title' },
  { key:'specialisation', label:'Specialisation' },
  { key:'img',            label:'Photo',  type:'image', placeholder:'https://...' },
  { key:'bio',            label:'Short Bio', type:'textarea' },
  { key:'sort_order',     label:'Display Order (1 = first)', type:'number' },
]

function TeamTab() {
  const [rows, setRows]   = useState([])
  const [loading, setL]   = useState(true)
  const [modal, setModal] = useState(null)

  const load = () => { setL(true); api('team_members').then(setRows).catch(console.error).finally(() => setL(false)) }
  useEffect(load, [])

  const save = async data => {
    if (data.id) await api('team_members', { method:'PATCH', body:data, id:data.id })
    else await api('team_members', { method:'POST', body:{ ...data, active:true } })
    setModal(null); load()
  }
  const del = async id => { if (!confirm('Remove this team member?')) return; await api('team_members', { method:'DELETE', id }); load() }

  const sorted = [...rows].sort((a,b) => (a.sort_order||99) - (b.sort_order||99))

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, gap:16, flexWrap:'wrap' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:400 }}>Staff</h2>
        <div style={{ display:'flex', gap:10 }}>
          {rows.length === 0 && <SeedButton resource="team_members" data={DEFAULT_TEAM} onDone={load} label="⟳ Seed Default Staff" />}
          <Btn variant="primary" onClick={() => setModal({})}>+ Add Staff Member</Btn>
        </div>
      </div>
      {modal !== null && <FormModal title={modal.id ? 'Edit Member' : 'New Staff Member'} fields={TEAM_FIELDS} initial={modal} onSave={save} onClose={() => setModal(null)} />}
      {loading ? <p style={{ color:C.dim }}>Loading…</p> : (
        sorted.length === 0 ? (
          <div style={{ ...st.card, textAlign:'center', padding:'48px 0' }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#fff', marginBottom:8 }}>No staff yet</p>
            <p style={{ color:C.dim, fontSize:13, marginBottom:20 }}>Click "Seed Default Staff" to load the hotel's core team.</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:16 }}>
            {sorted.map(r => (
              <div key={r.id} style={st.card}>
                <div style={{ aspectRatio:'3/4', overflow:'hidden', marginBottom:14 }}>
                  <img src={r.img} alt={r.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.src='https://via.placeholder.com/200x267/181510/b40a0a?text=No+Image'} />
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, color:'#fff', marginBottom:3 }}>{r.name}</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:7, letterSpacing:'.25em', color:C.red, marginBottom:14, textTransform:'uppercase' }}>{r.role}</div>
                <div style={{ display:'flex', gap:8 }}>
                  <Btn style={{ flex:1, padding:'6px 0', fontSize:7 }} onClick={() => setModal(r)}>Edit</Btn>
                  <Btn variant="danger" style={{ padding:'6px 10px', fontSize:7 }} onClick={() => del(r.id)}>✕</Btn>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

// ── SERVICES TAB ──────────────────────────────────────────────
const SERVICE_FIELDS = [
  { key:'title',       label:'Service Title' },
  { key:'description', label:'Description', type:'textarea' },
  { key:'duration',    label:'Duration (e.g. 50 min)' },
  { key:'sort_order',  label:'Display Order', type:'number' },
]

function ServicesTab() {
  const [rows, setRows]   = useState([])
  const [loading, setL]   = useState(true)
  const [modal, setModal] = useState(null)

  const load = () => { setL(true); api('services').then(setRows).catch(console.error).finally(() => setL(false)) }
  useEffect(load, [])

  const save = async data => {
    const body = { ...data, modalities: data.modalities || [] }
    if (data.id) await api('services', { method:'PATCH', body, id:data.id })
    else await api('services', { method:'POST', body:{ ...body, active:true } })
    setModal(null); load()
  }
  const del = async id => { if (!confirm('Delete service?')) return; await api('services', { method:'DELETE', id }); load() }

  const sorted = [...rows].sort((a,b) => (a.sort_order||99) - (b.sort_order||99))

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, gap:16, flexWrap:'wrap' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:400 }}>Services</h2>
        <div style={{ display:'flex', gap:10 }}>
          {rows.length === 0 && <SeedButton resource="services" data={DEFAULT_SERVICES} onDone={load} label="⟳ Seed Default Services" />}
          <Btn variant="primary" onClick={() => setModal({})}>+ Add Service</Btn>
        </div>
      </div>
      {modal !== null && <FormModal title={modal.id?'Edit Service':'New Service'} fields={SERVICE_FIELDS} initial={modal} onSave={save} onClose={() => setModal(null)} />}
      {loading ? <p style={{ color:C.dim }}>Loading…</p> : (
        sorted.length === 0 ? (
          <div style={{ ...st.card, textAlign:'center', padding:'48px 0' }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#fff', marginBottom:8 }}>No services yet</p>
            <p style={{ color:C.dim, fontSize:13, marginBottom:20 }}>Click "Seed Default Services" to populate the 6 services shown on the website.</p>
          </div>
        ) : (
          <div style={{ ...st.card, padding:0 }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr>{['#','Title','Duration','Description',''].map(h => <th key={h} style={st.th}>{h}</th>)}</tr></thead>
              <tbody>
                {sorted.map(r => (
                  <tr key={r.id}>
                    <td style={{ ...st.td, color:C.dim, fontSize:11 }}>{r.sort_order || '—'}</td>
                    <td style={st.td}><strong>{r.title}</strong></td>
                    <td style={{ ...st.td, fontSize:12, color:C.dim, whiteSpace:'nowrap' }}>{r.duration}</td>
                    <td style={{ ...st.td, fontSize:12, color:C.dim, maxWidth:300 }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.description}</div></td>
                    <td style={st.td}>
                      <div style={{ display:'flex', gap:8 }}>
                        <Btn style={{ padding:'6px 12px', fontSize:7 }} onClick={() => setModal(r)}>Edit</Btn>
                        <Btn variant="danger" style={{ padding:'6px 12px', fontSize:7 }} onClick={() => del(r.id)}>✕</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}

// ── ROOMS TAB ─────────────────────────────────────────────────
const ROOM_FIELDS = [
  { key:'title',       label:'Room Name' },
  { key:'type',        label:'Type', type:'select', options:['Deluxe','Suite','Royal'] },
  { key:'price',       label:'Price (e.g. $180)' },
  { key:'size',        label:'Size (e.g. 42 m²)' },
  { key:'beds',        label:'Bed Configuration' },
  { key:'capacity',    label:'Max Guests', type:'number' },
  { key:'image',       label:'Room Image', type:'image', placeholder:'https://...' },
  { key:'description', label:'Description', type:'textarea' },
  { key:'sort_order',  label:'Display Order', type:'number' },
]

function RoomsTab() {
  const [rows, setRows]   = useState([])
  const [loading, setL]   = useState(true)
  const [modal, setModal] = useState(null)

  const load = () => { setL(true); api('rooms').then(setRows).catch(console.error).finally(() => setL(false)) }
  useEffect(load, [])

  const save = async data => {
    if (data.id) await api('rooms', { method:'PATCH', body:data, id:data.id })
    else await api('rooms', { method:'POST', body:{ ...data, active:true } })
    setModal(null); load()
  }
  const del = async id => { if (!confirm('Delete room?')) return; await api('rooms', { method:'DELETE', id }); load() }

  const sorted = [...rows].sort((a,b) => (a.sort_order||99) - (b.sort_order||99))

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, gap:16, flexWrap:'wrap' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:400 }}>Rooms &amp; Suites</h2>
        <div style={{ display:'flex', gap:10 }}>
          {rows.length === 0 && <SeedButton resource="rooms" data={DEFAULT_ROOMS} onDone={load} label="⟳ Seed Default Rooms" />}
          <Btn variant="primary" onClick={() => setModal({})}>+ Add Room</Btn>
        </div>
      </div>
      {modal !== null && <FormModal title={modal.id ? 'Edit Room' : 'New Room'} fields={ROOM_FIELDS} initial={modal} onSave={save} onClose={() => setModal(null)} />}
      {loading ? <p style={{ color:C.dim }}>Loading…</p> : (
        sorted.length === 0 ? (
          <div style={{ ...st.card, textAlign:'center', padding:'48px 0' }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#fff', marginBottom:8 }}>No rooms yet</p>
            <p style={{ color:C.dim, fontSize:13, marginBottom:20 }}>Click "Seed Default Rooms" to load the website's 9 heritage rooms, or add one manually.</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16 }}>
            {sorted.map(r => (
              <div key={r.id} style={{ ...st.card, padding:0, overflow:'hidden' }}>
                {r.image && <div style={{ height:140, overflow:'hidden' }}><img src={r.image} alt={r.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>}
                <div style={{ padding:20 }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:7, letterSpacing:'.3em', color:C.red, marginBottom:6 }}>{r.type} · {r.price}/night</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:'#fff', marginBottom:6 }}>{r.title}</div>
                  <div style={{ fontSize:12, color:C.dim, marginBottom:14 }}>{r.size} · {r.beds} · up to {r.capacity}</div>
                  <div style={{ display:'flex', gap:8 }}>
                    <Btn style={{ flex:1, padding:'7px 0', fontSize:7 }} onClick={() => setModal(r)}>Edit</Btn>
                    <Btn variant="danger" style={{ padding:'7px 12px', fontSize:7 }} onClick={() => del(r.id)}>✕</Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

// ── GALLERY TAB ───────────────────────────────────────────────
const GALLERY_FIELDS = [
  { key:'url',        label:'Image URL', type:'image', placeholder:'https://...' },
  { key:'alt',        label:'Alt Text / Caption' },
  { key:'category',   label:'Category', type:'select', options:['Rooms','Pool','Restaurant','Spa','Gardens','Events','Other'] },
  { key:'sort_order', label:'Display Order', type:'number' },
]

function GalleryTab() {
  const [rows, setRows]   = useState([])
  const [loading, setL]   = useState(true)
  const [modal, setModal] = useState(null)

  const load = () => { setL(true); api('gallery_images').then(setRows).catch(console.error).finally(() => setL(false)) }
  useEffect(load, [])

  const save = async data => {
    if (data.id) await api('gallery_images', { method:'PATCH', body:data, id:data.id })
    else await api('gallery_images', { method:'POST', body:{ ...data, active:true } })
    setModal(null); load()
  }
  const del = async id => { if (!confirm('Remove image?')) return; await api('gallery_images', { method:'DELETE', id }); load() }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, gap:16 }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:400 }}>Gallery Images</h2>
        <Btn variant="primary" onClick={() => setModal({})}>+ Add Image</Btn>
      </div>
      {modal !== null && <FormModal title={modal.id?'Edit Image':'Add Image'} fields={GALLERY_FIELDS} initial={modal} onSave={save} onClose={() => setModal(null)} />}
      {loading ? <p style={{ color:C.dim }}>Loading…</p> : (
        rows.length === 0 ? (
          <div style={{ ...st.card, textAlign:'center', padding:'48px 0' }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#fff', marginBottom:8 }}>No images yet</p>
            <p style={{ color:C.dim, fontSize:13 }}>Add image URLs to build your gallery.</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:14 }}>
            {rows.map(r => (
              <div key={r.id} style={{ ...st.card, padding:10 }}>
                <img src={r.url} alt={r.alt} style={{ width:'100%', aspectRatio:'1', objectFit:'cover', marginBottom:10, borderRadius:2 }} onError={e => e.target.src='https://via.placeholder.com/200x200/181510/b40a0a?text=Error'} />
                <div style={{ fontSize:11, color:C.dim, marginBottom:8, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.alt || r.category || 'Untitled'}</div>
                <div style={{ display:'flex', gap:6 }}><Btn style={{ flex:1, padding:'5px 0', fontSize:7 }} onClick={() => setModal(r)}>Edit</Btn><Btn variant="danger" style={{ padding:'5px 10px', fontSize:7 }} onClick={() => del(r.id)}>✕</Btn></div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

// ── LOGIN ─────────────────────────────────────────────────────
function Login({ onAuth }) {
  const [token, setT] = useState('')
  const [err, setErr] = useState('')
  const tryLogin = async () => {
    saveToken(token)
    try { await api('appointments'); onAuth() }
    catch { setErr('Invalid token. Check your ADMIN_TOKEN environment variable in Vercel.') }
  }
  return (
    <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:380, background:C.surface, border:`1px solid ${C.border}`, borderRadius:3, padding:40 }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:900, color:'#fff', marginBottom:6 }}>
          WAASALA <em style={{ fontStyle:'italic', fontWeight:400 }}>ECO LUXURY</em>
        </div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.4em', textTransform:'uppercase', color:C.red, marginBottom:36 }}>Admin Dashboard</p>
        <label style={st.label}>Admin Token</label>
        <input
          style={{ ...st.input, marginBottom:16 }} type="password"
          value={token} onChange={e => setT(e.target.value)}
          onKeyDown={e => e.key==='Enter' && tryLogin()}
          placeholder="Enter your admin token…"
        />
        {err && <p style={{ color:C.red, fontSize:12, marginBottom:14, lineHeight:1.6 }}>{err}</p>}
        <button
          style={{ width:'100%', padding:'13px 0', background:C.red, border:`1px solid ${C.red}`, color:'#fff', fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.35em', textTransform:'uppercase', cursor:'pointer', borderRadius:2 }}
          onClick={tryLogin}
        >Access Dashboard</button>
      </div>
    </div>
  )
}

// ── MAIN ADMIN ────────────────────────────────────────────────
const TABS = [
  { key:'appointments', label:'Bookings',  icon:'📋' },
  { key:'rooms',        label:'Rooms',     icon:'🛏' },
  { key:'events',       label:'Events',    icon:'📅' },
  { key:'services',     label:'Services',  icon:'💬' },
  { key:'team',         label:'Staff',     icon:'👥' },
  { key:'gallery',      label:'Gallery',   icon:'🖼' },
]

const TAB_COMPONENTS = {
  appointments: <AppointmentsTab />,
  rooms:        <RoomsTab />,
  events:       <EventsTab />,
  services:     <ServicesTab />,
  team:         <TeamTab />,
  gallery:      <GalleryTab />,
}

export default function Admin() {
  const [authed, setAuthed] = useState(!!getToken())
  const [tab, setTab]       = useState('appointments')

  if (!authed) return <Login onAuth={() => setAuthed(true)} />

  return (
    <div style={st.page}>
      {/* Sidebar */}
      <div style={st.sidebar}>
        <div style={{ padding:'28px 20px 20px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:900, color:'#fff', letterSpacing:'-.01em' }}>
            WAASALA <em style={{ fontStyle:'italic', fontWeight:400 }}>ELH</em>
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:7, letterSpacing:'.4em', color:C.red, marginTop:4, textTransform:'uppercase' }}>Admin</div>
        </div>
        <nav style={{ flex:1, padding:'12px 0', overflowY:'auto' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display:'flex', alignItems:'center', gap:10, padding:'13px 20px',
              fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.3em', textTransform:'uppercase',
              color: tab===t.key ? '#fff' : C.dim,
              background: tab===t.key ? 'rgba(180,10,10,0.14)' : 'transparent',
              borderLeft: tab===t.key ? `2px solid ${C.red}` : '2px solid transparent',
              cursor:'pointer', transition:'all .2s', border:'none', width:'100%', textAlign:'left',
            }}>
              <span style={{ fontSize:14 }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px 20px', borderTop:`1px solid ${C.border}` }}>
          <button onClick={() => { localStorage.removeItem(TOKEN_KEY); setAuthed(false) }} style={{
            width:'100%', padding:'9px 0', fontFamily:"'Cinzel',serif", fontSize:7,
            letterSpacing:'.3em', textTransform:'uppercase',
            border:`1px solid rgba(180,10,10,0.3)`, color:C.dim,
            background:'transparent', cursor:'pointer', borderRadius:2,
          }}>Sign Out</button>
        </div>
      </div>

      {/* Main */}
      <main style={st.main}>
        {TAB_COMPONENTS[tab]}
      </main>
    </div>
  )
}
