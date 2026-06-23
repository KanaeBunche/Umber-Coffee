import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function Toast({ message, emoji = '✓', visible, onDismiss, duration = 3500 }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.96 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          style={{
            position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 500, background: 'var(--text)', color: '#fff',
            padding: '12px 22px', borderRadius: '100px',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '13.5px', fontWeight: 400, letterSpacing: '0.01em',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)', whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
          onClick={onDismiss}
        >
          <span style={{ fontSize: '16px' }}>{emoji}</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}