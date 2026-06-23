import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const PASSWORD = 'staff123'

const initialOrders = [
  { id: '#4822', items: ['Oat Latte · L · Oat', 'Butter Croissant'], time: '8:32 AM', customer: 'Sarah M.', status: 'pending' },
  { id: '#4823', items: ['Cold Brew · M · Black'], time: '8:34 AM', customer: 'James T.', status: 'pending' },
  { id: '#4824', items: ['Matcha Latte · M · Almond', 'Blueberry Muffin'], time: '8:35 AM', customer: 'Priya K.', status: 'pending' },
  { id: '#4825', items: ['Cortado · S'], time: '8:36 AM', customer: 'Alex R.', status: 'making' },
  { id: '#4826', items: ['Cappuccino · L · Oat', 'Avocado Toast'], time: '8:38 AM', customer: 'Dana W.', status: 'pending' },
]

const initialInventory = [
  { name: 'Oat Milk', level: 'Low', checked: false, color: '#d97a4a' },
  { name: 'Whole Milk', level: 'OK', checked: true, color: '#4a9e6a' },
  { name: 'Espresso Beans', level: 'Low', checked: false, color: '#d97a4a' },
  { name: 'Matcha Powder', level: 'OK', checked: true, color: '#4a9e6a' },
  { name: 'Croissants', level: 'Medium', checked: false, color: '#e0a050' },
  { name: 'Almond Milk', level: 'OK', checked: true, color: '#4a9e6a' },
  { name: 'Cups (12oz)', level: 'Medium', checked: false, color: '#e0a050' },
  { name: 'Cold Brew Concentrate', level: 'OK', checked: true, color: '#4a9e6a' },
]

function LoginGate({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      if (password === PASSWORD) {
        onLogin()
      } else {
        setError(true)
        setLoading(false)
        setTimeout(() => setError(false), 2000)
      }
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '24px', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', marginBottom: '8px' }}>Umber</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>Staff Dashboard</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 300, marginBottom: '20px' }}>Staff access only.</div>
          <div style={{ marginBottom: '16px' }}>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', padding: '14px 16px',
                border: error ? '1px solid #d97a4a' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', fontSize: '14px',
                background: 'rgba(255,255,255,0.06)',
                outline: 'none', fontFamily: 'Inter, sans-serif',
                color: '#fff', boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
            />
            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '12px', color: '#d97a4a', marginTop: '8px', fontWeight: 300 }}>
                Incorrect password.
              </motion.div>
            )}
          </div>
          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', padding: '14px', background: '#fff', color: 'var(--text)',
            border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#111', borderRadius: '50%' }} />
            ) : 'Clock In'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to='/' style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>← Back to site</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function Staff() {
  const [authed, setAuthed] = useState(false)
  const [orders, setOrders] = useState(initialOrders)
  const [inventory, setInventory] = useState(initialInventory)
  const [tab, setTab] = useState('orders')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const pendingCount = orders.filter(o => o.status === 'pending').length
  const makingCount = orders.filter(o => o.status === 'making').length
  const doneCount = orders.filter(o => o.status === 'done').length

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const toggleInventory = (i) => {
    setInventory(prev => prev.map((item, idx) => idx === i ? { ...item, checked: !item.checked } : item))
  }

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '64px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to='/' style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>Umber</Link>
          <span style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--card)', border: '1px solid var(--border)', padding: '2px 10px', borderRadius: '100px' }}>Staff</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4a9e6a' }} />
          <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 400, fontVariantNumeric: 'tabular-nums' }}>
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
        <button onClick={() => setAuthed(false)} style={{ fontSize: '13px', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', borderRadius: '100px', padding: '7px 18px', cursor: 'pointer' }}>
          Clock Out
        </button>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 48px 80px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.025em' }}>
            Good morning. Let's have a great shift.
          </h1>
        </motion.div>

        {/* Summary pills */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { label: 'Pending', count: pendingCount, color: '#e0a050' },
            { label: 'Making', count: makingCount, color: '#CBB89D' },
            { label: 'Done', count: doneCount, color: '#4a9e6a' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '100px', padding: '8px 16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: '13px', fontWeight: 500 }}>{s.count}</span>
              <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300 }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
          {[{ id: 'orders', label: 'Order Queue' }, { id: 'inventory', label: 'Inventory' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '8px 20px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              background: tab === t.id ? 'var(--bg)' : 'transparent',
              color: tab === t.id ? 'var(--text)' : 'var(--muted)',
              fontSize: '13px', fontWeight: tab === t.id ? 500 : 400,
              boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Order Queue */}
        {tab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: order.status === 'done' ? 0.45 : 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: order.status === 'making' ? 'var(--card2)' : 'var(--card)',
                      border: order.status === 'making' ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: '16px', padding: '20px 24px',
                      display: 'flex', alignItems: 'center', gap: '20px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Status dot */}
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                      background: order.status === 'done' ? '#4a9e6a' : order.status === 'making' ? 'var(--accent)' : '#e0a050',
                    }} />

                    {/* Order info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500 }}>{order.id}</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>{order.customer}</span>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 300, marginLeft: 'auto' }}>Pickup {order.time}</span>
                      </div>
                      {order.items.map((item, i) => (
                        <div key={i} style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>{item}</div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      {order.status === 'pending' && (
                        <button onClick={() => updateStatus(order.id, 'making')} style={{
                          padding: '8px 16px', borderRadius: '100px', border: 'none',
                          background: 'var(--text)', color: '#fff', fontSize: '12.5px', fontWeight: 500, cursor: 'pointer',
                        }}>Start</button>
                      )}
                      {order.status === 'making' && (
                        <button onClick={() => updateStatus(order.id, 'done')} style={{
                          padding: '8px 16px', borderRadius: '100px', border: 'none',
                          background: '#4a9e6a', color: '#fff', fontSize: '12.5px', fontWeight: 500, cursor: 'pointer',
                        }}>Mark Ready</button>
                      )}
                      {order.status === 'done' && (
                        <span style={{ fontSize: '12.5px', color: '#4a9e6a', fontWeight: 500 }}>✓ Ready</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Inventory */}
        {tab === 'inventory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {inventory.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => toggleInventory(i)}
                  style={{
                    background: item.checked ? 'var(--card2)' : 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px', padding: '18px 20px',
                    display: 'flex', alignItems: 'center', gap: '14px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                    border: item.checked ? 'none' : '1.5px solid var(--border)',
                    background: item.checked ? '#4a9e6a' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    {item.checked && (
                      <svg viewBox='0 0 12 12' fill='none' stroke='#fff' strokeWidth='2' width='10' height='10'>
                        <polyline points='2,6 5,9 10,3' />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px', textDecoration: item.checked ? 'line-through' : 'none', color: item.checked ? 'var(--muted)' : 'var(--text)' }}>{item.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }} />
                      <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>{item.level}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: '20px', fontSize: '12.5px', color: 'var(--muted)', fontWeight: 300 }}>
              {inventory.filter(i => i.checked).length} of {inventory.length} items checked
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}