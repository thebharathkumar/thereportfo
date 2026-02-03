import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import './Publications.css'

const Publications = () => {
  const publications = [
    {
      title: 'Deep Learning for Plant Disease Classification',
      journal: 'Atlantis Highlights in Engineering, Springer Nature',
      date: 'Sep 2023',
      type: 'PEER-REVIEWED',
      description: 'Advanced deep learning techniques for accurate plant disease detection and classification.',
      link: 'https://www.atlantis-press.com/proceedings/icacecs-23/125995742'
    },
    {
      title: 'Driver Drowsiness Detection using AI',
      journal: 'International Journal of All Research Education and Scientific Methods (IJARESM)',
      date: 'Nov 2023',
      type: 'PEER-REVIEWED',
      description: 'Exploring AI-based techniques for detecting driver drowsiness and enhancing road safety by 90% through advanced detection methods.',
      link: 'https://www.ijaresm.com/sahasransu-mohanty'
    }
  ]

  return (
    <section className="publications" id="publications">
      <div className="container">
        <h2 className="section-title">PUBLICATIONS</h2>
        <div className="publications-grid">
          {publications.map((pub, index) => (
            <motion.a
              key={index}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <span className="pub-badge">{pub.type}</span>
              <h3 className="pub-title">{pub.title}</h3>
              <p className="pub-journal">{pub.journal} • {pub.date}</p>
              <p className="pub-description">{pub.description}</p>
              <div className="pub-link">
                <span>Read Publication</span>
                <ExternalLink size={18} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Publications
