'use client'

import { useMemo, useState } from 'react'
import {
  Beer,
  BookOpen,
  Candy,
  Check,
  Coffee,
  Compass,
  Crown,
  Footprints,
  Gem,
  MapPin,
  Clapperboard,
  Mountain,
  Palette,
  ShoppingBasket,
  Sparkles,
  WandSparkles,
  X,
  Scissors,
  Download,
} from 'lucide-react'

const dateIdeas = [
  { id: 'crafts', title: 'Crafts & making', detail: 'Glue, glitter, and questionable decisions', icon: Palette, color: 'peach' },
  { id: 'knitting', title: 'Knit something', detail: 'One scarf. Twelve emotional tangles.', icon: Scissors, color: 'lilac' },
  { id: 'hike', title: 'A proper hike', detail: 'Trees, snacks, and heroic complaints', icon: Mountain, color: 'sage' },
  { id: 'movie', title: 'Cozy movie night', detail: 'Blankets, snacks, and one very serious film debate', icon: Clapperboard, color: 'sky' },
  { id: 'errands', title: 'Running errands', detail: 'Romance is finding the shortest checkout line', icon: ShoppingBasket, color: 'lemon' },
  { id: 'lotr', title: 'Lord of the Rings', detail: 'Second breakfast is non-negotiable', icon: Crown, color: 'rose' },
  { id: 'fantasy', title: 'Fantasy adventure', detail: 'A quest, a tavern, perhaps a dragon', icon: WandSparkles, color: 'lilac' },
  { id: 'candy', title: 'Candy Crush duel', detail: 'Winner gets bragging rights forever', icon: Candy, color: 'peach' },
  { id: 'walk', title: 'A long city walk', detail: 'Wander until we find something good', icon: Footprints, color: 'sage' },
]

