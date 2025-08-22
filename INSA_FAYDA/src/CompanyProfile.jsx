import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyProfile.css';

function CompanyProfile() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState({ id: null, username: '', phone: '', address: '', gmail: '', company_name: '', category: '', company_logo: '' });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ username: '', phone: '', address: '', gmail: '', company_name: '', category: '', newPassword: '' });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  const companyLocal = (() => {
    try { return JSON.parse(localStorage.getItem('company') || '{}'); } catch { return {}; }
  })();

  const companyId = companyLocal?.id;

  const fetchProfile = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/company/profile', { params: { company_id: companyId } });
      setCompany(res.data);
      setForm({ username: res.data.username || '', phone: res.data.phone || '', address: res.data.address || '', gmail: res.data.gmail || '', company_name: res.data.company_name || '', category: res.data.category || '', newPassword: '' });
      setLogoPreview(res.data.company_logo ? `http://localhost:5000/uploads/${res.data.company_logo}` : '');
    } catch (e) {
      setMessage('Failed to load profile.');
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLogo = e => {
    const file = e.target.files?.[0] || null;
    setLogoFile(file);
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const validateClient = () => {
    if (form.gmail && !/^\S+@\S+\.\S+$/.test(form.gmail)) {
      setMessage('Invalid email format.');
      return false;
    }
    if (form.newPassword && form.newPassword.length < 8) {
      setMessage('Password must be at least 8 characters.');
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateClient()) return;
    try {
      const data = new FormData();
      data.append('company_id', companyId);
      Object.entries(form).forEach(([k, v]) => { if (v !== undefined && v !== null) data.append(k, v); });
      if (logoFile) data.append('company_logo', logoFile);
      await axios.put('http://localhost:5000/company/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMessage('Profile updated.');
      setEdit(false);
      setLogoFile(null);
      fetchProfile();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed.');
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="company-profile">
      {!edit ? (
        <div className="company-profile-view">
          <h3>Company Profile</h3>
          <div className="profile-layout">
            <div className="logo-section">
              {logoPreview && (
                <img src={logoPreview} alt="Company Logo" />
              )}
              <button onClick={() => setEdit(true)}>Edit</button>
            </div>
            <div className="info-grid">
              <div className="info-item"><b>Company:</b><span>{company.company_name}</span></div>
              <div className="info-item"><b>Username:</b><span>{company.username}</span></div>
              <div className="info-item"><b>Email:</b><span>{company.gmail}</span></div>
              <div className="info-item"><b>Phone:</b><span>{company.phone || '-'}</span></div>
              <div className="info-item"><b>Address:</b><span>{company.address || '-'}</span></div>
              <div className="info-item"><b>Category:</b><span>{company.category || '-'}</span></div>
            </div>
          </div>
        </div>
      ) : (
        <form className="company-profile-edit" onSubmit={handleSave}>
          <h3>Edit Profile</h3>
          <div className="profile-layout">
            <div className="logo-section">
              {logoPreview && (
                <img src={logoPreview} alt="Company Logo" />
              )}
              <input type="file" accept="image/*" onChange={handleLogo} />
            </div>
            <div className="form-grid">
              <div className="form-row"><label>Company Name</label><input name="company_name" value={form.company_name} onChange={handleChange} required /></div>
              <div className="form-row"><label>Username</label><input name="username" value={form.username} onChange={handleChange} required /></div>
              <div className="form-row"><label>Email</label><input name="gmail" value={form.gmail} onChange={handleChange} required /></div>
              <div className="form-row"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} /></div>
              <div className="form-row"><label>Address</label><input name="address" value={form.address} onChange={handleChange} /></div>
              <div className="form-row"><label>Category</label><input name="category" value={form.category} onChange={handleChange} /></div>
              <div className="form-row"><label>New Password</label><input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="(optional)" /></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => { setEdit(false); setLogoFile(null); setMessage(''); }}>Cancel</button>
          </div>
          {message && <div className="admin-message" style={{ marginTop: '0.5rem' }}>{message}</div>}
        </form>
      )}
      {!edit && message && <div className="admin-message" style={{ marginTop: '0.5rem' }}>{message}</div>}
    </div>
  );
}

export default CompanyProfile;
