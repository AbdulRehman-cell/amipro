import React, { useEffect, useState } from "react";

export default function About() {
  // For entrance animation
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hard-coded team data
  const team = [
    {
      name: "Ravi Malhotra",
      role: "Founder & CEO",
      bio: "A lifelong hockey devotee and materials engineer, Ravi founded amipro to push the limits of performance. Over 20 years developing elite gear.",
      avatar: 7,
    },
    {
      name: "Anjali Singh",
      role: "Creative Director",
      bio: "Brings kinetic vision to technical product. Crafts each stick’s visual story and leads the brand’s frost-cool visuals.",
      avatar: 18,
    },
    {
      name: "David Lee",
      role: "R&D Lead",
      bio: "Obsessed with stick geometry and edge dynamics; oversees iterative prototyping and field testing to optimize every blade.",
      avatar: 12,
    },
    {
      name: "Sarah Dsouza",
      role: "Community Manager",
      bio: "Forges strong bonds with youth teams, pros, and the hockey community. Champions gaps in access and fairness.",
      avatar: 26,
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section
        className={`hero${mounted ? " animate-fade-in" : ""}`}
        style={{
          background:
            "linear-gradient(120deg, rgba(34,52,67,0.92) 80%, rgba(6,177,214,0.38) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            About Amipro
          </span>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.7rem,4vw,5rem)",
              color: "var(--text)",
              textShadow:
                "0 1px 12px rgba(6,177,214,.1), 0 1px 1px #fff, 0 2px 2px #233243",
              letterSpacing: "0.03em",
            }}
          >
            For the <span className="gradient-text">Elite Edge</span>
          </h1>
          <p className="hero-subtitle" style={{ color: "var(--muted)" }}>
            Born in the rink. Engineered for the ice. Our mission: build the boldest, fastest, smartest hockey sticks on the planet.
          </p>
        </div>
        {/* Decorative SVG holographic "sticks" */}
        <svg
          aria-hidden
          viewBox="0 0 700 60"
          width={700}
          height={60}
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            opacity: 0.12,
            filter: "blur(4px)",
          }}
        >
          <g>
            <rect x="30" y="12" width="600" height="12" rx="6" fill="#06B1D6" />
            <rect
              x="60"
              y="36"
              width="540"
              height="8"
              rx="4"
              fill="url(#iceGrad)"
            />
          </g>
          <defs>
            <linearGradient id="iceGrad" x1="60" y1="40" x2="600" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EFF6FA" stopOpacity="0.7" />
              <stop offset="0.8" stopColor="#06B1D6" stopOpacity="0.7" />
              <stop offset="1" stopColor="#D92F23" stopOpacity="0.45" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* History & Mission */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem,3vw,3rem)",
                color: "var(--text)",
                textShadow:
                  "0 1px 6px #8BA3BC, 0 2px 2px #D92F23, 0 1px 1px #fff",
                borderBottom:
                  "5px solid var(--secondary)",
                display: "inline-block",
                paddingBottom: "0.4rem",
                letterSpacing: "0.04em",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(120deg, #FFC037 0%, #06B1D6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 900,
                }}
              >
                Our Story
              </span>
              <span style={{
                display: 'block',
                marginTop: '0.8rem',
                fontWeight: 500,
                fontSize: '1.25rem',
                color: 'var(--muted)'
              }}>
                Roots in competition. Dreams in innovation.
              </span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "2 1 400px", minWidth: 320 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "1.15rem", color: "var(--text)", marginBottom: "2rem", lineHeight: "1.5" }}>
                Amipro began with a spark: a single prototype, forged in a Durham garage, on a moonlit winter night.  Since day one, we've believed every player deserves gear that responds to their ambition—sticks that accelerate shots, sharpen control, and ignite their creativity on ice.
              </p>
              <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
                Our mission is relentlessly simple: combine advanced aerospace-grade materials with kinetic design to make every stick a weapon of precision.
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li className="badge" style={{
                  background: "linear-gradient(90deg, #06B1D6 40%, #D92F23 90%)",
                  color: "var(--text)",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                  display: "inline-block",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "32px",
                  letterSpacing: ".06em",
                  boxShadow: "0 2px 12px #2950617e"
                }}>
                  Designed for velocity, built for durability.
                </li><br/>
                <li className="badge" style={{
                  background: "linear-gradient(90deg, #223443 40%, #06B1D6 90%)",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                  display: "inline-block",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "32px",
                  letterSpacing: ".06em",
                  boxShadow: "0 2px 14px #06B1D63a"
                }}>
                  Innovating the edge one stick at a time.
                </li>
              </ul>
            </div>
            <div style={{ flex: "1 1 320px", minWidth: 220 }}>
              <img
                src="https://loremflickr.com/360/420/hockey,ice,equipment?lock=1"
                width={360}
                height={420}
                alt="Amipro hockey stick prototype with angular ice backdrop"
                style={{
                  borderRadius: "28px",
                  boxShadow: "0 4px 32px #295061b0, 0 1px 0 1px #D92F23",
                  border: "1px solid var(--border)",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values & USP */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem,3vw,3rem)",
                color: "var(--text)",
                borderBottom: "5px solid var(--secondary)",
                display: "inline-block",
                paddingBottom: "0.4rem",
                textShadow: "0 1px 6px #8BA3BC, 0 2px 2px #D92F23, 0 1px 1px #fff",
                letterSpacing: "0.04em",
              }}
            >
              Core Values
            </h2>
          </div>
          <div className="grid-3" style={{ gap: "2.5rem" }}>
            <div className="feature-card" style={{
              background: "linear-gradient(135deg, rgba(34,52,67,.99) 85%, rgba(6,177,214,.16))",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 28px #29506175, 0 0 1px 1px #D92F23",
              borderRadius: "18px",
              padding: "2rem",
              minHeight: "220px"
            }}>
              <div className="feature-icon" style={{ marginBottom: "1rem" }}>
                {/* Speed bolt SVG */}
                <svg width="48" height="48" aria-hidden fill="none" viewBox="0 0 48 48">
                  <path d="M14 8L36 8L22 24H32L14 40L18.5 25.5H8L14 8Z" fill="var(--primary)" stroke="var(--accent)" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title" style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem,2vw,2rem)",
                color: "var(--text)",
              }}>
                Kinetic Performance
              </h3>
              <p className="feature-desc" style={{
                color: "var(--muted)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                marginTop: "0.8rem"
              }}>
                Every stick is tuned for explosive acceleration and rapid shot velocity, using aerospace carbon and ice-flake geometries.
              </p>
            </div>
            <div className="feature-card" style={{
              background: "linear-gradient(135deg, rgba(34,52,67,.99) 85%, rgba(6,177,214,.16))",
              border: "1px solid var(--border)",
              boxShadow: "0 7px 36px #06B1D6aa, 0 0 1px 1px #D92F23",
              borderRadius: "18px",
              padding: "2rem",
              minHeight: "220px"
            }}>
              <div className="feature-icon" style={{ marginBottom: "1rem" }}>
                {/* Ice shield SVG */}
                <svg width="44" height="44" aria-hidden viewBox="0 0 44 44" fill="none">
                  <polygon points="22,2 40,10 35,38 22,42 9,38 4,10"
                    fill="#20314D" stroke="var(--primary)" strokeWidth="2" />
                  <rect x="13" y="16" width="18" height="16" rx="4"
                    fill="var(--accent)" stroke="var(--secondary)" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title" style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem,2vw,2rem)",
                color: "var(--text)",
              }}>
                Durability & Reliability
              </h3>
              <p className="feature-desc" style={{
                color: "var(--muted)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                marginTop: "0.8rem"
              }}>
                Our sticks withstand fierce slap-shots, high-impact collisions, and cold extremes—tested across pro leagues and youth tournaments.
              </p>
            </div>
            <div className="feature-card" style={{
              background: "linear-gradient(135deg, rgba(34,52,67,.99) 85%, rgba(6,177,214,.16))",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 28px #D92F23cc, 0 0 2px 1px #FFC037",
              borderRadius: "18px",
              padding: "2rem",
              minHeight: "220px"
            }}>
              <div className="feature-icon" style={{ marginBottom: "1rem" }}>
                {/* Teamwork SVG */}
                <svg width="48" height="48" aria-hidden fill="none" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="#06B1D6" stroke="var(--accent)" strokeWidth="2"/>
                  <path d="M24 20l10 10M24 20l-10 10" stroke="var(--surface-2)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title" style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem,2vw,2rem)",
                color: "var(--text)",
              }}>
                Community & Support
              </h3>
              <p className="feature-desc" style={{
                color: "var(--muted)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                marginTop: "0.8rem"
              }}>
                We invest in hockey clinics, charities, and skills camps for the next generation. Amipro is where your journey gets its edge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem,3vw,3rem)",
                color: "var(--text)",
                borderBottom: "5px solid var(--secondary)",
                display: "inline-block",
                paddingBottom: "0.4rem",
                textShadow: "0 1px 6px #8BA3BC, 0 2px 2px #D92F23, 0 1px 1px #fff",
                letterSpacing: "0.04em",
              }}
            >
              Meet the Team
            </h2>
          </div>
          <div className="grid-4" style={{ gap: "2rem" }}>
            {team.map((member, ix) => (
              <div className="card testimonial-card" key={member.name} style={{
                background: "linear-gradient(140deg, rgba(34,52,67,.97) 80%, #06B1D6 100%)",
                border: "1px solid var(--border)",
                borderRadius: "24px",
                boxShadow: "0 2px 28px #06B1D633, 0 0 2px 1px #D92F23",
                padding: "2rem",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                position: "relative"
              }}>
                <div style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "linear-gradient(120deg, #FFC037 30%, #06B1D6 100%)",
                  padding: "4px",
                  marginBottom: "0.6rem",
                  boxShadow: "0 1px 16px #29506144",
                }}>
                  <img
                    src={`https://i.pravatar.cc/120?img=${member.avatar}`}
                    alt={`${member.name} portrait`}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--surface-2)"
                    }}
                  />
                </div>
                <span className="badge" style={{
                  background: "linear-gradient(90deg, var(--secondary) 0%, var(--accent) 100%)",
                  color: "var(--bg)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "32px",
                  padding: "0.25rem 1.1rem",
                  marginBottom: "0.3rem"
                }}>
                  {member.role}
                </span>
                <h3 style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  color: "var(--text)",
                  letterSpacing: ".04em",
                  margin: 0,
                }}>{member.name}</h3>
                <p style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.05rem", textAlign: "center", marginTop: "0.3rem" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Last CTA */}
      <section className="section" style={{ background: "linear-gradient(120deg, #223443 75%, #06B1D6 100%)", marginTop: "40px" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ flex: "2 1 340px", minWidth: 280 }}>
            <div className="section-head">
              <h2
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.3rem,2vw,2.5rem)",
                  color: "var(--accent)",
                  textShadow: "0 2px 8px #06B1D6, 0 2px 2px #D92F23, 0 1px 1px #fff",
                  borderBottom: "5px solid var(--secondary)",
                  display: "inline-block",
                  paddingBottom: "0.4rem",
                  letterSpacing: "0.05em",
                }}
              >
                Ready to experience Amipro's edge?
              </h2>
            </div>
            <p style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.1rem", margin: "1.2rem 0" }}>
              Explore our latest stick lineup or connect with us to share your hockey dreams. Amipro is building the future—join our team!
            </p>
            <a href="/sticks" className="btn btn-primary" style={{ marginRight: "1rem" }}>
              View Sticks
            </a>
            <a href="/contact" className="btn btn-secondary">
              Contact Us
            </a>
          </div>
          <div style={{ flex: "1 1 240px", minWidth: 220 }}>
            <img
              src="https://loremflickr.com/300/320/hockey,team,ice?lock=18"
              width={300}
              height={320}
              alt="amipro hockey team lined up in branded gear"
              style={{
                borderRadius: "20px",
                boxShadow: "0 4px 18px #06B1D685, 0 2px 2px #D92F23",
                border: "1px solid var(--border)",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}