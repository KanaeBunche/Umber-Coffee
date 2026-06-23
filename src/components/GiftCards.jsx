import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const amounts = [
  { value: 25, label: 'A week of mornings', gradient: 'linear-gradient(135deg, #2a2118 0%, #1a1408 100%)', accent: '#c8a97e' },
  { value: 50, label: 'Most popular', gradient: 'linear-gradient(135deg, #1a1f2e 0%, #0d1220 100%)', accent: '#7ea8c8', badge: true },
  { value: 100, label: 'The whole month', gradient: 'linear-gradient(135deg, #1c1a28 0%, #110f1e 100%)', accent: '#a87ec8' },
  { value: 0, label: 'Any amount', gradient: 'linear-gradient(135deg, #1a1f1a 0%, #0d130d 100%)', accent: '#7ec87e' },
]

function GiftCardModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(50)
  const [custom, setCustom] = useState('')
  const [form, setForm] = useState({ recipientName: '', recipientEmail: '', senderName: '', message: '' })
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [loading, setLoading] = useState(false)
  const [code] = useState('UMBER-' + Math.random().toString(36).substring(2, 8).toUpperCase())

  const amount = selected === 0 ? (parseFloat(custom) || 0) : selected
  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val) => val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/')

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(4) }, 2200)
  }

  const CloseBtn = () => (
    <button onClick={onClose} style={{ background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
  )

  const BackBtn = ({ to }) => (
    <button onClick={() => setStep(to)} style={{ background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
  )

  const currentCard = amounts.find(a => a.value === selected) || amounts[0]

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
        {step === 1 && (
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>Step 1 of 3</div>
                <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '24px', fontWeight: 500, letterSpacing: '-0.02em' }}>Choose an amount</h2>
              </div>
              <CloseBtn />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              {amounts.map((a, i) => (
                <div key={i} onClick={() => setSelected(a.value)} style={{
                  padding: '20px', borderRadius: '16px', cursor: 'pointer', textAlign: 'center',
                  border: selected === a.value ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: selected === a.value ? 'var(--card2)' : 'var(--card)',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '28px', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '4px' }}>
                    {a.value === 0 ? 'Custom' : `$${a.value}`}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>{a.label}</div>
                </div>
              ))}
            </div>

            {selected === 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Enter amount</div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: 'var(--muted)' }}>$</span>
                  <input
                    placeholder='0.00' value={custom}
                    onChange={e => setCustom(e.target.value.replace(/[^0-9.]/g, ''))}
                    style={{ width: '100%', padding: '13px 16px 13px 28px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode='wait'>
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: currentCard.gradient, borderRadius: '16px', padding: '24px',
                  marginBottom: '20px', position: 'relative', overflow: 'hidden', aspectRatio: '1.586',
                  boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
                }}
              >
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: currentCard.accent, opacity: 0.08, filter: 'blur(40px)' }} />
                <div style={{ fontSize: '10px', color: currentCard.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px', fontWeight: 500 }}>Umber Gift Card</div>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '44px', fontWeight: 500, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {amount > 0 ? `$${amount}` : '$—'}
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '24px', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>No expiry · Umber NYC</div>
                <div style={{ position: 'absolute', bottom: '20px', right: '24px', width: '32px', height: '32px', borderRadius: '50%', background: currentCard.accent, opacity: 0.3 }} />
              </motion.div>
            </AnimatePresence>

            <button onClick={() => amount > 0 && setStep(2)} style={{
              width: '100%', padding: '16px', background: amount > 0 ? 'var(--text)' : 'var(--border)',
              color: amount > 0 ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '100px',
              fontSize: '14px', fontWeight: 500, cursor: amount > 0 ? 'pointer' : 'not-allowed',
            }}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <BackBtn to={1} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Step 2 of 3</div>
                <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>Who's it for?</h2>
              </div>
              <CloseBtn />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: "Recipient's name", key: 'recipientName', placeholder: 'Jane Smith' },
                { label: "Recipient's email", key: 'recipientEmail', placeholder: 'jane@example.com' },
                { label: 'Your name', key: 'senderName', placeholder: 'From...' },
              ].map(f => (
                <div key={f.key}>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>{f.label}</div>
                  <input placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Personal message <span style={{ color: 'var(--border)' }}>· optional</span></div>
                <textarea placeholder='Enjoy your coffee! ☕' value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                  style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box', resize: 'none', lineHeight: 1.6 }} />
              </div>
            </div>
            <button onClick={() => form.recipientName && form.recipientEmail && form.senderName && setStep(3)} style={{
              width: '100%', padding: '16px',
              background: form.recipientName && form.recipientEmail && form.senderName ? 'var(--text)' : 'var(--border)',
              color: form.recipientName && form.recipientEmail && form.senderName ? '#fff' : 'var(--muted)',
              border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
              cursor: form.recipientName && form.recipientEmail && form.senderName ? 'pointer' : 'not-allowed',
            }}>Continue →</button>
          </div>
        )}

        {step === 3 && (
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <BackBtn to={2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Step 3 of 3</div>
                <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>Payment</h2>
              </div>
              <CloseBtn />
            </div>
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
                <span>Gift card for {form.recipientName}</span><span>${amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                <span>Delivered to</span><span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{form.recipientEmail}</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border)', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500 }}>
                <span>Total</span><span>${amount}.00</span>
              </div>
            </div>
            <button onClick={handlePay} disabled={loading} style={{
              width: '100%', padding: '16px', background: loading ? 'var(--muted)' : 'var(--text)', color: '#fff',
              border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                  Sending...
                </>
              ) : `Send $${amount} Gift Card`}
            </button>
            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>🔒 Secured by Stripe</div>
          </div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '48px 28px 56px', textAlign: 'center', position: 'relative' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '24px', background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
              style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 28px' }}>
              🎁
            </motion.div>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Gift Sent</div>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '26px', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              {form.recipientName} is going to love this.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, marginBottom: '36px' }}>
              A ${amount} gift card is on its way to<br />
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{form.recipientEmail}</strong>
            </p>
            <div style={{ background: currentCard.gradient, borderRadius: '16px', padding: '24px', marginBottom: '28px', textAlign: 'left', position: 'relative', overflow: 'hidden', aspectRatio: '1.586' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: currentCard.accent, opacity: 0.08, filter: 'blur(40px)' }} />
              <div style={{ fontSize: '10px', color: currentCard.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Gift Card Code</div>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '20px', fontWeight: 500, color: '#fff', letterSpacing: '0.06em', marginBottom: '8px' }}>{code}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Valid for ${amount} · No expiry · Umber NYC</div>
              {form.message && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                  "{form.message}"
                </div>
              )}
            </div>
            <button onClick={onClose} style={{ width: '100%', padding: '16px', background: 'var(--text)', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Done
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function GiftCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section id='gift-cards' style={{ background: 'var(--bg)', padding: '120px 48px' }}>
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '52px' }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}
            >
              <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
              Gift Cards
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '12px' }}
            >
              Give the gift<br />of good coffee.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.14 }}
              style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '340px' }}
            >
              Delivered instantly by email. No expiry. Redeemable in-store or online.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={() => setModalOpen(true)}
              style={{ fontSize: '14px', fontWeight: 500, padding: '14px 32px', borderRadius: '100px', background: 'var(--text)', color: '#fff', border: 'none', cursor: 'pointer', letterSpacing: '0.01em' }}
            >
              Send Gift Card
            </button>
          </motion.div>
        </div>

        {/* Gift card tiles */}
        <div className='gift-grid'>
          {amounts.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(i)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: a.gradient,
                borderRadius: '20px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '1.586',
                boxShadow: selected === i
                  ? `0 24px 60px rgba(0,0,0,0.2), 0 0 0 2px ${a.accent}55`
                  : hoveredIdx === i
                  ? '0 16px 40px rgba(0,0,0,0.15)'
                  : '0 8px 24px rgba(0,0,0,0.08)',
                transform: selected === i ? 'translateY(-6px)' : hoveredIdx === i ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Glow orb */}
              <div style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '140px', height: '140px', borderRadius: '50%',
                background: a.accent, opacity: selected === i ? 0.15 : 0.06,
                filter: 'blur(40px)', transition: 'opacity 0.3s',
              }} />

              {/* Selected check — top left */}
              {selected === i && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 300 }}
                  style={{
                    position: 'absolute', top: '12px', left: '12px',
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: a.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: '#fff',
                  }}
                >
                  ✓
                </motion.div>
              )}

              {/* Popular badge — top right, only shows when NOT selected */}
              {a.badge && selected !== i && (
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  fontSize: '8px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: a.accent, background: `${a.accent}20`, padding: '3px 8px', borderRadius: '100px',
                  border: `1px solid ${a.accent}40`,
                  whiteSpace: 'nowrap',
                }}>
                  Popular
                </div>
              )}

              {/* Card content — bottom left */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                <div style={{ fontSize: '9px', color: a.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px', fontWeight: 500 }}>Umber Coffee</div>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 500, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {a.value === 0 ? 'Custom' : `$${a.value}`}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px', fontWeight: 300 }}>{a.label}</div>
              </div>

              {/* Decorative circle */}
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '14px', fontSize: '12.5px', color: 'var(--muted)', fontWeight: 300 }}>
          Delivered to any email address in seconds.
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <GiftCardModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      <style>{`
        .gift-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) {
          .gift-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 480px) {
          .gift-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          #gift-cards { padding: 60px 16px !important; }
        }
      `}</style>
    </section>
  )
}