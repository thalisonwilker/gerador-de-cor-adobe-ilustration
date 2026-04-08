import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import ColorInput from './components/ColorInput'
import ColorCard from './components/ColorCard'
import './App.css'

let nextId = 3

const defaultColors = [
  { id: 1, hex: '#11e9ff', cmyk: '58.6, 0, 10.18, 0' },
  { id: 2, hex: '#1535cc', cmyk: '93.09, 76.16, 0, 0' },
]

export default function App() {
  const [entries, setEntries] = useState(defaultColors)
  const [palette, setPalette] = useState([])

  const addEntry = useCallback(() => {
    setEntries(prev => [...prev, { id: nextId++, hex: '#6366f1', cmyk: '' }])
  }, [])

  const removeEntry = useCallback((id) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }, [])

  const updateEntry = useCallback((id, field, value) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }, [])

  const generate = useCallback(() => {
    const cards = entries
      .filter(e => /^#[0-9a-f]{6}$/i.test(e.hex.trim()))
      .map(e => {
        const hex = e.hex.trim()
        const rgb = hexToRgb(hex)
        let cmyk = null
        if (e.cmyk.trim()) {
          const p = e.cmyk.split(/[\s,]+/).map(Number)
          if (p.length === 4 && p.every(n => !isNaN(n))) {
            cmyk = { c: p[0], m: p[1], y: p[2], k: p[3] }
          }
        }
        if (!cmyk) cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
        return { id: e.id, hex, rgb, cmyk }
      })
    setPalette(cards)
  }, [entries])

  return (
    <>
      <Header />

      <section className="input-section glass">
        <h2>Escolha as cores mais lindas 🎨</h2>
        <p className="hint">Cole o HEX e opcionalmente o CMYK do Illustrator — cada cor conta uma história</p>
        <div className="entries">
          <AnimatePresence>
            {entries.map(e => (
              <ColorInput
                key={e.id}
                entry={e}
                onUpdate={updateEntry}
                onRemove={removeEntry}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="btn-row">
          <button className="btn btn-secondary" onClick={addEntry}>+ Adicionar Cor</button>
          <button className="btn btn-primary" onClick={generate}>Gerar Paleta</button>
        </div>
      </section>

      {palette.length > 0 && (
        <section className="palette-section">
          <h2>Nossa Paleta ❤️</h2>
          <div className="palette-grid">
            <AnimatePresence>
              {palette.map((c, i) => (
                <ColorCard key={c.id} color={c} index={i} />
              ))}
            </AnimatePresence>
          </div>
          <p className="palette-love-note">Cada cor aqui tem um pedacinho de nós dois 💕</p>
        </section>
      )}

      <footer className="footer">
        <p>Feito com 💜 especialmente para você meu amorzinho!</p>
        <p className="footer-sub">Você colore meu mundo de um jeito que nenhuma paleta consegue traduzir ✨</p>
      </footer>
    </>
  )
}

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 0, g: 0, b: 0 }
}

function rgbToCmyk(r, g, b) {
  const c1 = 1 - r / 255, m1 = 1 - g / 255, y1 = 1 - b / 255
  const k = Math.min(c1, m1, y1)
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
  const d = 1 - k
  return {
    c: +((c1 - k) / d * 100).toFixed(2),
    m: +((m1 - k) / d * 100).toFixed(2),
    y: +((y1 - k) / d * 100).toFixed(2),
    k: +(k * 100).toFixed(2),
  }
}
