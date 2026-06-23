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
    <section id='visit' style={{ background: 'var(--card)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative large text behind */}
      <div style={{
        position: 'absolute', bottom: '-40px', right: '-20px',
        fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(120px, 18vw, 240px)',
        fontWeight: 700, color: 'rgba(0,0,0,0.03)', letterSpacing: '-0.06em',
        userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
      }}>
        NYC
      </div>

      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}
        >
          <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
          Visit Us
        </motion.div>

        <div className='visit-grid'>
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '48px' }}
            >
              Come in.<br />Stay a while.
            </motion.h2>

            {/* Hours */}
            <div style={{ marginBottom: '40px' }}>
              {hours.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.08 }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 0', borderBottom: '1px solid var(--border)',
                    fontSize: '14px', gap: '16px',
                  }}
                >
                  <span style={{ color: 'var(--muted)', fontWeight: 300 }}>{h.day}</span>
                  <span style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>{h.time}</span>
                </motion.div>
              ))}
            </div>

            {/* Address block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.44 }}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px',
                padding: '24px 28px', marginBottom: '24px',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>Address</div>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.4, color: 'var(--text)' }}>
                147 West 26th Street<br />Chelsea, New York
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300, marginTop: '6px' }}>NY 10001</div>
            </motion.div>

            <motion.a
              href='https://maps.google.com/?q=147+West+26th+Street+New+York'
              target='_blank'
              rel='noreferrer'
              initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.52 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '14px', fontWeight: 500, color: 'var(--text)',
                textDecoration: 'none', padding: '13px 24px',
                border: '1.5px solid var(--border)', borderRadius: '100px',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--bg)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
            >
              Get Directions →
            </motion.a>
          </div>

          {/* Right — map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div
              style={{
                borderRadius: '24px', overflow: 'hidden', flex: 1, minHeight: '400px',
                border: '1px solid var(--border)',
                filter: 'grayscale(100%) contrast(0.88) brightness(1.02)',
                transition: 'filter 1s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%) contrast(1) brightness(1)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%) contrast(0.88) brightness(1.02)'}
            >
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9!2d-74.000!3d40.746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a68d7e9f01%3A0xa0f3af0a4d4e2f8c!2s147+W+26th+St%2C+New+York%2C+NY+10001!5e0!3m2!1sen!2sus!4v1'
                width='100%' height='100%' style={{ border: 'none', display: 'block', minHeight: '400px' }}
                allowFullScreen loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>

            {/* Two small info chips */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Nearest subway', value: '1/C/E at 23rd St' },
                { label: 'Parking', value: 'Garage on 27th St' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .visit-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .visit-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          #visit {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}