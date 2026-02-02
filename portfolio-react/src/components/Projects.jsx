import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'Community Engagement Platform',
      description: 'Full-stack mobile app for 1,000+ users across iOS and Android',
      highlights: ['1,000 users', 'iOS & Android', 'Admin portal'],
      tags: ['Flutter', 'Dart', 'PostgreSQL', 'AWS'],
      featured: false
    },
    {
      title: 'COVID-19 Sentiment Analysis',
      description: 'End-to-end ML application with real-time predictions',
      highlights: ['90% accuracy', 'Real-time', 'NLP pipeline'],
      tags: ['Python', 'Flask', 'NLP', 'Scikit-learn'],
      featured: false
    },
    {
      title: 'Plant Disease Classification',
      description: 'Published CNN research for automated disease detection',
      highlights: ['Peer-reviewed', 'CNN', 'Agriculture'],
      tags: ['Python', 'TensorFlow', 'Computer Vision'],
      featured: true
    }
  ]

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring' }}
        >
          FEATURED PROJECTS
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`project-card card ${project.featured ? 'featured' : ''}`}
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              {project.featured && <div className="featured-badge">PUBLISHED</div>}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="highlights">
                {project.highlights.map((h, i) => (
                  <span key={i} className="highlight">{h}</span>
                ))}
              </div>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" className="btn btn-primary">
                  <Github size={20} /> Code
                </a>
                <a href="#" className="btn btn-secondary">
                  <ExternalLink size={20} /> Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
