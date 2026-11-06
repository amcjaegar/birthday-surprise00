import { useId } from 'react'

// Decorative sunflower (static SVG, no images needed).
const PETALS = Array.from({ length: 16 }, (_, i) => i * 22.5)
// Sunflower seed spiral (golden angle)
const SEEDS = Array.from({ length: 55 }, (_, i) => {
  const a = i * 2.399963
  const r = 3.7 * Math.sqrt(i + 0.5)
  return [+(Math.cos(a) * r).toFixed(1), +(Math.sin(a) * r).toFixed(1)]
})

export default function Sunflower({ className = '' }) {
  // unique ids: several sunflowers are on screen at once, and duplicate ids can break gradients
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const core = `sf-core-${uid}`, petal = `sf-petal-${uid}`
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={core} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#8a5320" />
          <stop offset=".6" stopColor="#5a2f10" />
          <stop offset="1" stopColor="#331807" />
        </radialGradient>
        <linearGradient id={petal} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe066" />
          <stop offset="1" stopColor="#f2a516" />
        </linearGradient>
      </defs>
      <g fill="#f2a516" opacity=".92">
        {PETALS.map((a) => <ellipse key={a} cx="0" cy="-64" rx="13" ry="35" transform={`rotate(${a})`} />)}
      </g>
      <g fill={`url(#${petal})`}>
        {PETALS.map((a) => <ellipse key={a} cx="0" cy="-58" rx="12" ry="31" transform={`rotate(${a + 11.25})`} />)}
      </g>
      <circle r="35" fill={`url(#${core})`} />
      <g fill="#d99a45" opacity=".75">
        {SEEDS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}
      </g>
    </svg>
  )
}
