import { useEffect, useRef } from 'react'

const COLORS = ['#f6d7a8', '#f7b8d2', '#d9c2ff', '#fff3d6', '#e8c98a']
const GOLDS = ['#fff3d6', '#f6d7a8', '#e8c98a', '#ffe066', '#f2a516', '#f7b8d2']
const PETALS = ['#ffe066', '#ffd23f', '#f2a516', '#f7c948', '#ffb800']
const GOLD_CONFETTI = ['#ffe066', '#f2a516', '#e8c98a', '#fff3d6', '#ffffff', '#f7b8d2']
const GEMS = ['#ffffff', '#e6f7ff', '#bfe9ff', '#fff8dc']
const R = (a, b) => a + Math.random() * (b - a)
const pick = (a) => a[(Math.random() * a.length) | 0]

/**
 * One lightweight canvas for every effect.
 * mode "glitter"   -> endless falling glitter + twinkling stars
 * mode "celebrate" -> glitter + confetti + hearts + fireworks
 * mode "yes"       -> golden glitter + sparkling diamonds + sunflower petals + golden confetti
 * gold             -> use a warmer, golden palette for the glitter
 * burstKey         -> change this number to fire a burst of light from the centre
 */
export default function Particles({ mode = 'glitter', density = 1, burstKey = 0, gold = false }) {
  const canvas = useRef(null)
  const api = useRef({})

  useEffect(() => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const palette = gold || mode === 'yes' ? GOLDS : COLORS
    let w = 0, h = 0, raf, last = performance.now(), fw = 0, sp = 0, resizeRaf = 0
    let dpr = 1
    let ps = []
    const timers = []

    const resize = () => {
      const nw = window.innerWidth, nh = window.innerHeight
      if (nw === w && nh === h) return // ignore no-op resizes (e.g. mobile URL bar)
      w = nw; h = nh
      // phones: cap the pixel ratio so the canvas stays cheap (battery)
      dpr = Math.min(window.devicePixelRatio || 1, w < 600 ? 1.5 : 2)
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(resize)
    }
    resize()
    window.addEventListener('resize', onResize)

    const add = (p) => {
      if (ps.length < 700) ps.push({ t: 'dot', life: 1, decay: 0, rot: 0, vr: 0, g: 0, sway: 0, vx: 0, vy: 0, ph: R(0, 6), tw: R(2, 5), s: 2, c: pick(palette), ...p })
    }
    const glitter = (anywhere) =>
      add({
        t: Math.random() < 0.18 ? 'star' : 'dot',
        x: R(0, w), y: anywhere ? R(0, h) : -10,
        vy: R(0.4, 1.8), s: R(1, 4.2), sway: R(0.1, 0.7), fall: true,
      })
    const burst = (x, y, n = 80, decay = [0.008, 0.02]) => {
      for (let i = 0; i < n; i++) {
        const a = R(0, Math.PI * 2), v = R(1, 6)
        add({ t: Math.random() < 0.3 ? 'star' : 'spark', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 0.04, decay: R(...decay), s: R(1.5, 4) })
      }
    }
    const confetti = (colors) => {
      const n = w < 600 ? 80 : 140 // lighter on phones
      for (let i = 0; i < n; i++) {
        const left = i % 2 === 0
        add({
          t: 'rect', x: left ? 0 : w, y: h * 0.85,
          vx: (left ? 1 : -1) * R(2, 9), vy: -R(6, 17), g: 0.2, rot: R(0, 6), vr: R(-0.25, 0.25),
          decay: 0.004, s: R(5, 10), c: pick(colors || [...COLORS, '#ffffff', '#ff9ec7']),
        })
      }
    }

    // ---- "yes" effects ----
    const petal = (anywhere) =>
      add({
        t: 'petal', x: R(-20, w + 20), y: anywhere ? R(-20, h * 0.5) : -20,
        vx: R(-0.4, 0.4), vy: R(0.8, 2.1), sway: R(0.6, 1.5), rot: R(0, 6), vr: R(-0.05, 0.05),
        s: R(5, 9), decay: 0.0022, c: pick(PETALS),
      })
    const diamond = (x, y) =>
      add({ t: 'diamond', x, y, s: R(7, 16), decay: R(0.014, 0.026), c: pick(['#ffffff', '#fff8dc', '#bfe9ff']) })
    const gems = (n) => {
      for (let i = 0; i < n; i++) {
        const a = R(-Math.PI, 0), v = R(3, 9)
        add({ t: 'gem', x: w / 2, y: h * 0.4, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 0.13, rot: R(0, 6), vr: R(-0.12, 0.12), s: R(4, 8), decay: 0.0055, c: pick(GEMS) })
      }
    }
    const celebrateYes = () => {
      burst(w / 2, h * 0.4, w < 600 ? 70 : 120, [0.01, 0.024])
      gems(w < 600 ? 14 : 26)
      confetti(GOLD_CONFETTI)
      for (let i = 0; i < (w < 600 ? 16 : 30); i++) petal(true)
    }

    api.current = { burst, confetti, size: () => [w, h] }

    const max = Math.round((w < 600 ? 60 : 120) * density * (calm ? 0.4 : 1))
    for (let i = 0; i < max * 0.7; i++) glitter(true)
    if (mode === 'celebrate' && !calm) timers.push(setTimeout(() => confetti(), 500))
    if (mode === 'yes' && !calm) {
      timers.push(setTimeout(celebrateYes, 150))
      timers.push(setTimeout(() => { burst(w * 0.25, h * 0.3, 50); burst(w * 0.75, h * 0.35, 50); diamond(w / 2, h * 0.38) }, 1300))
    }

    const star = (x, y, r) => {
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const rad = i % 2 ? r * 0.28 : r * 1.8, a = (i * Math.PI) / 4
        ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad)
      }
      ctx.closePath(); ctx.fill()
    }
    // four-point diamond sparkle
    const sparkle = (x, y, r) => {
      ctx.beginPath()
      ctx.moveTo(x, y - r); ctx.lineTo(x + r * 0.22, y - r * 0.22); ctx.lineTo(x + r, y)
      ctx.lineTo(x + r * 0.22, y + r * 0.22); ctx.lineTo(x, y + r); ctx.lineTo(x - r * 0.22, y + r * 0.22)
      ctx.lineTo(x - r, y); ctx.lineTo(x - r * 0.22, y - r * 0.22)
      ctx.closePath(); ctx.fill()
    }

    const tick = (t) => {
      const dt = Math.min((t - last) / 16.7, 3)
      last = t
      ctx.clearRect(0, 0, w, h)

      if (ps.length < max && Math.random() < 0.55 * dt) glitter(false)
      if (mode === 'celebrate' && !calm) {
        if (Math.random() < 0.035 * dt)
          add({ t: 'heart', x: R(0, w), y: h + 20, vy: -R(0.6, 1.6), sway: R(0.3, 0.9), s: R(12, 28), decay: 0.0015, c: pick(['#f7b8d2', '#ff8fb8', '#f6d7a8']) })
        fw += dt
        if (fw > 80) { fw = 0; burst(R(w * 0.15, w * 0.85), R(h * 0.1, h * 0.45), 40, [0.01, 0.022]) }
      }
      if (mode === 'yes' && !calm) {
        // endless gentle sunflower petals + twinkling diamonds + an occasional golden burst
        if (Math.random() < (w < 600 ? 0.12 : 0.2) * dt) petal(false)
        if (Math.random() < 0.09 * dt) diamond(R(w * 0.05, w * 0.95), R(h * 0.05, h * 0.9))
        sp += dt
        if (sp > 150) { sp = 0; burst(R(w * 0.15, w * 0.85), R(h * 0.1, h * 0.45), 34, [0.012, 0.026]) }
      }

      ps = ps.filter((p) => {
        p.x += p.vx * dt + (p.sway ? Math.sin(t / 800 + p.ph) * p.sway * dt : 0)
        p.y += p.vy * dt
        p.vy += p.g * dt
        p.vx *= p.g ? 0.992 : 1
        p.rot += p.vr * dt
        if (p.fall) {
          if (p.y > h + 10) { p.y = -10; p.x = R(0, w) }
        } else {
          p.life -= p.decay * dt
          if (p.life <= 0 || p.y > h + 40) return false
        }
        ctx.globalAlpha = p.fall ? 0.5 + 0.5 * Math.sin((t / 1000) * p.tw + p.ph) : Math.max(p.life, 0)
        ctx.fillStyle = p.c
        if (p.t === 'rect') {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore()
        } else if (p.t === 'heart') {
          ctx.font = `${p.s}px serif`; ctx.fillText('♥', p.x, p.y)
        } else if (p.t === 'star') {
          star(p.x, p.y, p.s)
        } else if (p.t === 'petal') {
          ctx.globalAlpha = Math.min(1, Math.max(p.life, 0) * 1.6)
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
          ctx.scale(1, 0.45 + 0.55 * Math.abs(Math.cos(t / 450 + p.ph)))
          ctx.beginPath(); ctx.ellipse(0, 0, p.s * 1.6, p.s * 0.7, 0, 0, 6.3); ctx.fill()
          ctx.restore()
        } else if (p.t === 'diamond') {
          // grows, shines, then fades: a sparkling diamond twinkle
          ctx.globalAlpha = 1
          sparkle(p.x, p.y, p.s * Math.sin(Math.PI * (1 - Math.max(p.life, 0))))
        } else if (p.t === 'gem') {
          ctx.globalAlpha = Math.min(1, p.life * 2)
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
          ctx.beginPath(); ctx.moveTo(0, -p.s); ctx.lineTo(p.s * 0.7, 0); ctx.lineTo(0, p.s); ctx.lineTo(-p.s * 0.7, 0); ctx.closePath(); ctx.fill()
          ctx.restore()
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.3); ctx.fill()
        }
        return true
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf); cancelAnimationFrame(resizeRaf)
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', onResize)
    }
  }, [mode, density, gold])

  useEffect(() => {
    if (!burstKey || !api.current.burst) return
    const [w, h] = api.current.size()
    api.current.burst(w / 2, h * 0.48, 140, [0.01, 0.024])
  }, [burstKey])

  return <canvas ref={canvas} className="particles" aria-hidden="true" />
}
