import React, { useState } from 'react';

const featureData = [
  {
    icon: '🧩',
    title: 'User Problem Solving',
    description: 'Learn proven design methodologies to understand user pain points and create meaningful solutions through research-driven approaches.',
    color: '#fbab7e'
  },
  {
    icon: '📱',
    title: 'Digital Design',
    description: 'Explore modern digital design tools, responsive layouts, and cross-platform experiences that delight users on every device.',
    color: '#fcd873'
  },
  {
    icon: '🎨',
    title: 'Visual Interface Design',
    description: 'Master foundational design elements to create amazing and intuitive experiences that elevate digital products.',
    color: '#e8faed',
    expanded: true,
    details: [
      { label: 'Branding Design', color: '#f34b5c' },
      { label: 'User Interface', color: '#f34b5c' },
      { label: 'Colour Palette', color: '#f34b5c' }
    ]
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(2);

  return (
    <section className="features-section">
      <div className="features-header">
        <h2 className="section-title">The things you'll get to know from this event</h2>
        <p className="features-subtitle">
          Engage with industry leaders and discover cutting-edge trends in UI/UX, 
          branding strategy, and the future of visual design in a dynamic meetup environment.
        </p>
      </div>

      <div className="features-grid">
        {featureData.map((feature, index) => (
          <div
            key={index}
            className={`feature-card ${activeFeature === index ? 'feature-card--active' : ''}`}
            onClick={() => setActiveFeature(index)}
            style={{
              backgroundColor: activeFeature === index ? feature.color : 'var(--bg-card)',
              cursor: 'pointer'
            }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            
            {activeFeature === index && (
              <div className="feature-expanded">
                <p className="feature-description">{feature.description}</p>
                {feature.details && (
                  <ul className="feature-tags">
                    {feature.details.map((detail, i) => (
                      <li key={i}>
                        <span className="feature-dot" style={{ backgroundColor: detail.color }}></span>
                        {detail.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Decorative star */}
      <svg className="deco-star features-star" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 0L24.5 15.5L40 20L24.5 24.5L20 40L15.5 24.5L0 20L15.5 15.5L20 0Z" fill="#f34b5c"/>
      </svg>
    </section>
  );
};

export default Features;
