import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menu = [
  { id: 1, name: 'Oat Latte', price: 6.50, category: 'Coffee', img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80&fit=crop' },
  { id: 2, name: 'Matcha Latte', price: 7.00, category: 'Coffee', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80&fit=crop' },
  { id: 3, name: 'Cold Brew', price: 6.00, category: 'Coffee', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80&fit=crop' },
  { id: 4, name: 'Cortado', price: 5.50, category: 'Coffee', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80&fit=crop' },
  { id: 5, name: 'Cappuccino', price: 5.75, category: 'Coffee', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80&fit=crop' },
  { id: 6, name: 'Butter Croissant', price: 4.50, category: 'Food', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80&fit=crop' },
  { id: 7, name: 'Blueberry Muffin', price: 4.00, category: 'Food', img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80&fit=crop' },
  { id: 8, name: 'Avocado Toast', price: 9.00, category: 'Food', img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&q=80&fit=crop' },
]

const milkOptions = ['Oat', 'Whole', 'Almond', 'Skim', 'None']
const sizeOptions = [{ label: 'S', price: 0 }, { label: 'M', price: 0.5 }, { label: 'L', price: 1 }]
const extraOptions = [
  { label: 'Extra Shot', price: 0.75 },
  { label: 'Vanilla', price: 0.5 },
  { label: 'Caramel', price: 0.5 },
  { label: 'No Sugar', price: 0 },
  { label: 'Extra Hot', price: 0 },
  { label: 'Oat Foam', price: 0.75 },
]
const times = ['8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:30 AM', '11:00 AM']
const categories = ['All', 'Coffee', 'Food']

function generateOrderNumber() {
  return '#' + Math.floor(1000 + Math.random() * 9000)
}

const CloseBtn = ({ onClose }) => (
  <button onClick={onClose} style={{
    marginLeft: 'auto', background: 'var(--card)', border: 'none', borderRadius: '50%',
    width: '36px', height: '36px', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>×</button>
)

export default function OrderModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [customizing, setCustomizing] = useState(null)
  const [milk, setMilk] = useState('Oat')
  const [size, setSize] = useState('M')
  const [selectedExtras, setSelectedExtras] = useState([])
  const [pickupTime, setPickupTime] = useState('8:45 AM')
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [tip, setTip] = useState(1)
  const [orderNumber] = useState(generateOrderNumber())

  const filteredMenu = activeCategory === 'All' ? menu : menu.filter(i => i.category === activeCategory)

  const itemTotal = (item) => {
    const sizePrice = sizeOptions.find(s => s.label === item.size)?.price || 0
    const extrasPrice = item.extras.reduce((s, e) => s + (extraOptions.find(x => x.label === e)?.price || 0), 0)
    return ((item.price + sizePrice + extrasPrice) * item.qty).toFixed(2)
  }

  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(itemTotal(item)), 0)
  const tipAmount = [0, 1, 2, 3][tip]
  const grandTotal = (cartTotal + tipAmount).toFixed(2)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const openCustomize = (item) => { setCustomizing(item); setMilk('Oat'); setSize('M'); setSelectedExtras([]) }
  const addToCart = () => { if (!customizing) return; setCart(prev => [...prev, { ...customizing, milk, size, extras: selectedExtras, qty: 1 }]); setCustomizing(null) }
  const updateQty = (index, delta) => setCart(prev => prev.map((item, i) => i === index ? { ...item, qty: item.qty + delta } : item).filter(i => i.qty > 0))
  const toggleExtra = (label) => setSelectedExtras(prev => prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label])
  const handlePay = () => { setLoading(true); setTimeout(() => { setLoading(false); setStep(4) }, 2200) }
  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val) => val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/')

  const headerRow = (title, backStep, subtitle) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
      {backStep && (
        <button onClick={() => setStep(backStep)} style={{ background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
      )}
      <div style={{ flex: 1 }}>
        {subtitle && <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>{subtitle}</div>}
        <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>{title}</h2>
      </div>
      <CloseBtn onClose={onClose} />
    </div>
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px', backdropFilter: 'blur(6px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg)', borderRadius: '24px', width: '100%',
            maxWidth: '560px', maxHeight: '85vh', overflowY: 'scroll',
            WebkitOverflowScrolling: 'touch', position: 'relative',
          }}
        >
          {/* ── STEP 1: MENU ── */}
          {step === 1 && (
            <div>
              <div style={{ position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10, padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Order Ahead</div>
                    <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>What are you having?</h2>
                  </div>
                  <CloseBtn onClose={onClose} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {categories.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)} style={{
                      padding: '6px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                      background: activeCategory === c ? 'var(--text)' : 'var(--card)',
                      color: activeCategory === c ? '#fff' : 'var(--muted)',
                      fontSize: '13px', fontWeight: 500, transition: 'all 0.2s',
                    }}>{c}</button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredMenu.map(item => {
                  const inCart = cart.filter(i => i.id === item.id).reduce((s, i) => s + i.qty, 0)
                  return (
                    <div key={item.id} onClick={() => openCustomize(item)} style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      background: inCart > 0 ? 'var(--card2)' : 'var(--card)',
                      border: inCart > 0 ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: '16px', padding: '12px 16px', cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                      <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '15px', fontWeight: 500, marginBottom: '2px' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>{item.category}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '15px', fontWeight: 500 }}>${item.price.toFixed(2)}</div>
                        {inCart > 0 && <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500, marginTop: '2px' }}>{inCart} added</div>}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{ padding: '0 24px 28px' }}>
                <button onClick={() => cart.length > 0 && setStep(2)} style={{
                  width: '100%', padding: '16px 24px', borderRadius: '100px', border: 'none',
                  background: cart.length > 0 ? 'var(--text)' : 'var(--border)',
                  color: cart.length > 0 ? '#fff' : 'var(--muted)',
                  fontSize: '14px', fontWeight: 500, cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s',
                }}>
                  <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '100px', padding: '2px 10px', fontSize: '13px' }}>{cartCount}</span>
                  <span>View Order</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: REVIEW ── */}
          {step === 2 && (
            <div style={{ padding: '20px 24px 32px' }}>
              {headerRow('Your order', 1, 'Step 2 of 3')}
              {cart.map((item, index) => (
                <div key={index} style={{ background: 'var(--card)', borderRadius: '16px', padding: '14px 16px', border: '1px solid var(--border)', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '15px', fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px', fontWeight: 300 }}>
                        {item.size} · {item.milk} milk{item.extras.length > 0 ? ` · ${item.extras.join(', ')}` : ''}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '15px', fontWeight: 500 }}>${itemTotal(item)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg)', borderRadius: '100px', padding: '4px 6px', border: '1px solid var(--border)' }}>
                      <button onClick={() => updateQty(index, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'var(--card)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <span style={{ fontSize: '14px', fontWeight: 500, minWidth: '16px', textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(index, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'var(--text)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>+</button>
                    </div>
                    <button onClick={() => updateQty(index, -item.qty)} style={{ fontSize: '12px', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              ))}

              <button onClick={() => setStep(1)} style={{ fontSize: '13px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, marginBottom: '24px', padding: 0 }}>+ Add more items</button>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>Pickup Time</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {times.map(t => (
                    <button key={t} onClick={() => setPickupTime(t)} style={{
                      padding: '10px 4px', border: pickupTime === t ? '2px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: '10px', background: pickupTime === t ? 'var(--card2)' : 'var(--card)',
                      fontSize: '12px', fontWeight: pickupTime === t ? 500 : 400, cursor: 'pointer', transition: 'all 0.2s',
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>Add a tip</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['No tip', '$1', '$2', '$3'].map((t, i) => (
                    <button key={t} onClick={() => setTip(i)} style={{
                      flex: 1, padding: '10px', border: tip === i ? '2px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: '12px', background: tip === i ? 'var(--card2)' : 'var(--card)',
                      fontSize: '13px', fontWeight: tip === i ? 500 : 400, cursor: 'pointer', transition: 'all 0.2s',
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--card)', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}><span>Tip</span><span>${tipAmount.toFixed(2)}</span></div>
                <div style={{ height: '1px', background: 'var(--border)', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', fontWeight: 500 }}><span>Total</span><span>${grandTotal}</span></div>
              </div>

              <button onClick={() => setStep(3)} style={{ width: '100%', padding: '16px', background: 'var(--text)', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* ── STEP 3: PAYMENT ── */}
          {step === 3 && (
            <div style={{ padding: '20px 24px 32px' }}>
              {headerRow('Payment', 2, 'Step 3 of 3')}

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
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Name on card</div>
                  <input placeholder='Jane Smith' value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Card number</div>
                  <input placeholder='4242 4242 4242 4242' value={card.number} onChange={e => setCard({ ...card, number: formatCard(e.target.value) })} style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box', letterSpacing: '0.05em' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>Expiry</div>
                    <input placeholder='MM/YY' value={card.expiry} onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })} style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>CVC</div>
                    <input placeholder='123' value={card.cvc} onChange={e => setCard({ ...card, cvc: e.target.value.slice(0, 3) })} style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px', background: 'var(--card)', outline: 'none', fontFamily: 'Inter, sans-serif', color: 'var(--text)', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--card)', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px', border: '1px solid var(--border)' }}>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>
                    <span>{item.qty}× {item.name}</span><span>${itemTotal(item)}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}><span>Tip</span><span>${tipAmount.toFixed(2)}</span></div>
                <div style={{ height: '1px', background: 'var(--border)', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500 }}><span>Total</span><span>${grandTotal}</span></div>
              </div>

              <button onClick={handlePay} disabled={loading} style={{
                width: '100%', padding: '16px', background: loading ? 'var(--muted)' : 'var(--text)',
                color: '#fff', border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                    Processing...
                  </>
                ) : `Pay $${grandTotal}`}
              </button>
              <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>🔒 Secured by Stripe</div>
            </div>
          )}

          {/* ── STEP 4: CONFIRMATION ── */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '48px 24px 56px', textAlign: 'center', position: 'relative' }}>
              <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '24px', background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 28px' }}
              >☕</motion.div>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Order Confirmed</div>
              <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '28px', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '8px' }}>You're all set.</h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6, marginBottom: '36px' }}>
                Your order will be ready at<br />
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{pickupTime}</strong> today.
              </p>
              <div style={{ background: 'var(--card)', borderRadius: '20px', padding: '24px', marginBottom: '32px', border: '1px solid var(--border)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Order</div>
                    <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '20px', fontWeight: 500 }}>{orderNumber}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Total</div>
                    <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '20px', fontWeight: 500 }}>${grandTotal}</div>
                  </div>
                </div>
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '16px' }} />
                {cart.map((item, i) => (
                  <div key={i} style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300, marginBottom: '4px' }}>
                    {item.qty}× {item.name} · {item.size} · {item.milk}
                  </div>
                ))}
                <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--muted)', fontWeight: 300 }}>📍 147 West 26th St, Chelsea</div>
              </div>
              <button onClick={onClose} style={{ width: '100%', padding: '16px', background: 'var(--text)', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Done</button>
            </motion.div>
          )}

          {/* ── CUSTOMIZE DRAWER ── */}
          <AnimatePresence>
            {customizing && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setCustomizing(null)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 24px' }}
              >
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                  onClick={e => e.stopPropagation()}
                  style={{ background: 'var(--bg)', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto', padding: '20px 24px 40px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '40px', height: '4px', background: 'var(--border)', borderRadius: '2px' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                    <img src={customizing.img} alt={customizing.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '12px' }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em' }}>{customizing.name}</h3>
                      <div style={{ fontSize: '13px', color: 'var(--muted)' }}>${customizing.price.toFixed(2)}</div>
                    </div>
                    <button onClick={() => setCustomizing(null)} style={{ background: 'var(--card)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                  </div>

                  {customizing.category === 'Coffee' && (
                    <>
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>Size</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {sizeOptions.map(s => (
                            <button key={s.label} onClick={() => setSize(s.label)} style={{
                              flex: 1, padding: '12px', border: size === s.label ? '2px solid var(--accent)' : '1px solid var(--border)',
                              borderRadius: '12px', background: size === s.label ? 'var(--card2)' : 'var(--card)',
                              fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                            }}>{s.label}{s.price > 0 ? ` +$${s.price}` : ''}</button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>Milk</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {milkOptions.map(m => (
                            <button key={m} onClick={() => setMilk(m)} style={{
                              padding: '8px 16px', border: milk === m ? '2px solid var(--accent)' : '1px solid var(--border)',
                              borderRadius: '100px', background: milk === m ? 'var(--card2)' : 'var(--card)',
                              fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
                            }}>{m}</button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: '28px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '10px' }}>Extras</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {extraOptions.map(e => (
                            <button key={e.label} onClick={() => toggleExtra(e.label)} style={{
                              padding: '8px 14px', border: selectedExtras.includes(e.label) ? '2px solid var(--accent)' : '1px solid var(--border)',
                              borderRadius: '100px', background: selectedExtras.includes(e.label) ? 'var(--card2)' : 'var(--card)',
                              fontSize: '12.5px', cursor: 'pointer', transition: 'all 0.2s',
                            }}>{e.label}{e.price > 0 ? ` +$${e.price}` : ''}</button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <button onClick={addToCart} style={{ width: '100%', padding: '16px', background: 'var(--text)', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                    Add to Order
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}