import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const TOTAL = 10
const FILLED = 8

export default function Rewards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [animatedCount, setAnimatedCount] = useState(0)
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    if (!isInView) return
    // Stagger-fill the stamps
    let i = 0
    const timer = setInterval(() => {
      i++
      setAnimatedCount(i)
      if (i >= FILLED) clearInterval(timer)
    }, 90)
    setTimeout(() => setBarWidth((FILLED / TOTAL) * 100), 500)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <section
      id='rewards'
      ref={ref}
      style={{ background: 'var(--card)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Faint background stamp texture */}
      <div style={{
        position: 'absolute', bottom: '-60px', right: '-60px',
        fontSize: '260px', opacity: 0.025, userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
      }}>☕</div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}
        >
          <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
          Rewards
        </motion.div>

        {/* BIG headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.0,
            marginBottom: '20px',
          }}
        >
          Every cup<br />adds up.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.14 }}
          style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '380px', marginBottom: '64px' }}
        >
          Earn a stamp on every purchase. Hit 10, and your next drink is free. Always.
        </motion.p>

        {/* THE HERO — big stamp grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '28px',
            padding: '40px 40px 32px', marginBottom: '32px',
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>
                {animatedCount} <span style={{ color: 'var(--muted)', fontWeight: 300 }}>of {TOTAL} stamps</span>
              </div>
            </div>
            <div style={{
              fontSize: '13px', color: 'var(--accent)', fontWeight: 500,
              background: 'rgba(203,184,157,0.1)', padding: '6px 14px', borderRadius: '100px',
              border: '1px solid rgba(203,184,157,0.2)',
            }}>
              {TOTAL - FILLED} more until free ☕
            </div>
          </div>

          {/* Stamp grid — 5x2 */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '28px',
          }}>
            {Array.from({ length: TOTAL }).map((_, i) => {
              const filled = i < animatedCount
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05, type: 'spring', damping: 14, stiffness: 200 }}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    background: filled ? 'var(--card2)' : 'transparent',
                    border: filled ? '1px solid var(--border)' : '1.5px dashed var(--border)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.3s, border 0.3s',
                  }}
                >
                  {filled ? (
                    <motion.span
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 300, delay: 0.3 + i * 0.09 }}
                    >
                      ☕
                    </motion.span>
                  ) : (
                    <span style={{ opacity: 0.15, fontSize: '18px' }}>○</span>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Progress bar */}
          <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent), #e8d5bb)',
              borderRadius: '2px',
              width: `${barWidth}%`,
              transition: 'width 1.8s cubic-bezier(0.16,1,0.3,1)',
            }} />
          </div>
        </motion.div>

        {/* Bottom two cards — invite + how it works */}
        <div className='rewards-bottom'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px',
              padding: '28px', display: 'flex', alignItems: 'flex-start', gap: '16px',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '22px' }}>
              👋
            </div>
            <div>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', fontWeight: 600, marginBottom: '5px', letterSpacing: '-0.01em' }}>Invite a friend</div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.55 }}>You both get a free coffee when they place their first order.</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px',
              padding: '28px',
            }}
          >
            <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', fontWeight: 600, marginBottom: '14px', letterSpacing: '-0.01em' }}>How it works</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Order any drink at Umber',
                'Give your email — stamps track automatically',
                'Hit 10 and we email you instantly',
                'Show the email, get your free coffee',
              ].map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '10px', fontWeight: 600, color: 'var(--accent)' }}>{i + 1}</div>
                  <div style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.4 }}>{line}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .rewards-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .rewards-bottom {
            grid-template-columns: 1fr;
          }
          #rewards {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}