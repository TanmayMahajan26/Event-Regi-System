import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Trash2, Shield, AlertCircle } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://event-regi-system.onrender.com/registrations');
      const data = await res.json();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration? This will free up the associated seats.')) return;
    
    try {
      const res = await fetch(`https://event-regi-system.onrender.com/registrations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRegistrations(registrations.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app-wrapper animate-slide-up">
        <div className="container">
          <Header minimal />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="booking-form-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
              <Shield size={48} color="var(--primary-blue)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>Admin Access</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Please login to manage registrations. <br/>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(User: admin | Pass: admin123)</span>
              </p>

              {loginError && (
                <div className="booking-alert booking-alert--error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <AlertCircle size={16} /> {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Login to Portal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper animate-slide-up">
      <div className="container">
        <Header />
        
        <section className="admin-section" style={{ padding: '2rem 0 4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Registration Portal</h1>
              <p style={{ color: 'var(--text-muted)' }}>Manage event bookings and attendees</p>
            </div>
            <button className="btn btn-secondary" onClick={() => setIsAuthenticated(false)}>Logout</button>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '2px solid var(--border-light)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading records...</div>
            ) : registrations.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No registrations found.</div>
            ) : (
              <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '15%' }}>Date</th>
                      <th style={{ width: '15%' }}>Name</th>
                      <th style={{ width: '20%' }}>Contact Info</th>
                      <th style={{ width: '10%' }}>Demographics</th>
                      <th style={{ width: '20%' }}>Event & City</th>
                      <th style={{ width: '15%' }}>Seats</th>
                      <th style={{ width: '5%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(r => (
                      <tr key={r._id}>
                        <td>{new Date(r.registeredAt || Date.now()).toLocaleDateString()}<br/><small style={{color:'var(--text-muted)'}}>{new Date(r.registeredAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small></td>
                        <td style={{ fontWeight: 600 }}>{r.name}</td>
                        <td>
                          <div>{r.email}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>☎ {r.phone || 'N/A'}</div>
                        </td>
                        <td>{r.age || 'N/A'} • {r.gender?.charAt(0) || '-'}</td>
                        <td>
                          <div><strong>{r.eventName}</strong></div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{r.city || 'N/A'}</div>
                        </td>
                        <td>
                          <div className="order-seats-badges" style={{ justifyContent: 'flex-start' }}>
                            {r.seats && r.seats.length > 0 ? (
                              r.seats.map(s => <span key={s} className="order-seat" style={{ padding: '0.1rem 0.4rem', fontSize: '0.75rem' }}>{s}</span>)
                            ) : (
                              <span style={{ color: 'var(--text-muted)' }}>Missing</span>
                            )}
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            className="btn btn-delete flex-center"
                            onClick={() => handleDelete(r._id)}
                            style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}
                            title="Delete booking & release seats"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
