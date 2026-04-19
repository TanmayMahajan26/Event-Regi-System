import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-cta">
        {/* Decorative swooshes */}
        <svg className="deco-swoosh footer-swoosh-left" width="60" height="80" viewBox="0 0 60 80" fill="none">
          <path d="M5 75C15 55 50 60 55 5" stroke="#fcd873" strokeWidth="6" strokeLinecap="round" fill="none"/>
        </svg>
        
        <div className="footer-cta-content">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Stay updated<br/>about events
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Subscribe to our newsletter to get the latest updates about upcoming designer meetups, workshops, and exclusive events.
          </p>
          <div className="footer-newsletter">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="form-input footer-email-input"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>

        <svg className="deco-swoosh footer-swoosh-right" width="60" height="80" viewBox="0 0 60 80" fill="none">
          <path d="M55 75C45 55 10 60 5 5" stroke="#f34b5c" strokeWidth="6" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">m</div>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Agenda</a>
          <a href="#">Speakers</a>
          <a href="#">Events</a>
        </div>
        <p className="footer-copyright">© 2026 Designer Meetup. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
