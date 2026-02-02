#!/bin/bash

# Update Hero.css for mobile
cat > src/components/Hero.css << 'EOF'
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding-top: 80px;
}

.hero-3d-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.3;
}

.hero-container {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
}

.hero-title-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  margin-bottom: 40px;
  padding: 0 10px;
}

.hero-title-char {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 5vw, 5rem);
  font-weight: 700;
  color: var(--black);
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-box {
  background: var(--accent-yellow);
  border: var(--border-thick);
  padding: 40px;
  margin: 40px auto;
  max-width: 900px;
  box-shadow: var(--shadow-brutal-xl);
  transform: rotate(-1deg);
}

.hero-tagline {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  line-height: 1.3;
}

.hero-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  font-weight: 600;
  line-height: 1.5;
}

.hero-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
  padding: 0 10px;
}

.hero-buttons .btn {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  border: var(--border);
}

.shape-1 {
  width: 80px;
  height: 80px;
  background: var(--accent-pink);
  top: 10%;
  left: 10%;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.shape-2 {
  width: 60px;
  height: 60px;
  background: var(--accent-blue);
  border-radius: 50%;
  top: 70%;
  right: 15%;
}

.shape-3 {
  width: 90px;
  height: 90px;
  background: var(--accent-green);
  bottom: 15%;
  left: 15%;
  transform: rotate(45deg);
}

/* Tablet */
@media (max-width: 1024px) {
  .hero-box {
    padding: 35px 30px;
    margin: 30px 20px;
  }

  .hero-buttons {
    gap: 12px;
  }

  .shape-1, .shape-2, .shape-3 {
    opacity: 0.5;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 100px 15px 60px;
  }

  .hero-3d-background {
    opacity: 0.15;
  }

  .hero-title-char {
    font-size: clamp(1.2rem, 4vw, 2rem);
  }

  .hero-title-wrapper {
    gap: 2px;
    margin-bottom: 30px;
  }

  .hero-box {
    padding: 25px 20px;
    margin: 30px 15px;
    transform: rotate(0deg);
  }

  .hero-tagline {
    font-size: clamp(1rem, 3vw, 1.5rem);
    margin-bottom: 15px;
  }

  .hero-subtitle {
    font-size: clamp(0.85rem, 2vw, 1rem);
  }

  .hero-buttons {
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    padding: 0 15px;
  }

  .hero-buttons .btn {
    width: 100%;
    min-width: 100%;
    justify-content: center;
    padding: 14px 20px;
    font-size: 0.9rem;
  }

  .floating-shapes {
    display: none;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .hero {
    padding: 90px 12px 50px;
  }

  .hero-title-char {
    font-size: 1rem;
  }

  .hero-box {
    padding: 20px 15px;
    margin: 20px 10px;
  }

  .hero-tagline {
    font-size: 0.95rem;
  }

  .hero-subtitle {
    font-size: 0.8rem;
  }

  .hero-buttons .btn {
    padding: 12px 18px;
    font-size: 0.85rem;
    gap: 6px;
  }
}

/* Landscape Mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .hero {
    min-height: auto;
    padding: 80px 15px 40px;
  }

  .hero-box {
    padding: 20px;
    margin: 20px auto;
  }

  .hero-buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .hero-buttons .btn {
    width: auto;
    min-width: 150px;
  }
}
EOF

# Update ResumeModal.css for mobile
cat > src/components/ResumeModal.css << 'EOF'
.resume-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.resume-modal-content {
  background: var(--white);
  border: var(--border-thick);
  padding: 40px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-brutal-xl);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--accent-pink);
  border: var(--border);
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--white);
  z-index: 10;
  touch-action: manipulation;
}

.modal-close:hover {
  transform: rotate(90deg);
  background: var(--black);
}

.modal-close:active {
  transform: rotate(90deg) scale(0.95);
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 30px;
  background: var(--accent-yellow);
  border: var(--border);
  padding: 15px;
  margin: -40px -40px 30px -40px;
}

.resume-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.resume-option {
  background: var(--bg-primary);
  border: var(--border);
  padding: 30px 20px;
  text-align: center;
  text-decoration: none;
  color: var(--black);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  cursor: pointer;
}

.resume-option::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 100%;
  height: 100%;
  background: var(--accent-blue);
  border: var(--border);
  z-index: -1;
  transition: all 0.3s ease;
}

.resume-option:hover::after {
  transform: translate(6px, 6px);
}

.resume-option:active {
  transform: scale(0.98);
}

.resume-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.resume-option h4 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.resume-option p {
  font-size: 0.9rem;
  margin-bottom: 15px;
  color: var(--text-secondary);
}

.download-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--accent-yellow);
  border: 3px solid var(--black);
  padding: 8px 16px;
  margin: 15px auto 0;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem;
  width: fit-content;
}

/* Tablet */
@media (max-width: 1024px) {
  .resume-modal-content {
    padding: 35px;
  }

  .modal-title {
    margin: -35px -35px 25px -35px;
    font-size: 1.8rem;
  }

  .resume-options {
    gap: 15px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .resume-modal-overlay {
    padding: 15px;
    align-items: flex-end;
  }

  .resume-modal-content {
    padding: 30px 20px;
    max-height: 85vh;
    border-radius: 12px 12px 0 0;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    top: 15px;
    right: 15px;
  }

  .modal-title {
    font-size: 1.4rem;
    margin: -30px -20px 25px -20px;
    padding: 12px;
  }

  .resume-options {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .resume-option {
    padding: 25px 15px;
  }

  .resume-icon {
    font-size: 2.5rem;
  }

  .resume-option h4 {
    font-size: 1.1rem;
  }

  .resume-option p {
    font-size: 0.85rem;
  }

  .download-indicator {
    font-size: 0.85rem;
    padding: 7px 14px;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .resume-modal-overlay {
    padding: 10px;
  }

  .resume-modal-content {
    padding: 25px 15px;
    max-height: 80vh;
  }

  .modal-close {
    width: 35px;
    height: 35px;
    top: 12px;
    right: 12px;
  }

  .modal-title {
    font-size: 1.2rem;
    margin: -25px -15px 20px -15px;
    padding: 10px;
  }

  .resume-option {
    padding: 20px 12px;
  }

  .resume-icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  .resume-option h4 {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  .resume-option p {
    font-size: 0.8rem;
    margin-bottom: 12px;
  }

  .download-indicator {
    font-size: 0.75rem;
    padding: 6px 12px;
    gap: 6px;
  }
}

/* Touch Devices */
@media (hover: none) and (pointer: coarse) {
  .resume-option:hover::after {
    transform: none;
  }

  .modal-close:hover {
    transform: none;
  }
}
EOF

echo "✅ Mobile-optimized Hero and ResumeModal updated!"
