import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiCopy } from 'react-icons/fi'
import './ColorCard.css'

function copy(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(`${label} copiado!`, { duration: 1500, icon: '📋' })
  })
}

export default function ColorCard({ color, index }) {
  const { hex, rgb, cmyk } = color
  const rgbStr = `R=${rgb.r}  G=${rgb.g}  B=${rgb.b}`
  const hexStr = hex.toUpperCase()
  const cmykStr = `CMYK ${cmyk.c}  ${cmyk.m}  ${cmyk.y}  ${cmyk.k}`

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Retângulo de cor */}
      <div
        className="card-swatch"
        style={{ background: hex }}
        onClick={() => copy(hexStr, 'HEX')}
        title="Clique para copiar HEX"
      >
        <span className="card-swatch-overlay">
          <FiCopy size={22} />
        </span>
      </div>

      {/* Info panel — glassmorphism */}
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
