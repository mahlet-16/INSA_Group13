import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Superadmin.css';

function SuperAdmin() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [resetId, setResetId] = useState(null);
  const [resetPassword, setResetPassword] = useState('');
  const [message, setMessage] = useState('');
  const [registerForm, setRegisterForm] = useState({
    username: '', phone: '', address: '', gmail: '', company_name: '', category: '', password: '', confirmPassword: ''
  });
  const [registerLogo, setRegisterLogo] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [activity, setActivity] = useState([]);
  const [detailsCompany, setDetailsCompany] = useState(null);
  const [profile, setProfile] = useState({ id: null, username: '', email: '', password: '', newPassword: '', profileImg: null });
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [profileMsg, setProfileMsg] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [showProfileContent, setShowProfileContent] = useState(false);
  const [adminAddForm, setAdminAddForm] = useState({ username: '', email: '', password: '' });
  const [adminAddMsg, setAdminAddMsg] = useState('');

  // Add User within company
  const [addUserCompanyId, setAddUserCompanyId] = useState(null);
  const [addUserForm, setAddUserForm] = useState({ full_name: '', email: '', phone: '', user_type: '', status: 'Active', fayda_id: '' });
  const [addUserImage, setAddUserImage] = useState(null);
  const [addUserMsg, setAddUserMsg] = useState('');
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    // Ensure Authorization header is set for admin endpoints
    try {
      const stored = JSON.parse(localStorage.getItem('superadmin') || 'null');
      if (stored?.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${stored.token}`;
      }
    } catch {}
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/admin/companies');
      setCompanies(res.data);
    } catch (err) {
      setError('Failed to fetch companies. Please login again.');
    }
    setLoading(false);
  };

  const fetchActivity = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/activity-log');
      setActivity(res.data);
    } catch {}
  };

  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/profile');
      setProfile(p => ({ ...p, id: res.data.id, username: res.data.username || '', email: res.data.email || '' }));
      if (res.data.avatar) setProfileImgUrl(`http://localhost:5000/uploads/${res.data.avatar}`);
    } catch {}
  };

  useEffect(() => { fetchCompanies(); fetchActivity(); fetchAdminProfile(); }, []);
  useEffect(() => {
    const interval = setInterval(fetchActivity, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredCompanies = companies.filter(c =>
    c.company_name.toLowerCase().includes(search.toLowerCase()) ||
    c.gmail.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (company) => {
    setEditId(company.id);
    setEditForm({ ...company });
    setMessage('');
  };
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:5000/admin/company/${editId}`, editForm);
      setEditId(null);
      setMessage('Company updated.');
      fetchCompanies();
      fetchActivity();
    } catch {
      setMessage('Update failed.');
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    try {
      await axios.delete(`http://localhost:5000/admin/company/${id}`);
      setMessage('Company deleted.');
      fetchCompanies();
      fetchActivity();
    } catch {
      setMessage('Delete failed.');
    }
  };
  const handleReset = (id) => {
    setResetId(id);
    setResetPassword('');
    setMessage('');
  };
  const handleResetSave = async () => {
    try {
      await axios.post(`http://localhost:5000/admin/company/${resetId}/reset-password`, { newPassword: resetPassword });
      setResetId(null);
      setResetPassword('');
      setMessage('Password reset.');
      fetchActivity();
    } catch {
      setMessage('Password reset failed.');
    }
  };

  const handleRegisterChange = e => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  const handleRegisterFile = e => setRegisterLogo(e.target.files[0]);
  const handleRegisterSubmit = async e => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setRegisterLoading(true);
    const data = new FormData();
    Object.entries(registerForm).forEach(([k, v]) => data.append(k, v));
    if (registerLogo) data.append('company_logo', registerLogo);
    try {
      await axios.post('http://localhost:5000/registerCompany', data);
      setMessage('Company registered successfully.');
      setRegisterForm({ username: '', phone: '', address: '', gmail: '', company_name: '', category: '', password: '', confirmPassword: '' });
      setRegisterLogo(null);
      fetchCompanies();
      fetchActivity();
    } catch {
      setMessage('Company registration failed.');
    }
    setRegisterLoading(false);
  };

  const handleProfileChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleProfileImg = e => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfile({ ...profile, profileImg: file });
      setProfileImgUrl(URL.createObjectURL(file));
      setShowProfileContent(true);
    }
  };
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (profile.username) data.append('username', profile.username);
      if (profile.email) data.append('email', profile.email);
      if (profile.newPassword) data.append('newPassword', profile.newPassword);
      if (profile.profileImg) data.append('avatar', profile.profileImg);
      await axios.put('http://localhost:5000/admin/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setProfileMsg('Profile updated!');
      setShowProfileContent(false);
      fetchAdminProfile();
      fetchActivity();
      setTimeout(() => setProfileMsg(''), 2000);
    } catch (err) {
      setProfileMsg(err.response?.data?.message || 'Profile update failed.');
      setTimeout(() => setProfileMsg(''), 2500);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAdminAddMsg('');
    try {
      await axios.post('http://localhost:5000/admin/admins', adminAddForm);
      setAdminAddMsg('Admin added.');
      setAdminAddForm({ username: '', email: '', password: '' });
      fetchActivity();
    } catch (err) {
      setAdminAddMsg('Failed to add admin.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('superadmin');
    window.location.href = '/';
  };

  const openAddUser = (companyId) => {
    setAddUserCompanyId(companyId);
    setAddUserForm({ full_name: '', email: '', phone: '', user_type: '', status: 'Active', fayda_id: '' });
    setAddUserImage(null);
    setAddUserMsg('');
    setShowAddUserModal(true);
  };
  const submitAddUser = async () => {
    if (!addUserCompanyId) return;
    setAddUserLoading(true);
    const data = new FormData();
    Object.entries(addUserForm).forEach(([k, v]) => data.append(k, v));
    if (addUserImage) data.append('image', addUserImage);
    data.append('company_id', addUserCompanyId);
    try {
      const res = await axios.post('http://localhost:5000/registerUser', data);
      setAddUserMsg(res.data.message || 'User successfully registered!');
    } catch (err) {
      setAddUserMsg(err.response?.data?.message || 'User registration failed.');
    }
    setAddUserLoading(false);
  };

  const getActivityLabel = (type) => {
    if (type === 'register') return 'REGISTER COMPANY';
    if (type === 'update') return 'UPDATE COMPANY';
    if (type === 'delete') return 'DELETE COMPANY';
    if (type === 'reset-password') return 'RESET PASSWORD';
    if (type === 'admin-profile-update') return 'ADMIN PROFILE UPDATE';
    if (type === 'admin-add') return 'ADD ADMIN';
    return String(type || '').toUpperCase();
  };
  const getActivityDetails = (details) => {
    if (!details) return '';
    const parts = [];
    if (details.company_name) parts.push(`Company: ${details.company_name}`);
    if (details.username) parts.push(`User: ${details.username}`);
    if (details.id && !details.company_name) parts.push(`Company ID: ${details.id}`);
    return parts.join(' · ');
  };

  return (
    <section className="super-admin-dashboard">
      <div className="super-admin-header-row">
        <h2>Super Admin Dashboard</h2>
        <button className="super-admin-logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="super-admin-tabs">
        <button className={activeTab==='profile'? 'active':''} onClick={()=>setActiveTab('profile')}>Profile</button>
        <button className={activeTab==='register'? 'active':''} onClick={()=>setActiveTab('register')}>Register Company</button>
        <button className={activeTab==='list'? 'active':''} onClick={()=>setActiveTab('list')}>Company List</button>
        <button className={activeTab==='search'? 'active':''} onClick={()=>setActiveTab('search')}>Search</button>
        <button className={activeTab==='activity'? 'active':''} onClick={()=>{ setActiveTab('activity'); fetchActivity(); }}>Recent Activity</button>
      </div>

      {activeTab === 'profile' && (
        <>
          <h3 className="admin-section-title">Profile</h3>
          <form className="admin-profile-form" onSubmit={handleProfileSave}>
            <div className="profile-img-col">
              <div className="profile-img-wrapper">
                {profileImgUrl ? (
                  <img src={profileImgUrl} alt="Profile" className="profile-img-preview" />
                ) : (
                  <div className="profile-img-placeholder">No Image</div>
                )}
                <input id="profileImg" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfileImg} />
              </div>
              <div className="profile-img-actions">
                <button type="button" onClick={() => document.getElementById('profileImg').click()}>Upload Image</button>
              </div>
            </div>
            <div className="profile-fields-col">
              <div className="profile-field">
                <label className="profile-label">Username</label>
                <input name="username" placeholder="superadmin" value={profile.username} onChange={handleProfileChange} required />
              </div>
              <div className="profile-field">
                <label className="profile-label">Email</label>
                <input name="email" placeholder="superadmin@example.com" value={profile.email} onChange={handleProfileChange} />
              </div>
              <div className="profile-field">
                <label className="profile-label">New Password</label>
                <input type="password" name="newPassword" placeholder="Enter new password" value={profile.newPassword} onChange={handleProfileChange} />
              </div>
              <div className="profile-actions">
                <button type="submit" className="profile-save-btn">Save Profile</button>
              </div>
              {profileMsg && <div className="admin-message">{profileMsg}</div>}
            </div>
          </form>

          <h3 className="admin-section-title">Add Another Admin</h3>
          <form className="admin-register-form" onSubmit={handleAddAdmin}>
            <div className="admin-register-form-fields">
              <input placeholder="Username" value={adminAddForm.username} onChange={e=>setAdminAddForm({...adminAddForm, username: e.target.value})} required />
              <input placeholder="Email (optional)" value={adminAddForm.email} onChange={e=>setAdminAddForm({...adminAddForm, email: e.target.value})} />
              <input type="password" placeholder="Password" value={adminAddForm.password} onChange={e=>setAdminAddForm({...adminAddForm, password: e.target.value})} required />
            </div>
            <button type="submit">Add Admin</button>
            {adminAddMsg && <div className="admin-message" style={{marginTop:'0.5rem'}}>{adminAddMsg}</div>}
          </form>
        </>
      )}

      {activeTab === 'register' && (
        <>
          <h3 className="admin-section-title">Register New Company</h3>
          <form className="admin-register-form" onSubmit={handleRegisterSubmit}>
            <div className="admin-register-form-fields">
              <input name="username" placeholder="Username" value={registerForm.username} onChange={handleRegisterChange} required />
              <input name="phone" placeholder="Phone" value={registerForm.phone} onChange={handleRegisterChange} />
              <input name="address" placeholder="Address" value={registerForm.address} onChange={handleRegisterChange} />
              <input name="gmail" placeholder="Gmail" value={registerForm.gmail} onChange={handleRegisterChange} required />
              <input name="company_name" placeholder="Company Name" value={registerForm.company_name} onChange={handleRegisterChange} required />
              <input type="file" name="company_logo" accept="image/*" onChange={handleRegisterFile} />
              <select name="category" value={registerForm.category} onChange={handleRegisterChange} required>
                <option value="">Choose Category</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
              <input type="password" name="password" placeholder="Password" value={registerForm.password} onChange={handleRegisterChange} required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={registerForm.confirmPassword} onChange={handleRegisterChange} required />
            </div>
            <button type="submit" disabled={registerLoading}>Register Company</button>
          </form>
        </>
      )}

      {activeTab === 'list' && (
        <>
          <h3 className="admin-section-title">Company List</h3>
          {loading ? <div>Loading companies...</div> : error ? <div>{error}</div> : (
            <div className="company-grid">
              {companies.map(c => (
                <div className="company-card" key={c.id}>
                  <div className="company-card-head">
                    <div className="company-card-title">{c.company_name}</div>
                    <div className="company-card-meta">{c.category}</div>
                  </div>
                  <div className="company-card-body">
                    <div><b>Username:</b> {c.username}</div>
                    <div><b>Email:</b> {c.gmail}</div>
                    <div><b>Phone:</b> {c.phone || '-'}</div>
                  </div>
                  <div className="company-card-actions">
                    <button onClick={() => setDetailsCompany(c)}>Details</button>
                    {editId === c.id ? (
                      <>
                        <button onClick={handleEditSave}>Save</button>
                        <button onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(c)}>Edit</button>
                        <button onClick={() => handleDelete(c.id)}>Delete</button>
                        <button onClick={() => handleReset(c.id)}>Reset Password</button>
                        <button onClick={() => openAddUser(c.id)}>Add User</button>
                      </>
                    )}
                  </div>

                  {/* Add User modal rendered conditionally above */}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'search' && (
        <>
          <h3 className="admin-section-title">Search Companies</h3>
          <div className="admin-search-bar">
            <input
              type="text"
              placeholder="Search by company name, email, or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button onClick={() => setSearchTriggered(true)}>Search</button>
          </div>
          {(!searchTriggered || !search.trim()) ? (
            <div className="search-hint">Enter a query and click Search to view results.</div>
          ) : (
            !filteredCompanies.length ? (
              <div>No results.</div>
            ) : (
              <ul className="admin-search-results">
                {filteredCompanies.map(c => (
                  <li key={c.id}>
                    <span>{c.company_name}</span>
                    <span style={{color:'#888'}}> &middot; {c.category}</span>
                  </li>
                ))}
              </ul>
            )
          )}
        </>
      )}

      {activeTab === 'activity' && (
        <>
          <h3 className="admin-section-title">Recent Activity</h3>
          <ul className="admin-activity-log">
            {activity.length === 0 && <li>No recent activity.</li>}
            {activity.map((a, idx) => (
              <li key={idx}>
                <span className={`activity-type activity-type-${a.type}`}>{getActivityLabel(a.type)}</span>
                <span className="activity-details">{getActivityDetails(a.details)}</span>
                <span className="activity-timestamp">{new Date(a.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {detailsCompany && (
        <div className="admin-modal-overlay" onClick={() => setDetailsCompany(null)}>
          <div className="admin-modal admin-modal-horizontal" onClick={e => e.stopPropagation()}>
            <h3>Company Details</h3>
            <div className="admin-modal-row">
              <div className="admin-modal-card">
                <b>Company Name:</b>
                <div>{detailsCompany.company_name}</div>
                <b>Username:</b>
                <div>{detailsCompany.username}</div>
                <b>Email:</b>
                <div>{detailsCompany.gmail}</div>
                <b>Phone:</b>
                <div>{detailsCompany.phone}</div>
              </div>
              <div className="admin-modal-card">
                <b>Address:</b>
                <div>{detailsCompany.address}</div>
                <b>Category:</b>
                <div>{detailsCompany.category}</div>
                <b>DB Name:</b>
                <div>{detailsCompany.db_name}</div>
                {detailsCompany.company_logo && (
                  <div style={{ marginTop: 10 }}>
                    <b>Logo:</b><br />
                    <img src={`http://localhost:5000/uploads/${detailsCompany.company_logo}`} alt="Logo" style={{height:60, borderRadius:8, marginTop:8}} />
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setDetailsCompany(null)}>Close</button>
          </div>
        </div>
      )}

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default SuperAdmin;
