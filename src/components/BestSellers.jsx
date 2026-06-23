import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const drinks = [
  {
    name: 'Oat Latte',
    desc: 'Double ristretto, steamed oat milk, light foam',
    price: '$6.50',
    img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80&fit=crop',
  },
  {
    name: 'Matcha Latte',
    desc: 'Ceremonial grade, oat milk, touch of vanilla',
    price: '$7.00',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80&fit=crop',
  },
  {
    name: 'Cold Brew',
    desc: '20-hour steep, black or over oat milk',
    price: '$6.00',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&fit=crop',
  },
  {
    name: 'Butter Croissant',
    desc: 'Baked daily, laminated dough, unsalted butter',
    price: '$4.50',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&fit=crop',
  },
  {
    name: 'Cortado',
    desc: 'Equal parts espresso and warm whole milk',
    price: '$5.50',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&fit=crop',
  },
  {
    name: 'Blueberry Muffin',
    desc: 'Wild blueberry, lemon zest, brown sugar crumb',
    price: '$4.00',
    img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80&fit=crop',
  },
]

export default function BestSellers() {
  const ref = useRef(null)
  const carouselRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    let isDown = false, startX, scrollLeft
    const down = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft }
    const leave = () => { isDown = false }
    const up = () => { isDown = false }
    const move = (e) => {
      if (!isDown) return
      e.preventDefault()
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5
    }
    el.addEventListener('mousedown', down)
    el.addEventListener('mouseleave', leave)
    el.addEventListener('mouseup', up)
    el.addEventListener('mousemove', move)
    return () => {
      el.removeEventListener('mousedown', down)
      el.removeEventListener('mouseleave', leave)
      el.removeEventListener('mouseup', up)
      el.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <section id='best-sellers' style={{ background: 'var(--bg)', padding: '120px 0 0 48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', paddingRight: '48px' }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}
            >
              Best Sellers
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              The regulars' order.
            </motion.h2>
          </div>
          <motion.a
            href='#'
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.02em', paddingBottom: '1px', borderBottom: '1px solid var(--border)' }}
          >
            Full menu →
          </motion.a>
        </div>
      </div>

      <div
        ref={carouselRef}
        style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '80px', paddingRight: '48px', scrollbarWidth: 'none', cursor: 'grab' }}
      >
        {drinks.map((drink, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 48px rgba(0,0,0,0.1)', transition: { duration: 0.4 } }}
            style={{
              flex: '0 0 260px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <img
                src={drink.img}
                alt={drink.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '20px 22px 22px' }}>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', fontWeight: 500, letterSpacing: '-0.015em', marginBottom: '4px' }}>{drink.name}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '16px', fontWeight: 300 }}>{drink.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{drink.price}</span>
                <button style={{
                  width: '30px', height: '30px', borderRadius: '50%', background: 'var(--text)',
                  color: '#fff', border: 'none', fontSize: '18px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 300
                }}>+</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #best-sellers {
            padding-left: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}