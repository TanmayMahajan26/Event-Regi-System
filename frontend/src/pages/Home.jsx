import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Calendar, Armchair, Ticket, ArrowRight, Sparkles } from 'lucide-react';
import Header from '../components/Header';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + 5 * 86400000 + 12 * 3600000;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="app-wrapper animate-slide-up">
      <svg className="deco-swoosh top-left-swoosh" width="80" height="120" viewBox="0 0 80 120" fill="none">
        <path d="M10 110C20 70 65 80 75 10" stroke="#fbab7e" strokeWidth="7" strokeLinecap="round" fill="none"/>
      </svg>

      <div className="container">
        <Header />

        <section className="hero-section">
          <div className="hero-content">
            <h1>
              Register for<br/>
              events and <br/>
              <span className="highlight-text">Manage</span> Entries
            </h1>
            <p>
              Build your modern Event Registration System. Discover, register for events, and allow admins to seamlessly manage all registrations.
            </p>
            
            <div className="event-timer">
              <h4>Next big event in</h4>
              <div className="timer-nums">
                <div>{pad(timeLeft.days)}<span>Days</span></div>
                <div className="timer-colon">:</div>
                <div>{pad(timeLeft.hours)}<span>Hours</span></div>
                <div className="timer-colon">:</div>
                <div>{pad(timeLeft.minutes)}<span>Min</span></div>
                <div className="timer-colon">:</div>
                <div>{pad(timeLeft.seconds)}<span>Sec</span></div>
              </div>
            </div>

            <Link to="/cities" className="btn btn-primary" style={{ marginTop: '2rem', fontSize: '1.1rem', padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Browse Events Near You <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="hero-illustration">
            <img src="/hero-image.png" alt="Hero illustration" style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-brutal)' }} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works">
          <h2 className="section-title" style={{ textAlign: 'center', maxWidth: '100%' }}>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon-wrap"><MapPin size={28} /></div>
              <h3>Pick Your City</h3>
              <p>Select your metro city using iconic landmarks</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon-wrap"><Search size={28} /></div>
              <h3>Choose an Event</h3>
              <p>Browse meetups, workshops & masterclasses near you</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon-wrap"><Armchair size={28} /></div>
              <h3>Select Your Seat</h3>
              <p>Pick the perfect spot from our interactive seat map</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon-wrap"><Ticket size={28} /></div>
              <h3>Book & Confirm</h3>
              <p>Enter your details and get instant confirmation</p>
            </div>
          </div>
        </section>

        {/* FEATURED EVENTS */}
        <section style={{ padding: '4rem 0' }}>
          <h2 className="section-title" style={{ textAlign: 'center', maxWidth: '100%' }}>Featured Events</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Hand-picked events from across India's top metro cities
          </p>
          <div className="featured-events">
            {[
              { name: 'Designer Meetup 2026', city: 'Mumbai', date: 'May 24', color: '#4f7dfd' },
              { name: 'Tech & Design Summit', city: 'Delhi', date: 'May 30', color: '#f34b5c' },
              { name: 'Startup Design Night', city: 'Bangalore', date: 'May 28', color: '#43e97b' },
            ].map((evt, i) => (
              <div key={i} className="featured-card" style={{ '--card-color': evt.color }}>
                <div className="featured-card-accent" style={{ background: evt.color }}></div>
                <h3>{evt.name}</h3>
                <p>{evt.city} · {evt.date}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/cities" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              See All Events <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer-section">
          <div className="footer-bottom">
            <div className="footer-logo">m</div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/cities">Events</Link>
              <Link to="/admin">Admin</Link>
            </div>
            <p className="footer-copyright">© 2026 Designer Meetup. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
