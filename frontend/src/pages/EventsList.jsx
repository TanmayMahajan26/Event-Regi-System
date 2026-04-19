import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { getEventsByCity, getCityById } from '../data/events';

const EventsList = () => {
  const { cityId } = useParams();
  const city = getCityById(cityId);
  const cityEvents = getEventsByCity(cityId);

  if (!city) {
    return (
      <div className="app-wrapper">
        <div className="container">
          <Header />
          <div className="empty-state">
            <h2>City not found</h2>
            <Link to="/cities" className="btn btn-primary">Back to Cities</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper animate-slide-up">
      <div className="container">
        <Header />

        <section className="events-list-section">
          <Link to="/cities" className="back-link">← Change City</Link>
          
          <div className="events-list-header">
            <div>
              <h1>Events in <span style={{ color: city.color }}>{city.name}</span></h1>
              <p>{cityEvents.length} event{cityEvents.length !== 1 ? 's' : ''} near {city.landmark}</p>
            </div>
          </div>

          {cityEvents.length === 0 ? (
            <div className="empty-state">
              <p>No events in {city.name} right now. Check back soon!</p>
              <Link to="/cities" className="btn btn-primary">Try Another City</Link>
            </div>
          ) : (
            <div className="events-list-grid">
              {cityEvents.map((event) => (
                <Link to={`/event/${event.id}`} key={event.id} className="event-list-card">
                  <div className="event-list-banner" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}cc)` }}>
                    <div className="event-list-badge-row">
                      <span className="event-badge">{event.category}</span>
                      <span className="event-price-tag">{event.price}</span>
                    </div>
                  </div>
                  <div className="event-list-body">
                    <h3>{event.name}</h3>
                    <div className="event-list-meta">
                      <span><Calendar size={14} /> {event.date}</span>
                      <span><Clock size={14} /> {event.time}</span>
                      <span><MapPin size={14} /> {event.venue}</span>
                    </div>
                    <p className="event-list-desc">{event.description.substring(0, 100)}...</p>
                    <div className="event-list-cta">
                      <span className="event-spots-tag">{event.seats.rows * event.seats.cols} seats</span>
                      <span className="event-view-btn">View Details <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default EventsList;
