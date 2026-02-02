#!/bin/bash

# Update App.css with better mobile responsiveness
cat > src/App.css << 'EOF'
/* ===================================
   NEO-BRUTALISM PORTFOLIO - 3D ANIMATED
   Mobile-First & Fully Responsive
   =================================== */

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

:root {
  /* Neo-Brutalism Color Palette */
  --bg-primary: #FEFAE0;
  --bg-secondary: #FAEDCD;
  --accent-yellow: #FFC700;
  --accent-pink: #FF006E;
  --accent-blue: #00F5FF;
  --accent-green: #00FF88;
  --accent-purple: #B300FF;
  --accent-orange: #FF6B35;
  --black: #000000;
  --white: #FFFFFF;
  --gray: #808080;
  --text-secondary: #666666;

  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Shadows - Neo-Brutalism Style */
  --shadow-brutal: 8px 8px 0px var(--black);
  --shadow-brutal-lg: 12px 12px 0px var(--black);
  --shadow-brutal-xl: 16px 16px 0px var(--black);
  --shadow-3d: 4px 4px 0px 0px var(--black), 8px 8px 0px 0px var(--accent-yellow);

  /* Border */
  --border: 4px solid var(--black);
  --border-thick: 6px solid var(--black);
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  font-family: var(--font-body);
  background: var(--bg-primary);
  color: var(--black);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Selection */
::selection {
  background: var(--accent-yellow);
  color: var(--black);
}

::-moz-selection {
  background: var(--accent-yellow);
  color: var(--black);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-left: var(--border);
}

::-webkit-scrollbar-thumb {
  background: var(--black);
  border: 2px solid var(--bg-secondary);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-pink);
}

.App {
  position: relative;
  overflow-x: hidden;
  width: 100%;
}

/* Section Styling */
section {
  padding: 120px 20px;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

h1 {
  font-size: clamp(2rem, 8vw, 6rem);
  text-transform: uppercase;
  letter-spacing: -2px;
}

h2 {
  font-size: clamp(1.5rem, 5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: -1px;
}

h3 {
  font-size: clamp(1.2rem, 3vw, 2.5rem);
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
}

/* Button Styles - Neo-Brutalism */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  border: var(--border);
  background: var(--white);
  color: var(--black);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  touch-action: manipulation;
  user-select: none;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent-yellow);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: -1;
}

.btn:hover {
  transform: translate(-4px, -4px);
  box-shadow: var(--shadow-brutal);
}

.btn:hover::before {
  transform: translateX(0);
}

.btn:active {
  transform: translate(0, 0);
  box-shadow: 4px 4px 0px var(--black);
}

.btn-primary {
  background: var(--accent-yellow);
}

.btn-secondary {
  background: var(--accent-blue);
}

.btn-accent {
  background: var(--accent-pink);
  color: var(--white);
}

/* Card Styles - Neo-Brutalism with 3D effect */
.card {
  background: var(--white);
  border: var(--border);
  padding: 32px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.card::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  width: 100%;
  height: 100%;
  background: var(--accent-yellow);
  border: var(--border);
  z-index: -1;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translate(-4px, -4px);
}

.card:hover::after {
  transform: translate(8px, 8px);
}

/* Tag Styles */
.tag {
  display: inline-block;
  padding: 8px 16px;
  background: var(--accent-blue);
  border: 3px solid var(--black);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  margin: 4px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tag:hover {
  transform: rotate(-2deg) scale(1.05);
  box-shadow: 4px 4px 0px var(--black);
}

/* Grid Pattern Background */
.grid-background {
  background-image:
    linear-gradient(var(--black) 1px, transparent 1px),
    linear-gradient(90deg, var(--black) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.05;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Dot Pattern Background */
.dot-background {
  background-image: radial-gradient(var(--black) 2px, transparent 2px);
  background-size: 30px 30px;
  opacity: 0.08;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Responsive Design - Mobile First */
@media (max-width: 1024px) {
  section {
    padding: 80px 20px;
  }

  .container {
    padding: 0 20px;
  }

  h1 {
    font-size: clamp(1.8rem, 7vw, 4rem);
  }

  h2 {
    font-size: clamp(1.4rem, 5vw, 3rem);
  }
}

@media (max-width: 768px) {
  :root {
    --shadow-brutal: 6px 6px 0px var(--black);
    --shadow-brutal-lg: 8px 8px 0px var(--black);
    --shadow-brutal-xl: 10px 10px 0px var(--black);
    --border: 3px solid var(--black);
    --border-thick: 4px solid var(--black);
  }

  section {
    padding: 60px 15px;
  }

  .container {
    padding: 0 15px;
  }

  .section-title {
    margin-bottom: 40px;
  }

  .btn {
    padding: 14px 24px;
    font-size: 0.9rem;
    width: 100%;
    max-width: 100%;
  }

  .card {
    padding: 24px;
  }

  .card::after {
    top: 6px;
    left: 6px;
  }

  .tag {
    font-size: 0.75rem;
    padding: 6px 12px;
  }

  h1 {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    letter-spacing: -1px;
  }

  h2 {
    font-size: clamp(1.2rem, 5vw, 2rem);
  }

  h3 {
    font-size: clamp(1rem, 3vw, 1.5rem);
  }
}

@media (max-width: 480px) {
  section {
    padding: 50px 12px;
  }

  .container {
    padding: 0 12px;
  }

  .btn {
    padding: 12px 20px;
    font-size: 0.85rem;
    gap: 6px;
  }

  .card {
    padding: 20px;
  }

  .tag {
    font-size: 0.7rem;
    padding: 5px 10px;
    margin: 3px;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  h3 {
    font-size: 1.1rem;
  }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  .btn:hover {
    transform: none;
    box-shadow: none;
  }

  .btn:active {
    transform: scale(0.95);
  }

  .card:hover {
    transform: none;
  }

  .card:active {
    transform: translate(-2px, -2px);
  }

  .tag:hover {
    transform: none;
  }

  .tag:active {
    transform: scale(0.95);
  }
}

/* Print Styles */
@media print {
  .btn,
  nav,
  .back-to-top,
  .floating-shapes {
    display: none;
  }

  section {
    page-break-inside: avoid;
  }

  .hero-3d-background {
    display: none;
  }
}

/* Landscape Mobile */
@media (max-height: 500px) and (orientation: landscape) {
  section {
    padding: 40px 15px;
  }

  .hero {
    min-height: auto;
    padding: 80px 15px 40px;
  }
}
EOF

echo "✅ Mobile-optimized App.css updated!"