export default function Page() {
  const [selected, setSelected] = useState<string[]>([])
  const [confirmed, setConfirmed] = useState(false)
  const [shareStatus, setShareStatus] = useState('')

  const selectedIdeas = useMemo(
    () => dateIdeas.filter((idea) => selected.includes(idea.id)),
    [selected],
  )

  function toggleIdea(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
    setConfirmed(false)
  }

  function downloadDecision() {
    const choices = selectedIdeas.map((idea) => idea.title).join(', ') || 'an air of mystery'
    const escapedChoices = choices.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character] ?? character)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" rx="36" fill="#fffaf0"/><rect x="34" y="34" width="1132" height="732" rx="24" fill="none" stroke="#263238" stroke-width="3"/><text x="90" y="115" fill="#d96c4f" font-family="Georgia, serif" font-size="24" letter-spacing="4">DATE ROULETTE</text><text x="90" y="230" fill="#263238" font-family="Georgia, serif" font-size="64" font-weight="bold">OFFICIAL RESULTS</text><text x="90" y="300" fill="#263238" font-family="Arial, sans-serif" font-size="28">Excellent choices, Riley.</text><text x="90" y="395" fill="#737b7e" font-family="Arial, sans-serif" font-size="22">You selected</text><text x="90" y="440" fill="#263238" font-family="Arial, sans-serif" font-size="30" font-weight="bold">${escapedChoices}</text><line x1="90" y1="500" x2="1110" y2="500" stroke="#d9d1c1" stroke-width="2"/><text x="90" y="570" fill="#737b7e" font-family="Arial, sans-serif" font-size="22">Final destination</text><text x="90" y="625" fill="#d96c4f" font-family="Georgia, serif" font-size="42" font-weight="bold">Coffee or beer</text><text x="90" y="705" fill="#737b7e" font-family="Arial, sans-serif" font-size="18">No matter how fantastical the quest, it always ends with a drink. In Philadelphia.</text></svg>`
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1200
      canvas.height = 800
      const context = canvas.getContext('2d')
      if (!context) return
      context.drawImage(image, 0, 0)
      const link = document.createElement('a')
      link.download = 'date-roulette-results.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
      setShareStatus('Image downloaded — send it to Quinn!')
    }
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }

  return (
    <main className="app-shell">
      <div className="paper-texture" aria-hidden="true" />
      <header className="topbar">
        <div className="brand" aria-label="To Riley From Quinn"><span>To <strong>Riley</strong></span><span className="brand-mark"><img src="/riley.svg" alt="Riley" /></span><span>From <strong>Quinn</strong></span><span className="brand-mark"><img src="/quinn.svg" alt="Quinn" /></span></div>
        <div className="philly-pill"><MapPin size={14} /> Philadelphia, PA</div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-sticker"><Sparkles size={14} /> A very serious questionnaire</div>
        <p className="eyebrow">DATE APPLICATION // 001</p>
        <h1 id="page-title">What kind of<br /><em>adventure</em> are you feeling?</h1>
        <p className="hero-copy">Riley, please select the activities that sound fun.<br />We promise to respect your answers completely.</p>
      </section>

      <section className="date-card" aria-label="Date activity choices">
        <div className="card-heading">
          <div><span className="section-kicker">STEP ONE</span><h2>Pick your perfect date</h2></div>
          <span className="counter">{selected.length} selected</span>
        </div>
        <div className="idea-grid">
          {dateIdeas.map((idea) => {
            const Icon = idea.icon
            const isSelected = selected.includes(idea.id)
            return (
              <button key={idea.id} type="button" className={`idea-tile ${idea.color} ${isSelected ? 'is-selected' : ''}`} onClick={() => toggleIdea(idea.id)} aria-pressed={isSelected}>
                <span className="tile-icon"><Icon size={21} strokeWidth={1.8} /></span>
                <span className="tile-copy"><strong>{idea.title}</strong><small>{idea.detail}</small></span>
                <span className="check-circle">{isSelected && <Check size={13} strokeWidth={3} />}</span>
              </button>
            )
          })}
        </div>
        <div className="selection-note">
          <div className="note-icon"><BookOpen size={16} /></div>
          <p><strong>Pro tip:</strong> You can pick as many as you like. The more ambitious, the better.</p>
        </div>
        <button type="button" className="submit-button" onClick={() => setConfirmed(true)}>
          <span>Submit my highly considered choices</span><span className="button-arrow">→</span>
        </button>
      </section>

      {confirmed && (
        <div className="result-modal-backdrop" role="presentation" onClick={() => setConfirmed(false)}>
          <section className="result-card" role="dialog" aria-modal="true" aria-labelledby="results-title" aria-describedby="results-description" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="close-result" aria-label="Close official results" onClick={() => setConfirmed(false)}><X size={17} /></button>
          <div className="result-sparkle"><Sparkles size={18} /></div>
          <p className="section-kicker">OFFICIAL RESULTS</p>
          <h2 id="results-title">Excellent choices, Riley.</h2>
          <p id="results-description" className="result-lede">Your date has been approved by the committee of one.</p>
          <div className="result-receipt">
            <div className="receipt-row"><span>You selected</span><strong>{selected.length ? selectedIdeas.map((idea) => idea.title).join(', ') : 'an air of mystery'}</strong></div>
            <div className="receipt-line" />
            <div className="receipt-row final"><span>Final destination</span><strong><Coffee size={17} /> Coffee <i>or</i> <Beer size={17} /> beer</strong></div>
          </div>
          <p className="tiny-disclaimer">No matter how fantastical the quest, it always ends with us getting a drink. In Philadelphia. Probably soon.</p>
          <div className="result-badges"><span><Compass size={14} /> Good company guaranteed</span><span><Gem size={14} /> Snacks strongly implied</span></div>
          <button type="button" className="share-button" onClick={downloadDecision}><Download size={16} /> Download shareable result image</button>
          {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
          </section>
        </div>
      )}

      <footer><span>Made with questionable science &amp; genuine enthusiasm</span><span>♡ Date Roulette</span></footer>
    </main>
  )
}
