import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/500.css'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'

// index.html ships a full set of default meta tags so social crawlers, which
// don't run JS, still get a title, description and share image. React 19 hoists
// the app's own per-route tags into <head> but appends rather than replaces, so
// once we've mounted we drop the defaults to avoid two of everything.
function dropDefaultMeta() {
  document.querySelectorAll('head [data-default-meta]').forEach((el) => el.remove());
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// After paint, so the defaults stay in place if anything above throws.
requestAnimationFrame(dropDefaultMeta)
