import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import { getEventById } from '../data/events';

const MAX_SEATS = 10;

const SeatMap = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = getEventById(eventId);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch booked seats from API
  useEffect(() => {
    if (!event) return;
    const fetchSeats = async () => {
      try {
        const res = await fetch(`http://localhost:3000/registrations/seats/${encodeURIComponent(event.name)}`);
        const data = await res.json();
        setBookedSeats(new Set(data.bookedSeats || []));
      } catch (err) {
        console.error('Failed to fetch seats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [event]);

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

  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const toggleSeat = (seatLabel) => {
    if (bookedSeats.has(seatLabel)) return;
    setSelectedSeats(prev => {
      if (prev.includes(seatLabel)) {
        return prev.filter(s => s !== seatLabel);
      }
      if (prev.length >= MAX_SEATS) return prev;
      return [...prev, seatLabel];
    });
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    const seatsParam = selectedSeats.join(',');
    navigate(`/event/${eventId}/book?seats=${encodeURIComponent(seatsParam)}`);
  };

  const totalSeats = event.seats.rows * event.seats.cols;
  const availableSeats = totalSeats - bookedSeats.size;

  return (
    <div className="app-wrapper animate-slide-up">
      <div className="container">
        <Header minimal />

        <section className="seat-section">
          <Link to={`/event/${eventId}`} className="back-link"><ArrowLeft size={14} /> Back to Event</Link>
          
          <div className="seat-header">
            <h1>Select Your Seats</h1>
            <p>{event.name} &middot; {availableSeats} of {totalSeats} seats available</p>
          </div>

          {selectedSeats.length >= MAX_SEATS && (
            <div className="seat-limit-notice">
              <AlertCircle size={16} />
              Maximum {MAX_SEATS} seats per booking
            </div>
          )}

          {/* Stage */}
          <div className="stage-indicator">
            <div className="stage-bar">STAGE</div>
          </div>

          {/* Seat Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading seat map...</div>
          ) : (
            <div className="seat-grid-wrapper">
              <div className="seat-grid">
                {Array.from({ length: event.seats.rows }, (_, r) => (
                  <div key={r} className="seat-row">
                    <span className="seat-row-label">{rowLabels[r]}</span>
                    {Array.from({ length: event.seats.cols }, (_, c) => {
                      const seatLabel = `${rowLabels[r]}${c + 1}`;
                      const isBooked = bookedSeats.has(seatLabel);
                      const isSelected = selectedSeats.includes(seatLabel);
                      
                      return (
                        <button
                          key={c}
                          className={`seat ${isBooked ? 'seat--booked' : ''} ${isSelected ? 'seat--selected' : ''}`}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seatLabel)}
                          title={isBooked ? 'Already booked' : seatLabel}
                        >
                          {c + 1}
                        </button>
                      );
                    })}
                    <span className="seat-row-label">{rowLabels[r]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="seat-legend">
            <div className="legend-item"><div className="legend-box legend-available"></div> Available</div>
            <div className="legend-item"><div className="legend-box legend-selected"></div> Selected</div>
            <div className="legend-item"><div className="legend-box legend-booked"></div> Booked</div>
          </div>

          {/* Bottom bar */}
          <div className="seat-bottom-bar">
            <div className="seat-bottom-info">
              {selectedSeats.length > 0 ? (
                <>
                  <span className="seat-selected-label">
                    {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}: <strong>{selectedSeats.join(', ')}</strong>
                  </span>
                  <span className="seat-price">
                    {event.priceNum === 0 ? 'Free' : `₹${event.priceNum * selectedSeats.length}`}
                  </span>
                </>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>Select up to {MAX_SEATS} seats to continue</span>
              )}
            </div>
            <button 
              className="btn btn-primary" 
              disabled={selectedSeats.length === 0}
              onClick={handleProceed}
              style={{ opacity: selectedSeats.length > 0 ? 1 : 0.5 }}
            >
              Proceed to Book →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeatMap;
