import { useEffect, useRef, useState } from 'react'
import { config } from '../config'

export default function VideoModal({ open, onClose }) {
  const video = useRef(null)
  const [closing, setClosing] = useState(false)
  const [missing, setMissing] = useState(false)
  const [ratio, setRatio] = useState(16 / 9) // adapts to the real video, so portrait clips fit phones

  useEffect(() => {
    if (!open) return
    setClosing(false); setMissing(false)
    // user just clicked, so autoplay with sound is allowed
    const t = setTimeout(() => video.current?.play().catch(() => {}), 150)
    const esc = (e) => e.key === 'Escape' && onClose(false)
    window.addEventListener('keydown', esc)
    return () => { clearTimeout(t); window.removeEventListener('keydown', esc) }
  }, [open]) // eslint-disable-line

  if (!open) return null

  // Video finished (or placeholder missing): fade out, then show the big reveal
  const finish = () => {
    setClosing(true)
    setTimeout(() => onClose(true), 600)
  }

  return (
    <div className={`modal ${closing ? 'closing' : ''}`} role="dialog" aria-modal="true" aria-label="Surprise video">
      <div className="frame" style={{ '--r': ratio }}>
        {!missing ? (
          <video
            ref={video}
            src={config.assets.surprise}
            controls playsInline preload="auto"
            onEnded={finish}
            onLoadedMetadata={(e) => {
              const { videoWidth: vw, videoHeight: vh } = e.currentTarget
              if (vw && vh) setRatio(vw / vh)
            }}
            onError={() => setMissing(true)}
          />
        ) : (
          <div className="missing">
            <p>Your video isn’t here yet.</p>
            <small>Add it at public/assets/surprise-video.mp4</small>
            <button className="glow-btn small" onClick={finish}>Continue</button>
          </div>
        )}
        <button className="close" onClick={() => onClose(false)} aria-label="Close video">×</button>
      </div>
    </div>
  )
}
