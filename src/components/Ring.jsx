// Engagement ring reveal. Pure SVG + CSS (transform/opacity only, so it stays light on phones).
const SPARKS = [[56, 16, 1], [146, 16, 0.8], [26, 62, 0.65], [176, 70, 0.75], [100, 4, 0.9], [168, 150, 0.55], [30, 146, 0.6]]

export default function Ring() {
  return (
    <div className="ring-stage" aria-hidden="true">
      <i className="ring-halo" />
      <svg className="ring-svg" viewBox="0 0 200 200" focusable="false">
        <defs>
          <linearGradient id="rg-band" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff1c1" />
            <stop offset=".45" stopColor="#e8b84a" />
            <stop offset="1" stopColor="#a8741b" />
          </linearGradient>
          <linearGradient id="rg-gem" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".5" stopColor="#bfe9ff" />
            <stop offset="1" stopColor="#7fb8e6" />
          </linearGradient>
        </defs>
        {/* band */}
        <circle cx="100" cy="128" r="50" fill="none" stroke="url(#rg-band)" strokeWidth="11" />
        <circle cx="100" cy="128" r="44.5" fill="none" stroke="#fff6d8" strokeOpacity=".55" strokeWidth="1.6" />
        <circle cx="100" cy="128" r="55.5" fill="none" stroke="#8a5a14" strokeOpacity=".35" strokeWidth="1.2" />
        {/* setting + diamond */}
        <path d="M84 66 L116 66 L110 82 L90 82 Z" fill="url(#rg-band)" />
        <g className="gem">
          <path d="M80 28 L120 28 L136 46 L100 84 L64 46 Z" fill="url(#rg-gem)" stroke="#fff" strokeOpacity=".9" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M64 46 H136 M80 28 L90 46 L100 84 L110 46 L120 28 M90 46 L100 28 L110 46" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="1" />
        </g>
        {/* twinkles */}
        {SPARKS.map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <path className="tw" style={{ '--i': i }} d="M0 -11 L2.6 -2.6 L11 0 L2.6 2.6 L0 11 L-2.6 2.6 L-11 0 L-2.6 -2.6 Z" fill="#fff8dc" />
          </g>
        ))}
      </svg>
    </div>
  )
}
