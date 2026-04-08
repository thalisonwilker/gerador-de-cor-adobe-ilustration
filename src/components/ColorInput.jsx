import { motion } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'
import './ColorInput.css'

export default function ColorInput({ entry, onUpdate, onRemove }) {
  return (
    <motion.div
      className="color-input-row glass"
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35 }}
    >
      <input
        type="color"
        className="picker"
        value={entry.hex}
        onChange={e => onUpdate(entry.id, 'hex', e.target.value)}
      />

      <input
        type="text"
        className="field hex-field"
        placeholder="#RRGGBB"
        value={entry.hex}
        onChange={e => onUpdate(entry.id, 'hex', e.target.value)}
      />

      <span className="label-cmyk">CMYK</span>

      <input
        type="text"
        className="field cmyk-field"
        placeholder="C, M, Y, K (opcional)"
        value={entry.cmyk}
        onChange={e => onUpdate(entry.id, 'cmyk', e.target.value)}
      />

      <button className="btn-icon" onClick={() => onRemove(entry.id)} title="Remover">
        <FiTrash2 size={16} />
      </button>
    </motion.div>
  )
}
