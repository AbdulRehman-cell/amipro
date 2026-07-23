import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Animation helper for scroll-reveal
function useReveal(ref, threshold = 0.08) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    el.classList.remove('revealed')
    const obs = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
}

// Animated spinner
function Spinner() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160}}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="var(--primary)" strokeWidth="6" strokeDasharray="80" strokeDashoffset="24" opacity="0.2"/>
        <circle className="spinner-arc" cx="24" cy="24" r="18" stroke="var(--accent)" strokeWidth="6" strokeDasharray="36" strokeDashoffset="0" style={{transformOrigin: 'center', animation: 'spin 1s linear infinite'}} />
        <style>
          {`
            @keyframes spin {to { transform: rotate(360deg); }}
          `}
        </style>
      </svg>
    </div>
  )
}

// Animated reveal for cards
function RevealCard({children, delay}) {
  const ref = React.useRef(null)
  useReveal(ref)
  return (
    <div
      ref={ref}
      className="card gallery-card"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        animation: `gallery-reveal 0.6s cubic-bezier(.62,1.47,.61,.85) forwards ${delay}ms`
      }}
    >
      {children}
      <style>
        {`
        .gallery-card.revealed {
          opacity: 1 !important;
          transform: none !important;
        }
        @keyframes gallery-reveal {
          to { opacity: 1; transform: none; }
        }
        `}
      </style>
    </div>
  )
}

