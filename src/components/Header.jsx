import { motion } from 'framer-motion'
import './Header.css'

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h1>
        <span className="gradient-text">Gerador de Paleta</span>
      </h1>
      <p>Cores do Adobe Illustrator → paleta pronta para copiar</p>
    </motion.header>
  )
}
