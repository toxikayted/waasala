import { useEffect, useRef } from 'react'

export function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const pos  = useRef({ x:0, y:0 })
  const rpos = useRef({ x:0, y:0 })

  useEffect(() => {
    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.current.style.left = e.clientX + 'px'
      dot.current.style.top  = e.clientY + 'px'
    }
    const lr = (a,b,t) => a + (b-a)*t
    const tick = () => {
      rpos.current.x = lr(rpos.current.x, pos.current.x, 0.11)
      rpos.current.y = lr(rpos.current.y, pos.current.y, 0.11)
      ring.current.style.left = rpos.current.x + 'px'
      ring.current.style.top  = rpos.current.y + 'px'
      requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a,button,[data-h]')) document.body.classList.add('hov')
      else document.body.classList.remove('hov')
    })
    requestAnimationFrame(tick)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <>
    <div id="cur-dot" ref={dot} />
    <div id="cur-ring" ref={ring} />
  </>
}

export function ProgressBar() {
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    const upd = () => {
      const t = document.body.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${t > 0 ? window.scrollY/t : 0})`
    }
    window.addEventListener('scroll', upd, { passive: true })
    return () => window.removeEventListener('scroll', upd)
  }, [])
  return <div id="progress-bar" />
}
