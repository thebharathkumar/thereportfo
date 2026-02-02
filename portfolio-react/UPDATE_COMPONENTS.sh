#!/bin/bash

# Update Hero.jsx with Resume Modal
cat > src/components/Hero.jsx << 'EOF'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import { Download, Mail, ArrowRight } from 'lucide-react'
import ResumeModal from './ResumeModal'
import './Hero.css'

const Hero = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const text = "BHARATH KUMAR RAJESH"

  return (
    <section className="hero" id="home">
      <div className="hero-3d-background">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-2, 1, 0]} args={[1, 1, 1]}>
            <meshStandardMaterial color="#FFC700" wireframe />
          </Box>
          <Sphere position={[2, -1, 0]} args={[0.7, 16, 16]}>
            <meshStandardMaterial color="#FF006E" wireframe />
          </Sphere>
          <Torus position={[0, 0, -2]} args={[0.8, 0.3, 16, 100]}>
            <meshStandardMaterial color="#00F5FF" wireframe />
          </Torus>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      <div className="hero-container container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="hero-title-wrapper">
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                className="hero-title-char"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: 1.2,
                  color: '#FF006E',
                  rotate: Math.random() * 20 - 10
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="hero-box"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <h2 className="hero-tagline">
              Software Engineer. Published Researcher. AWS Certified.
            </h2>
            <p className="hero-subtitle">
              MS Computer Science @ Pace University | Graduating May 2026 | Based in New York City
            </p>
          </motion.div>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="#projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch <Mail size={20} />
            </motion.a>
            <motion.button
              className="btn btn-accent"
              onClick={() => setIsResumeModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume <Download size={20} />
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="floating-shapes">
          <motion.div
            className="shape shape-1"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="shape shape-2"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="shape shape-3"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  )
}

export default Hero
EOF

# Update Contact.jsx - NO PHONE NUMBER
cat > src/components/Contact.jsx << 'EOF'
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
              I'd love to hear from you. Whether it's a job opportunity, a collaboration, or just a conversation about technology, feel free to reach out.
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
EOF

echo "✅ Hero and Contact components updated!"
