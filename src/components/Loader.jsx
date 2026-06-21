import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [n, setN] = useState(0)
  const [out, setOut] = useState(false)

  useEffect(() => {
    let v = 0
    const t = setInterval(() => {
      v += Math.random() * 16 + 5
      if (v >= 100) {
        v = 100; clearInterval(t)
        setTimeout(() => { setOut(true); setTimeout(onDone, 650) }, 250)
      }
      setN(Math.floor(v))
    }, 70)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:8000,
      background:'var(--bg)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      opacity: out ? 0 : 1,
      transition:'opacity .65s cubic-bezier(.4,0,.2,1)',
      pointerEvents: out ? 'none' : 'all',
    }}>
      <div style={{
        fontFamily:'var(--serif)',
        fontSize:'clamp(40px,8vw,90px)',
        fontWeight:900,
        letterSpacing:'-.02em',
        color:'var(--bg2)',
        lineHeight:.9,
        textAlign:'center',
        marginBottom:48,
      }}>
        WAASALA<br />
        <em style={{ fontStyle:'italic', color:'var(--bg2)' }}>ECO LUXURY HEAVEN</em>
      </div>

      <div style={{ width:240, height:1, background:'var(--border)', position:'relative', marginBottom:16 }}>
        <div style={{ position:'absolute', left:0, top:0, height:'100%', background:'var(--red)', width:n+'%', transition:'width .1s ease' }} />
      </div>

      <div style={{ fontFamily:'var(--caps)', fontSize:9, letterSpacing:'.35em', color:'var(--bg2)', textTransform:'uppercase' }}>
        {n < 100 ? 'Preparing your retreat' : 'Welcome'}
      </div>

      <div style={{
        position:'absolute', bottom:36, right:48,
        fontFamily:'var(--serif)', fontSize:'clamp(60px,10vw,120px)',
        fontWeight:900, color:'rgb(0, 0, 0)', lineHeight:1,
        userSelect:'none',
      }}>{String(n).padStart(2,'0')}</div>

      <div style={{
        position:'absolute', top:'-20%', left:'50%', transform:'translateX(-50%)',
        width:600, height:600,
        background:'radial-gradient(circle,rgba(184,64,64,.06) 0%,transparent 70%)',
        borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none',
      }} />
    </div>
  )
}
