const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Order', href: '#order-ahead' },
  { label: 'Club', href: '#coffee-club' },
  { label: 'Gift Cards', href: '#gift-cards' },
  { label: 'Rewards', href: '#rewards' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--text)', padding: '80px 48px 48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top row — wordmark + nav */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: '48px', flexWrap: 'wrap', marginBottom: '80px',
        }}>

          {/* Wordmark + tagline */}
          <div>
            <div style={{
              fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500,
              color: '#fff', letterSpacing: '-0.03em', marginBottom: '10px',
            }}>
            Crystal Coffee
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)', fontWeight: 300, lineHeight: 1.6, maxWidth: '220px' }}>
              Specialty coffee in New York City.<br />Order ahead. Skip the line.
            </div>
          </div>

          {/* Nav links — vertical stack */}
          <nav>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {links.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: '14px', fontWeight: 400,
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      transition: 'color 0.18s ease',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Instagram CTA */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>
              Follow along
            </div>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noreferrer'
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none', transition: 'color 0.18s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>
              </svg>
              @crystalcoffeenyc
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)', fontWeight: 300 }}>
            © 2026 Crystal Coffee, NYC
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms'].map(l => (
              <a key={l} href='#' style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)', textDecoration: 'none', fontWeight: 300, transition: 'color 0.18s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.18)'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          footer {
            padding: 60px 24px 40px !important;
          }
        }
      `}</style>
    </footer>
  )
}