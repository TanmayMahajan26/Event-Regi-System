import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Trash2, Shield, AlertCircle, ScanLine, CheckCircle2, XCircle } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = ({ onScan, onCancel }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    let isScanning = true;

    scanner.render(
      (decodedText) => {
        if (isScanning) {
          isScanning = false;
          scanner.clear().then(() => onScan(decodedText)).catch(e => console.error(e));
        }
      },
      (err) => {
        // Ignore constant stream errors
      }
    );

    return () => {
      try {
        scanner.clear();
      } catch(e) {}
    };
  }, [onScan]);

  return (
    <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--border-light)', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <ScanLine color="var(--primary-blue)" /> Ticket Scanner
      </h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Align the attendee's QR code within the frame to verify their ticket securely.</p>
      <div id="qr-reader" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', overflow: 'hidden', borderRadius: '12px', border: '2px dashed var(--primary-blue)' }}></div>
      <button onClick={onCancel} className="btn btn-secondary" style={{ marginTop: '2rem' }}>Close Scanner</button>
    </div>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scannerMode, setScannerMode] = useState(false);
  const [scanResult, setScanResult] = useState(null);

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
    if (isAuthenticated) fetchRegistrations();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'tanmay_admin' && password === 'MeetupSecure2026!') {
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

  const handleScanSuccess = async (decodedText) => {
    try {
      setScanResult({ status: 'Processing...', type: 'info' });
      
      const ticketData = JSON.parse(decodedText);
      if (!ticketData.ticketNo) throw new Error("Invalid ticket signature.");

      const res = await fetch(`https://event-regi-system.onrender.com/registrations/${ticketData.ticketNo}/checkin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      
      if (res.ok) {
        setScanResult({ 
          status: `Verified! ${data.registration.name} (${data.registration.seats.length} seats)`, 
          type: 'success' 
        });
        
        // Update local state without reloading the whole table
        setRegistrations(prev => prev.map(r => r._id === ticketData.ticketNo ? { ...r, isCheckedIn: true } : r));
      } else {
        setScanResult({ status: data.message || "Invalid or tampered ticket.", type: 'error' });
      }
    } catch (err) {
      setScanResult({ status: "QR Code is not a valid Ticket.", type: 'error' });
    }
    
    // Auto-reset scan result after 4 seconds to scan next person
    setTimeout(() => {
      setScanResult(null);
      setScannerMode(false); // Close scanner on finish
    }, 4000);
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
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(User: tanmay_admin | Pass: MeetupSecure2026!)</span>
              </p>

              {loginError && (
                <div className="booking-alert booking-alert--error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <AlertCircle size={16} /> {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Login to Portal</button>
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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Registration Portal</h1>
              <p style={{ color: 'var(--text-muted)' }}>Manage event bookings and scan active tickets</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {!scannerMode && (
                <button onClick={() => setScannerMode(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem' }}>
                  <ScanLine size={18} /> Open QR Scanner
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setIsAuthenticated(false)}>Logout</button>
            </div>
          </div>

          {/* Scanner Overlay */}
          {scannerMode && (
            <div style={{ marginBottom: '3rem', animation: 'slideUpFade 0.3s ease-out' }}>
              <QrScanner onScan={handleScanSuccess} onCancel={() => setScannerMode(false)} />
            </div>
          )}

          {/* Scan Results Overlay */}
          {scanResult && (
            <div className={`booking-alert ${scanResult.type === 'error' ? 'booking-alert--error' : ''}`} style={{ background: scanResult.type === 'success' ? '#d4edda' : undefined, color: scanResult.type === 'success' ? '#155724' : undefined, borderColor: scanResult.type === 'success' ? '#c3e6cb' : undefined, border: '1px solid', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.05rem', fontWeight: 600 }}>
              {scanResult.type === 'success' ? <CheckCircle2 size={24} /> : scanResult.type === 'error' ? <XCircle size={24} /> : <AlertCircle size={24} />}
              {scanResult.status}
            </div>
          )}

          {/* Table */}
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
                      <th style={{ width: '12%' }}>Date</th>
                      <th style={{ width: '15%' }}>Name</th>
                      <th style={{ width: '18%' }}>Contact Info</th>
                      <th style={{ width: '15%' }}>Event & City</th>
                      <th style={{ width: '15%' }}>Seats</th>
                      <th style={{ width: '15%' }}>Status</th>
                      <th style={{ width: '10%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(r => (
                      <tr key={r._id} style={{ background: r.isCheckedIn ? 'rgba(67, 233, 123, 0.05)' : '' }}>
                        <td>{new Date(r.registeredAt || Date.now()).toLocaleDateString()}<br/><small style={{color:'var(--text-muted)'}}>{new Date(r.registeredAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small></td>
                        <td style={{ fontWeight: 600 }}>{r.name}</td>
                        <td>
                          <div>{r.email}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>☎ {r.phone || 'N/A'}</div>
                        </td>
                        <td>
                          <div><strong>{r.eventName}</strong></div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{r.city || 'N/A'}</div>
                        </td>
                        <td>
                          <div className="order-seats-badges" style={{ justifyContent: 'flex-start' }}>
                            {r.seats?.map(s => <span key={s} className="order-seat" style={{ padding: '0.1rem 0.4rem', fontSize: '0.75rem' }}>{s}</span>)}
                          </div>
                        </td>
                        <td>
                          {r.isCheckedIn ? (
                            <span style={{ background: '#d4edda', color: '#155724', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                              <CheckCircle2 size={12} /> Checked In
                            </span>
                          ) : (
                            <span style={{ background: 'var(--bg-main)', color: 'var(--text-muted)', border: '1px solid var(--border-light)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>
                              Pending
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => handleDelete(r._id)} className="btn btn-delete flex-center" style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)' }} title="Delete booking & release seats">
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
