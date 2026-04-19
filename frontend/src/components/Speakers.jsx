import React from 'react';

const speakers = [
  { name: 'Robert Bale', role: 'Senior UX Researcher', color: '#fbab7e' },
  { name: 'Albert Fin', role: 'Design Lead, Figma', color: '#fcd873' },
  { name: 'Robert Bale', role: 'Creative Director', color: '#4f7dfd' },
  { name: 'Robert Bale', role: 'Product Designer', color: '#f34b5c' },
  { name: 'Albert Fin', role: 'Brand Strategist', color: '#e8faed' },
  { name: 'Robert Bale', role: 'UI Engineer', color: '#fbab7e' },
];

const Speakers = () => {
  return (
    <section className="speakers-section">
      <div className="speakers-header">
        <h2 className="section-title">Always get knowledge from experienced one</h2>
        <p className="speakers-subtitle">
          Engage with industry leaders who have shaped global brands and cutting-edge digital experiences. 
          Learn directly from their journey and expertise.
        </p>
      </div>

      <div className="speakers-grid">
        {speakers.map((speaker, index) => (
          <div key={index} className="speaker-card">
            <div className="speaker-avatar" style={{ backgroundColor: speaker.color }}>
              <div className="speaker-avatar-placeholder">
                {speaker.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <h4 className="speaker-name">{speaker.name}</h4>
            <p className="speaker-role">{speaker.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Speakers;
