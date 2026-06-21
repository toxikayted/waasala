import { Link } from 'react-router-dom'
import { useRevealAll } from '../hooks/useReveal'

const team = [
  { name: 'Ruwan Bandara',      role: 'General Manager',              img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&q=80&auto=format&fit=crop' },
  { name: 'Sanduni Wickrama',   role: 'Guest Relations Manager',      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop' },
  { name: 'Chef Dilshan Perera',role: 'Executive Chef, Saffron',      img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80&auto=format&fit=crop' },
  { name: 'Anoma Jayasuriya',   role: 'Spa & Wellness Director',      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format&fit=crop' },
  { name: 'Kasun Fernando',     role: 'Front Office Manager',         img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop' },
  { name: 'Nimali Senanayake',  role: 'Heritage Tour Curator',        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop' },
  { name: 'Thilina Rathnayake', role: 'Head Gardener',                img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80&auto=format&fit=crop' },
  { name: 'Imesha Gunawardena', role: 'Head Housekeeper',             img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop&flip=h' },
]

const values = [
  { n: '01', title: 'Rooted in Heritage', body: 'We honour the 1,200 years of ancient Sri Lankan civilisation—its agriculture, its irrigation systems, and its sacred cosmology—by weaving them into the fabric of your stay.' },
  { n: '02', title: 'Eco-Luxury, Defined', body: 'Sustainability isn\'t an afterthought—it\'s our foundation. From the bamboo groves to the royal garden of over 200 flowers, every element is designed to rejuvenate without harming the earth.' },
  { n: '03', title: 'Personalised Hospitality', body: 'No two guests are alike, so no two stays should be either. We listen, we adapt, and we craft each experience around you—not the other way around.' },
  { n: '04', title: 'Sanctuary in the Ancient City', body: 'Tucked away from the noise of the main streets, we offer a space where you can breathe, unwind, and reconnect—whether by the pool, in the garden, or in the quiet of your room.' },
  { n: '05', title: 'Knowledge Shared', body: 'We believe travel is as much about learning as it is about relaxing. Through stories, videos, and curated excursions, we invite you to understand the deep history and cosmic energy of this land.' },
  { n: '06', title: 'Beyond the Stay', body: 'We equip you with memories, knowledge, and a sense of peace that travels home with you—long after you\'ve left our gates.' }
]

export default function About() {
  useRevealAll()

  return (
    <main style={{ paddingTop: 80, overflowX: 'hidden' }}>

      {/* ── Page Hero ── */}
      <section className="page-hero-grid" style={{
        padding: '100px 60px 80px',
        borderBottom: '1px solid rgba(19,17,9,0.12)',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 60, alignItems: 'flex-end',
        background: 'var(--bg)',
        height: '90dvh',
      }}>
        <div>
          <p className="label rv">Who We Are</p>
          <h1 className="h-giant rv" style={{ color: 'var(--bg2)' }}>
            OUR<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>STORY</em>
          </h1>
        </div>
        <p className="body-text rv-r" style={{ fontSize: 15, lineHeight: 2, maxWidth: '100%' }}>
          In ancient Sri Lanka Raja Waasala is the place where royal family used to stay. "Waasala" is set to be the place where royal guests, highly respected and wealthy people used to rest. Our sole ambition is to provide you with high standard comforts at "Waasala" which is really Luxury of a Kingdom. When you reach this glorious city, this must be the place that you are looking for to stay.
        </p>
      </section>

      {/* ── Philosophy split ── */}
      <section className="two-col-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        background: 'var(--bg)',
      }}>
        <div className="rv-scale" style={{ overflow: 'hidden' }}>
          <img
            src="https://www.anuradhapurahotels.net/data/Photos/OriginalPhoto/16128/1612869/1612869842.JPEG"
            alt="Mindfulness in nature"
            style={{
              width: '100%', height: '100%', minHeight: 280,
              objectFit: 'cover',

            }}

          />
        </div>
        <div style={{
          padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          background: 'var(--bg2)',
        }}>
          <p className="label rv">Our Philosophy</p>
          <h2 className="h-med rv" style={{ color: 'var(--text)', marginBottom: 24 }}>
            Luxury is not what you take —{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--red)' }}>it is what you leave untouched.</em>
          </h2>
          <p className="body-text rv" style={{ color: 'rgba(232,226,214,.65)', marginBottom: 16 }}>
            Our mission is to explore the benefits of ancient heritage system, ancient
            agricultural and irrigation system apart from nature and wild life, and
            blend with modern facilities to stimulate the taste of paradise with vibrant
            cultural values.

          </p>
          <p className="body-text rv" style={{ color: 'rgba(232,226,214,.65)' }}>
            We pledge to keep every guest happy & entertained right throughout the
            stay and offers Royal accommodation along with a very personalized service.
             While our King & Queen Suite rooms pampering you with a real
            Royalty living, rest of our 8 luxury Deluxe rooms will tell you a story of rich
            Sri Lankan culture, technology, arts and crafts...
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <p className="label rv">What We Stand For</p>
        <h2 className="h-large rv" style={{ color: 'var(--bg2)', marginBottom: 52 }}>
          Our <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Values</em>
        </h2>
        <div style={{ borderTop: '1px solid rgba(19,17,9,0.12)' }}>
          {values.map((v, i) => (
            <div key={v.n} className="rv values-row" data-delay={i + 1} style={{
              display: 'grid', gridTemplateColumns: '64px 1fr 2fr',
              gap: 'clamp(12px,3vw,40px)',
              padding: 'clamp(20px,3vw,36px) 0',
              borderBottom: '1px solid rgba(19,17,9,0.1)',
              alignItems: 'start',
            }}>
              <span style={{ fontFamily: 'var(--caps)', fontSize: 10, color: 'var(--red)', letterSpacing: '.2em' }}>{v.n}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 400, color: 'var(--bg2)' }}>{v.title}</h3>
              <p className="body-text values-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: 52,
          flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <p className="label rv">The People</p>
            <h2 className="h-large rv" style={{ color: 'var(--text)' }}>
              Meet our <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dim)' }}>People</em>
            </h2>
          </div>
          <Link to="/contact" data-h className="btn rv"><span>Plan Your Stay</span></Link>
        </div>

        <div className="four-col-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24,
        }}>
          {team.map((m, i) => (
            <div key={m.name} className="rv" data-delay={(i % 4) + 1}>
              <div style={{
                aspectRatio: '3/4', overflow: 'hidden',
                marginBottom: 14, position: 'relative',
              }}>
                <img src={m.img} alt={m.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform .7s cubic-bezier(.16,1,.3,1)',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Red line on hover */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 2, background: 'var(--red)',
                  transform: 'scaleX(0)', transformOrigin: 'left',
                  transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scaleX(1)'}
                />
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(14px,1.5vw,18px)', color: 'var(--text)', marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontFamily: 'var(--caps)', fontSize: 7, letterSpacing: '.3em', color: 'var(--red)', textTransform: 'uppercase' }}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
