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
      title: 'Campus Ambassador',
      company: 'Perplexity AI',
      location: 'Remote',
      date: 'Jan 2025 - Present',
      current: true,
      description: [
        'Lead campus outreach for Perplexity AI (12B valuation startup)',
        'Organized AI workshops and hackathons with 200+ student participants',
        'Built educational content about AI search and knowledge discovery for university community'
      ],
      tags: ['Community Building', 'AI Education', 'Event Management', 'Content Creation']
    },
    {
      title: 'Software Development Intern',
      company: 'Let\'s Be The Change',
      location: 'Bangalore, India',
      date: 'Sep 2023 - May 2024',
      description: [
        'Developed a Flutter-based community engagement app serving 1,000+ active users on iOS and Android',
        'Built a web administration portal using React and Node.js for managing app features and monitoring user activity',
        'Deployed scalable backend infrastructure on AWS (EC2, RDS, S3) with PostgreSQL database'
      ],
      tags: ['Flutter', 'Dart', 'React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      title: 'Machine Learning Research Intern',
      company: 'Compsoft Technologies',
      location: 'Bangalore, India',
      date: 'Aug 2023 - Sep 2023',
      description: [
        'Developed ML model for sentiment analysis on social media data achieving 90% accuracy',
        'Engineered Flask web application for real-time predictions with REST API',
        'Published research paper on sentiment analysis techniques in IEEE conference'
      ],
      tags: ['Python', 'Flask', 'NLP', 'ML', 'Research', 'Scikit-learn']
    },
    {
      title: 'Data Science Intern',
      company: 'Pantechelearning',
      location: 'Chennai, India',
      date: 'Jun 2023 - Jul 2023',
      description: [
        'Built data visualization dashboards using Python (Matplotlib, Seaborn) for business analytics',
        'Performed exploratory data analysis on customer behavior datasets (100K+ records)',
        'Automated data cleaning and preprocessing pipelines using Pandas and NumPy'
      ],
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis', 'SQL']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Alltramatic',
      location: 'Bangalore, India',
      date: 'Dec 2022 - Feb 2023',
      description: [
        'Developed RESTful APIs using Spring Boot and Java for e-commerce platform',
        'Implemented authentication and authorization using JWT and Spring Security',
        'Optimized database queries reducing API response time by 40%'
      ],
      tags: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'JWT', 'Docker']
    },
    {
      title: 'Core Team Member - Technical Lead',
      company: 'VCET Tech Club',
      location: 'Bangalore, India',
      date: 'Aug 2021 - May 2024',
      description: [
        'Led technical team of 15+ members organizing coding competitions and hackathons',
        'Mentored 100+ students in web development and competitive programming',
        'Organized annual tech fest with 500+ participants and 20+ technical events'
      ],
      tags: ['Leadership', 'Event Management', 'Mentoring', 'Community Building']
    },
    {
      title: 'Open Source Contributor',
      company: 'Layer5 (CNCF)',
      location: 'Remote',
      date: 'Mar 2023 - Aug 2023',
      description: [
        'Contributed to Meshery, a cloud-native management plane for service meshes',
        'Fixed bugs and implemented new features in Go and React codebase',
        'Collaborated with global developer community through GitHub and Slack'
      ],
      tags: ['Go', 'React', 'Kubernetes', 'Docker', 'Open Source', 'CNCF']
    },
    {
      title: 'Campus Ambassador',
      company: 'SkillVertex',
      location: 'Remote',
      date: 'Jan 2023 - Jun 2023',
      description: [
        'Promoted online learning platform and organized skill development workshops',
        'Achieved 150+ student registrations through campus outreach campaigns',
        'Coordinated webinars on emerging technologies (Cloud, DevOps, AI/ML)'
      ],
      tags: ['Marketing', 'Community Outreach', 'Event Coordination', 'Content Creation']
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
