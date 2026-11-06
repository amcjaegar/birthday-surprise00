import { useRef, useState } from 'react'
import GiftPage from './components/GiftPage'
import MessagePage from './components/MessagePage'
import VideoModal from './components/VideoModal'
import BirthdayReveal from './components/BirthdayReveal'
import Storybook from './components/Storybook'
import { config } from './config'

export default function App() {
  const [scene, setScene] = useState('gift') // 'gift' | 'message' | 'reveal' | 'story'
  const [curtain, setCurtain] = useState(false)
  const [video, setVideo] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const audio = useRef(null)
  const resumeMusic = useRef(false)
  const yesAudio = useRef(null)
  const yesActive = useRef(false) // true while the YES song owns the music button
  const resumeAfterYes = useRef(false)

  // Soft light-curtain between scenes
  const go = (next) => {
    setCurtain(true)
    setTimeout(() => setScene(next), 700)
    setTimeout(() => setCurtain(false), 950)
  }

  const playMusic = () =>
    audio.current?.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false))
  const pauseMusic = () => { audio.current?.pause(); setMusicOn(false) }
  const toggleMusic = () => {
    // while the YES song is the current track, the music button controls it
    if (yesActive.current && yesAudio.current) {
      if (musicOn) { yesAudio.current.pause(); setMusicOn(false) }
      else yesAudio.current.play().then(() => setMusicOn(true)).catch(() => {})
      return
    }
    musicOn ? pauseMusic() : playMusic()
  }

  // She said YES: swap the birthday music for the celebration song (the click allows sound)
  const onYes = () => {
    const y = yesAudio.current
    if (!y) return
    resumeAfterYes.current = musicOn
    y.currentTime = 0
    y.play()
      .then(() => { yesActive.current = true; audio.current?.pause(); setMusicOn(true) })
      .catch(() => {}) // missing or blocked file: carry on silently
  }
  const stopYes = () => {
    const y = yesAudio.current
    if (y) { y.pause(); y.currentTime = 0 }
    yesActive.current = false
  }
  // the YES song finished: bring the birthday music back if it was playing before
  const yesEnded = () => {
    yesActive.current = false
    if (resumeAfterYes.current) playMusic(); else setMusicOn(false)
  }
  // "Watch it again": back to the very first page
  const restart = () => {
    stopYes()
    pauseMusic()
    go('gift')
  }

  // Background music pauses while the surprise video plays, then resumes
  const openVideo = () => {
    resumeMusic.current = musicOn
    if (musicOn) pauseMusic()
    setVideo(true)
  }
  const closeVideo = (finished) => {
    setVideo(false)
    if (resumeMusic.current) playMusic()
    if (finished) go('reveal')
  }

  return (
    <div className="app">
      <audio ref={audio} src={config.assets.music} loop preload="none" />
      <audio ref={yesAudio} src={config.assets.yesMusic} preload="none" onEnded={yesEnded} />

      {scene === 'gift' && (
        <GiftPage
          onOpenStart={() => config.startMusicOnGiftOpen && playMusic()}
          onDone={() => go('message')}
        />
      )}
      {scene === 'message' && <MessagePage onSurprise={openVideo} />}
      {scene === 'reveal' && <BirthdayReveal onReplay={() => go('story')} />}
      {scene === 'story' && <Storybook onYes={onYes} onRestart={restart} />}

      <VideoModal open={video} onClose={closeVideo} />

      <button
        className={`music-btn ${musicOn ? 'on' : ''}`}
        onClick={toggleMusic}
        aria-label={musicOn ? 'Pause music' : 'Play music'}
        aria-pressed={musicOn}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" />
        </svg>
        {!musicOn && <i className="slash" />}
      </button>

      <div className={`curtain ${curtain ? 'show' : ''}`} aria-hidden="true" />
    </div>
  )
}
