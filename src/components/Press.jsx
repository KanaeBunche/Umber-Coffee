import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const perks = [
  {
    label: 'Great WiFi',
    sub: 'Fast, free, no password needed',
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80&fit=crop&crop=center',
  },
  {
    label: 'Comfy Seating',
    sub: 'Stay as long as you like',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80&fit=crop&crop=center',
  },
  {
    label: '10/10 Service',
    sub: 'We remember your order',
    img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&q=80&fit=crop&crop=center',
  },
  {
    label: 'Fresh Daily',
    sub: 'Baked in-house every morning',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&fit=crop&crop=center',
  },
  {
    label: 'Quiet Corner',
    sub: 'Perfect for deep work',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&fit=crop&crop=center',
  },
  {
    label: 'Specialty Coffee',
    sub: 'Single origin, always',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80&fit=crop&crop=center',
  },
]

export default function Press() {
  const ref = useRef(null)
  const sliderRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    let isDown = false, startX, scrollLeft
    const down = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft }
    const leave = () => { isDown = false }
    const up = () => { isDown = false }
    const move = (e) => {
      if (!isDown) return
      e.preventDefault()
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5
    }
    el.addEventListener('mousedown', down)
    el.addEventListener('mouseleave', leave)
    el.addEventListener('mouseup', up)
    el.addEventListener('mousemove', move)
    return () => {
      el.removeEventListener('mousedown', down)
      el.removeEventListener('mouseleave', leave)
      el.removeEventListener('mouseup', up)
      el.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <section style={{ background: 'var(--bg)', padding: '0' }}>

      {/* Header */}
      <div ref={ref} style={{ padding: '120px 48px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}
          >
            Inside Umber
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '12px' }}
          >
            A place worth staying.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300 }}
          >
            Chelsea, NYC
          </motion.div>
        </div>
      </div>

      {/* Desktop grid */}
      <div className='perks-desktop' style={{ padding: '0 48px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {perks.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                height: i % 3 === 1 ? '380px' : '300px',
                cursor: 'pointer',
                background: '#E6E1DA',
              }}
            >
              <img
                src={p.img}
                alt={p.label}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: 'block', transition: 'transform 0.8s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)',
              }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', marginBottom: '4px' }}>
                  {p.label}
                </div>
                <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                  {p.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div
        ref={sliderRef}
        className='perks-mobile'
        style={{ display: 'none', gap: '16px', padding: '0 24px 80px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab' }}
      >
        {perks.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            style={{
              flex: '0 0 260px', height: '320px', borderRadius: '20px',
              overflow: 'hidden', position: 'relative', cursor: 'pointer',
              background: '#E6E1DA', flexShrink: 0,
            }}
          >
            <img
              src={p.img}
              alt={p.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', fontWeight: 500, color: '#fff', marginBottom: '3px' }}>{p.label}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{p.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .perks-desktop { display: none !important; }
          .perks-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
}