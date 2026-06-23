import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '10,000+', label: 'Orders served', icon: '☕' },
  { value: '4.9', label: 'Average rating', icon: '★' },
  { value: '2,300+', label: 'Happy customers', icon: '♡' },
  { value: '<5 min', label: 'Average wait time', icon: '◎' },
]

function CountUp({ target, suffix = '', isInView }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const isSimple = typeof target === 'number'
    if (!isSimple) { setDisplay(target); return }
    let start = 0
    const duration = 1600
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setDisplay(target + suffix); clearInterval(timer) }
      else setDisplay(Math.floor(start) + suffix)
    }, step)
    return () => clearInterval(timer)
  }, [isInView])

  return <>{display}</>
}

export default function Dashboard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: 'var(--text)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>

      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}
          >
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
            By the numbers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 500, letterSpacing: '-0.033em', lineHeight: 1.05,
              color: '#fff', maxWidth: '600px',
            }}
          >
            Built for the morning<br />you actually have.
          </motion.h2>
        </div>

        {/* Stats row */}
        <div className='stats-grid'>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '40px 36px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '16px', opacity: 0.4 }}>{stat.icon}</div>
              <div style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontSize: 'clamp(42px, 5vw, 68px)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                color: '#fff',
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: 300, letterSpacing: '0.02em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: '80px', paddingTop: '48px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: '24px',
          }}
        >
          <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em', lineHeight: 1.4, maxWidth: '500px' }}>
            "The best part of my morning isn't the coffee.<br />It's that my coffee is ready before I am."
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
            — A regular, Chelsea
          </div>
        </motion.div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .stats-grid > div + div {
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-grid > div + div {
            border-left: none;
          }
          .stats-grid > div:nth-child(odd) {
            border-right: 1px solid rgba(255,255,255,0.08);
          }
          .stats-grid > div {
            padding: 32px 24px !important;
          }
          section {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}