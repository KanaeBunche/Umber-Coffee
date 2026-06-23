import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const PASSWORD = 'umber123'

const metrics = [
  { label: 'Orders Today', target: 324, prefix: '', change: '↑ 12% vs yesterday' },
  { label: 'Revenue Today', target: 2645, prefix: '$', change: '↑ 8% vs yesterday' },
  { label: 'Club Members', target: 1286, prefix: '', change: '↑ 4 new today' },
  { label: 'Avg Order Value', target: 8.12, prefix: '$', decimal: true, change: '↑ $0.42 vs last week' },
]

const barData = [68, 74, 62, 81, 88, 95, 72]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const alerts = [
  { name: 'Oat Milk', level: 'Low', color: '#d97a4a' },
  { name: 'Espresso Beans', level: 'Low', color: '#d97a4a' },
  { name: 'Croissants', level: 'Medium', color: '#e0a050' },
  { name: 'Matcha Powder', level: 'OK', color: '#4a9e6a' },
]

const topDrinks = [
  { name: 'Oat Latte', orders: 98, pct: 100 },
  { name: 'Cold Brew', orders: 74, pct: 76 },
  { name: 'Matcha Latte', orders: 61, pct: 62 },
  { name: 'Cortado', orders: 48, pct: 49 },
  { name: 'Cappuccino', orders: 43, pct: 44 },
]

const recentOrders = [
  { id: '#4821', item: 'Oat Latte · L · Oat', time: '2 min ago', amount: '$7.50', status: 'Ready' },
  { id: '#4820', item: 'Cold Brew · M · Black', time: '5 min ago', amount: '$6.00', status: 'Ready' },
  { id: '#4819', item: 'Matcha Latte · M · Almond', time: '8 min ago', amount: '$7.50', status: 'Picked up' },
  { id: '#4818', item: 'Cortado · S', time: '11 min ago', amount: '$5.50', status: 'Picked up' },
  { id: '#4817', item: '2× Butter Croissant', time: '14 min ago', amount: '$9.00', status: 'Picked up' },
]

function useCountUp(target, decimal, inView) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(ease * target)
      if (progress < 1) requestAnimationFrame(animate)
      else setValue(target)
    }
    requestAnimationFrame(animate)
  }, [inView, target])
  return decimal ? value.toFixed(2) : Math.floor(value).toLocaleString()
}

function MetricCard({ metric, delay, inView }) {
  const displayed = useCountUp(metric.target, metric.decimal, inView)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}
    >
      <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{metric.label}</div>
      <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '36px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px' }}>
        {metric.prefix}{displayed}
      </div>
      <div style={{ fontSize: '11.5px', color: '#4a9e6a', fontWeight: 400 }}>{metric.change}</div>
    </motion.div>
  )
}

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
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>Owner Dashboard</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 300, marginBottom: '20px' }}>Enter your password to continue.</div>

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
                color: '#fff', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '12px', color: '#d97a4a', marginTop: '8px', fontWeight: 300 }}>
                Incorrect password. Try again.
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
            ) : 'Enter Dashboard'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to='/' style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>← Back to site</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [barsVisible, setBarsVisible] = useState(false)
  const barsRef = useRef(null)
  const inView = authed

  useEffect(() => {
    if (!authed) return
    const timer = setTimeout(() => setBarsVisible(true), 600)
    return () => clearTimeout(timer)
  }, [authed])

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />

  return (
    <div style={{ background: 'var(--card)', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '64px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(242,238,234,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to='/' style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>Umber</Link>
          <span style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--bg)', border: '1px solid var(--border)', padding: '2px 10px', borderRadius: '100px', fontWeight: 400 }}>Owner</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4a9e6a' }} />
          <span style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: 300 }}>Live · {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        </div>
        <button onClick={() => setAuthed(false)} style={{ fontSize: '13px', color: 'var(--muted)', background: 'none', border: '1px solid var(--border)', borderRadius: '100px', padding: '7px 18px', cursor: 'pointer' }}>Sign out</button>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 48px 80px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Good morning</div>
          <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1 }}>Your shop, at a glance.</h1>
        </motion.div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {metrics.map((m, i) => <MetricCard key={i} metric={m} delay={i * 0.08} inView={inView} />)}
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>

          {/* Bar chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '24px' }}>Revenue · Last 7 days</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
              {barData.map((pct, i) => (
                <div key={i} style={{ flex: 1, height: '100%', background: 'var(--border)', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'var(--accent)', borderRadius: '6px',
                    height: barsVisible ? `${pct}%` : '0%',
                    transition: `height 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              {days.map(d => <span key={d} style={{ fontSize: '11px', color: 'var(--muted)' }}>{d}</span>)}
            </div>
          </motion.div>

          {/* Inventory alerts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>Inventory Alerts</div>
            {alerts.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 0', borderBottom: i < alerts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: '13px' }}>{a.name}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>{a.level}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          {/* Top drinks */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.44 }}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '20px' }}>Top Drinks Today</div>
            {topDrinks.map((d, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 400 }}>{d.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>{d.orders} orders</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: 'var(--accent)', borderRadius: '2px',
                    width: barsVisible ? `${d.pct}%` : '0%',
                    transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`
                  }} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Recent orders */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>Recent Orders</div>
            {recentOrders.map((o, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < recentOrders.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{o.id}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>{o.item}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{o.amount}</div>
                  <div style={{ fontSize: '11px', color: o.status === 'Ready' ? '#4a9e6a' : 'var(--muted)', fontWeight: 400 }}>{o.status}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}