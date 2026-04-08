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
      <motion.span
        className="heart-float"
        animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        💜
      </motion.span>
      <h1>
        <span className="gradient-text">Gerador de Paleta</span>
      </h1>
      <p className="subtitle-love">Feito com amor, especialmente pra você, meu amor ✨</p>
      <p className="subtitle-desc">Cores do Illustrator → paleta pronta pra copiar</p>
    </motion.header>
  )
}
