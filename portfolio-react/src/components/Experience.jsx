import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase } from 'lucide-react'
import './Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const experiences = [
    {
      title: 'Graduate Assistant - AI Automation & Data Engineering',
      company: 'Pace University',
      location: 'New York, NY',
      date: 'Mar 2025 - Present',
      current: true,
      description: [
        'Built AI-powered automation tools using Python to streamline university administrative operations',
        'Developed data analysis pipelines and SQL queries against PostgreSQL for department reporting',
        'Integrated AI agents (LLMs) into existing workflows, reducing manual data processing for staff'
      ],
      tags: ['Python', 'SQL', 'PostgreSQL', 'Apache Spark', 'AI/LLM']
    },
    {
      title: 'Software Development Intern',
      company: 'Let\'s Be The Change',
      location: 'Bangalore, India',
      date: 'Sep 2023 - May 2024',
      description: [
        'Developed a Flutter-based community engagement app serving 1,000 users on iOS and Android',
        'Built a web administration portal for managing app features and monitoring user activity'
      ],
      tags: ['Flutter', 'Dart', 'PostgreSQL', 'AWS']
    },
    {
      title: 'Machine Learning Research Intern',
      company: 'Compsoft Technologies',
      location: 'Bangalore, India',
      date: 'Aug 2023 - Sep 2023',
      description: [
        'Developed ML model for sentiment analysis achieving 90% accuracy',
        'Engineered Flask web application for real-time predictions'
      ],
      tags: ['Python', 'Flask', 'NLP', 'ML']
    }
  ]

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
        >
          EXPERIENCE
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <div className="timeline-marker">
                <Briefcase size={24} />
              </div>
              <motion.div
                className="timeline-content card"
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <h3>{exp.title}</h3>
                {exp.current && <span className="badge-current">Current</span>}
                <div className="timeline-meta">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                  <span>{exp.date}</span>
                </div>
                <ul>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="tags">
                  {exp.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
