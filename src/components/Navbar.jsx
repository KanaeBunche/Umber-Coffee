import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Navbar({ onOrderClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '64px', padding: '0 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(247,244,239,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #E6E1DA' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <Link to='/' style={{
          fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500,
          letterSpacing: '-0.02em', color: scrolled ? '#111111' : '#ffffff',
          textDecoration: 'none', transition: 'color 0.3s ease', flexShrink: 0,
        }}>
         Crystal
        </Link>

        <ul className='nav-desktop' style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none' }}>
          {[['Menu', '/menu'], ['Order', '#order-ahead'], ['Club', '/club'], ['About', '/about'], ['Account', '/account']].map(([label, href]) => (
            <li key={label}>
              {href.startsWith('/') ? (
                <Link to={href} style={{
                  fontSize: '13.5px', fontWeight: 400,
                  color: scrolled ? '#6B6B6B' : 'rgba(255,255,255,0.8)',
                  textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 0.3s ease',
                }}>{label}</Link>
              ) : (
                <a href={href} style={{
                  fontSize: '13.5px', fontWeight: 400,
                  color: scrolled ? '#6B6B6B' : 'rgba(255,255,255,0.8)',
                  textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 0.3s ease',
                }}>{label}</a>
              )}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOrderClick}
            className='nav-cta'
            style={{
              fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '100px',
              border: scrolled ? '1px solid #E6E1DA' : '1px solid rgba(255,255,255,0.3)',
              color: scrolled ? '#111111' : '#ffffff',
              background: scrolled ? '#F5F3F0' : 'transparent',
              cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.01em', whiteSpace: 'nowrap',
            }}
          >
            Order Ahead
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='hamburger'
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none', flexDirection: 'column', gap: '5px' }}
          >
            <span style={{ width: '22px', height: '1.5px', background: scrolled ? '#111' : '#fff', display: 'block' }} />
            <span style={{ width: '22px', height: '1.5px', background: scrolled ? '#111' : '#fff', display: 'block' }} />
          </button>
        </div>
      </motion.nav>

      {menuOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, background: 'rgba(247,244,239,0.97)', backdropFilter: 'blur(20px)', zIndex: 99, padding: '24px', borderBottom: '1px solid #E6E1DA', display: 'flex', flexDirection: 'column' }}>
          {[['Menu', '/menu'], ['Order', null], ['Club', '/club'], ['About', '/about'], ['Account', '/account']].map(([label, href]) => (
            href ? (
              <Link key={label} to={href} onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 400, color: '#111', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid #E6E1DA' }}>{label}</Link>
            ) : (
              <button key={label} onClick={() => { setMenuOpen(false); onOrderClick?.() }} style={{ fontSize: '18px', fontWeight: 400, color: '#111', background: 'none', border: 'none', padding: '16px 0', borderBottom: '1px solid #E6E1DA', textAlign: 'left', cursor: 'pointer' }}>{label}</button>
            )
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  )
}