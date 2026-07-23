import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  // Featured sticks for the homepage
  const [sticks, setSticks] = useState(null)
  const [sticksLoading, setSticksLoading] = useState(true)
  const [sticksError, setSticksError] = useState(null)

  useEffect(() => {
    let mounted = true
    setSticksLoading(true)
    axios.get('/api/sticks?limit=3')
      .then(res => {
        if (mounted) setSticks(res.data)
      })
      .catch(err => {
        if (mounted) setSticksError('Failed to load sticks')
      })
      .finally(() => {
        if (mounted) setSticksLoading(false)
      })
    return () => { mounted = false }
  }, [])

  // Testimonials for the homepage
  const [testimonials, setTestimonials] = useState(null)
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  // Map: stickId => name
  const [stickNames, setStickNames] = useState({})

  useEffect(() => {
    let mounted = true
    setTestimonialsLoading(true)
    axios.get('/api/reviews?featured=true')
      .then(res => {
        if (mounted) setTestimonials(Array.isArray(res.data) ? res.data.slice(0, 4) : [])
        // fetch stick names for reviews
        const stickIds = new Set(res.data.map(r => r.stickId))
        Promise.all([...stickIds].map(id =>
          axios.get(`/api/sticks/${id}`).then(resp => [id, resp.data.name]).catch(() => [id, 'Unknown Stick'])
        )).then(pairs => {
          const map = {}
          pairs.forEach(([id, name]) => { map[id] = name || 'Unknown Stick' })
          if (mounted) setStickNames(map)
        })
      })
      .catch(() => {
        if (mounted) setTestimonials([])
      })
      .finally(() => {
        if (mounted) setTestimonialsLoading(false)
      })
    return () => { mounted = false }
  }, [])

  // Feature list
  const FEATURES = [
    {
      icon: (
        <svg width="48" height="48" aria-hidden="true" fill="none" className="feature-icon" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="blade-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B1D6"/><stop offset="1" stopColor="#D92F23"/>
            </linearGradient>
          </defs>
          <path d="M43 41c-3.2 2-7.8-2-9.7-4.3-1.9-2.3-7.7-10.7-9.7-13.3L12 20.5C9.7 18.1 7.2 10.3 10.3 7.4c2.8-2.6 6.9 0.5 8.8 2.2l14.9 13.5c2.5 2.2 7.4 8.3 7.4 12.3-.1 3.4-2.3 4.2-3.4 5.6z" fill="url(#blade-grad)" stroke="var(--accent)" strokeWidth="1"/>
          <ellipse cx="15.5" cy="8.5" rx="2" ry="2.5" fill="#FFC037"/>
        </svg>
      ),
      title: 'Pro Carbon Fiber',
      text: 'Ultra-lightweight, aerospace-grade carbon delivers elite snap and precision.'
    },
    {
      icon: (
        <svg width="48" height="48" aria-hidden="true" fill="none" className="feature-icon" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="curve-grad" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B1D6"/><stop offset="1" stopColor="#FFC037"/>
            </linearGradient>
          </defs>
          <path d="M8 30c15-19 23-20 32-7" stroke="url(#curve-grad)" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="40" cy="21" r="3.5" fill="#D92F23"/>
        </svg>
      ),
      title: 'Precision Engineered Curve',
      text: 'Unique blade geometry amplifies control and accuracy — every shot is laser-guided.'
    },
    {
      icon: (
        <svg width="48" height="48" aria-hidden="true" fill="none" className="feature-icon" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="grip-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B1D6"/><stop offset="1" stopColor="#8BA3BC"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="28" height="28" rx="8" fill="url(#grip-grad)" stroke="#295061" strokeWidth="1"/>
          <rect x="20" y="20" width="8" height="8" rx="2" fill="#D92F23" />
        </svg>
      ),
      title: 'Textured Grip',
      text: 'Frosted matte handle with tactile ridges, built for speed — no slip, even under the coldest conditions.'
    }
  ]

  // Steps ("How it works")
  const STEPS = [
    {
      num: 1,
      title: 'Select your stick',
      text: 'Browse our flagship models, compare curves, and choose your perfect weapon.'
    },
    {
      num: 2,
      title: 'Personalize',
      text: 'Customize flex and grip for your play style. Our engineers hand-tune every order.'
    },
    {
      num: 3,
      title: 'Hit the Ice',
      text: 'We deliver direct to rink or home, ready for your next big game. Dominate every shift.'
    }
  ]

  // Stats band
  const STATS = [
    {
      label: 'Sticks Sold',
      value: '24,800+'
    },
    {
      label: 'Elite Teams',
      value: '112'
    },
    {
      label: 'Years Innovating',
      value: '13'
    },
    {
      label: 'Pro Players',
      value: '75'
    }
  ]

  // FAQ
  const FAQ = [
    {
      q: "What makes amipro sticks different?",
      a: "Our sticks feature aerospace-grade carbon, precision curve engineering, and frosted grip technology for unmatched performance."
    },
    {
      q: "Can I customize my stick?",
      a: "Absolutely. Select flex, grip, and blade—each order is hand-tuned to your specs."
    },
    {
      q: "How long is shipping?",
      a: "Standard delivery is 5–7 business days. Expedited options for teams and events available."
    },
    {
      q: "Do you sponsor players?",
      a: "We partner with elite and youth teams globally. Reach out via our contact page for sponsorship opportunities."
    }
  ]

  // Animate-on-scroll: show .is-visible when scrolled in
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 80) el.classList.add('is-visible')
      })
    }
    reveal()
    window.addEventListener('scroll', reveal)
    return () => window.removeEventListener('scroll', reveal)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow" style={{letterSpacing: '0.2em'}}>Elevate Your Game</span>
          <h1>
            Next-Gen&nbsp;
            <span className="gradient-text">Hockey Sticks</span>
            <br />
            For Cold-Blooded Competitors
          </h1>
          <p className="hero-subtitle">
            Welcome to amipro — where passion meets engineering. Unlock lightning-fast shots, icy precision, and pro-grade control on every shift.
          </p>
          <div className="hero-actions">
            <a href="/sticks" className="btn btn-primary" tabIndex={0}>Shop Sticks</a>
            <a href="/about" className="btn btn-secondary" tabIndex={0}>Our Story</a>
          </div>
          {/* Hero image mesh */}
          <div style={{
            position: 'relative',
            marginTop: '3rem',
            minHeight: '380px',
            width: '100%',
            borderRadius: '44px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, var(--primary) 90%)',
            boxShadow: '0 8px 40px rgba(38,104,161,0.36), 0 1px 0 0 var(--border)'
          }}>
            <img
              src="https://loremflickr.com/840/340/hockey,stick?lock=14"
              alt="amipro hockey stick in fractured ice mesh"
              width="840"
              height="340"
              style={{
                display: 'block',
                width: '100%',
                height: '340px',
                objectFit: 'cover',
                mixBlendMode: 'luminosity',
                opacity: 0.78,
                filter: 'blur(0.5px) saturate(1.3)'
              }}
            />
            {/* Holographic stick foreground */}
            <img
              src="https://loremflickr.com/346/146/hockey,pro?lock=149"
              alt="holographic stick render"
              width="346"
              height="146"
              style={{
                position: 'absolute',
                left: '24%',
                top: '32%',
                width: '346px',
                height: '146px',
                objectFit: 'contain',
                opacity: 0.96,
                zIndex: 2,
                transform: 'rotate(-21deg) scale(1.2)'
              }}
            />
            {/* Jagged ice texture overlay */}
            <svg
              width="100%"
              height="80"
              viewBox="0 0 1280 80"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '80px',
                zIndex: 3
              }}
              aria-hidden="true"
            >
              <polygon points="0,80 180,50 370,80 700,30 920,76 1160,33 1280,80 1280,0 0,0"
                fill="#223443"
                stroke="#06B1D6"
                strokeWidth="2"
                />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Stick Products */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured Sticks</span>
            <h2>Flagship Models</h2>
            <p>
              Discover our elite lineup — engineered for explosive shots, maximal speed, and unyielding durability. Each stick is tested on ice by pro athletes.
            </p>
          </div>
          {sticksLoading ? (
            <div style={{minHeight: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div className="spinner" aria-label="Loading sticks"></div>
            </div>
          ) : sticksError ? (
            <div className="card" style={{background: 'var(--surface-2)'}}>Failed to load sticks.</div>
          ) : sticks && sticks.length > 0 ? (
            <div className="grid grid-3">
              {sticks.map(stick => (
                <div className="card product-card" key={stick._id} style={{position: 'relative'}}>
                  <img
                    src={stick.imageUrl || "https://loremflickr.com/346/180/hockey,stick?lock=17"}
                    width="346"
                    height="180"
                    alt={(stick.name || '') + " stick"}
                    style={{borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '1rem'}}
                  />
                  <div className="badge" style={{position:'absolute',top:'13px',left:'13px',background:'var(--secondary)',color:'#fff'}}>NEW</div>
                  <h3 style={{fontFamily:'Orbitron',margin:'0.5rem 0'}}>{stick.name || ''}</h3>
                  <p style={{color:'var(--muted)'}}>
                    {(stick.description || '').slice(0, 80)}
                  </p>
                  <div style={{margin:'1rem 0',fontWeight:700,fontSize:'1.3rem',color:'var(--accent)'}}>
                    ${stick.price?.toFixed(2) ?? '—'}
                  </div>
                  <div style={{marginTop:'1rem'}}>
                    <a href={`/sticks`} className="btn btn-primary" aria-label={`View ${stick.name || 'stick'}`}>View Stick</a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{color: 'var(--muted)', textAlign:'center', margin:'2rem'}}>No sticks available.</div>
          )}
        </div>
      </section>

      {/* Unique Selling Points / Features */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Tech Highlights</span>
            <h2 style={{letterSpacing:'0.03em'}}>Unmatched Performance</h2>
            <p>
              Our innovation pushes the limits — every stick blends science and artistry. Gear up for the future of hockey.
            </p>
          </div>
          <div className="grid grid-3">
            {FEATURES.map((f, idx) => (
              <div className="feature-card" key={idx}>
                <div>{f.icon}</div>
                <h3 style={{fontFamily:'Orbitron',margin:'0.7rem 0'}}>{f.title}</h3>
                <p style={{color:'var(--muted)',minHeight:'42px'}}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works: Steps */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How It Works</span>
            <h2>From R&D To Rink</h2>
            <p>
              Ordering your next stick is as easy as a snap pass. Every step is dialed-in for custom engineering and seamless delivery.
            </p>
          </div>
          <div className="grid grid-3" style={{alignItems:'stretch'}}>
            {STEPS.map(step => (
              <div className="step" key={step.num}>
                <div className="step-num" style={{
                  fontFamily:'Orbitron',fontSize:'2.2rem',color:'var(--accent)',background:'var(--surface-2)',borderRadius:'12px',width:'54px',height:'54px',
                  display:'flex',justifyContent:'center',alignItems:'center',margin:'0 auto 1rem auto',boxShadow:'0 1px 6px #06b1d633'
                }}>{step.num}</div>
                <h3 style={{fontFamily:'Orbitron',margin:'0.6rem 0'}}>{step.title}</h3>
                <p style={{color:'var(--muted)',minHeight:'42px'}}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="section reveal">
        <div className="container">
          <div className="stats" style={{display:'flex',gap:'3rem',justifyContent:'center'}}>
            {STATS.map((stat, idx) => (
              <div key={idx} style={{textAlign:'center'}}>
                <div className="stat-value" style={{fontFamily:'Orbitron',fontWeight:900,fontSize:'2.25rem',color:'var(--primary)',textShadow:'1px 2px 0 #06B1D699'}}>{stat.value}</div>
                <div className="stat-label" style={{fontSize:'1.1rem',color:'var(--muted)'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Brand Story</span>
            <h2>Built For Champions</h2>
            <p>
              Founded in Montreal, amipro was born from a need: local skaters demanding sticks that kept up with their ambition. Today, our team of engineers and pro athletes craft gear used in leagues worldwide.
            </p>
          </div>
          <div style={{display:'flex',gap:'2rem',alignItems:'center',flexWrap:'wrap'}}>
            <img
              src="https://loremflickr.com/400/320/hockey,team?lock=91"
              alt="amipro team on ice"
              width="400"
              height="320"
              style={{borderRadius:'24px',boxShadow:'0 2px 18px #06B1D633'}}
            />
            <div className="card" style={{background:'var(--surface-2)',maxWidth:'560px',padding:'2rem'}}>
              <h3 style={{fontFamily:'Orbitron',margin:'0.7rem 0'}}>Our Mission</h3>
              <p style={{color:'var(--muted)'}}>
                We believe every player deserves game-changing gear. From youth leagues to Olympic teams, our sticks bring out your max velocity and precision — forged in cold, tested under fire.
              </p>
              <div className="badge" style={{marginTop:'1rem',background:'var(--secondary)',color:'#fff',letterSpacing:'0.09em',fontWeight:700}}>Montreal, Canada</div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Testimonials */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Player Voices</span>
            <h2>See What Pros Say</h2>
            <p>
              Hear from athletes who trust amipro sticks to deliver when the game is on the line.
            </p>
          </div>
          {testimonialsLoading ? (
            <div style={{minHeight:'100px',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <div className="spinner" aria-label="Loading testimonials"></div>
            </div>
          ) : (
            <div className="grid grid-4">
              {(testimonials || []).map((r, idx) => (
                <div className="testimonial-card" key={idx}>
                  <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1rem'}}>
                    <img
                      src={`https://i.pravatar.cc/120?img=${18+idx}`}
                      width="48"
                      height="48"
                      alt={r.userName || 'Player'}
                      style={{borderRadius:'50%',border:'2px solid var(--primary)',boxShadow:'0 1px 8px #06B1D633'}}
                    />
                    <div>
                      <div style={{fontWeight:700,color:'var(--primary)',fontFamily:'Orbitron'}}>{r.userName || 'Anonymous'}</div>
                      <div style={{fontSize:'1rem',color:'var(--muted)',fontWeight:400}}>{(stickNames[r.stickId] || 'amipro stick')}</div>
                    </div>
                  </div>
                  <div style={{color:'var(--muted)',fontSize:'1.1rem',fontWeight:500,minHeight:'60px'}}>
                    {r.comment || ''}
                  </div>
                  <div style={{display:'flex',gap:'0.3rem',margin:'0.6rem 0'}}>
                    {'★'.repeat(r.rating ?? 5)}
                    {'☆'.repeat(5 - (r.rating ?? 5))}
                  </div>
                  <div style={{fontSize:'0.95rem',color:'var(--accent)',marginTop:'0.5rem'}}>{new Date(r.date).toLocaleDateString() || ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Answers & Details</h2>
            <p>
              Curious about customization, delivery, or team deals? Find what you need below.
            </p>
          </div>
          <div style={{maxWidth:'760px',margin:'2rem auto 0 auto'}}>
            {FAQ.map((item, idx) => (
              <details key={idx} className="faq" style={{
                margin:'1.2rem 0',
                border:'1px solid var(--border)',
                borderRadius:'12px',
                background:'var(--surface-2)',
                padding:'1rem',
                boxShadow:'0 2px 12px #06B1D633'
              }}>
                <summary style={{
                  fontWeight:700,
                  fontFamily:'Orbitron',
                  color:'var(--primary)',
                  cursor:'pointer',
                  fontSize:'1.14rem'
                }}>{item.q}</summary>
                <div style={{marginTop:'1rem',color:'var(--muted)',fontSize:'1.05rem'}}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="section reveal">
        <div className="container" style={{display:'flex',alignItems:'center',gap:'2rem',flexWrap:'wrap'}}>
          <div style={{flex:'1 1 540px'}}>
            <div className="section-head">
              <span className="eyebrow">Ready to join?</span>
              <h2>Take Your Shot</h2>
              <p>
                There’s no time like now. Shop our sticks, or connect with our team — unleash your ice dominance with amipro.
              </p>
            </div>
            <div style={{marginTop:'1.2rem'}}>
              <a href="/sticks" className="btn btn-primary" style={{marginRight:'1rem'}}>Shop Now</a>
              <a href="/contact" className="btn btn-secondary">Contact Us</a>
            </div>
          </div>
          <img
            src="https://loremflickr.com/410/300/hockey,goal?lock=54"
            alt="Player scoring goal with amipro stick"
            width="410"
            height="300"
            style={{
              borderRadius:'21px',
              boxShadow:'0 2px 18px #06B1D633'
            }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',padding:'2rem 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <img src="/favicon.ico" width="38" height="38" alt="amipro logo" style={{borderRadius:'9px',boxShadow:'0 1px 4px #06B1D633'}}/>
            <span style={{
              fontFamily:'Orbitron',
              fontWeight:900,
              fontSize:'1.37rem',
              color:'var(--primary)'
            }}>amipro</span>
          </div>
          <nav>
            <ul className="footer-links" style={{listStyle:'none',display:'flex',gap:'2rem',margin:0,padding:0}}>
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/sticks" className="footer-link">Sticks</a></li>
              <li><a href="/gallery" className="footer-link">Gallery</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </nav>
          <div style={{color:'var(--muted)',fontSize:'1rem'}}>
            &copy; {new Date().getFullYear()} amipro hockey sticks. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}