import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Header from '../components/Header';
import { cities, events } from '../data/events';

const CitySelect = () => {
  return (
    <div className="app-wrapper animate-slide-up">
      <div className="container">
        <Header />
        
        <section className="city-select-section">
          <div className="city-select-header">
            <h1>Which city are you in?</h1>
            <p>Select your metro city to discover events happening near you</p>
          </div>

          <div className="city-grid">
            {cities.map((city) => {
              const eventCount = events.filter(e => e.cityId === city.id).length;
              return (
                <Link to={`/city/${city.id}`} key={city.id} className="city-card" style={{ '--city-gradient': city.gradient }}>
                  <div className="city-monument-icon">
                    {city.monument}
                  </div>
                  <div className="city-info">
                    <h2 className="city-name">{city.name}</h2>
                    <p className="city-landmark">{city.landmark}</p>
                    <span className="city-event-count">{eventCount} event{eventCount !== 1 ? 's' : ''}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CitySelect;
