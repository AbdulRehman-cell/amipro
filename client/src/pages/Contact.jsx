import React, { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  // Simple form validation
  function validate(form) {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Your name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (
      !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email.trim())
    )
      errs.email = 'Enter a valid email.'
    if (!form.message.trim()) errs.message = 'Message can\'t be empty.'
    return errs
  }

  const handleInput = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [e.target.name]: undefined,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    setErrors({})
    try {
      // Simulated API POST (real app might POST to /api/contact or send email)
      await axios.post('/api/contact', form).catch(() => {}) // ignore since no actual backend endpoint
      setSent(true)
    } catch (err) {
      setErrors({ server: 'Could not send message. Try again later.' })
    }
    setLoading(false)
  }

  return (
    <>
      <section className="hero" style={{background: 'linear-gradient(110deg, rgba(34,52,67,0.82) 46%, #06B1D6 99%)'}}>
        <div className="container" style={{position:'relative',zIndex:1,padding:'60px 0'}}>
          <span className="eyebrow" style={{fontFamily:'Orbitron',letterSpacing:'0.06em'}}>Get in Touch</span>
          <h1 style={{
            fontFamily:'Orbitron',
            fontWeight:900,
            fontSize:'clamp(2.7rem,4vw,5rem)',
            textShadow:'0px 2px 20px #295061b8, 1px 1px 2px #fff9',
            lineHeight:1.1,
            letterSpacing:'0.04em'
          }}>
            Contact <span className="gradient-text" style={{display:'inline-block'}}>amipro hockey</span>
          </h1>
          <p className="hero-subtitle" style={{
            fontWeight:500,
            fontFamily:'Inter,sans-serif',
            color:'var(--muted)',
            maxWidth:440
          }}>
            Reach out to our team for any questions, business inquiries, team orders, or just to talk hockey.
          </p>
        </div>
        {/* Holographic stick accent SVG */}
        <svg aria-hidden width="110" height="180" viewBox="0 0 110 180" style={{position:'absolute',right:'6%',top:'24%',opacity:0.15}}><defs><linearGradient id="stick" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#06B1D6" /><stop offset="1" stopColor="#fff" /></linearGradient></defs><rect x="30" y="10" width="7" height="135" rx="3.5" fill="url(#stick)" /><polygon points="29,145 37,145 39,170 27,170" fill="url(#stick)" /></svg>
      </section>

      {/* Contact form and info */}
      <section className="section" id="contact-form">
        <div className="container" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(380px,1fr))',gap:'38px'}}>
          <div>
            <header className="section-head" style={{marginBottom:'2rem'}}>
              <h2>Send Us a Message</h2>
              <div style={{height:4,background:'var(--secondary)',borderRadius:'3px',margin:'8px 0',boxShadow:'0 2px 0 #D92F23'}}></div>
            </header>
            {sent ? (
              <div className="card" style={{padding:'2rem',background:'var(--surface-2)',border:'1px solid var(--border)',boxShadow:'0 4px 24px #22344344'}}>
                <h3 style={{fontFamily:'Orbitron',fontWeight:700}}>Thank you!</h3>
                <p style={{fontFamily:'Inter',color:'var(--muted)'}}>Your message has been sent. The amipro team will get back to you soon.</p>
              </div>
            ) : (
              <form className="card" style={{
                padding:'2rem',
                background:'linear-gradient(130deg,rgba(255,255,255,0.07) 0%,var(--surface-2) 100%)',
                border:'1px solid var(--border)',
                boxShadow:'0 4px 24px #22344344'
              }} onSubmit={handleSubmit} aria-label="Contact form">
                <div style={{marginBottom:'1rem'}}>
                  <label htmlFor="name" style={{fontFamily:'Orbitron'}}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={`input${errors.name ? ' input-error':''}`}
                    style={{
                      width:'100%',
                      padding:'12px',
                      fontSize:'clamp(1rem,1.5vw,1.2rem)',
                      marginTop:'8px',
                      background:'var(--surface)',
                      border:`1px solid ${errors.name ? 'var(--secondary)' : 'var(--border)'}`,
                      color:'var(--text)',
                      borderRadius:'13px',
                      fontFamily:'Inter'
                    }}
                    value={form.name}
                    onChange={handleInput}
                    disabled={loading}
                  />
                  {errors.name && <span className="badge" style={{color:'var(--secondary)',background:'none'}}>{errors.name}</span>}
                </div>
                <div style={{marginBottom:'1rem'}}>
                  <label htmlFor="email" style={{fontFamily:'Orbitron'}}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`input${errors.email ? ' input-error':''}`}
                    style={{
                      width:'100%',
                      padding:'12px',
                      fontSize:'clamp(1rem,1.5vw,1.2rem)',
                      marginTop:'8px',
                      background:'var(--surface)',
                      border:`1px solid ${errors.email ? 'var(--secondary)' : 'var(--border)'}`,
                      color:'var(--text)',
                      borderRadius:'13px',
                      fontFamily:'Inter'
                    }}
                    value={form.email}
                    onChange={handleInput}
                    disabled={loading}
                  />
                  {errors.email && <span className="badge" style={{color:'var(--secondary)',background:'none'}}>{errors.email}</span>}
                </div>
                <div style={{marginBottom:'1.5rem'}}>
                  <label htmlFor="message" style={{fontFamily:'Orbitron'}}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className={`input${errors.message ? ' input-error':''}`}
                    rows={5}
                    style={{
                      width:'100%',
                      padding:'12px',
                      fontSize:'clamp(1rem,1.5vw,1.2rem)',
                      marginTop:'8px',
                      background:'var(--surface)',
                      border:`1px solid ${errors.message ? 'var(--secondary)' : 'var(--border)'}`,
                      color:'var(--text)',
                      borderRadius:'13px',
                      fontFamily:'Inter',
                      resize:'vertical'
                    }}
                    value={form.message}
                    onChange={handleInput}
                    disabled={loading}
                  />
                  {errors.message && <span className="badge" style={{color:'var(--secondary)',background:'none'}}>{errors.message}</span>}
                </div>
                {errors.server && <div className="badge" style={{marginBottom:'1rem',color:'var(--secondary)'}}>{errors.server}</div>}
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                  style={{
                    width:'100%',
                    fontFamily:'Orbitron, sans-serif',
                    fontWeight:700,
                    fontSize:'1.12rem',
                    padding:'16px 36px',
                    textTransform:'uppercase',
                    border:'1px solid var(--border)',
                    letterSpacing:'0.06em',
                    borderRadius:'39px',
                    boxShadow:'0 3px 15px #06B1D644'
                  }}
                >
                  {loading ? <span>Sending...</span> : <span>Send Message</span>}
                </button>
              </form>
            )}
          </div>
          <div>
            <header className="section-head">
              <h3>Contact Information</h3>
              <div style={{
                height:4,
                background:'var(--secondary)',
                borderRadius:'3px',
                margin:'8px 0',
                boxShadow:'0 2px 0 #D92F23'
              }}></div>
            </header>
            <div className="feature-card" style={{
              background:'linear-gradient(105deg,rgba(255,255,255,0.06),var(--surface-2) 92%)',
              border:'1px solid var(--border)',
              padding:'2rem',
              marginBottom:'1.5rem',
              boxShadow:'0 8px 32px #22344333'
            }}>
              <div className="feature-icon" style={{marginBottom:'1rem'}}>
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <rect width="32" height="32" rx="16" fill="#06B1D6" />
                  <path d="M8 14v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" stroke="#EFF6FA" strokeWidth="2"/>
                  <path d="M25 11.5 16 18 7 11.5" stroke="#EFF6FA" strokeWidth="2"/>
                </svg>
              </div>
              <ul style={{fontFamily:'Inter',fontWeight:500,fontSize:'1.1rem',listStyle: 'none', padding:0}}>
                <li>
                  <span className="tag" style={{background:'var(--secondary)',color:'var(--text)',marginRight:10}}>Email</span>
                  <a href="mailto:info@amiprohockey.com" style={{color:'var(--primary)',fontWeight:700}}>info@amiprohockey.com</a>
                </li>
                <li style={{marginTop:'0.8em'}}>
                  <span className="tag" style={{background:'var(--accent)',color:'var(--surface)',marginRight:10}}>Phone</span>
                  <a href="tel:+18005551212" style={{color:'var(--primary)',fontWeight:700}}>+1 (800) 555-1212</a>
                </li>
                <li style={{marginTop:'0.8em'}}>
                  <span className="tag" style={{background:'var(--primary)',color:'var(--bg)',marginRight:10}}>Head Office</span>
                  <span style={{color:'var(--text)',fontWeight:500}}>4400 Ice Arena Blvd, Minneapolis, MN</span>
                </li>
              </ul>
            </div>
            <div className="card" style={{
              background:'var(--surface-2)',
              border:'1px solid var(--border)',
              padding:'1.5rem',
              boxShadow:'0 2px 12px #29506144'
            }}>
              <h4 style={{fontFamily:'Orbitron',fontWeight:700,fontSize:'1.12rem',marginBottom:'0.9em'}}>Hours</h4>
              <ul style={{fontFamily:'Inter',fontWeight:400,fontSize:'1rem',listStyle:'none',padding:0,lineHeight:'1.7'}}>
                <li>Monday–Friday: 9:00am – 5:00pm</li>
                <li>Saturday: 10:00am – 2:00pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location map & team photo */}
      <section className="section" id="location">
        <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'36px',alignItems:'center',maxWidth:'1100px'}}>
          <div>
            <header className="section-head">
              <h2>Find Us</h2>
              <div style={{height:4,background:'var(--secondary)',borderRadius:'3px',margin:'8px 0',boxShadow:'0 2px 0 #D92F23'}}></div>
            </header>
            <div className="card" style={{
              padding:'0.6rem',
              background:'linear-gradient(120deg,rgba(255,255,255,0.1),var(--surface-2))',
              border:'1px solid var(--border)',
              boxShadow:'0 6px 22px #22344333'
            }}>
              <iframe
                title="amipro head office map"
                src="https://maps.google.com/maps?q=4400%20Ice%20Arena%20Blvd,%20Minneapolis,%20MN&t=&z=14&ie=UTF8&iwloc=&output=embed"
                style={{
                  border: '0',
                  width: '100%',
                  height: '260px',
                  borderRadius:'18px',
                  boxShadow:'0 1px 12px #29506166'
                }}
                allowFullScreen
              ></iframe>
            </div>
            <div style={{marginTop:'1.5rem'}}>
              <span className="badge" style={{background:'var(--primary)',color:'var(--surface)',fontWeight:700}}>We welcome visits — call ahead to schedule!</span>
            </div>
          </div>
          <div>
            <header className="section-head">
              <h3>Our Team</h3>
              <div style={{height:4,background:'var(--secondary)',borderRadius:'3px',margin:'8px 0',boxShadow:'0 2px 0 #D92F23'}}></div>
            </header>
            <div style={{display:'flex',gap:'22px',alignItems:'center',flexWrap:'wrap',margin:'1.2em 0'}}>
              <img src="https://loremflickr.com/340/220/hockey,team?lock=1"
                   alt="amipro hockey team group photo"
                   width={340} height={220}
                   className="card"
                   style={{objectFit:'cover',borderRadius:'22px',border:'1px solid var(--border)',boxShadow:'0 12px 56px #29506133'}}
              />
              <div>
                <ul style={{listStyle:'none',padding:0}}>
                  <li style={{marginBottom:'0.7em'}}>
                    <img src="https://i.pravatar.cc/120?img=19" alt="Team leader Jordan" width={48} height={48} 
                      style={{borderRadius:'50%',marginRight:8,boxShadow:'0 1px 12px #06B1D64a'}}/>
                    <span style={{fontFamily:'Orbitron',fontWeight:700,color:'var(--primary)',fontSize:'1rem'}}>Jordan</span> – Founder
                  </li>
                  <li style={{marginBottom:'0.7em'}}>
                    <img src="https://i.pravatar.cc/120?img=44" alt="Team member Casey" width={48} height={48} 
                      style={{borderRadius:'50%',marginRight:8,boxShadow:'0 1px 12px #06B1D64a'}}/>
                    <span style={{fontFamily:'Orbitron',fontWeight:700,color:'var(--primary)',fontSize:'1rem'}}>Casey</span> – Head of Product
                  </li>
                  <li>
                    <img src="https://i.pravatar.cc/120?img=7" alt="Team member Evelyn" width={48} height={48} 
                      style={{borderRadius:'50%',marginRight:8,boxShadow:'0 1px 12px #06B1D64a'}}/>
                    <span style={{fontFamily:'Orbitron',fontWeight:700,color:'var(--primary)',fontSize:'1rem'}}>Evelyn</span> – Customer Manager
                  </li>
                </ul>
              </div>
            </div>
            <p style={{fontFamily:'Inter',color:'var(--muted)',fontSize:'1rem'}}>
              The amipro team is always here for support, design advice, and custom orders.
            </p>
          </div>
        </div>
      </section>

      {/* Final call-to-action */}
      <section className="section" style={{background:'linear-gradient(98deg,rgba(34,52,67,0.96) 54%,#06B1D6 110%)',padding:'60px 0'}}>
        <div className="container" style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'44px'}}>
          <div>
            <header className="section-head">
              <h2>Let's build your next hockey story</h2>
              <div style={{height:4,background:'var(--secondary)',borderRadius:'3px',margin:'8px 0',boxShadow:'0 2px 0 #D92F23'}}></div>
            </header>
            <p style={{color:'var(--muted)',fontFamily:'Inter',fontWeight:500,maxWidth:'400px'}}>
              Got ideas? Want custom sticks, team gear, or a partnership? Our crew is waiting. Skate over — we can't wait to hear from you.
            </p>
            <a className="btn btn-primary" href="#contact-form"
               style={{
                 fontFamily:'Orbitron',
                 fontWeight:700,
                 fontSize:'1.1rem',
                 padding:'16px 36px',
                 letterSpacing:'0.06em',
                 borderRadius:'39px',
                 boxShadow:'0 3px 15px #06B1D644',
                 marginTop:'0.9rem'
               }}>
              Start Your Conversation
            </a>
          </div>
          <img src="https://loremflickr.com/420/305/hockey,arena,players?lock=4"
            alt="Players with amipro sticks celebrating after a win"
            width={420} height={305}
            className="feature-card"
            style={{
              borderRadius:'32px',
              border:'2px solid var(--secondary)',
              boxShadow:'0 18px 44px #29506144',
              objectFit:'cover',
              maskImage:'linear-gradient(120deg,#fff 90%,transparent 100%)'
            }}
          />
        </div>
      </section>
    </>
  )
}