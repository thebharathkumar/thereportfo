import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const stats = [
    { number: '3.86', label: 'GPA' },
    { number: '1000+', label: 'Users Served' },
    { number: '90%', label: 'ML Accuracy' },
    { number: '2', label: 'Certifications' }
  ]

  return (
    <section className="about" id="about" ref={ref}>
      <div className="grid-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ABOUT ME
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text card"
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p className="about-intro">Hi, I'm Bharath.</p>
            <p>I'm a software engineer and published researcher based in New York City, currently completing my Master's in Computer Science at Pace University (3.86 GPA). I care about building things that work well and solve real problems.</p>
            <p>Right now, I work as a Graduate Assistant at Pace, where I build AI automation tools and data engineering pipelines that help the university run more efficiently.</p>
            <div className="about-highlight">
              <p><strong>I'm looking for Software Engineer, Data Engineer, or ML Engineer roles starting Summer 2026.</strong></p>
            </div>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
