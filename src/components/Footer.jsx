const links = ['Menu', 'Order', 'Club', 'Gift Cards', 'Rewards', 'Instagram']

export default function Footer() {
  return (
    <footer style={{ background: 'var(--text)', padding: '64px 48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.02em' }}>
          Umber Coffee
        </div>
        <ul style={{ display: 'flex', gap: '28px', listStyle: 'none' }}>
          {links.map(l => (
            <li key={l}>
              <a href='#' style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>© 2026 Umber Coffee, NYC</div>
      </div>
    </footer>
  )
}
