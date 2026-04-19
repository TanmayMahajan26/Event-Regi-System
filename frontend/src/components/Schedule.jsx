import React, { useState } from 'react';

const scheduleData = {
  'Day 1': [
    {
      time: '09:00 AM',
      duration: '20 min',
      title: 'Latest design trends with bright colour palettes',
      speaker: 'Robert Bale',
      color: '#fbab7e'
    },
    {
      time: '10:30 AM',
      duration: '20 min',
      title: 'Building scalable design systems for modern teams',
      speaker: 'Albert Fin',
      color: '#fcd873'
    },
    {
      time: '01:00 PM',
      duration: '20 min',
      title: 'User research methods that drive product decisions',
      speaker: 'Sarah Kim',
      color: '#4f7dfd'
    }
  ],
  'Day 2': [
    {
      time: '09:00 AM',
      duration: '30 min',
      title: 'Advanced prototyping with motion and interaction',
      speaker: 'Robert Bale',
      color: '#f34b5c'
    },
    {
      time: '11:00 AM',
      duration: '25 min',
      title: 'Accessibility-first design: building for everyone',
      speaker: 'Albert Fin',
      color: '#fbab7e'
    },
    {
      time: '02:00 PM',
      duration: '20 min',
      title: 'From wireframe to production: a designer\'s workflow',
      speaker: 'David Chen',
      color: '#fcd873'
    }
  ],
  'Day 3': [
    {
      time: '10:00 AM',
      duration: '25 min',
      title: 'The psychology of color in branding and marketing',
      speaker: 'Maya Patel',
      color: '#4f7dfd'
    },
    {
      time: '12:00 PM',
      duration: '20 min',
      title: 'Designing for mobile-first responsive experiences',
      speaker: 'Albert Fin',
      color: '#f34b5c'
    }
  ]
};

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('Day 1');

  return (
    <section className="schedule-section">
      <h2 className="section-title" style={{ textAlign: 'center' }}>Event Info & Schedule</h2>
      <p className="schedule-subtitle">
        Explore our carefully curated schedule featuring talks, workshops, and networking 
        sessions designed to inspire and elevate your design practice.
      </p>

      <div className="schedule-tabs">
        {Object.keys(scheduleData).map(day => (
          <button
            key={day}
            className={`schedule-tab ${activeDay === day ? 'schedule-tab--active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="schedule-list">
        {scheduleData[activeDay].map((item, index) => (
          <div key={index} className="schedule-item">
            <div className="schedule-time-col">
              <div className="schedule-avatar" style={{ backgroundColor: item.color }}>
                {item.speaker.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="schedule-duration">{item.duration}</span>
            </div>
            <div className="schedule-info">
              <h4 className="schedule-talk-title">{item.title}</h4>
              <p className="schedule-speaker">{item.speaker} · {item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Schedule;
