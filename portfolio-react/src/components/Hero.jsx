import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import { Download, Mail, ArrowRight } from 'lucide-react'
import './Hero.css'

const AnimatedShape = ({ position, color }) => {
  return (
    <motion.mesh
      position={position}
      animate={{
        y: position[1] + Math.sin(Date.now() * 0.001) * 0.5,
        rotateX: [0, Math.PI * 2],
        rotateY: [0, Math.PI * 2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} wireframe />
    </motion.mesh>
  )
}

const Hero = () => {
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
    </section>
  )
}

export default Hero
