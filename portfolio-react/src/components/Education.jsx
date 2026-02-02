import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap } from 'lucide-react'
import './Education.css'

const Education = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const education = [
    {
      school: 'Pace University',
      degree: 'Master of Science in Computer Science',
      location: 'New York, NY',
      period: 'Aug 2024 - May 2026',
      gpa: '3.86/4.0'
    },
    {
      school: 'Jyothy Institute of Technology (VTU)',
      degree: 'Bachelor of Engineering in Computer Science',
      location: 'Bangalore, India',
      period: '2020 - 2024'
    }
  ]

  return (
    <section className="education" id="education" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: -50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
        >
          EDUCATION
        </motion.h2>

        <div className="education-grid">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education-card card"
              initial={{ y: 100, opacity: 0, rotate: -5 }}
              animate={inView ? { y: 0, opacity: 1, rotate: 0 } : {}}
              transition={{ delay: index * 0.2, type: 'spring' }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="edu-icon">
                <GraduationCap size={40} />
              </div>
              <h3>{edu.school}</h3>
              <p className="degree">{edu.degree}</p>
              <div className="edu-meta">
                <span>{edu.location}</span>
                <span>{edu.period}</span>
              </div>
              {edu.gpa && (
                <div className="gpa-badge">{edu.gpa} GPA</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
