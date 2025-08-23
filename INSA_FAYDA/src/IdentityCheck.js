import React, { useState } from 'react';
import axios from 'axios';
import './IdentityCheck.css';

function IdentityCheck() {
  const [form, setForm] = useState({ full_name: '', fayda_id: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const company = JSON.parse(localStorage.getItem('company'));

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/checkUser', { ...form, company_id: company?.id });
      if (res.data.found) {
        setResult({ ...res.data.user, guest: !!res.data.guest, source: res.data.source });
      } else {
        setResult({ notFound: true });
      }
    } catch (err) {
      setResult({ error: 'Error checking identity.' });
    }
    setLoading(false);
  };

  return (
    <div className="identity-check-horizontal">
      <h3>Identity Check</h3>
      <form onSubmit={handleSubmit} className="identity-check-form">
        <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} />
        <input name="fayda_id" placeholder="Fayda ID" value={form.fayda_id} onChange={handleChange} />
        <button type="submit" disabled={loading || (!form.full_name && !form.fayda_id)}>Check Identity</button>
        {loading && <div>Checking...</div>}
        {result && result.notFound && <div className="identity-message">No user found with this Fayda ID and Full Name.</div>}
        {result && result.error && <div className="identity-message">{result.error}</div>}
        {result && result.multiple && (
          <div className="identity-message">Multiple users found with this name. Please enter Fayda ID to narrow the search.</div>
        )}
      </form>
      {result && !result.notFound && !result.error && !result.multiple && (
        <div className="identity-result">
          <div className="identity-header">
            <div className="identity-photo">
              {result.photo && result.guest && (
                <img src={result.photo} alt="Profile" style={{width: 100, height: 100, borderRadius: 8, objectFit: 'cover'}} />
              )}
              {result.image && !result.guest && (
                <img src={`http://localhost:5000/uploads/${result.image}`} alt="Profile" style={{width: 100, height: 100, borderRadius: 8, objectFit: 'cover'}} />
              )}
            </div>
            <div className="identity-basic-info">
              <h4>{result.FullName || result.fullName || result.full_name}</h4>
              <div><b>FAYDA ID:</b> {result.FAYDA_ID || result.faydaID || result.fayda_id}</div>
              <div><b>Status:</b> {result.status}</div>
            </div>
          </div>
          
          <div className="identity-details">
            {/* Only show sections that have data */}
            {(result.email || result.phone || result.address) && (
              <div className="identity-section">
                <h5>Contact Information</h5>
                {result.email && <div><b>Email:</b> {result.email}</div>}
                {result.phone && <div><b>Phone:</b> {result.phone}</div>}
                {result.address && <div><b>Address:</b> {result.address}</div>}
              </div>
            )}
            
            {(result.issue_date || result.expiry_date || result.user_type) && (
              <div className="identity-section">
                <h5>ID Information</h5>
                {result.issue_date && <div><b>Issue Date:</b> {result.issue_date}</div>}
                {result.expiry_date && <div><b>Expiry Date:</b> {result.expiry_date}</div>}
                {result.user_type && <div><b>User Type:</b> {result.user_type}</div>}
              </div>
            )}
            
            {/* Show additional fields from mock data if they exist */}
            {(result.date_of_birth || result.gender || result.nationality || result.place_of_birth) && (
              <div className="identity-section">
                <h5>Additional Information</h5>
                {result.date_of_birth && <div><b>Date of Birth:</b> {result.date_of_birth}</div>}
                {result.gender && <div><b>Gender:</b> {result.gender}</div>}
                {result.nationality && <div><b>Nationality:</b> {result.nationality}</div>}
                {result.place_of_birth && <div><b>Place of Birth:</b> {result.place_of_birth}</div>}
              </div>
            )}
            
            {result.guest && (
              <div className="identity-warning">
                <strong>⚠️ Guest User</strong><br />
                This user is not registered in your system. They are verified through the national FAYDA database.
              </div>
            )}
            
            {!result.guest && (
              <div className="identity-success">
                <strong>🎉 Congratulations!</strong><br />
                This user is in your system.
                {result.user_type && (
                  <span className="user-category"> Category: <strong>{result.user_type}</strong></span>
                )}
              </div>
            )}
            
            {result.source && (
              <div className="identity-source">
                <small>Data Source: {result.source === 'mock' ? 'FAYDA National Database' : 'Company Database'}</small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IdentityCheck;