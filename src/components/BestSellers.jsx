import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const drinks = [
  {
    name: 'Oat Latte',
    desc: 'Double ristretto, steamed oat milk, light foam',
    price: '$6.50',
    tag: 'Most ordered',
    img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80&fit=crop',
  },
  {
    name: 'Matcha Latte',
    desc: 'Ceremonial grade, oat milk, touch of vanilla',
    price: '$7.00',
    tag: 'Staff pick',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80&fit=crop',
  },
  {
    name: 'Cold Brew',
    desc: '20-hour steep, black or over oat milk',
    price: '$6.00',
    tag: null,
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&fit=crop',
  },
  {
    name: 'Butter Croissant',
    desc: 'Baked daily, laminated dough, unsalted butter',
    price: '$4.50',
    tag: 'Baked fresh',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&fit=crop',
  },
  {
    name: 'Cortado',
    desc: 'Equal parts espresso and warm whole milk',
    price: '$5.50',
    tag: null,
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&fit=crop',
  },
  {
    name: 'Blueberry Muffin',
    desc: 'Wild blueberry, lemon zest, brown sugar crumb',
    price: '$4.00',
    tag: null,
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
    const down = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; el.style.cursor = 'grabbing' }
    const leave = () => { isDown = false; el.style.cursor = 'grab' }
    const up = () => { isDown = false; el.style.cursor = 'grab' }
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
    <section id='best-sellers' style={{ background: 'var(--bg)', paddingTop: '120px', overflow: 'hidden' }}>

      {/* Header */}
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}
          >
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
            Best Sellers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            The regulars'<br />order.
          </motion.h2>
        </div>
        <motion.a
          href='/menu'
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0, paddingBottom: '2px', borderBottom: '1px solid var(--border)', transition: 'color 0.2s, border-color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          Full menu →
        </motion.a>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        style={{
          display: 'flex', gap: '16px',
          overflowX: 'auto', paddingLeft: '48px', paddingRight: '48px', paddingBottom: '100px',
          scrollbarWidth: 'none', cursor: 'grab',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {drinks.map((drink, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: '0 0 280px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            }}
            whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }}
          >
            {/* Image */}
            <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
              <motion.img
                src={drink.img}
                alt={drink.name}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.7 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Tag */}
              {drink.tag && (
                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#fff', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                  padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.12)',
                }}>
                  {drink.tag}
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '22px 24px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em' }}>{drink.name}</div>
                <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', fontWeight: 500, flexShrink: 0, marginLeft: '8px', color: 'var(--text)' }}>{drink.price}</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '20px', fontWeight: 300 }}>{drink.desc}</div>
              <button style={{
                width: '100%', padding: '11px', borderRadius: '100px',
                background: 'var(--text)', color: '#fff', border: 'none',
                fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                letterSpacing: '0.01em',
              }}>
                + Add to order
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        #best-sellers div::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          #best-sellers { padding-top: 80px; }
          #best-sellers > div:first-child { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}