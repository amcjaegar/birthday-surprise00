import { useEffect, useRef, useState } from 'react'
import Particles from './Particles'
import { config } from '../config'

const paragraphs = config.message.trim().split(/\n\s*\n/)

export default function MessagePage({ onSurprise }) {
  const scroller = useRef(null)
  const end = useRef(null)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const root = scroller.current
    // soft reveal of each paragraph as it enters
    const reveal = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { root, threshold: 0.15 }
    )
    root.querySelectorAll('.para').forEach((el) => reveal.observe(el))
    // the surprise button only appears once the very end is on screen
    const finish = new IntersectionObserver(([e]) => e.isIntersecting && setAtEnd(true), { root, threshold: 0.9 })
    finish.observe(end.current)
    return () => { reveal.disconnect(); finish.disconnect() }
  }, [])

  return (
    <main className="scene message-scene">
      <div className="dream-bg">
        <i className="orb o1" /><i className="orb o2" /><i className="orb o3" />
      </div>
      <Particles />

      <div className="scroller" ref={scroller}>
        <article className="letter">
          <h1 className="letter-title">{config.letterTitle}</h1>
          {paragraphs.map((p, i) => (
            <p className="para" key={i}>{p}</p>
          ))}
          <p className="para signature">{config.signature}</p>

          <div className="surprise-wrap" ref={end}>
            <button
              className={`glow-btn surprise ${atEnd ? 'show' : ''}`}
              onClick={onSurprise}
              disabled={!atEnd}
              tabIndex={atEnd ? 0 : -1}
            >
              {config.surpriseButton}
            </button>
          </div>
        </article>
      </div>

      {!atEnd && <div className="hint" aria-hidden="true">keep reading<span /></div>}
    </main>
  )
}
