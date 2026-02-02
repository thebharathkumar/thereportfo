import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Linkedin, Github, MapPin } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="dot-background" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring' }}
        >
          LET'S CONNECT
        </motion.h2>

        <motion.div
          className="contact-content"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
        >
          <div className="contact-box card">
            <p className="contact-message">
              Looking for Software Engineer, Data Engineer, or ML Engineer roles starting Summer 2026. 
              Let's build something amazing together!
            </p>

            <div className="contact-links">
              <motion.a
                href="mailto:bharath.kr702@gmail.com"
                className="contact-link"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Mail size={24} />
                bharath.kr702@gmail.com
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/thebharathkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <Linkedin size={24} />
                linkedin.com/in/thebharathkumar
              </motion.a>

              <motion.a
                href="https://github.com/thebharathkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Github size={24} />
                github.com/thebharathkumar
              </motion.a>

              <motion.div
                className="contact-link"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin size={24} />
                New York City, NY
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