export default function Gallery() {
  const [sticks, setSticks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // For action shots and events (static for demo)
  const actionImages = [
    {
      url: "https://loremflickr.com/480/320/hockey,action,sports?lock=120",
      alt: "Forward power-slaps puck with amipro stick in ice game",
      caption: "Power through: Our stick in a heated match.",
      tag: "Game Action"
    },
    {
      url: "https://loremflickr.com/480/320/hockey,arena,crowd?lock=111",
      alt: "Packed hockey arena with vibrant energy",
      caption: "Tournament spotlight: amipro sticks in the big leagues.",
      tag: "Event"
    },
    {
      url: "https://loremflickr.com/480/320/hockey,player,stick?lock=132",
      alt: "Amipro stick used by player in training drill",
      caption: "Precision at practice with the amipro Razorback.",
      tag: "Training"
    },
    {
      url: "https://loremflickr.com/480/320/hockey,goalie,stick?lock=160",
      alt: "Goalie blocks shot with custom amipro",
      caption: "Defensive edge: amipro sticks stand guard.",
      tag: "Play"
    },
    {
      url: "https://loremflickr.com/480/320/hockey,team,winners?lock=175",
      alt: "Winning team celebrates hockey victory with sticks raised",
      caption: "Victory moments: amipro at the heart.",
      tag: "Victory"
    },
    {
      url: "https://loremflickr.com/480/320/hockey,ice,winter?lock=189",
      alt: "Outdoor winter game with amipro sticks",
      caption: "Cold performance: amipro built for icy conditions.",
      tag: "Outdoor"
    },
  ]
  // Fetch stick products for product shots
  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    axios.get('/api/sticks')
      .then(res => {
        if (mounted) setSticks(res.data ?? [])
      })
      .catch(err => {
        setError('Could not load product shots')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  // Hero backdrop polygons & textures (SVG mesh/ice motif for visual kinetic effect)
  function HeroBackdrop() {
    return (
      <svg width="100%" height="360" viewBox="0 0 1400 360" style={{position:'absolute',top:0,left:0,zIndex:0}} fill="none">
        <defs>
          <linearGradient id="iceMist" x1="0" y1="0" x2="1400" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EDF8FB" stopOpacity="0.7"/>
            <stop offset="0.7" stopColor="#06B1D6" stopOpacity="0.18"/>
          </linearGradient>
        </defs>
        <polygon points="0,0 600,0 440,120 0,180" fill="url(#iceMist)" opacity="0.25"/>
        <polygon points="940,0 1400,0 1400,180 1150,120" fill="url(#iceMist)" opacity="0.22"/>
        <polyline points="120,200 900,80 1280,220" stroke="#06B1D6" strokeWidth="3" strokeLinecap="round" opacity="0.16"/>
        <polyline points="60,120 380,270 800,220" stroke="#D92F23" strokeWidth="2" strokeDasharray="12" opacity="0.11"/>
      </svg>
    )
  }

  return (
    <div className="gallery-page" style={{background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflowX: 'hidden'}}>
      <section className="hero gallery-hero" style={{position:'relative',padding:"80px 0 40px",overflow:'hidden'}}>
        <HeroBackdrop />
        <div className="container" style={{position:'relative',zIndex:1}}>
          <span className="eyebrow" style={{
            fontWeight:700,
            color:'var(--accent)',
            fontFamily:'Orbitron,sans-serif',
            letterSpacing:'0.09em',
            fontSize:'1.1rem',
            display:'inline-block',
            marginBottom: '0.5rem'
          }}>
            ICE IN MOTION
          </span>
          <h1 className="gallery-title" style={{
            fontFamily:'Orbitron, sans-serif',
            fontWeight:900,
            fontSize:'clamp(2.7rem, 4vw, 5rem)',
            lineHeight:'1.1',
            textShadow:'0 2px 16px #0A2D49, 0 1px 0 #EFF6FA',
            color:'var(--text)',
            margin:'0 0 1.2rem 0',
            letterSpacing: '0.04em'
          }}>
            Hockey unleashed:<br/>
            <span className="gradient-text" style={{
              background: 'linear-gradient(80deg, var(--primary), var(--accent) 60%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>
              amipro Gallery
            </span>
          </h1>
          <p className="hero-subtitle" style={{
            fontFamily:'Inter,sans-serif',fontWeight:500,
            fontSize:'clamp(1rem,1.5vw,1.2rem)',
            color:'var(--muted)',
            marginBottom: '3rem',
            textShadow: '0 2px 32px var(--surface-2)'
          }}>
            Experience our sticks in action, from intense match moments to technical product shots and frosted events.
          </p>
        </div>
      </section>

      {/* Section: Action shots grid */}
      <section className="section gallery-action" style={{background:'var(--surface)',margin:"0"}}>
        <div className="container">
          <div className="section-head" style={{
            fontFamily:'Orbitron,sans-serif',fontWeight:700,
            color:'var(--text)',fontSize:'clamp(1.5rem,3vw,3rem)',marginBottom:'32px',
            textShadow:'0 1px 12px #20314D,0 1px 0 #EEF6FA',
            letterSpacing: '0.05em',
            position: 'relative'
          }}>
            <span style={{borderBottom:'4px solid var(--secondary)',display:'inline-block',paddingBottom:'6px',marginBottom:'3px'}}>Live Action</span>
            <span style={{
              position:'absolute',left:0,bottom:0,
              width:'100%',height:'4px',background:'linear-gradient(90deg,var(--secondary) 60%,transparent 100%)',
              clipPath:'polygon(0 70%,10% 100%,20% 40%,40% 100%,80% 75%,100% 0,100% 100%,0 100%)',
              zIndex:1,
              opacity:0.7
            }} />
          </div>
          <div className="grid grid-3" style={{gap:'24px'}}>
            {actionImages.map((img, idx) => (
              <RevealCard key={img.url} delay={80+idx*80}>
                <div style={{
                  overflow:'hidden',
                  borderRadius:'16px',
                  position:'relative',
                  boxShadow:'0 6px 32px #22344344,0 0 1px var(--border)',
                  background:'linear-gradient(145deg,var(--surface-2),rgba(6,177,214,0.08) 100%)',
                  border:'1px solid var(--border)',
                  padding:0
                }}>
                  <img src={img.url}
                    width={480} height={320}
                    alt={img.alt}
                    style={{
                      width:'100%',
                      height:'220px',
                      objectFit:'cover',
                      display:'block',
                      boxShadow:'inset 0 -20px 48px #18242Ecc',
                      borderBottom:'2px solid var(--secondary)'
                    }}
                  />
                  <span className="badge" style={{
                    background:'var(--secondary)',
                    color:'var(--accent)',borderRadius:'16px',
                    fontFamily:'Orbitron,sans-serif',fontWeight:700,
                    fontSize:'1rem',
                    position:'absolute',top:'14px',left:'18px',padding:'4px 16px',
                    boxShadow:'0 1px 8px #D92F2333'
                  }}>
                    {img.tag}
                  </span>
                  <div style={{
                    padding:'18px 24px 20px',
                    fontFamily:'Inter,sans-serif',color:'var(--text)',fontWeight:500,
                    fontSize:'1.2rem',letterSpacing:'.01em'
                  }}>
                    {img.caption}
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Product shots grid */}
      <section className="section gallery-products" style={{background:'var(--surface-2)'}}>
        <div className="container">
          <div className="section-head" style={{
            fontFamily:'Orbitron,sans-serif',fontWeight:700,
            color:'var(--text)',fontSize:'clamp(1.5rem,3vw,3rem)',marginBottom:'32px',
            textShadow:'0 1px 12px #20314D,0 1px 0 #EEF6FA',
            letterSpacing: '0.05em',
            position: 'relative'
          }}>
            <span style={{borderBottom:'4px solid var(--secondary)',display:'inline-block',paddingBottom:'6px'}}>Product Shots</span>
            <span style={{
              position:'absolute',left:0,bottom:'0',
              width:'100%',height:'4px',background:'linear-gradient(90deg,var(--secondary) 60%,transparent 100%)',
              clipPath:'polygon(0 70%,12% 84%,22% 40%,37% 100%,76% 75%,100% 0,100% 100%,0 100%)',
              zIndex:1,opacity:0.7
            }} />
          </div>
          {loading && <Spinner />}
          {error && <div className="gallery-error" style={{color:'var(--secondary)',fontFamily:'Inter,sans-serif',marginTop:28}}>{error}</div>}
          {!loading && !error && sticks?.length === 0 && (
            <div className="gallery-empty" style={{color:'var(--muted)',margin:'24px 0',fontFamily:'Inter,sans-serif',fontSize:'1.2rem'}}>
              No product shots yet. Check back soon!
            </div>
          )}
          <div className="grid grid-3" style={{gap:'24px'}}>
            {!loading && !error && sticks?.map((stick, idx) => (
              <RevealCard key={stick._id} delay={100+idx*70}>
                <div className="feature-card" style={{
                  border:'1px solid var(--border)',
                  borderRadius:'18px',
                  background:'linear-gradient(120deg,var(--surface),rgba(6,177,214,0.06))',
                  boxShadow:'0 8px 36px #22344366,0 0 2px var(--border)'
                }}>
                  <img
                    src={stick.imageUrl || 'https://loremflickr.com/420/180/hockey,stick?lock=92'}
                    alt={`amipro ${stick.name || ''} hockey stick`}
                    width={420} height={180}
                    style={{
                      width:'100%',
                      height:'180px',
                      objectFit:'cover',
                      borderRadius:'18px 18px 0 0',
                      borderBottom:'2px solid var(--secondary)',
                      boxShadow:'inset 0 -16px 38px #18242Eaa'
                    }}
                  />
                  <div className="feature-content" style={{padding:'22px 26px'}}>
                    <h3 style={{
                      fontFamily:'Orbitron, sans-serif',fontWeight:700,fontSize:'clamp(1.1rem,2vw,2rem)',margin:'0 0 10px',color:'var(--text)',
                      letterSpacing:'.02em'
                    }}>
                      {stick.name || 'amipro Stick'}
                    </h3>
                    <span className="tag" style={{
                      background:'var(--primary)',color:'var(--surface)',borderRadius:'14px',fontSize:'1rem',fontWeight:700,fontFamily:'Orbitron,sans-serif',padding:'2px 12px',display:'inline-block',marginBottom:'10px'
                    }}>
                      ${stick.price?.toFixed(2) ?? 'N/A'}
                    </span>
                    <div style={{
                      color:'var(--muted)',fontFamily:'Inter,sans-serif',
                      fontSize:'1.08rem',minHeight:'48px'
                    }}>
                      {(stick.description ?? '').slice(0,68)}
                    </div>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Company Events */}
      <section className="section gallery-events" style={{background:'var(--surface)' }}>
        <div className="container">
          <div className="section-head" style={{
            fontFamily:'Orbitron,sans-serif',fontWeight:700,
            color:'var(--text)',fontSize:'clamp(1.5rem,3vw,3rem)',marginBottom:'32px',
            textShadow:'0 1px 12px #20314D,0 1px 0 #EEF6FA',
            letterSpacing: '0.05em',
            position: 'relative'
          }}>
            <span style={{borderBottom:'4px solid var(--secondary)',display:'inline-block',paddingBottom:'6px'}}>amipro Events</span>
            <span style={{
              position:'absolute',left:0,bottom:0,
              width:'100%',height:'4px',background:'linear-gradient(90deg,var(--secondary) 70%,transparent 100%)',
              clipPath:'polygon(0 65%,16% 95%,26% 41%,31% 98%,82% 69%,100% 0,100% 100%,0 100%)',
              zIndex:1,opacity:0.7
            }} />
          </div>
          <div className="grid grid-2" style={{gap:'24px'}}>
            <RevealCard delay={90}>
              <div className="card" style={{
                border:'1px solid var(--border)', borderRadius:'20px',background:'linear-gradient(140deg,var(--surface-2),rgba(6,177,214,0.09))', boxShadow:'0 6px 32px #22344366,0 0 2px var(--border)'
              }}>
                <img src="https://loremflickr.com/560/360/hockey,expo,event?lock=210"
                  alt="amipro booth at international hockey expo"
                  width={560} height={360}
                  style={{
                    width:'100%',height:'220px',objectFit:'cover',borderRadius:'20px 20px 0 0',borderBottom:'3px solid var(--accent)',boxShadow:'inset 0 -16px 30px #20314D55'
                  }}
                />
                <div style={{padding:'22px 26px',fontFamily:'Inter,sans-serif',color:'var(--text)',fontWeight:500,fontSize:'1.1rem'}}>
                  <span className="badge" style={{background:'var(--accent)',color:'var(--surface-2)',borderRadius:'14px',fontFamily:'Orbitron, sans-serif',fontWeight:700,fontSize:'1rem',display:'inline-block',marginBottom:'8px',padding:'3px 14px'}}>Tech Expo</span>
                  <strong>2023 Pro-Stick Launch Event:</strong> amipro unveiled its latest elite gear at the Montreal Hockey Tech Expo, sharing innovation and performance with the global hockey community.
                </div>
              </div>
            </RevealCard>
            <RevealCard delay={210}>
              <div className="testimonial-card" style={{
                border:'1px solid var(--border)',borderRadius:'20px',background:'linear-gradient(120deg,var(--surface),rgba(6,177,214,0.06))', boxShadow:'0 6px 32px #22344344,0 0 1px var(--border)'
              }}>
                <div style={{display:'flex',alignItems:'center',gap:'20px',padding:'24px'}}>
                  <img src="https://i.pravatar.cc/120?img=44"
                    alt="amipro founder portrait"
                    width={80} height={80}
                    style={{borderRadius:'100%',border:'3px solid var(--secondary)',boxShadow:'0 2px 16px #06B1D644'}}
                  />
                  <div>
                    <div className="testimonial-author" style={{fontFamily:"Orbitron,sans-serif",fontWeight:900,color:'var(--primary)',fontSize:'1.1rem',letterSpacing:'.05em'}}>Sasha Tran</div>
                    <div style={{color:'var(--accent)',fontWeight:700,fontSize:'1rem',marginBottom:'4px'}}>Founder, amipro</div>
                    <div style={{fontFamily:'Inter,sans-serif',color:'var(--text)',fontWeight:500,fontSize:'1rem'}}>
                      "Our vision is more than sticks—we build competitive edges and icy brilliance for every player, event, and match. Here’s what the game looks like with amipro: intensity, precision, triumph."
                    </div>
                  </div>
                </div>
              </div>
            </RevealCard>
          </div>
        </div>
      </section>

      <section className="section gallery-final-cta" style={{background:'var(--surface-2)'}}>
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-head" style={{
            fontFamily:'Orbitron,sans-serif',fontWeight:700,
            color:'var(--text)',fontSize:'clamp(1.1rem,2vw,2rem)',marginBottom:'20px',
            textShadow:'0 1px 12px #20314D,0 1px 0 #EEF6FA',
            letterSpacing: '0.06em',
            display:'inline-block'
          }}>
            <span style={{borderBottom:'4px solid var(--secondary)',display:'inline-block',paddingBottom:'6px'}}>Ready to seize your edge?</span>
          </div>
          <p style={{fontFamily:'Inter,sans-serif',color:'var(--muted)',fontWeight:500,fontSize:'clamp(1rem,1.5vw,1.2rem)',marginBottom:'28px'}}>
            See what next-gen hockey looks like—visit our Sticks page or connect for custom orders, and join the amipro movement.
          </p>
          <div className="hero-actions" style={{marginBottom:'32px'}}>
            <a className="btn btn-primary" href="/sticks" style={{marginRight:'18px'}}>Explore Sticks</a>
            <a className="btn btn-secondary" href="/contact">Contact amipro</a>
          </div>
          <img
            src="https://loremflickr.com/560/240/hockey,amipro,sticks?lock=746"
            alt="amipro sticks stacked, icy blue backdrop"
            width={560}
            height={240}
            style={{
              margin:'52px auto 0',display:'block',
              borderRadius:'22px',
              border:'2px solid var(--secondary)',
              boxShadow:'0 6px 38px #06B1D644,0 0 1px var(--border)'
            }}
          />
        </div>
      </section>
    </div>
  )
}