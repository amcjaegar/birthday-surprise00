import Ring from './Ring'
import { config } from '../config'

// Final celebration, shown on Page 4 after YES. The sparkles, petals and confetti
// are drawn by the <Particles mode="yes" /> layer that Storybook mounts on top.
export default function Celebration({ onRestart }) {
  const c = config.storybook.celebration
  return (
    <div className="celebration">
      <i className="golden-wash" />
      <div className="page-inner">
        <div className="stack">
          <Ring />
          <h2 className="yes-title">{c.title}</h2>
          {c.lines.map((line, i) => (
            <p className="yes-line" key={i} style={{ '--d': `${2.3 + i * 0.9}s` }}>{line}</p>
          ))}
          {onRestart && (
            <button className="ghost-btn replay-btn" onClick={onRestart} style={{ '--d': `${2.3 + c.lines.length * 0.9 + 0.6}s` }}>
              {c.replay}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
