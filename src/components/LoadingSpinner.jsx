import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 20, color = 'var(--text)' }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size, height: size,
        border: `2px solid transparent`,
        borderTopColor: color,
        borderRightColor: color,
        borderRadius: '50%',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  )
}