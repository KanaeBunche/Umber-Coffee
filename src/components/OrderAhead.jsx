import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    label: 'Choose your pickup time',
    desc: 'Schedule up to 2 hours in advance. Your coffee is ready when you arrive.',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='#CBB89D' strokeWidth='1.5' width='16' height='16'>
        <circle cx='12' cy='12' r='9' /><polyline points='12,6 12,12 16,14' />
      </svg>
    ),
  },
  {
    label: 'Customize every detail',
    desc: 'Milk, temperature, extra shot, sweetness. Exactly how you want it.',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='#CBB89D' strokeWidth='1.5' width='16' height='16'>
        <path d='M12 2L2 7l10 5 10-5-10-5z' /><path d='M2 17l10 5 10-5' /><path d='M2 12l10 5 10-5' />
      </svg>
    ),
  },
  {
    label: 'Pay with Apple or Google Pay',
    desc: 'One tap checkout. Earn rewards automatically on every purchase.',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='#CBB89D' strokeWidth='1.5' width='16' height='16'>
        <rect x='2' y='5' width='20' height='14' rx='3' /><line x1='2' y1='10' x2='22' y2='10' />
      </svg>
    ),
  },
]

export default function OrderAhead() {
  const ref = useRef(null)
  const phoneRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const onScroll = () => {
      if (!phoneRef.current) return
      const section = phoneRef.current.closest('section')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - rect.top / (window.innerHeight * 0.6)))
      const y = 30 - progress * 30
      const rotate = -2 + progress * 2
      phoneRef.current.style.transform = `translateY(${y}px) rotate(${rotate}deg)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id='order-ahead' style={{ background: 'var(--card)', padding: '120px 48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className='order-grid'>
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}
            >
              Order Ahead
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '16px' }}
            >
              Skip the line.<br />Order on your time.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
              style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '420px', fontWeight: 300, marginBottom: '48px' }}
            >
              Place your order from anywhere, pick a time, and walk straight in. No waiting. No fumbling.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.28 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>{f.label}</div>
                    <div style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div ref={phoneRef} className='phone-wrap' style={{ display: 'flex', justifyContent: 'center', willChange: 'transform', transform: 'translateY(30px) rotate(-2deg)' }}>
            <div style={{
              width: '260px', height: '520px', background: '#1a1a1a', borderRadius: '44px',
              border: '1px solid #333', boxShadow: '0 0 0 1px #2a2a2a, 0 40px 80px rgba(0,0,0,0.25)',
              overflow: 'hidden', position: 'relative', padding: '22px 14px 18px', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ width: '90px', height: '24px', background: '#1a1a1a', borderRadius: '0 0 18px 18px', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }} />
              <div style={{ flex: 1, background: 'var(--bg)', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '32px 18px 14px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Umber Coffee</div>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.02em' }}>Good morning ☀︎</div>
                </div>
                <div style={{ height: '1px', background: 'var(--border)', margin: '0 18px' }} />
                <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Pickup time</div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text)', background: 'var(--card)', padding: '3px 9px', borderRadius: '20px', border: '1px solid var(--border)' }}>8:45 AM</div>
                </div>
                <div style={{ margin: '0 14px', background: 'var(--card)', borderRadius: '14px', padding: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '3px' }}>Oat Latte</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '10px' }}>Oat milk · Extra shot · No sugar</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '12px', fontWeight: 500 }}>$6.50</div>
                    <div style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 500 }}>✦ +12 pts</div>
                  </div>
                </div>
                <div style={{ margin: '12px 14px 0', background: 'var(--text)', color: '#fff', borderRadius: '12px', padding: '12px', fontSize: '12px', fontWeight: 500, textAlign: 'center' }}>
                  Pay with Apple Pay
                </div>
                <div style={{ padding: '10px 18px 0', fontSize: '10px', color: 'var(--muted)', textAlign: 'center', fontWeight: 300 }}>
                  Ready in ~4 min after 8:41 AM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .order-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .order-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .phone-wrap {
            transform: none !important;
          }
          #order-ahead {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}