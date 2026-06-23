import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const causes = [
  { id: 'cityharvest', emoji: '🍎', name: 'City Harvest' },
  { id: 'homeless', emoji: '🏠', name: 'Coalition for the Homeless' },
  { id: 'parks', emoji: '🌱', name: 'NYC Parks Foundation' },
  { id: 'robinhood', emoji: '📚', name: 'Robin Hood Foundation' },
]

// Fake account data
const fakeAccounts = {
  'jane@example.com': { name: 'Jane', drinks: 8, cause: 'cityharvest', since: 'March 2026', active: true },
  'test@crystalcoffeenyc.com': { name: 'Alex', drinks: 3, cause: 'parks', since: 'May 2026', active: true },
  'demo@crystalcoffeenyc.com': { name: 'Sam', drinks: 10, cause: 'robinhood', since: 'January 2026', active: false },
}

export default function Account() {
  const [email, setEmail] = useState('')
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [resubscribed, setResubscribed] = useState(false)
  const [showCancel, setShowCancel] = useState(false)

  const handleLookup = () => {
    setLoading(true)
    setError(false)
    setTimeout(() => {
      const found = fakeAccounts[email.toLowerCase()]
      if (found) {
        setAccount(found)
      } else {
        setError(true)
      }
      setLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    setShowCancel(false)
    setCancelled(true)
    setAccount(prev => ({ ...prev, active: false }))
  }

  const handleResubscribe = () => {
    setResubscribed(true)
    setCancelled(false)
    setAccount(prev => ({ ...prev, active: true }))
  }

  const cause = causes.find(c => c.id === account?.cause)
  const TOTAL = 10

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '64px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <Link to='/' style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>Crystal Coffee</Link>
        {account && (
          <button onClick={() => { setAccount(null); setEmail(''); setCancelled(false); setResubscribed(false) }}
            style={{ fontSize: '13px', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', borderRadius: '100px', padding: '7px 18px', cursor: 'pointer' }}>
            Sign out
          </button>
        )}
        {!account && <Link to='/' style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>← Back</Link>}
      </nav>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Lookup form */}
        {!account && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>My Account</div>
            <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '12px' }}>
              Check your progress.
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, marginBottom: '40px' }}>
              Enter the email you signed up with. No password needed.
            </p>

            <div style={{ marginBottom: '12px' }}>
              <input
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLookup()}
                style={{
                  width: '100%', padding: '14px 16px', border: error ? '1px solid #d97a4a' : '1px solid var(--border)',
                  borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none',
                  fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
              />
              {error && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: '12.5px', color: '#d97a4a', marginTop: '8px', fontWeight: 300 }}>
                  No account found for that email. Try jane@example.com to demo.
                </motion.div>
              )}
            </div>

            <button onClick={handleLookup} disabled={loading || !email} style={{
              width: '100%', padding: '15px', background: email ? 'var(--text)' : 'var(--border)',
              color: email ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '100px',
              fontSize: '14px', fontWeight: 500, cursor: email ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
              ) : 'Look up my account'}
            </button>

            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12.5px', color: 'var(--muted)', fontWeight: 300 }}>
              Not a member yet?{' '}
              <Link to='/club' style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Join the Club →</Link>
            </div>
          </motion.div>
        )}

        {/* Account view */}
        {account && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            {/* Welcome */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>My Account</div>
              <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, letterSpacing: '-0.025em', marginBottom: '4px' }}>
                Hey, {account.name}.
              </h1>
              <div style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: 300 }}>Member since {account.since}</div>
            </div>

            {/* Drink progress */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, marginBottom: '8px' }}>Your progress</div>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                {account.drinks} of 10 drinks
              </div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {Array.from({ length: TOTAL }).map((_, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: i < account.drinks ? 1 : 0.2 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }} style={{ fontSize: '20px' }}>☕</motion.span>
                ))}
              </div>
              <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(account.drinks / TOTAL) * 100}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  style={{ height: '100%', background: 'var(--accent)', borderRadius: '2px' }}
                />
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: 300 }}>
                {account.drinks >= 10 ? '🎉 You have a free coffee ready — show this at the counter!' : `${TOTAL - account.drinks} more drinks until your free coffee`}
              </div>
            </div>

            {/* Cause */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, marginBottom: '14px' }}>Your cause</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '28px' }}>{cause?.emoji}</span>
                <div>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500, marginBottom: '2px' }}>{cause?.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300 }}>$2/month donated on your behalf</div>
                </div>
              </div>
            </div>

            {/* Membership status */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px', marginBottom: '32px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, marginBottom: '14px' }}>Membership</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: account.active ? '#4a9e6a' : '#d97a4a' }} />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{account.active ? 'Active' : 'Cancelled'}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: 300 }}>
                    {account.active ? '$2/month · Billed on the 1st' : 'Your membership has been cancelled'}
                  </div>
                </div>
                {account.active && !cancelled && (
                  <button onClick={() => setShowCancel(true)} style={{ fontSize: '12.5px', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', borderRadius: '100px', padding: '7px 16px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                )}
                {(!account.active || cancelled) && !resubscribed && (
                  <button onClick={handleResubscribe} style={{ fontSize: '12.5px', color: 'var(--text)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '100px', padding: '7px 16px', cursor: 'pointer', fontWeight: 500 }}>
                    Resubscribe
                  </button>
                )}
              </div>
              {resubscribed && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '12px', fontSize: '12.5px', color: '#4a9e6a', fontWeight: 400 }}>
                  ✓ You're back! Your donation resumes next billing cycle.
                </motion.div>
              )}
            </div>

            {/* Cancel confirm */}
            <AnimatePresence>
              {showCancel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCancel(false)}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(4px)' }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    onClick={e => e.stopPropagation()}
                    style={{ background: 'var(--bg)', borderRadius: '20px', padding: '32px', maxWidth: '400px', width: '100%' }}
                  >
                    <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '10px' }}>Cancel membership?</h3>
                    <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6, marginBottom: '24px' }}>
                      Your drink tracking stops and your $2/month donation to {cause?.name} ends. You can resubscribe anytime.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => setShowCancel(false)} style={{ flex: 1, padding: '13px', border: '1px solid var(--border)', borderRadius: '100px', background: 'var(--card)', fontSize: '14px', fontWeight: 400, cursor: 'pointer', color: 'var(--text)' }}>
                        Keep membership
                      </button>
                      <button onClick={handleCancel} style={{ flex: 1, padding: '13px', border: 'none', borderRadius: '100px', background: '#d97a4a', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                        Yes, cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}