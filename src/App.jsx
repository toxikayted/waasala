import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Cursor, ProgressBar } from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Services from './pages/Services'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { useRevealAll } from './hooks/useReveal'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageWrapper({ children }) {
  const { pathname } = useLocation()
  /* Re-run reveal observer on every route change */
  useRevealAll()
  return children
}

function Layout({ ready }) {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin'

  if (isAdmin) return <Admin />

  return (
    <div style={{ opacity: ready ? 1 : 0, transition: 'opacity .6s ease' }}>
      <Nav />
      <PageWrapper>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/rooms"    element={<Rooms />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events"   element={<Events />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/admin"    element={<Admin />} />
        </Routes>
      </PageWrapper>
      <Footer />
      <ScrollTop />
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <BrowserRouter>
      <Cursor />
      <ProgressBar />
      <Loader onDone={() => setReady(true)} />
      <Layout ready={ready} />
    </BrowserRouter>
  )
}
