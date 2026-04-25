import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, Ticket, Mail } from 'lucide-react';

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(true);
  
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const event = searchParams.get('event') || '';
  const seatsParam = searchParams.get('seats') || '';
  const seatsArray = seatsParam ? seatsParam.split(',') : [];
  
  const venue = searchParams.get('venue') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const price = searchParams.get('price') || '';
  const city = searchParams.get('city') || '';

  const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="app-wrapper animate-slide-up">
      <div className="container">
        <section className="confirmation-section" style={{ minHeight: '80vh' }}>
          <div className="confirmation-card">
            <div className="confirmation-header">
              <div className="confirmation-check">
                <CheckCircle size={36} />
              </div>
              <h1>Booking Confirmed!</h1>
              <p>Your tickets have been booked successfully</p>
            </div>

            <div className="ticket">
              <div className="ticket-left">
                <h2 className="ticket-event">{event}</h2>
                <p className="ticket-city">{city}</p>
                
                <div className="ticket-details">
                  <div className="ticket-detail">
                    <span className="ticket-label">Name</span>
                    <span className="ticket-value">{name}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="ticket-label">Email</span>
                    <span className="ticket-value">{email}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="ticket-label">Date</span>
                    <span className="ticket-value">{date}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="ticket-label">Time</span>
                    <span className="ticket-value">{time}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="ticket-label">Venue</span>
                    <span className="ticket-value">{venue}</span>
                  </div>
                </div>
              </div>
              
              <div className="ticket-right">
                <div className="ticket-seat-label">SEATS ({seatsArray.length})</div>
                <div className="ticket-seat-num" style={{ fontSize: seatsArray.length > 3 ? '1.2rem' : '1.8rem', lineHeight: '1.2', textAlign: 'center', wordBreak: 'break-all' }}>
                  {seatsArray.join(', ')}
                </div>
                <div className="ticket-price" style={{ marginTop: '0.5rem' }}>{price}</div>
                <div className="ticket-id" style={{ marginTop: '0.2rem' }}>{ticketId}</div>
                <div className="ticket-barcode">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="barcode-line" style={{ height: `${Math.random() * 20 + 15}px` }}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="confirmation-actions">
              <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Home size={16} /> Back to Home
              </Link>
              <Link to="/cities" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Ticket size={16} /> Book Another Event
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-icon">
              <Mail size={40} />
            </div>
            <h2>Check Your Mail!</h2>
            <p>
              We've sent your official tickets and a QR code for entry to <strong>{email}</strong>. 
              Please check your mail to ensure you have everything ready for the event.
            </p>
            <button 
              className="btn btn-primary modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;

