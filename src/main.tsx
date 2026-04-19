import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

// Embed routes render without chrome. Tag <body> early so CSS hits first paint.
if (window.location.pathname.startsWith('/embed')) {
  document.body.classList.add('embed')
}

const root = document.getElementById('root')
if (!root) throw new Error('root element missing')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
