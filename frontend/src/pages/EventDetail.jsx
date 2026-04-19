import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Armchair, IndianRupee, Ticket } from 'lucide-react';
import Header from '../components/Header';
import { getEventById, getCityById } from '../data/events';

const EventDetail = () => {
  const { eventId } = useParams();
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="app-wrapper">
        <div className="container">
          <Header />
          <div className="empty-state">
            <h2>Event not found</h2>
            <Link to="/cities" className="btn btn-primary">Browse Events</Link>
          </div>
        </div>
      </div>
    );
  }

  const city = getCityById(event.cityId);
  const totalSeats = event.seats.rows * event.seats.cols;

  return (
    <div className="app-wrapper animate-slide-up">
      <div className="container">
        <Header />

        <section className="event-detail-section">
          <Link to={`/city/${event.cityId}`} className="back-link">← Back to {city?.name} Events</Link>

          <div className="event-detail-banner" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}bb)` }}>
            <div className="event-detail-banner-content">
              <span className="event-badge" style={{ fontSize: '0.85rem' }}>{event.category}</span>
              <h1>{event.name}</h1>
              <p className="event-detail-city"><MapPin size={16} /> {city?.name}</p>
            </div>
          </div>

          <div className="event-detail-grid">
            <div className="event-detail-main">
              <h2>About This Event</h2>
              <p className="event-detail-desc">{event.description}</p>

              <h3>What You'll Learn</h3>
              <ul className="event-highlights">
                {event.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="highlight-check">✓</span>
                    {h}
                  </li>
                ))}
              </ul>

              <h3>Speakers</h3>
              <div className="event-speakers-row">
                {event.speakers.map((s, i) => (
                  <div key={i} className="event-speaker-chip">
                    <div className="event-speaker-avatar" style={{ backgroundColor: event.color }}>
                      {s.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="event-detail-sidebar">
              <div className="event-info-card">
                <div className="event-info-row">
                  <span className="event-info-label"><Calendar size={15} /> Date</span>
                  <span className="event-info-value">{event.date}</span>
                </div>
                <div className="event-info-row">
                  <span className="event-info-label"><Clock size={15} /> Time</span>
                  <span className="event-info-value">{event.time}</span>
                </div>
                <div className="event-info-row">
                  <span className="event-info-label"><MapPin size={15} /> Venue</span>
                  <span className="event-info-value">{event.venue}</span>
                </div>
                <div className="event-info-row">
                  <span className="event-info-label"><Armchair size={15} /> Seats</span>
                  <span className="event-info-value">{totalSeats} available</span>
                </div>
                <div className="event-info-row">
                  <span className="event-info-label"><IndianRupee size={15} /> Price</span>
                  <span className="event-info-value event-price-big">{event.price}</span>
                </div>

                <Link to={`/event/${event.id}/seats`} className="btn btn-primary book-now-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Ticket size={18} /> Book Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetail;
