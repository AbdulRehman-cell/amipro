import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Sticks from './pages/Sticks.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <>
      <header className="header sticky-nav" style={{backgroundColor: 'var(--bg)', backdropFilter: 'blur(10px)'}}>
        <div className="container header-inner" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 0'}}>
          <div className="brand" style={{fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '1.75rem', color: 'var(--primary)', letterSpacing: '0.1em'}}>
            <NavLink to="/" className="brand-link" aria-label="amipro homepage" end>
              amipro
            </NavLink>
          </div>
          <nav aria-label="Primary navigation">
            <ul className="nav-list" style={{listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '2rem'}}>
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                  style={{fontFamily: 'Orbitron, sans-serif', fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem', color: 'var(--text)', padding: '0.5rem 0', transition: 'color 180ms ease'}}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                  style={{fontFamily: 'Orbitron, sans-serif', fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem', color: 'var(--text)', padding: '0.5rem 0'}}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sticks"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                  style={{fontFamily: 'Orbitron, sans-serif', fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem', color: 'var(--text)', padding: '0.5rem 0'}}
                >
                  Sticks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                  style={{fontFamily: 'Orbitron, sans-serif', fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem', color: 'var(--text)', padding: '0.5rem 0'}}
                >
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? 'active nav-link' : 'nav-link'
                  }
                  style={{fontFamily: 'Orbitron, sans-serif', fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem', color: 'var(--text)', padding: '0.5rem 0'}}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content" style={{backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 130px)', paddingTop: '4rem'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sticks" element={<Sticks />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer className="footer" style={{backgroundColor: 'var(--surface)', color: 'var(--muted)', padding: '2rem 0'}}>
        <div className="container footer-inner" style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.9rem'}}>
          <div>
            &copy; {new Date().getFullYear()} amipro. All rights reserved.
          </div>
          <nav aria-label="Footer navigation" className="footer-links" style={{display: 'flex', gap: '1.5rem'}}>
            <a href="/" className="footer-link" style={{color: 'var(--muted)', textDecoration: 'none', fontWeight: 500}}>Home</a>
            <a href="/about" className="footer-link" style={{color: 'var(--muted)', textDecoration: 'none', fontWeight: 500}}>About</a>
            <a href="/sticks" className="footer-link" style={{color: 'var(--muted)', textDecoration: 'none', fontWeight: 500}}>Sticks</a>
            <a href="/gallery" className="footer-link" style={{color: 'var(--muted)', textDecoration: 'none', fontWeight: 500}}>Gallery</a>
            <a href="/contact" className="footer-link" style={{color: 'var(--muted)', textDecoration: 'none', fontWeight: 500}}>Contact</a>
          </nav>
        </div>
      </footer>
    </>
  )
}