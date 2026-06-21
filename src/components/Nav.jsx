import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { label: 'Our Story', to: '/about'    },
  { label: 'Rooms',     to: '/rooms'    },
  { label: 'Services',  to: '/services' },
  { label: 'Events',    to: '/events'   },
  { label: 'Contact',   to: '/contact'  },
]

export default function Nav() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  const loc = useLocation()
  const isHome = loc.pathname === '/'

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!isHome) { setScrollProgress(1); return }
      const vh = window.innerHeight
      const fadeStart = vh * 0.2
      const fadeEnd   = vh * 0.4
      const y = window.scrollY
      const raw = (y - fadeStart) / (fadeEnd - fadeStart)
      setScrollProgress(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => setMenuOpen(false), [loc.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const heroOpacity = isHome ? 1 - scrollProgress : 0
  const navOpacity  = isHome ? scrollProgress      : 1

  return (
    <>
      {isHome && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: heroOpacity,
          filter: `blur(${scrollProgress * 6}px)`,
          transform: `translateY(${scrollProgress * -20}px) scale(${1 - scrollProgress * 0.03})`,
        }}>
          <div style={{
            fontFamily: 'var(--serif)',
            fontSize: isMobile ? 'clamp(36px, 12.5vw, 12.5vw)' : 'clamp(36px, 12.5vw, 12.5vw)',
            fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1,
            color: 'var(--text)',
            padding: isMobile ? '14px 16px 0' : '14px 0.6vw 0',
            width: '100%',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            animation: 'heroIn .9s cubic-bezier(.16,1,.3,1) both',
            userSelect: 'none',
          }}>
            <span>WAASALA</span>
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Resort</em>
          </div>

          {!isMobile && (
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 1.2vw 0',
              animation: 'heroIn 1s .15s cubic-bezier(.16,1,.3,1) both',
              pointerEvents: heroOpacity > 0.3 ? 'all' : 'none',
            }}>
              {LINKS.map(l => (
                <Link key={l.to} to={l.to} data-h style={{
                  fontFamily: 'var(--caps)', fontSize: 9,
                  letterSpacing: '.35em', textTransform: 'uppercase',
                  color: '#fff', transition: 'color .25s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                >{l.label}</Link>
              ))}
            </div>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                position: 'fixed', top: 14, right: 16, zIndex: 410,
                pointerEvents: heroOpacity > 0.3 ? 'all' : 'none',
                display: 'flex', flexDirection: 'column', gap: 5,
                padding: '10px 12px',
                background: 'rgba(14,12,10,0.65)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 3, cursor: 'pointer',
                animation: 'heroFadeIn 1s .3s both',
              }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 1.5,
                  background: '#fff', borderRadius: 1,
                }} />
              ))}
            </button>
          )}
        </div>
      )}

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '14px 16px' : '18px 40px',
        background: 'rgba(14, 12, 10, 0.77)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        opacity: navOpacity,
        transform: `translateY(${(1 - navOpacity) * -10}px)`,
        pointerEvents: navOpacity > 0.3 ? 'all' : 'none',
        transition: isHome ? 'none' : 'opacity .3s',
      }}>
        <Link to="/" data-h style={{
          fontFamily: 'var(--serif)', fontSize: 18,
          fontWeight: 900, letterSpacing: '-.01em', color: 'var(--text)',
        }}>
          වා<em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dim)', fontSize: 16 }}>සල</em>
        </Link>

        {!isMobile && (
          <ul style={{
            display: 'flex', gap: 36, listStyle: 'none',
            fontFamily: 'var(--caps)', fontSize: 9,
            letterSpacing: '.35em', textTransform: 'uppercase',
          }}>
            {LINKS.map(l => (
              <li key={l.to}>
                <Link to={l.to} data-h style={{
                  transition: 'color .25s',
                  color: loc.pathname === l.to ? 'var(--text)' : 'var(--text-dim)',
                  borderBottom: loc.pathname === l.to
                    ? '1px solid var(--red)' : '1px solid transparent',
                  paddingBottom: 2,
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color =
                    loc.pathname === l.to ? 'var(--text)' : 'var(--text-dim)'}
                >{l.label}</Link>
              </li>
            ))}
          </ul>
        )}

        {!isMobile && (
          <Link to="/contact" data-h className="btn"
            style={{ fontSize: 9, padding: '10px 22px' }}>
            <span>Book Your Stay</span>
          </Link>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(true)} style={{
            display: 'flex', flexDirection: 'column', gap: 5,
            padding: '10px 12px',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 3, cursor: 'pointer',
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5,
                background: '#fff', borderRadius: 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'var(--bg2)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
        willChange: 'transform',
        overflowY: 'auto',
      }}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: 'absolute', top: 18, right: 16,
          padding: '10px 16px', cursor: 'pointer',
          fontFamily: 'var(--caps)', fontSize: 8,
          letterSpacing: '.3em', color: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 2, background: 'none',
        }}>✕ CLOSE</button>

        <div style={{
          position: 'absolute', top: 22, left: 20,
          fontFamily: 'var(--serif)', fontSize: 18,
          fontWeight: 900, color: '#fff',
        }}>
          W<em style={{ fontStyle: 'italic', fontWeight: 400, fontSize: 16 }}>L</em>
        </div>

        <nav style={{ width: '100%', padding: '0 32px' }}>
          {LINKS.map((l, i) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
              display: 'block',
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 9vw, 48px)',
              fontWeight: 700, color: 'var(--text)',
              padding: '16px 0', width: '100%', textAlign: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
              opacity: menuOpen ? 1 : 0,
              transition: `transform .42s ${.08 + i * .07}s cubic-bezier(.16,1,.3,1),
                           opacity    .42s ${.08 + i * .07}s cubic-bezier(.16,1,.3,1),
                           color .2s`,
            }}
              onTouchStart={e => e.currentTarget.style.color = 'var(--red)'}
              onTouchEnd={e   => e.currentTarget.style.color = 'var(--text)'}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >{l.label}</Link>
          ))}
        </nav>

        <Link to="/contact" onClick={() => setMenuOpen(false)} style={{
          marginTop: 36,
          fontFamily: 'var(--caps)', fontSize: 9,
          letterSpacing: '.35em', textTransform: 'uppercase',
          background: 'var(--red)', color: '#fff',
          padding: '15px 36px', borderRadius: 2,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .42s .38s cubic-bezier(.16,1,.3,1), transform .42s .38s cubic-bezier(.16,1,.3,1)',
          WebkitTapHighlightColor: 'transparent',
        }}>Book Your Stay</Link>
      </div>
    </>
  )
}