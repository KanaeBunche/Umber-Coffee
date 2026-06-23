import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const categories = ['All', 'Coffee', 'Matcha & Tea', 'Cold', 'Food']

const items = [
  { id: 1, name: 'Espresso', desc: 'Double shot, pure and simple', price: 3.50, cal: 10, category: 'Coffee', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80&fit=crop' },
  { id: 2, name: 'Oat Latte', desc: 'Double ristretto, steamed oat milk, light foam', price: 6.50, cal: 180, category: 'Coffee', img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80&fit=crop' },
  { id: 3, name: 'Cortado', desc: 'Equal parts espresso and warm whole milk', price: 5.50, cal: 80, category: 'Coffee', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&fit=crop' },
  { id: 4, name: 'Cappuccino', desc: 'Espresso, steamed milk, thick microfoam', price: 5.75, cal: 120, category: 'Coffee', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80&fit=crop' },
  { id: 6, name: 'Americano', desc: 'Espresso diluted with hot water', price: 4.00, cal: 15, category: 'Coffee', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80&fit=crop' },
  { id: 7, name: 'Matcha Latte', desc: 'Ceremonial grade, oat milk, touch of vanilla', price: 7.00, cal: 200, category: 'Matcha & Tea', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80&fit=crop' },
  { id: 8, name: 'Hojicha Latte', desc: 'Roasted green tea, oat milk, naturally sweet', price: 6.75, cal: 170, category: 'Matcha & Tea', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80&fit=crop' },
  { id: 10, name: 'Cold Brew', desc: '20-hour steep, black or over oat milk', price: 6.00, cal: 20, category: 'Cold', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80&fit=crop' },
  { id: 11, name: 'Iced Oat Latte', desc: 'Espresso over ice, oat milk', price: 6.50, cal: 160, category: 'Cold', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80&fit=crop' },
  { id: 12, name: 'Iced Matcha', desc: 'Ceremonial matcha, oat milk, over ice', price: 7.00, cal: 180, category: 'Cold', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80&fit=crop' },
  { id: 13, name: 'Butter Croissant', desc: 'Baked daily, laminated dough, unsalted butter', price: 4.50, cal: 340, category: 'Food', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80&fit=crop' },
  { id: 14, name: 'Blueberry Muffin', desc: 'Wild blueberry, lemon zest, brown sugar crumb', price: 4.00, cal: 380, category: 'Food', img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80&fit=crop' },
  { id: 15, name: 'Avocado Toast', desc: 'Sourdough, smashed avocado, chili flake, sea salt', price: 9.00, cal: 420, category: 'Food', img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&q=80&fit=crop' },
  { id: 16, name: 'Raspberry Pie', desc: 'Oat flour, ripe banana, walnuts, dark chocolate', price: 4.50, cal: 310, category: 'Food', img: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&q=80&fit=crop' },
]

function SkeletonCard() {
  return (
    <div style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden' }}>
      <div style={{ height: '180px', background: 'linear-gradient(90deg, var(--border) 25%, var(--card) 50%, var(--border) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ height: '16px', background: 'var(--border)', borderRadius: '8px', marginBottom: '10px', width: '60%' }} />
        <div style={{ height: '12px', background: 'var(--border)', borderRadius: '6px', marginBottom: '6px' }} />
        <div style={{ height: '12px', background: 'var(--border)', borderRadius: '6px', width: '80%' }} />
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory)

  const handleAdd = (e, item) => {
    e.stopPropagation()
    setAdded(item.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (max-width: 900px) {
          .menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '64px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <Link to='/' style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>Crystal Coffee</Link>
        <Link to='/' style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>← Back</Link>
      </nav>

      <div style={{ paddingTop: '120px', paddingBottom: '60px', padding: '120px 48px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Menu</div>
          <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '16px' }}>
            Made to order.<br />Every time.
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, maxWidth: '400px' }}>
            Everything is made fresh. Order ahead and skip the wait.
          </p>
        </motion.div>
      </div>

      <div style={{ position: 'sticky', top: '64px', zIndex: 50, background: 'rgba(247,244,239,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{
              padding: '16px 24px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: '13.5px', fontWeight: activeCategory === c ? 500 : 400,
              color: activeCategory === c ? 'var(--text)' : 'var(--muted)',
              borderBottom: activeCategory === c ? '2px solid var(--text)' : '2px solid transparent',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 48px 100px' }}>
        {loading ? (
          <div className='menu-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>☕</div>
                  <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>Nothing here yet</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 300 }}>Check back soon.</div>
                </div>
              ) : (
                <div className='menu-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {filtered.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.09)', transition: { duration: 0.3 } }}
                      style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}
                    >
                      <div style={{ height: '180px', overflow: 'hidden' }}>
                        <motion.img
                          src={item.img}
                          alt={item.name}
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.6 }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      <div style={{ padding: '18px 20px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em' }}>{item.name}</div>
                          <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '15px', fontWeight: 500, flexShrink: 0, marginLeft: '8px' }}>${item.price.toFixed(2)}</div>
                        </div>
                        <div style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.5, marginBottom: '14px' }}>{item.desc}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: 300 }}>{item.cal} cal</span>
                          <motion.button
                            onClick={(e) => handleAdd(e, item)}
                            whileTap={{ scale: 0.92 }}
                            style={{
                              padding: '6px 14px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '12.5px', fontWeight: 500,
                              background: added === item.id ? '#4a9e6a' : 'var(--text)',
                              color: '#fff', transition: 'background 0.3s ease',
                            }}
                          >
                            {added === item.id ? '✓ Added' : '+ Add'}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}