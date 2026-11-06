import Particles from './Particles'
import { config } from '../config'

export default function BirthdayReveal({ onReplay }) {
  return (
    <main className="scene reveal-scene">
      <div className="dream-bg reveal-bg">
        <i className="orb o1" /><i className="orb o2" /><i className="orb o3" />
      </div>
      <Particles mode="celebrate" density={1.2} />

      <div className="reveal-content">
        <h1 className="happy">
          <span>{config.revealLine1}</span>
          <span>{config.revealLine2} <em className="emoji">{config.revealEmoji}</em></span>
        </h1>
        <p className="reveal-sub">{config.revealSubtitle}</p>
        <button className="ghost-btn" onClick={onReplay}>{config.replayLabel}</button>
      </div>
    </main>
  )
}
