import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const causes = [
  { emoji: '🍎', name: 'City Harvest', desc: 'Hunger' },
  { emoji: '🏠', name: 'Coalition for the Homeless', desc: 'Housing' },
  { emoji: '🌱', name: 'NYC Parks Foundation', desc: 'Environment' },
  { emoji: '📚', name: 'Robin Hood Foundation', desc: 'Education' },
]

const steps = [
  { step: '01', title: 'Sign up', desc: 'Pick your cause. $2/month goes straight to them.' },
  { step: '02', title: 'Order as usual', desc: 'Give your email at the counter or order ahead. Every drink is tracked.' },
  { step: '03', title: 'Hit 10 drinks', desc: 'We email you automatically. Your next coffee is free.' },
  { step: '04', title: 'Redeem', desc: 'Barista marks it redeemed. Counter resets. Repeat forever.' },
]

export default function CoffeeClub() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id='coffee-club'
      ref={ref}
      style={{ background: 'var(--text)', padding: '120px 48px', overflow: 'hidden', position: 'relative' }}
    >
      {/* Big decorative background number */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(200px, 30vw, 380px)',
        fontWeight: 700, color: 'rgba(255,255,255,0.02)', letterSpacing: '-0.06em',
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>$2</div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Top — centered manifesto */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}
          >
            Coffee Club
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05,
              color: '#fff', marginBottom: '24px',
            }}
          >
            We don't charge you<br />for loyalty.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{ fontSize: '17px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 36px' }}
          >
            $2/month goes directly to a cause you choose. You get rewarded every time you order. We keep nothing.
          </motion.p>

          {/* Cause chips — horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}
          >
            {causes.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px', borderRadius: '100px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ fontSize: '15px' }}>{c.emoji}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{c.name}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{c.desc}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.44 }}
          >
            <Link to='/club' style={{
              display: 'inline-block', fontSize: '15px', fontWeight: 500,
              padding: '16px 36px', borderRadius: '100px', background: '#fff',
              color: 'var(--text)', textDecoration: 'none', letterSpacing: '0.01em',
            }}>
              Join for $2/month
            </Link>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
              Cancel anytime · 100% goes to your cause
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '64px', transformOrigin: 'left' }}
        />

        {/* Steps — horizontal 4-column on desktop, vertical on mobile */}
        <div className='club-steps'>
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Connector line between steps (desktop only) */}
              {i < steps.length - 1 && (
                <div className='step-connector' />
              )}
              <div style={{
                fontSize: '13px', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700,
                color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: '14px',
              }}>{s.step}</div>
              <div style={{
                fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500,
                color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>{s.title}</div>
              <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, lineHeight: 1.6 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .club-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .step-connector {
          display: none;
        }
        @media (max-width: 900px) {
          .club-steps {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }
        @media (max-width: 560px) {
          .club-steps {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          #coffee-club {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}