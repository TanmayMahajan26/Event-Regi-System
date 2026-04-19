import React, { useState } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket } from 'lucide-react';
import Header from '../components/Header';
import { getEventById, getCityById } from '../data/events';

const Booking = () => {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const event = getEventById(eventId);
  
  // Seat parameter can be comma-separated like "A1,A2"
  const seatsParam = searchParams.get('seats') || '';
  const selectedSeats = seatsParam ? seatsParam.split(',') : [];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!event || selectedSeats.length === 0) {
    return (
      <div className="app-wrapper">
        <div className="container">
          <Header />
          <div className="empty-state">
            <h2>Invalid Booking</h2>
            <p>Event not found or no seats selected.</p>
            <Link to="/cities" className="btn btn-primary">Browse Events</Link>
          </div>
        </div>
      </div>
    );
  }

  const city = getCityById(event.cityId);
  const totalPrice = event.priceNum * selectedSeats.length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        eventName: event.name,
        city: city?.name || '',
        seats: selectedSeats
      };

      const res = await fetch('https://event-regi-system.onrender.com/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        navigate(`/confirmation?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&event=${encodeURIComponent(event.name)}&seats=${encodeURIComponent(seatsParam)}&venue=${encodeURIComponent(event.venue)}&date=${encodeURIComponent(event.date)}&time=${encodeURIComponent(event.time)}&price=${encodeURIComponent(totalPrice === 0 ? 'Free' : `₹${totalPrice}`)}&city=${encodeURIComponent(city?.name || '')}`);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper animate-slide-up">
      <div className="container">
        <Header minimal />

        <section className="booking-page-section">
          <Link to={`/event/${eventId}/seats`} className="back-link">
            <ArrowLeft size={14} /> Back to Seat Map
          </Link>

          <div className="booking-page-grid">
            <div className="booking-form-card">
              <h2>Complete Your Registration</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                We need a few more details to confirm your {selectedSeats.length > 1 ? 'tickets' : 'ticket'}
              </p>

              {error && (
                <div className="booking-alert booking-alert--error">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="form-input"
                        min="16"
                        max="99"
                        required
                        placeholder="18+"
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="" disabled>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary booking-submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <Ticket size={18} />
                  {loading ? 'Processing...' : 'Pay & Confirm'}
                </button>
              </form>
            </div>

            <div className="order-summary">
              <h3>Booking Summary</h3>
              <div className="order-summary-card" style={{ borderLeft: `4px solid ${event.color}` }}>
                <div className="order-row">
                  <span className="order-label">Event</span>
                  <span className="order-value">{event.name}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">City</span>
                  <span className="order-value">{city?.name}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">Date & Time</span>
                  <span className="order-value">{event.date}, {event.time.split('–')[0].trim()}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">Venue</span>
                  <span className="order-value">{event.venue}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">Seats ({selectedSeats.length})</span>
                  <div className="order-seats-badges">
                    {selectedSeats.map(s => <span key={s} className="order-seat">{s}</span>)}
                  </div>
                </div>
                <div className="order-divider"></div>
                <div className="order-row">
                  <span className="order-label">Price per seat</span>
                  <span className="order-value">{event.priceNum === 0 ? 'Free' : `₹${event.priceNum}`}</span>
                </div>
                <div className="order-row order-total">
                  <span className="order-label">Total to Pay</span>
                  <span className="order-value">{totalPrice === 0 ? 'Free' : `₹${totalPrice}`}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Booking;
