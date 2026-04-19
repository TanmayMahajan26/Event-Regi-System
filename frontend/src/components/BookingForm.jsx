import React, { useState, useEffect } from 'react';

const BookingForm = ({ selectedEvent, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventName: selectedEvent || 'Designer Meetup 2026'
    });
    
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedEvent) {
            setFormData(prev => ({ ...prev, eventName: selectedEvent }));
        }
    }, [selectedEvent]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('http://localhost:3000/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: '🎉 Registration successful! Check your email for confirmation.' });
                setFormData({ name: '', email: '', eventName: formData.eventName });
            } else {
                setStatus({ type: 'error', message: data.message || 'Registration failed.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to connect to the server. Make sure the backend is running.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-form-wrapper" id="book">
            <div className="booking-card">
                <div className="booking-card-header">
                    <h3>Register for Event</h3>
                    <p>Fill in your details to secure your spot</p>
                </div>
                
                {status.message && (
                    <div className={`booking-alert ${status.type === 'success' ? 'booking-alert--success' : 'booking-alert--error'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
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
                        <label>Email Address</label>
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
                    <div className="form-group">
                        <label>Event</label>
                        <select 
                            name="eventName" 
                            value={formData.eventName} 
                            onChange={handleChange} 
                            className="form-input" 
                            required
                        >
                            <option value="Designer Meetup 2026">Designer Meetup 2026</option>
                            <option value="UI/UX Workshop">UI/UX Workshop</option>
                            <option value="Branding Masterclass">Branding Masterclass</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="btn btn-primary booking-submit" disabled={loading}>
                        {loading ? 'Registering...' : '🎫 Book your seat'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
