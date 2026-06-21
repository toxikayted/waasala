import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setPct(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div id="progress-bar" style={{ transform: `scaleX(${pct})` }} />
  )
}
