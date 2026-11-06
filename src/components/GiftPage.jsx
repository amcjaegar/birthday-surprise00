import { useEffect, useRef, useState } from 'react'
import Particles from './Particles'
import { config } from '../config'

export default function GiftPage({ onOpenStart, onDone }) {
  const [opened, setOpened] = useState(false)
  const [burst, setBurst] = useState(0)
  const [videoOk, setVideoOk] = useState(true)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const open = () => {
    if (opened) return
    setOpened(true)
    onOpenStart?.()
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
    later(() => setBurst((b) => b + 1), 450)
    later(() => setBurst((b) => b + 1), 1100)
    later(onDone, 2300)
  }

  return (
    <main className={`scene gift-scene ${opened ? 'is-open' : ''}`}>
      <div className="gift-bg" />
      {videoOk && (
        <video
          className="bg-video"
          src={config.assets.background}
          autoPlay muted loop playsInline
          onError={() => setVideoOk(false)}
        />
      )}
      <div className="shade" />
      <Particles density={0.5} burstKey={burst} />

      <div className="gift-content">
        <p className="gift-text">{config.giftText}</p>

        <button className="gift" onClick={open} aria-label="Open your gift" tabIndex={-1}>
          <span className="gift-light" />
          <span className="gift-body" />
          <span className="gift-lid"><span className="bow" /></span>
        </button>

        <button className="glow-btn" onClick={open} disabled={opened}>
          {config.giftButton}
        </button>
      </div>
    </main>
  )
}
