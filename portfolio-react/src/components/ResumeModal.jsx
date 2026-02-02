import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'
import './ResumeModal.css'

const ResumeModal = ({ isOpen, onClose }) => {
  const resumes = [
    {
      title: 'Software Engineer',
      description: 'General SWE positions',
      icon: '💻',
      file: '/resumes/software-engineer-resume.pdf'
    },
    {
      title: 'Data Engineer',
      description: 'Data & analytics roles',
      icon: '📊',
      file: '/resumes/data-engineer-resume.pdf'
    },
    {
      title: 'ML/AI Engineer',
      description: 'Machine learning positions',
      icon: '🤖',
      file: '/resumes/ml-engineer-resume.pdf'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="resume-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="resume-modal-content"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>

            <h3 className="modal-title">Choose Resume Type</h3>

            <div className="resume-options">
              {resumes.map((resume, index) => (
                <motion.a
                  key={index}
                  href={resume.file}
                  download
                  className="resume-option"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="resume-icon">{resume.icon}</div>
                  <h4>{resume.title}</h4>
                  <p>{resume.description}</p>
                  <div className="download-indicator">
                    <Download size={20} /> Download
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal
