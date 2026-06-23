import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const values = [
  { title: 'No line, no wait', desc: 'We built order-ahead from day one. Your time matters more than our queue.' },
  { title: 'Give before you take', desc: '$2 of every membership goes directly to a NYC cause. We keep nothing.' },
  { title: 'Obsessively simple', desc: 'No app required. No loyalty card. Just your email and a great cup of coffee.' },
  { title: 'Made fresh, always', desc: 'Everything is made to order. Baked daily. Sourced locally where we can.' },
]

const team = [
  { name: 'Kanae B.', role: 'Founder & Head Barista', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=face' },
  { name: 'Marcus T.', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=face' },
  { name: 'Priya S.', role: 'Lead Barista', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&fit=crop&crop=face' },
]

export default function About() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '64px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <Link to='/' style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>Crystal Coffee</Link>
        <Link to='/' style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>← Back</Link>
      </nav>

      {/* Hero */}
      <section style={{ background: 'var(--text)', padding: '120px 48px 100px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
            About Crystal Coffee
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff', marginBottom: '32px' }}>
            A coffee shop built for the way New Yorkers actually live.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.8, maxWidth: '620px' }}>
            We opened Crystal Coffee in Chelsea in 2026 with one belief: great coffee shouldn't cost you your morning. Order ahead, give your email at the counter, and walk straight in. No waiting. No fuss.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '100px 48px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>Our story</div>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '20px' }}>
              Started with a long line and a short temper.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.8, marginBottom: '20px' }}>
              Our founder spent three years watching New Yorkers wait 15 minutes for a $7 latte before a morning meeting. The coffee was great. The experience wasn't.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.8 }}>
              Crystal Coffee was built differently from the ground up — order-ahead first, no app required, and a loyalty program that gives back to the city instead of just collecting data on you.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}>
            <img
              src='https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&fit=crop'
              alt='Coffee being made'
              style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '20px', border: '1px solid var(--border)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '0 48px 100px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>What we believe</div>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}>The Crystal Coffee way.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '36px' }}>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '20px', fontWeight: 500, letterSpacing: '-0.015em', marginBottom: '10px' }}>{v.title}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7 }}>{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '0 48px 100px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>The team</div>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}>The people behind the cup.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {team.map((person, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ textAlign: 'center' }}>
                <img src={person.img} alt={person.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '20px', marginBottom: '16px', border: '1px solid var(--border)' }} />
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', fontWeight: 500, marginBottom: '4px' }}>{person.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300 }}>{person.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 48px', background: 'var(--text)', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', color: '#fff', marginBottom: '16px' }}>Come say hi.</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, marginBottom: '36px' }}>147 West 26th Street, Chelsea. Open every day.</p>
          <Link to='/' style={{ fontSize: '15px', fontWeight: 500, padding: '16px 40px', borderRadius: '100px', background: '#fff', color: 'var(--text)', textDecoration: 'none', display: 'inline-block' }}>
            Order Ahead
          </Link>
        </div>
      </section>
    </div>
  )
}