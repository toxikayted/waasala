import { useEffect, useRef } from 'react'

/**
 * useRevealAll — attaches to ALL .rv/.rv-l/.rv-r/.rv-scale/.rv-blur/.rv-clip/.rv-flip
 * elements. Adds .in when visible, REMOVES .in when out of view → re-triggers on scroll back.
 */
export function useRevealAll(selector = '.rv, .rv-l, .rv-r, .rv-scale, .rv-blur, .rv-clip, .rv-flip') {
  useEffect(() => {
    const els = document.querySelectorAll(selector)

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            // Apply stagger delay from data-delay attr
            const delay = e.target.getAttribute('data-delay')
            if (delay) {
              e.target.style.transitionDelay = `${parseFloat(delay) * 0.08}s`
            }
            e.target.classList.add('in')
          } else {
            // Remove class so it re-animates next time
            e.target.classList.remove('in')
            // Reset delay so exit is instant
            e.target.style.transitionDelay = '0s'
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [selector])
}

/** Single element reveal hook */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add('in')
        else el.classList.remove('in')
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/** Parallax on scroll */
export function useParallax(speed = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.innerWidth < 768) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const cy = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translateY(${cy * speed}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])
  return ref
}

/** Magnetic button — desktop only */
export function useMagnetic(strength = 0.28) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.innerWidth < 768) return
    const onMove = e => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) * strength
      const dy = (e.clientY - r.top  - r.height / 2) * strength
      el.style.transform = `translate(${dx}px,${dy}px)`
      el.style.transition = 'transform .1s linear'
    }
    const onLeave = () => {
      el.style.transform = 'translate(0,0)'
      el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return ref
}
