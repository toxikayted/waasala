import { useState } from 'react'
import { useRevealAll } from '../hooks/useReveal'

const ENQUIRY_TYPES = ['Room Reservation','Event Booking','Restaurant / Pub Enquiry','Spa & Wellness Enquiry','Wedding / Private Event','Airport Transfer','General Enquiry']

const inputBase = {
  width: '100%', padding: '14px 0',
  border: 'none', borderBottom: '1px solid var(--border)',
  background: 'none', color: 'var(--text)',
  fontFamily: 'var(--sans)', fontSize: 14,
  outline: 'none', transition: 'border-color .25s',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  useRevealAll()

  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Page hero */}
      <section className="page-hero-grid" style={{
        padding: '100px 60px 80px', borderBottom: '1px solid var(--border)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'flex-end',
      }}>
        <div>
          <p className="label rv">Reach Out</p>
          <h1 className="h-giant rv" style={{ color: 'var(--bg2)' }}>GET IN<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--bg2)' }}>TOUCH</em></h1>
        </div>
        <p className="body-text rv-r" style={{ fontSize: 15, lineHeight: 2, maxWidth: 420 }}>
          Whether you're reserving a room, planning an event, or simply have a question about your stay, our reservations team will respond within 24 hours.
        </p>
      </section>

      {/* Main content */}
      <section className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg2)' }}>
        {/* Left: details */}
        <div className="contact-border-right" style={{ padding: '80px 60px', borderRight: '1px solid var(--border)' }}>
          <div className="rv" style={{ marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400, color: 'var(--text)', marginBottom: 24, lineHeight: 1.1 }}>
              Begin the<br /><em style={{ fontStyle: 'italic', color: 'var(--red)' }}>conversation</em>
            </h2>
            <p className="body-text" style={{ color: 'rgba(232,226,214,0.6)' }}>From a single night to a full retreat, there's no wrong way to start. Tell us what you're looking for and we'll take it from there.</p>
          </div>

          <div className="rv">
            {[
              { lbl: 'Email', val: 'reservations@waasalaecoluxury.lk' },
              { lbl: 'Phone', val: '+94 25 222 0140' },
              { lbl: 'Location', val: 'Anuradhapura, Sri Lanka' },
              { lbl: 'Hours', val: 'Front Desk — 24 Hours' },
            ].map(({ lbl, val }) => (
              <div key={lbl} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--border)', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--caps)', fontSize: 8, letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--red)', paddingTop: 2 }}>{lbl}</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-dim)' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="rv" style={{ marginTop: 48, aspectRatio: '16/9', background: 'var(--bg3)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', textAlign: 'right', width: '100%', height: 0, paddingBottom: '56.25%' }}>
              <div style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                <iframe
                  width="100%" height="100%" style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Anuradhapura,Sri+Lanka&output=embed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div style={{ padding: '80px 60px' }}>
          {status === 'success' ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
              <div style={{ width: 64, height: 64, border: '1px solid var(--red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: 'var(--red)', animation: 'scaleIn .5s cubic-bezier(.16,1,.3,1)' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, color: 'var(--text)' }}>Message received</h3>
              <p className="body-text" style={{ maxWidth: 340, color: 'rgba(232,226,214,0.6)' }}>Thank you for reaching out. A member of our reservations team will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="rv-r">
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 40 }}>Send us a message</h3>

              <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                {[['name','Your Name','text'],['email','Email','email']].map(([k,lbl,type]) => (
                  <div key={k}>
                    <label style={{ display: 'block', fontFamily: 'var(--caps)', fontSize: 8, letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>{lbl}</label>
                    <input type={type} required value={form[k]} onChange={upd(k)} style={inputBase}
                      onFocus={e => e.target.style.borderBottomColor = 'var(--red)'}
                      onBlur={e => e.target.style.borderBottomColor = 'var(--border)'}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontFamily: 'var(--caps)', fontSize: 8, letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>What's this about?</label>
                <select value={form.service} onChange={upd('service')} style={{ ...inputBase, background: 'var(--bg2)' }}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--border)'}
                >
                  <option value="">Select…</option>
                  {ENQUIRY_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 40 }}>
                <label style={{ display: 'block', fontFamily: 'var(--caps)', fontSize: 8, letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>Message</label>
                <textarea required rows={5} value={form.message} onChange={upd('message')} style={{ ...inputBase, border: '1px solid var(--border)', padding: '14px 16px', resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {status === 'error' && <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--red)', marginBottom: 16 }}>Something went wrong — please try again.</p>}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-dim)', maxWidth: 220, lineHeight: 1.6 }}>We respond within one business day.</p>
                <button type="submit" data-h disabled={status === 'loading'} className="btn-red" style={{ opacity: status === 'loading' ? .6 : 1 }}>
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--bg2)' }}>
        <p className="label rv">Common Questions</p>
        <h2 className="h-med rv" style={{ color: 'var(--bg2)', marginBottom: 56 }}>Before you reach out</h2>
        <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--bg2)' }}>
          {[
            { q: 'What are check-in and check-out times?', a: 'Check-in is from 2:00 PM and check-out is by 12:00 PM. Early check-in and late check-out can often be arranged — just ask our front desk.' },
            { q: 'Is breakfast included in the room rate?', a: 'Yes — a full breakfast buffet at Saffron Restaurant is included with every room booking, served from 7:00 AM to 10:30 AM.' },
            { q: 'Do you offer airport pickup?', a: 'Yes, private transfers from Bandaranaike International Airport can be arranged in advance through our concierge for an additional fee.' },
            { q: 'What is your cancellation policy?', a: 'Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge.' },
          ].map(({ q, a }, i) => (
            <div key={q} className="rv card-hover" data-delay={i+1} style={{ background: 'var(--bg)', padding: '40px 36px' }}>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 400, color: 'var(--bg2)', marginBottom: 12 }}>{q}</h4>
              <p className="body-text">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
