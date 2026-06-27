import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FloatingCTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open('https://www.kodedbykanae.com/#start', '_blank')}
      style={{
        position: 'fixed',
        right: 0,
        bottom: '80px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '13px 20px 13px 16px',
        borderRadius: '100px 0 0 100px',
        background: hovered ? '#3a2820' : '#2B1E18',
        color: '#F5F1EB',
        border: '1px solid rgba(245,241,235,0.1)',
        borderRight: 'none',
        boxShadow: '-4px 4px 24px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0 }}>☕</span>

      <span style={{
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Inter, sans-serif',
        color: 'rgba(245,241,235,0.75)',
        letterSpacing: '0.02em',
      }}>
        Want this design?
      </span>

      <motion.span
        animate={{ rotate: hovered ? -45 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: '13px',
          lineHeight: 1,
          flexShrink: 0,
          color: hovered ? '#F5F1EB' : 'rgba(245,241,235,0.4)',
          transition: 'color 0.2s ease',
        }}
      >
        →
      </motion.span>
    </motion.button>
  )
}