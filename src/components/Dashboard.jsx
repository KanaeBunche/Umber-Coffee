import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '10,000+', label: 'Orders served' },
  { value: '4.9', label: 'Average rating' },
  { value: '2,300+', label: 'Happy customers' },
  { value: '<5 min', label: 'Average wait time' },
]

export default function Dashboard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: 'var(--card)', padding: '120px 48px' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
            By the numbers
          </div>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Built for the morning<br />you actually have.
          </h2>
        </motion.div>

        <div className='stats-grid'>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className='stat-item'
              style={{ padding: '48px 40px', textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: 300, letterSpacing: '0.02em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-item + .stat-item {
          border-left: 1px solid var(--border);
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-item + .stat-item {
            border-left: none;
          }
          .stat-item {
            padding: 36px 24px !important;
            border-bottom: 1px solid var(--border);
          }
          .stat-item:nth-child(odd) {
            border-right: 1px solid var(--border);
          }
          section {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}