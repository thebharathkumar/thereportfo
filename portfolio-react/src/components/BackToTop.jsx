import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      className="back-to-top"
      onClick={scrollToTop}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp size={24} />
    </motion.button>
  )
}

export default BackToTop
