import { useEffect, useRef, useState } from 'react'
import { config } from '../config'

const GAP = 14 // breathing room kept around text / YES button
const EDGE = 10 // distance kept from the page edge

/**
 * Page 4 content. The NO button dodges the pointer (desktop) or the finger (mobile).
 * It only ever lands inside the visible part of the page, and never on top of
 * anything marked with data-avoid (the title, the text, the YES button) or the music button.
 */
export default function Proposal({ onYes }) {
  const p = config.storybook.proposal
  const root = useRef(null)
  const noRef = useRef(null)
  const last = useRef(0)
  const raf = useRef(0)
  const [pos, setPos] = useState(null) // null = NO sits in the row; {x,y} = free, page-local px
  const [hole, setHole] = useState(null) // keeps the row from collapsing once NO leaves it

  const dodge = (from) => {
    const now = performance.now()
    if (now - last.current < 200) return
    const box = root.current?.getBoundingClientRect()
    const no = noRef.current?.getBoundingClientRect()
    if (!box || !no) return
    last.current = now

    const w = no.width, h = no.height
    const vw = window.innerWidth, vh = window.innerHeight
    const minX = Math.max(box.left, 0) + EDGE
    const maxX = Math.min(box.right, vw) - EDGE - w
    const minY = Math.max(box.top, 0) + EDGE
    const maxY = Math.min(box.bottom, vh) - EDGE - h
    if (maxX <= minX || maxY <= minY) return

    const avoid = [...root.current.querySelectorAll('[data-avoid]')]
    const music = document.querySelector('.music-btn')
    if (music) avoid.push(music)
    const zones = avoid.map((el) => {
      const r = el.getBoundingClientRect()
      return { l: r.left - GAP, t: r.top - GAP, r: r.right + GAP, b: r.bottom + GAP }
    })
    const clash = (x, y) => zones.some((z) => x < z.r && x + w > z.l && y < z.b && y + h > z.t)

    const px = from ? from.x : no.left + w / 2
    const py = from ? from.y : no.top + h / 2
    let best = null, bestD = -1
    const consider = (x, y) => {
      if (clash(x, y)) return
      const d = Math.hypot(x + w / 2 - px, y + h / 2 - py)
      if (d > bestD) { best = { x, y }; bestD = d }
    }
    for (let i = 0; i < 80; i++) consider(minX + Math.random() * (maxX - minX), minY + Math.random() * (maxY - minY))
    if (!best) {
      // very small screens: scan the whole visible page on a grid so NO always finds a free spot
      for (let i = 0; i <= 14; i++) for (let j = 0; j <= 14; j++) consider(minX + ((maxX - minX) * i) / 14, minY + ((maxY - minY) * j) / 14)
    }
    if (!best) return
    const target = { x: best.x - box.left, y: best.y - box.top }

    if (!pos) {
      // first dodge: pin NO exactly where it is, then glide to the new spot
      setHole({ w, h })
      setPos({ x: no.left - box.left, y: no.top - box.top })
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => { raf.current = requestAnimationFrame(() => setPos(target)) })
    } else {
      setPos(target)
    }
  }

  // Rotating the phone / resizing: put NO back in the row so the layout is always valid
  // (Height-only resizes, like the mobile URL bar hiding, are ignored unless NO ends up off screen.)
  useEffect(() => {
    let lastW = window.innerWidth
    const reset = () => { setPos(null); setHole(null) }
    const onResize = () => {
      const widthChanged = window.innerWidth !== lastW
      lastW = window.innerWidth
      const r = noRef.current?.getBoundingClientRect()
      const off = r && (r.bottom > window.innerHeight || r.right > window.innerWidth || r.left < 0 || r.top < 0)
      if (widthChanged || off) reset()
    }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf.current) }
  }, [])

  // Mouse: dodge as the cursor approaches (touch is handled on the button itself)
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !noRef.current) return
    const r = noRef.current.getBoundingClientRect()
    const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
    const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom)
    if (Math.hypot(dx, dy) < 90) dodge({ x: e.clientX, y: e.clientY })
  }

  const evade = (e) => {
    e.preventDefault()
    dodge(e.clientX !== undefined && e.clientX !== 0 ? { x: e.clientX, y: e.clientY } : null)
  }

  return (
    <div className="proposal" ref={root} onPointerMove={onMove}>
      <div className="page-inner">
        <div className="stack">
          <h2 className="p-title" data-avoid>{p.title}</h2>
          <p className="p-text" data-avoid>{p.text}</p>
          <div className="answers">
            <button className="glow-btn yes-btn" data-avoid onClick={onYes}>{p.yes}</button>
            {hole && <span className="no-hole" style={{ width: hole.w, height: hole.h }} aria-hidden="true" />}
            <button
              ref={noRef}
              className={`btn-no ${pos ? 'free' : ''}`}
              style={pos ? { left: pos.x, top: pos.y } : undefined}
              onPointerDown={evade}
              onClick={evade}
              onFocus={() => dodge(null)}
            >
              {p.no}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
