import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const skillCategories = [
    { title: 'Languages', skills: ['Python', 'SQL', 'JavaScript', 'Java', 'Dart', 'C++'] },
    { title: 'Frameworks', skills: ['React', 'Flutter', 'Flask', 'TensorFlow', 'PyTorch'] },
    { title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD'] },
    { title: 'Data & ML', skills: ['Spark', 'Airflow', 'NLP', 'CNNs', 'MLOps', 'Power BI'] }
  ]

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ rotate: -5, opacity: 0 }}
          animate={inView ? { rotate: 0, opacity: 1 } : {}}
        >
          SKILLS & TECH
        </motion.h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category card"
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: index * 0.1, type: 'spring' }}
            >
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="tag"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
