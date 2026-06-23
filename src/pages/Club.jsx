import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const causes = [
  { id: 'cityharvest', emoji: '🍎', name: 'City Harvest', desc: 'Feeding New Yorkers in need since 1982', category: 'Hunger & Food Access' },
  { id: 'homeless', emoji: '🏠', name: 'Coalition for the Homeless', desc: 'Providing shelter and services across NYC', category: 'Homelessness' },
  { id: 'parks', emoji: '🌱', name: 'NYC Parks Foundation', desc: 'Keeping NYC green and accessible for all', category: 'Environment' },
  { id: 'robinhood', emoji: '📚', name: 'Robin Hood Foundation', desc: 'Fighting poverty through education and opportunity', category: 'Youth Education' },
]

const steps = [
  { step: '01', title: 'Sign up with your email', desc: 'No password. No app. Just your email and your cause.' },
  { step: '02', title: 'Order as usual', desc: 'Give your email at the counter or order ahead. Every drink is tracked.' },
  { step: '03', title: 'Hit 10 drinks', desc: 'We email you automatically. Your next coffee is free.' },
  { step: '04', title: 'Show the email at the counter', desc: 'Barista marks it redeemed. Counter resets to zero. Repeat forever.' },
]

function Toast({ name, onDone }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ type: 'spring', damping: 24, stiffness: 280 }}
      onAnimationComplete={() => setTimeout(onDone, 3500)}
      style={{
        position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 500, background: 'var(--text)', color: '#fff',
        padding: '14px 24px', borderRadius: '100px',
        display: 'flex', alignItems: 'center', gap: '10px',
        fontSize: '14px', fontWeight: 400, letterSpacing: '0.01em',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '18px' }}>☕</span>
      Congratulations on becoming a member, {name}!
    </motion.div>
  )
}

function SignupModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [selectedCause, setSelectedCause] = useState(null)
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [loading, setLoading] = useState(false)

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val) => val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/')

  const handleJoin = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(4) }, 2200)
  }

  const handleDone = () => {
    onClose()
    onSuccess(email.split('@')[0])
  }

  const CloseBtn = () => (
    <button onClick={onClose} style={{ background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--bg)', borderRadius: '24px', width: '100%', maxWidth: '480px', maxHeight: '85vh', overflowY: 'auto' }}
      >
        {/* Step 1 — Email */}
        {step === 1 && (
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>Step 1 of 3</div>
                <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em' }}>Your email address</h2>
              </div>
              <CloseBtn />
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6, marginBottom: '24px' }}>
              No password needed. We use your email to track your drinks and send your free coffee when you hit 10.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Email address</div>
              <input
                placeholder='you@example.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                type='email'
                style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }}
              />
            </div>
            <button onClick={() => email && setStep(2)} style={{
              width: '100%', padding: '16px', background: email ? 'var(--text)' : 'var(--border)',
              color: email ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '100px',
              fontSize: '14px', fontWeight: 500, cursor: email ? 'pointer' : 'not-allowed',
            }}>Continue →</button>
          </div>
        )}

        {/* Step 2 — Choose cause */}
        {step === 2 && (
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <button onClick={() => setStep(1)} style={{ background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Step 2 of 3</div>
                <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>Choose your cause</h2>
              </div>
              <CloseBtn />
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6, marginBottom: '20px' }}>
              Your $2/month goes directly to this organization. 100% of it. Every month.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {causes.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCause(c.id)}
                  style={{
                    padding: '16px 18px', borderRadius: '16px', cursor: 'pointer',
                    border: selectedCause === c.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: selectedCause === c.id ? 'var(--card2)' : 'var(--card)',
                    display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '15px', fontWeight: 500, marginBottom: '2px' }}>{c.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>{c.desc}</div>
                  </div>
                  {selectedCause === c.id && (
                    <div style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg viewBox='0 0 12 12' fill='none' stroke='#fff' strokeWidth='2' width='10' height='10'><polyline points='2,6 5,9 10,3' /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => selectedCause && setStep(3)} style={{
              width: '100%', padding: '16px', background: selectedCause ? 'var(--text)' : 'var(--border)',
              color: selectedCause ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '100px',
              fontSize: '14px', fontWeight: 500, cursor: selectedCause ? 'pointer' : 'not-allowed',
            }}>Continue →</button>
          </div>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <button onClick={() => setStep(2)} style={{ background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Step 3 of 3</div>
                <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>Payment</h2>
              </div>
              <CloseBtn />
            </div>

            {selectedCause && (
              <div style={{ background: 'var(--card)', borderRadius: '14px', padding: '14px 16px', marginBottom: '20px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>{causes.find(c => c.id === selectedCause)?.emoji}</span>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>Donating to</div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{causes.find(c => c.id === selectedCause)?.name}</div>
                </div>
              </div>
            )}

            <button style={{ width: '100%', padding: '15px', background: '#000', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
               Pay with Apple Pay
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>or pay by card</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Card number</div>
                <input placeholder='4242 4242 4242 4242' value={card.number} onChange={e => setCard({ ...card, number: formatCard(e.target.value) })}
                  style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box', letterSpacing: '0.05em' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Expiry</div>
                  <input placeholder='MM/YY' value={card.expiry} onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                    style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>CVC</div>
                  <input placeholder='123' value={card.cvc} onChange={e => setCard({ ...card, cvc: e.target.value.slice(0, 3) })}
                    style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card)', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                <span>Donation to {causes.find(c => c.id === selectedCause)?.name}</span><span>$2.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                <span>Umber keeps</span><span>$0.00</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border)', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500 }}>
                <span>Total / month</span><span>$2.00</span>
              </div>
            </div>

            <button onClick={handleJoin} disabled={loading} style={{
              width: '100%', padding: '16px', background: loading ? 'var(--muted)' : 'var(--text)', color: '#fff',
              border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                  Processing...
                </>
              ) : 'Donate $2/month'}
            </button>
            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>🔒 Secured by Stripe · Cancel anytime</div>
          </div>
        )}

        {/* Step 4 — Confirmation */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '48px 28px 56px', textAlign: 'center', position: 'relative' }}>
            <button onClick={handleDone} style={{ position: 'absolute', top: '20px', right: '24px', background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
              style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 28px' }}>
              {causes.find(c => c.id === selectedCause)?.emoji}
            </motion.div>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>You're in</div>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '26px', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '12px' }}>Welcome to the Club.</h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, marginBottom: '36px' }}>
              Your $2/month is going to <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{causes.find(c => c.id === selectedCause)?.name}</strong>.<br />
              Every drink you order at Crystal Coffee is now tracked to <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{email}</strong>.<br /><br />
              Hit 10 drinks and we'll email you a free coffee — no app needed.
            </p>
            <button onClick={handleDone} style={{ width: '100%', padding: '16px', background: 'var(--text)', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Done
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Club() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      <AnimatePresence>
        {toast && <Toast name={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '64px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <Link to='/' style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}> Crystal Coffee</Link>
        <Link to='/' style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>← Back to home</Link>
      </nav>

      {/* Hero */}
      <section style={{ background: 'var(--text)', padding: '120px 48px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
            Coffee Club
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>
            We don't charge you<br />for loyalty.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.7, marginBottom: '48px', maxWidth: '560px', margin: '0 auto 48px' }}>
            $2/month goes directly to a NYC cause you choose. We keep nothing. For every 10 drinks, you get one free.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}>
            <button onClick={() => setModalOpen(true)} style={{ fontSize: '15px', fontWeight: 500, padding: '16px 40px', borderRadius: '100px', background: '#fff', color: 'var(--text)', border: 'none', cursor: 'pointer', marginBottom: '14px' }}>
              Join for $2/month
            </button>
            <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>Cancel anytime · 100% goes to your cause</div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 48px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>How it works</div>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}>Simple. No app. No login.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>
                <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.1em', marginBottom: '12px' }}>{s.step}</div>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.01em', marginBottom: '8px' }}>{s.title}</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Choose your cause */}
      <section style={{ padding: '0 48px 100px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Your $2 goes to</div>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}>Choose your cause.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '48px' }}>
            {causes.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{c.category}</div>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500, marginBottom: '6px' }}>{c.name}</div>
                  <div style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 48px', background: 'var(--text)', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', color: '#fff', marginBottom: '16px' }}>$2 a month.<br />10 drinks. 1 free. Real impact.</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, marginBottom: '36px' }}>No app. No password. Just your email and your cause.</p>
          <button onClick={() => setModalOpen(true)} style={{ fontSize: '15px', fontWeight: 500, padding: '16px 40px', borderRadius: '100px', background: '#fff', color: 'var(--text)', border: 'none', cursor: 'pointer' }}>
            Join for $2/month
          </button>
          <div style={{ marginTop: '14px', fontSize: '12.5px', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>Cancel anytime</div>
        </div>
      </section>

      {modalOpen && <SignupModal onClose={() => setModalOpen(false)} onSuccess={(name) => { setModalOpen(false); setToast(name) }} />}
    </div>
  )
}