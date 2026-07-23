import React, { useEffect, useState } from 'react'
import axios from 'axios'

function StickCard({ stick, onReview, reviews }) {
  return (
    <div className="card stick-card" style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <img
        src={stick.imageUrl || `https://loremflickr.com/400/250/hockey,stick?lock=${stick._id}`}
        width="400"
        height="250"
        alt={`${stick.name} hockey stick`}
        className="stick-image"
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
          borderRadius: '18px 18px 0 0',
          boxShadow: '0 8px 32px rgba(6,177,214,0.22)',
        }}
      />
      <div className="stick-card-body" style={{ padding: '2rem' }}>
        <div className="eyebrow" style={{ marginBottom: '0.8rem', letterSpacing: '0.1em', color: 'var(--primary)' }}>
          Elite Series
        </div>
        <h3 className="stick-card-title" style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
          fontSize: '1.35rem',
          lineHeight: 1.2,
          color: 'var(--text)',
          marginBottom: '1rem'
        }}>
          {stick.name}
        </h3>
        <p className="stick-card-desc" style={{
          color: 'var(--muted)',
          fontFamily: 'Inter, sans-serif',
          marginBottom: '1rem',
          minHeight: '2.5rem'
        }}>
          {stick.description || ''}
        </p>
        <div className="stats" style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem'}}>
          <div className="stat-value" style={{fontWeight:700, fontFamily: 'Orbitron', fontSize:'1.2rem', color:'var(--primary)'}}>${stick.price?.toFixed(2) ?? 'N/A'}</div>
          <span className="stat-label" style={{color:'var(--accent)', fontWeight:'500'}}>USD</span>
        </div>
        <div className="stick-actions" style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onReview(stick)} style={{ fontFamily: 'Orbitron', textTransform:'uppercase' }}>
            Leave Review
          </button>
        </div>
        {reviews && reviews.length > 0 && (
          <div className="stick-reviews" style={{marginTop: '2rem'}}>
            <div style={{fontWeight:'700', color:'var(--secondary)', fontFamily:'Orbitron', marginBottom:'0.5rem'}}>
              Player Reviews
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
              {reviews.slice(0,2).map((rev) => (
                <div className="testimonial-card" key={rev._id} style={{background:'var(--surface-2)', padding:'1.1rem', borderRadius:'10px', border:'1px solid var(--border)', boxShadow:'0 2px 16px rgba(33,52,67,0.20)'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'0.8rem'}}>
                    <img src={`https://i.pravatar.cc/120?img=${rev.userName.length % 60}`} alt={`${rev.userName} avatar`} width="38" height="38" style={{borderRadius:'50%', border:'2px solid var(--primary)'}} />
                    <span style={{fontWeight:'700', color:'var(--text)', fontFamily:'Inter'}}>{rev.userName}</span>
                    <span className="badge" style={{background:'var(--accent)', color:'var(--surface)', fontWeight:'700', borderRadius:'12px', padding:'0 0.6rem', marginLeft:'auto'}}>
                      {rev.rating ?? ''}★
                    </span>
                  </div>
                  <div style={{color:'var(--muted)',marginTop:'0.3rem'}}>
                    {rev.comment || ''}
                  </div>
                  <div style={{fontSize:'0.85rem', color:'var(--accent)', marginTop:'0.2rem'}}>
                    {new Date(rev.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ReviewForm({ stick, onClose, onSubmit }) {
  const [userName, setUserName] = useState('')
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!userName.trim() || !rating || !comment.trim()) {
      setError('All fields are required.')
      return
    }
    if (rating < 1 || rating > 5) {
      setError('Rating must be 1-5 stars.')
      return
    }
    setLoading(true)
    try {
      await onSubmit({ stickId: stick._id, userName, rating: Number(rating), comment, date: new Date() })
      setUserName('')
      setRating('')
      setComment('')
      setError('')
      onClose()
    } catch (err) {
      setError('Failed to submit review.')
    }
    setLoading(false)
  }

  return (
    <div className="review-modal" style={{
      position:'fixed', left:0, top:0, width: '100vw', height:'100vh',
      background:'rgba(24,36,46,0.85)',backdropFilter:'blur(6px)', zIndex:99,
      display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <form className="card" style={{background:'var(--surface)', border:'2px solid var(--secondary)', borderRadius:'16px', boxShadow:'0 8px 32px rgba(33,52,67,0.36)', padding:'2.2rem', width:'420px',maxWidth:'97vw',position:'relative'}} onSubmit={handleSubmit}>
        <div style={{fontFamily:'Orbitron', fontWeight:900, fontSize:'1.35rem', color:'var(--primary)', marginBottom:'0.7rem'}}>
          Review {stick.name}
        </div>
        <div className="form-group" style={{marginBottom:'1rem'}}>
          <label htmlFor="userName" style={{color:'var(--text)', fontWeight:'500'}}>Your Name</label>
          <input
            id="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            type="text"
            maxLength={24}
            autoFocus
            className="input"
            style={{width:'100%', padding:'0.8rem', marginTop:'0.4rem', border:'1px solid var(--border)', borderRadius:'8px', background:'var(--surface-2)', color:'var(--text)'}}
          />
        </div>
        <div className="form-group" style={{marginBottom:'1rem'}}>
          <label htmlFor="rating" style={{color:'var(--text)', fontWeight:'500'}}>Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={e => setRating(e.target.value)}
            className="input"
            style={{width:'100%', padding:'0.8rem', marginTop:'0.4rem', border:'1px solid var(--border)', borderRadius:'8px', background:'var(--surface-2)', color:'var(--primary)'}}
          >
            <option value="">Select...</option>
            {[1,2,3,4,5].map(star =>
              <option key={star} value={star}>{star} Star{star>1?'s':''}</option>
            )}
          </select>
        </div>
        <div className="form-group" style={{marginBottom:'1rem'}}>
          <label htmlFor="comment" style={{color:'var(--text)', fontWeight:'500'}}>Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxLength={180}
            className="input"
            style={{width:'100%', minHeight:'70px', padding:'0.8rem', marginTop:'0.4rem', border:'1px solid var(--border)', borderRadius:'8px', background:'var(--surface-2)', color:'var(--text)'}}
          />
        </div>
        {error && <div className="error" style={{color:'var(--secondary)', margin:'0.7rem 0'}}>{error}</div>}
        <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem'}}>
          <button type="button" className="btn btn-secondary" onClick={onClose} style={{fontFamily:'Orbitron'}}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{fontFamily:'Orbitron', textTransform:'uppercase'}}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Sticks() {
  const [sticks, setSticks] = useState([])
  const [reviewsByStick, setReviewsByStick] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingReviews, setLoadingReviews] = useState({})
  const [error, setError] = useState('')
  const [reviewStick, setReviewStick] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('/api/sticks')
      .then(res => setSticks(res.data || []))
      .catch(() => setError('Failed to load sticks.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // Fetch reviews per stick
    if (!sticks.length) return
    sticks.forEach(stick => {
      setLoadingReviews(prev => ({ ...prev, [stick._id]: true }))
      axios.get('/api/reviews?stickId=' + encodeURIComponent(stick._id))
        .then(res =>
          setReviewsByStick(prev => ({ ...prev, [stick._id]: res.data || [] })))
        .catch(() =>
          setReviewsByStick(prev => ({ ...prev, [stick._id]: [] })))
        .finally(() => setLoadingReviews(prev => ({ ...prev, [stick._id]: false })))
    })
  }, [sticks])

  const handleReviewSubmit = async review => {
    setSubmitting(true)
    try {
      await axios.post('/api/reviews', review)
      // Re-fetch for the reviewed stick
      axios.get('/api/reviews?stickId=' + encodeURIComponent(review.stickId))
        .then(res =>
          setReviewsByStick(prev => ({ ...prev, [review.stickId]: res.data || [] })))
    } catch (e) {
      // error feedback is handled in ReviewForm
    }
    setSubmitting(false)
  }

  return (
    <>
      {/* Page Hero */}
      <section className="hero" style={{background:'linear-gradient(110deg, #233447 68%, rgba(6,177,214,0.16) 120%)', clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'}}>
        <div className="container">
          <span className="eyebrow">amipro Sticks</span>
          <h1 style={{fontFamily:'Orbitron', fontWeight:900, fontSize:'clamp(2.7rem,4vw,5rem)', letterSpacing:'0.07em', textShadow:'0 2px 14px #295061'}}>
            <span className="gradient-text" style={{background:'linear-gradient(98deg,var(--accent) 24%, var(--primary) 96%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Engineered for Victory</span>
          </h1>
          <p className="hero-subtitle" style={{color:'var(--muted)',fontSize:'clamp(1rem,1.5vw,1.2rem)'}}>Discover the precision, power, and icy speed of amipro sticks. Unleash your game.</p>
        </div>
      </section>

      {/* Stick Grid */}
      <section className="section" style={{background:'var(--surface)', marginTop:'-30px'}}>
        <div className="container">
          <div className="section-head" style={{marginBottom:'2rem'}}>
            <h2 style={{
              fontFamily:'Orbitron',fontWeight:700, fontSize:'clamp(1.5rem,3vw,3rem)',
              letterSpacing:'0.06em', color:'var(--text)',textShadow:'0 2px 10px #EFF6FAB0',
              borderBottom:'4px solid var(--secondary)', paddingBottom:'0.7rem',
              marginBottom:'0.4rem',display:'inline-block',clipPath:'polygon(0 90%, 96% 100%, 100% 40%, 100% 0, 0 0)'
            }}>Our Elite Hockey Sticks</h2>
            <p style={{color:'var(--muted)',fontSize:'1.2rem'}}>Browse the collection, compare new releases, and read player reviews.</p>
          </div>
          {loading ? (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'150px'}}>
              <svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="var(--primary)" strokeWidth="6" fill="none" strokeDasharray="90" strokeDashoffset="40"><animate attributeName="stroke-dashoffset" values="40;90;40" dur="1.1s" repeatCount="indefinite"/></circle></svg>
            </div>
          ) : error ? (
            <div style={{color:'var(--secondary)', fontWeight:'700',textAlign:'center'}}>{error}</div>
          ) : sticks.length === 0 ? (
            <div style={{color:'var(--muted)', fontWeight:'700',textAlign:'center'}}>No sticks found. Stay tuned for upcoming releases.</div>
          ) : (
            <div className="grid grid-3" style={{gap:'24px'}}>
              {sticks.map(stick =>
                <StickCard
                  key={stick._id}
                  stick={stick}
                  onReview={setReviewStick}
                  reviews={reviewsByStick[stick._id] ?? []}
                />
              )}
            </div>
          )}
        </div>
        {reviewStick && (
          <ReviewForm
            stick={reviewStick}
            onClose={() => setReviewStick(null)}
            onSubmit={handleReviewSubmit}
          />
        )}
      </section>

      {/* Features Section */}
      <section className="section" style={{background:'var(--surface-2)',marginTop:'-20px'}}>
        <div className="container">
          <div className="section-head">
            <h2 style={{
              fontFamily:'Orbitron',fontWeight:700,fontSize:'clamp(1.5rem,3vw,3rem)',
              color:'var(--text)',letterSpacing:'0.09em',
              textShadow:'0 2px 12px #EFF6FA44', borderBottom:'4px solid var(--secondary)', paddingBottom:'0.7rem',
              marginBottom:'0.4rem',display:'inline-block',clipPath:'polygon(0 90%, 96% 100%, 100% 40%, 100% 0, 0 0)'
            }}>Stick Technologies</h2>
            <p style={{color:'var(--muted)',fontSize:'1.1rem'}}>Why choose amipro sticks?</p>
          </div>
          <div className="grid grid-4" style={{gap:'24px'}}>
            <div className="feature-card" style={{
              background:'linear-gradient(100deg,var(--surface) 60%,rgba(6,177,214,0.13) 100%)',
              border:'2px solid var(--border)',borderRadius:'14px',padding:'1.4rem',position:'relative'
            }}>
              <div className="feature-icon" style={{
                width:'48px',height:'48px',background:'linear-gradient(120deg,var(--primary) 65%,var(--surface-2) 100%)',
                borderRadius:'13px',marginBottom:'1rem',display:'flex', alignItems:'center', justifyContent:'center',boxShadow:'0 2px 8px var(--primary)'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32"><path fill="var(--accent)" d="M3 28l17-26 3 22 6 4z"/></svg>
              </div>
              <div style={{fontWeight:'700', fontFamily:'Orbitron',color:'var(--primary)',fontSize:'1.1rem', marginBottom:'0.4rem'}}>Carbon-X Layer</div>
              <div style={{color:'var(--muted)', fontFamily:'Inter'}}>High-tech carbon fiber core for featherweight durability, advanced puck control.</div>
            </div>
            <div className="feature-card" style={{
              background:'linear-gradient(105deg,var(--surface) 68%,rgba(217,47,35,0.10) 100%)',
              border:'2px solid var(--border)',borderRadius:'14px',padding:'1.4rem',position:'relative'
            }}>
              <div className="feature-icon" style={{
                width:'48px',height:'48px',background:'linear-gradient(120deg,var(--secondary) 60%,var(--accent) 100%)',
                borderRadius:'13px',marginBottom:'1rem',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px var(--secondary)'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32"><path fill="var(--surface)" d="M6 28c-1-8 6-22 17-10 3 10-2 14-6 14z"/></svg>
              </div>
              <div style={{fontWeight:'700', fontFamily:'Orbitron',color:'var(--secondary)',fontSize:'1.1rem', marginBottom:'0.4rem'}}>FlexTune Shaft</div>
              <div style={{color:'var(--muted)', fontFamily:'Inter'}}>Custom flex profiles for explosive shot release and responsive handling.</div>
            </div>
            <div className="feature-card" style={{
              background:'linear-gradient(101deg,var(--surface) 60%,rgba(255,192,55,0.14) 100%)',
              border:'2px solid var(--border)',borderRadius:'14px',padding:'1.4rem',position:'relative'
            }}>
              <div className="feature-icon" style={{
                width:'48px',height:'48px',background:'linear-gradient(124deg,var(--accent) 72%,var(--primary) 100%)',
                borderRadius:'13px',marginBottom:'1rem',display:'flex',alignItems:'center',justifyContent:'center', boxShadow:'0 2px 8px var(--accent)'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32"><circle fill="var(--primary)" cx="16" cy="16" r="12"/><path fill="var(--accent)" d="M16 14l7 7-2 2-5-5-5 5-2-2z"/></svg>
              </div>
              <div style={{fontWeight:'700', fontFamily:'Orbitron',color:'var(--accent)',fontSize:'1.1rem',marginBottom:'0.4rem'}}>IcyGrip Blade</div>
              <div style={{color:'var(--muted)', fontFamily:'Inter'}}>Anti-slip nano-textured blade giving insane puck control on frozen and wet ice.</div>
            </div>
            <div className="feature-card" style={{
              background:'linear-gradient(114deg,var(--surface) 60%,rgba(6,177,214,0.12) 100%)',
              border:'2px solid var(--border)',borderRadius:'14px',padding:'1.4rem',position:'relative'
            }}>
              <div className="feature-icon" style={{
                width:'48px',height:'48px',background:'linear-gradient(110deg,var(--primary) 65%,var(--surface-2) 100%)',borderRadius:'13px',marginBottom:'1rem',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px var(--primary)'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32"><rect fill="var(--primary)" x="7" y="7" width="18" height="18" rx="6"/><path fill="var(--accent)" d="M15 19v-6h2v6z"/></svg>
              </div>
              <div style={{fontWeight:'700', fontFamily:'Orbitron',color:'var(--primary)',fontSize:'1.1rem',marginBottom:'0.4rem'}}>Glacier Impact</div>
              <div style={{color:'var(--muted)', fontFamily:'Inter'}}>Engineered vibration dampening so every shot feels razor sharp, never sluggish.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Testimonials */}
      <section className="section" style={{background:'var(--surface)',marginTop:'-10px'}}>
        <div className="container">
          <div className="section-head">
            <h2 style={{
              fontFamily:'Orbitron',fontWeight:700,fontSize:'clamp(1.5rem,3vw,3rem)',
              color:'var(--text)',letterSpacing:'0.08em',
              textShadow:'0 2px 10px #EFF6FABA', borderBottom:'4px solid var(--secondary)', paddingBottom:'0.7rem',marginBottom:'0.4rem',display:'inline-block',clipPath:'polygon(0 90%, 96% 100%, 100% 40%, 100% 0, 0 0)'
            }}>Pro Player Testimonials</h2>
            <p style={{color:'var(--muted)',fontSize:'1.1rem'}}>Trusted by athletes in the national league.</p>
          </div>
          <div className="grid grid-3" style={{gap:'24px'}}>
            {[
              {
                userName:"Jackson R.",
                comment:"The Carbon-X is literally lighter, faster, with zero dead spots. My slapshot is up +6 mph. Unreal.",
                rating:5,
                img:21
              },
              {
                userName:"Sasha T.",
                comment:"I didn’t believe the IcyGrip until I felt it — puck stays glued even on wet ice. Shooting feels super crisp.",
                rating:5,
                img:7
              },
              {
                userName:"Liam K.",
                comment:"Love the FlexTune, it gives a whip you can genuinely feel. Made the game-winning goal last week. Thank you amipro!",
                rating:5,
                img:15
              }
            ].map((rev, idx) => (
              <div className="testimonial-card" key={idx} style={{
                background:'var(--surface-2)',padding:'1.3rem',borderRadius:'11px', border:'2px solid var(--border)', boxShadow:'0 2px 16px rgba(33,52,67,0.17)'
              }}>
                <div style={{display:'flex',alignItems:'center',gap:'0.8rem',marginBottom:'0.5rem'}}>
                  <img src={`https://i.pravatar.cc/120?img=${rev.img}`} alt={`${rev.userName} avatar`} width="50" height="50" style={{borderRadius:'50%', border:'2px solid var(--primary)'}} />
                  <span style={{fontWeight:'700',color:'var(--text)',fontFamily:'Inter',fontSize:'1rem'}}>{rev.userName}</span>
                  <span className="badge" style={{background:'var(--accent)',color:'var(--surface)',fontWeight:'700',borderRadius:'12px',padding:'0 0.8rem',marginLeft:'auto'}}>{rev.rating}★</span>
                </div>
                <div style={{color:'var(--muted)',fontSize:'1rem'}}>{rev.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}