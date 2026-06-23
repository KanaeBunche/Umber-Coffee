import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const hours = [
  { day: 'Mon – Fri', time: '7:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 6:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 5:00 PM' },
]

export default function VisitUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id='visit' style={{ background: 'var(--bg)', padding: '120px 48px' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className='visit-grid'>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}
            >
              Visit Us
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '40px' }}
            >
              Come in.<br />Stay a minute.
            </motion.h2>

            {hours.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.16 + i * 0.08 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)', fontSize: '14px', gap: '16px' }}
              >
                <span style={{ color: 'var(--muted)', fontWeight: 300, flexShrink: 0 }}>{h.day}</span>
                <span style={{ fontWeight: 400, textAlign: 'right' }}>{h.time}</span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.44 }}
              style={{ marginTop: '32px', fontSize: '14px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, marginBottom: '24px' }}
            >
              147 West 26th Street<br />
              New York, NY 10001<br />
              Chelsea, Manhattan
            </motion.div>

            <motion.a
              href='https://maps.google.com/?q=147+West+26th+Street+New+York'
              target='_blank'
              rel='noreferrer'
              initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.52 }}
              whileHover={{ y: -1, borderColor: 'var(--accent)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '13.5px', fontWeight: 500, color: 'var(--text)',
                textDecoration: 'none', padding: '11px 22px',
                border: '1px solid var(--border)', borderRadius: '100px',
                transition: 'border-color 0.2s ease',
              }}
            >
              Get Directions →
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: '24px', overflow: 'hidden', height: '400px',
              border: '1px solid var(--border)',
              filter: 'grayscale(100%) contrast(0.9)',
              transition: 'filter 1.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%) contrast(1)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%) contrast(0.9)'}
          >
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9!2d-74.000!3d40.746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a68d7e9f01%3A0xa0f3af0a4d4e2f8c!2s147+W+26th+St%2C+New+York%2C+NY+10001!5e0!3m2!1sen!2sus!4v1'
              width='100%' height='100%' style={{ border: 'none' }}
              allowFullScreen loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        .visit-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .visit-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .visit-grid > div:last-child {
            height: 280px !important;
          }
          #visit {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}