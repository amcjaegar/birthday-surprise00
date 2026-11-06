import { useEffect, useRef, useState } from 'react'
import Particles from './Particles'
import Sunflower from './Sunflower'
import Proposal from './Proposal'
import Celebration from './Celebration'
import { config } from '../config'

const story = config.storybook
const TOTAL = story.pages.length + 1 // 3 story pages + 1 proposal page = exactly 4
const TURN_MS = 1200

function Decor({ v }) {
  return (
    <div className={`decor v${v}`} aria-hidden="true">
      <Sunflower className="sf sf-a" />
      <Sunflower className="sf sf-b" />
      {v === 3 && <Sunflower className="sf sf-c" />}
    </div>
  )
}

export default function Storybook({ onYes, onRestart }) {
  const [page, setPage] = useState(0) // 0,1,2 = story pages, 3 = the proposal page
  const [yes, setYes] = useState(false)
  const busy = useRef(false)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const turn = () => {
    if (busy.current || page >= TOTAL - 1) return
    busy.current = true
    setPage((p) => p + 1)
    timer.current = setTimeout(() => { busy.current = false }, TURN_MS + 100)
  }

  return (
    <main className={`scene story-scene ${yes ? 'is-yes' : ''}`}>
      <div className="dream-bg story-bg">
        <i className="orb o1" /><i className="orb o2" /><i className="orb o3" />
      </div>
      {!yes && <Particles gold density={0.55} />}

      <div className="story-stage">
        <div className="book" role="group" aria-label={`Storybook, page ${page + 1} of ${TOTAL}`}>
          {/* PAGE 4 — the proposal. Lives under the three leaves and is only mounted after Page 3 is turned. */}
          <section className="page page-base paper" aria-hidden={page !== TOTAL - 1}>
            <Decor v={3} />
            {page >= TOTAL - 1 && (yes ? <Celebration onRestart={onRestart} /> : <Proposal onYes={() => { setYes(true); onYes?.() }} />)}
            <span className="folio">{TOTAL} / {TOTAL}</span>
          </section>

          {/* PAGES 1–3 — leaves that turn one after another */}
          {story.pages.map((p, i) => {
            const turned = page > i
            const current = page === i
            return (
              <section
                key={i}
                className={`leaf ${turned ? 'turned' : ''} ${current ? 'current' : ''} ${page < i ? 'upcoming' : ''}`}
                style={{ zIndex: TOTAL - i }}
                aria-hidden={!current}
              >
                <div className="face front paper">
                  <Decor v={i} />
                  <div className="page-inner">
                    <div className="stack">
                      <p className="eyebrow reveal" style={{ '--d': '.35s' }}>{p.eyebrow}</p>
                      {p.text.map((t, k) => (
                        <p className={`story-line reveal ${k === 0 ? 'lead' : ''}`} style={{ '--d': `${0.65 + k * 0.9}s` }} key={k}>{t}</p>
                      ))}
                      <button
                        className="glow-btn story-btn reveal"
                        style={{ '--d': `${0.9 + p.text.length * 0.9}s` }}
                        onClick={turn}
                        disabled={!current}
                        tabIndex={current ? 0 : -1}
                      >
                        {p.button}
                      </button>
                    </div>
                  </div>
                  <span className="folio">{i + 1} / {TOTAL}</span>
                  <i className="turn-shade" />
                </div>
                <div className="face back paper" aria-hidden="true">
                  <Decor v="back" />
                </div>
              </section>
            )
          })}
        </div>
      </div>

      {yes && (
        <div className="fx-top" aria-hidden="true">
          <Particles mode="yes" gold density={1} />
        </div>
      )}
    </main>
  )
}
