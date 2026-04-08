import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiCopy } from 'react-icons/fi'
import { sfxCopy, sfxHover, sfxCheck, sfxUncheck } from '../sounds'
import { spawnKisses } from '../kisses'
import './ColorCard.css'

function copy(text, label, big) {
  sfxCopy()
  if (big) {
    spawnKisses(10)
    setTimeout(() => spawnKisses(8), 600)
    setTimeout(() => spawnKisses(6), 1200)
  } else {
    spawnKisses(3)
  }
  navigator.clipboard.writeText(text).then(() => {
    toast.success(big ? 'Todos os dados copiados!' : `${label} copiado!`, { duration: 1500, icon: '💋' })
  })
}

export default function ColorCard({ color, index, isSelected, onToggle }) {
  const { id, hex, rgb, cmyk } = color
  const rgbStr = `R=${rgb.r}  G=${rgb.g}  B=${rgb.b}`
  const hexStr = hex.toUpperCase()
  const cmykStr = `CMYK ${cmyk.c}  ${cmyk.m}  ${cmyk.y}  ${cmyk.k}`

  const allData = `R=${rgb.r} G=${rgb.g} B=${rgb.b}\n${hexStr}\nCMYK ${cmyk.c} ${cmyk.m} ${cmyk.y} ${cmyk.k}`

  return (
    <motion.div
      className={`card ${isSelected ? 'card--selected' : ''}`}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onHoverStart={sfxHover}
    >
      {/* Checkbox */}
      <label className="card-checkbox" title="Selecionar cor">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => { isSelected ? sfxUncheck() : sfxCheck(); onToggle(id) }}
        />
        <span className="card-checkmark" />
      </label>

      {/* Retângulo de cor — clica pra copiar TUDO */}
      <div
        className="card-swatch"
        style={{ background: hex }}
        onClick={() => copy(allData, 'Todos', true)}
        title="Clique para copiar todos os dados"
      >
        <span className="card-swatch-overlay">
          <FiCopy size={22} />
          <span className="overlay-label">Copiar tudo</span>
        </span>
      </div>

      {/* Info panel — clica em cada linha pra copiar individual */}
      <div className="card-info">
        <Row label="RGB" value={rgbStr} copyValue={`${rgb.r}, ${rgb.g}, ${rgb.b}`} />
        <Row label="HEX" value={hexStr} copyValue={hexStr} />
        <Row label="CMYK" value={cmykStr} copyValue={`${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`} />
      </div>
    </motion.div>
  )
}

function Row({ label, value, copyValue }) {
  return (
    <div className="info-row" onClick={() => copy(copyValue, label)} title={`Copiar ${label}`}>
      <span className="info-value">{value}</span>
      <FiCopy className="info-copy-icon" size={13} />
    </div>
  )
}
