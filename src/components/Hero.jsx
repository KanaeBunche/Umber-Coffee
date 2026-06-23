import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const words = 'Coffee made for busy mornings.'.split(' ')

export default function Hero({ onOrderClick }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let start = null
    const animate = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / 25000, 1)
      video.style.transform = `scale(${1 + progress * 0.05})`
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      >
        <source src='/hero.mp4' type='video/mp4' />
      </video>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.38)',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '760px',
        padding: '0 24px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#CBB89D',
            marginBottom: '28px',
          }}
        >
          NYC · Est. 2026
        </motion.div>

        <h1 style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: 'clamp(48px, 7vw, 88px)',
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          marginBottom: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 0.28em',
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(8px)', y: 30 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.7,
                delay: 2.0 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '17px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.72)',
            letterSpacing: '0.01em',
            lineHeight: 1.8,
            marginBottom: '44px',
          }}
        >
          Order ahead.&nbsp;&nbsp;Earn rewards.&nbsp;&nbsp;Keep your day moving.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 3.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}
        >
          <button
            onClick={onOrderClick}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              padding: '14px 28px',
              borderRadius: '100px',
              background: '#ffffff',
              color: '#111111',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            Order Ahead
          </button>
          <a href='#best-sellers' style={{
            fontSize: '14px',
            fontWeight: 400,
            padding: '14px 28px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.35)',
            color: 'rgba(255,255,255,0.9)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}>
            View Menu
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4.4 }}
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '13px', color: '#CBB89D', letterSpacing: '1px' }}>★★★★★</span>
        <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>4.9 stars</span>
        <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
        <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>2,300+ customers</span>
      </motion.div>
    </section>
  )
}