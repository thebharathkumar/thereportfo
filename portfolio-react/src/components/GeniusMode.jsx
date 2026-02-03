import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trophy, Brain, Zap, Award, Star } from 'lucide-react'
import './GeniusMode.css'

const GeniusMode = () => {
  const [isActive, setIsActive] = useState(false)
  const [particles, setParticles] = useState([])
  const [showStats, setShowStats] = useState(false)

  const stats = [
    { label: 'AI/ML Projects', value: 7, icon: Brain, color: '#FF006E' },
    { label: 'Certifications', value: 10, icon: Award, color: '#FFC700' },
    { label: 'Users Impacted', value: '3000+', icon: Trophy, color: '#00F5FF' },
    { label: 'Tech Stack Mastery', value: '30+', icon: Zap, color: '#00FF88' },
    { label: 'Published Papers', value: 1, icon: Star, color: '#FF006E' }
  ]

  const achievements = [
    { text: 'Published ML Researcher', emoji: '📚', delay: 0.2 },
    { text: 'AWS Certified', emoji: '☁️', delay: 0.4 },
    { text: 'RHCSA Certified', emoji: '🐧', delay: 0.6 },
    { text: '90% ML Accuracy', emoji: '🎯', delay: 0.8 },
    { text: '1000+ Users Served', emoji: '👥', delay: 1.0 },
    { text: 'Open Source Contributor', emoji: '💻', delay: 1.2 },
    { text: '3.86 GPA', emoji: '🎓', delay: 1.4 },
    { text: 'Full-Stack Expert', emoji: '⚡', delay: 1.6 }
  ]

  useEffect(() => {
    if (isActive) {
      // Generate particles (fewer on mobile)
      const isMobile = window.innerWidth <= 768
      const particleCount = isMobile ? 20 : 50
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2
      }))
      setParticles(newParticles)

      setTimeout(() => setShowStats(true), 500)
    } else {
      setShowStats(false)
      setParticles([])
    }
  }, [isActive])

  const Counter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!showStats) return

      const isNumber = typeof end === 'number'
      if (!isNumber) {
        setCount(end)
        return
      }

      let startTime
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = (timestamp - startTime) / (duration * 1000)

        if (progress < 1) {
          setCount(Math.floor(end * progress))
          requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      requestAnimationFrame(animate)
    }, [showStats, end, duration])

    return <span>{count}</span>
  }

  return (
    <>
      <motion.button
        className={`genius-mode-toggle ${isActive ? 'active' : ''}`}
        onClick={() => setIsActive(!isActive)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles size={20} />
        {isActive ? 'GENIUS MODE ACTIVE' : 'ACTIVATE GENIUS MODE'}
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <>
            {/* Matrix Background */}
            <motion.div
              className="genius-matrix-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="matrix-column"
                  style={{
                    left: `${(i * 100) / 30}%`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  {Array.from({ length: 20 }).map((_, j) => (
                    <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Particle Explosion */}
            <div className="genius-particles">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="particle"
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    opacity: 1,
                    scale: 0
                  }}
                  animate={{
                    x: `${particle.x}vw`,
                    y: `${particle.y}vh`,
                    opacity: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: particle.duration,
                    ease: 'easeOut'
                  }}
                  style={{
                    width: particle.size,
                    height: particle.size
                  }}
                />
              ))}
            </div>

            {/* Holographic Stats Display */}
            <motion.div
              className="genius-stats-container"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.3 }}
            >
              <div className="genius-stats-grid">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      className="genius-stat-card"
                      initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      style={{ '--stat-color': stat.color }}
                    >
                      <div className="stat-icon">
                        <Icon size={32} />
                      </div>
                      <div className="stat-value">
                        <Counter end={stat.value} />
                      </div>
                      <div className="stat-label">{stat.label}</div>
                      <div className="hologram-lines">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Flying Achievement Badges */}
            <div className="genius-achievements">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-badge"
                  initial={{ x: -200, y: Math.random() * window.innerHeight, opacity: 0, rotate: -45 }}
                  animate={{
                    x: window.innerWidth + 200,
                    y: Math.random() * window.innerHeight,
                    opacity: [0, 1, 1, 0],
                    rotate: 45
                  }}
                  transition={{
                    delay: achievement.delay,
                    duration: 4,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 8
                  }}
                >
                  <span className="achievement-emoji">{achievement.emoji}</span>
                  <span className="achievement-text">{achievement.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Glowing Aura */}
            <motion.div
              className="genius-aura"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* AI Brain Animation */}
            <motion.div
              className="genius-brain"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: 360
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            >
              <Brain size={100} strokeWidth={1.5} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default GeniusMode
