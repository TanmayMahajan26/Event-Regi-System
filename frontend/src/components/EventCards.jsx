import React, { useState } from 'react';

const events = [
  {
    id: 1,
    name: 'Designer Meetup 2026',
    date: 'May 24, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Grand Convention Center, Mumbai',
    price: 'Free',
    category: 'Meetup',
    color: '#4f7dfd',
    spots: 120,
    description: 'Connect with 500+ designers, explore latest trends in UI/UX, branding, and visual design.'
  },
  {
    id: 2,
    name: 'UI/UX Workshop',
    date: 'June 5, 2026',
    time: '9:00 AM - 1:00 PM',
    venue: 'Tech Hub, Pune',
    price: '₹499',
    category: 'Workshop',
    color: '#f34b5c',
    spots: 45,
    description: 'Hands-on workshop covering Figma prototyping, user research, and design systems.'
  },
  {
    id: 3,
    name: 'Branding Masterclass',
    date: 'June 18, 2026',
    time: '2:00 PM - 5:00 PM',
    venue: 'Creative Studio, Bangalore',
    price: '₹799',
    category: 'Masterclass',
    color: '#fbab7e',
    spots: 30,
    description: 'Learn brand identity, colour theory, and typography from industry veterans.'
  }
];

const EventCards = ({ onSelectEvent }) => {
  return (
    <section className="events-section" id="events">
      <div className="events-header">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="events-subtitle">Browse and register for our curated lineup of design events, workshops, and masterclasses.</p>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-card-banner" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}dd)` }}>
              <span className="event-badge">{event.category}</span>
              <span className="event-price">{event.price}</span>
            </div>
            <div className="event-card-body">
              <h3 className="event-card-title">{event.name}</h3>
              <p className="event-card-desc">{event.description}</p>
              <div className="event-meta">
                <div className="event-meta-item">
                  <span className="event-meta-icon">📅</span>
                  <span>{event.date}</span>
                </div>
                <div className="event-meta-item">
                  <span className="event-meta-icon">⏰</span>
                  <span>{event.time}</span>
                </div>
                <div className="event-meta-item">
                  <span className="event-meta-icon">📍</span>
                  <span>{event.venue}</span>
                </div>
              </div>
              <div className="event-card-footer">
                <span className="event-spots">{event.spots} spots left</span>
                <button className="btn btn-primary" onClick={() => onSelectEvent(event.name)}>
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCards;
