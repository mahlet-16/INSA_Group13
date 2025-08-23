import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

function RegisterForm() {
  const [form, setForm] = useState({
    username: '', phone: '', company_name: '', gmail: '', password: '', confirmPassword: '', category: '',
  });
  const [logo, setLogo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isChecking, setIsChecking] = useState({ username: false, email: false });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', password: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Check for duplicates when username or email changes
    if (name === 'username' && value.length >= 3) {
      checkUsernameAvailability(value);
    }
    if (name === 'gmail' && value.includes('@')) {
      checkEmailAvailability(value);
    }
  };
  
  const handleFile = e => setLogo(e.target.files[0]);

  // Check if username is available
  const checkUsernameAvailability = async (username) => {
    if (!username || username.length < 3) return;
    
    setIsChecking(prev => ({ ...prev, username: true }));
    try {
      const response = await axios.get(`http://localhost:5000/check-username/${username}`);
      if (response.data.available === false) {
        setValidationErrors(prev => ({ ...prev, username: 'This username is already taken' }));
      } else {
        setValidationErrors(prev => ({ ...prev, username: '' }));
      }
    } catch (error) {
      console.error('Error checking username:', error);
    } finally {
      setIsChecking(prev => ({ ...prev, username: false }));
    }
  };

  // Check if email is available
  const checkEmailAvailability = async (email) => {
    if (!email || !email.includes('@')) return;
    
    setIsChecking(prev => ({ ...prev, email: true }));
    try {
      const response = await axios.get(`http://localhost:5000/check-email/${email}`);
      if (response.data.available === false) {
        setValidationErrors(prev => ({ ...prev, gmail: 'This email is already registered' }));
      } else {
        setValidationErrors(prev => ({ ...prev, gmail: '' }));
      }
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setIsChecking(prev => ({ ...prev, email: false }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Check for validation errors
    if (Object.values(validationErrors).some(error => error)) {
      setMessage('Please fix the validation errors before submitting.');
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (logo) data.append('company_logo', logo);
    
    try {
      const res = await axios.post('http://localhost:5000/registerCompany', data);
      setMessage(res.data.message);
      // Clear form on success
      if (res.data.message.includes('successfully')) {
        setForm({
          username: '', phone: '', company_name: '', gmail: '', password: '', confirmPassword: '', category: '',
        });
        setLogo(null);
        setValidationErrors({});
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
    setLoading(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setLoginMessage('');
  };

  const handleLoginChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginMessage('');
    
    // Try Super Admin login first
    try {
      const adminRes = await axios.post('http://localhost:5000/admin/login', { 
        user: loginForm.user, 
        password: loginForm.password 
      });
      if (adminRes.data?.token) {
        localStorage.setItem('superadmin', JSON.stringify({ 
          token: adminRes.data.token, 
          admin: adminRes.data.admin 
        }));
        axios.defaults.headers.common['Authorization'] = `Bearer ${adminRes.data.token}`;
        setShowLoginModal(false);
        navigate('/admin');
        setLoginLoading(false);
        return;
      }
    } catch {}

    // Try Company Admin login
    try {
      const res = await axios.post('http://localhost:5000/login', { 
        user: loginForm.user, 
        password: loginForm.password 
      });
      setLoginMessage(res.data.message);
      if (res.data.company) {
        localStorage.setItem('company', JSON.stringify(res.data.company));
        if (res.data.token) {
          localStorage.setItem('company_token', res.data.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        }
        setShowLoginModal(false);
        navigate('/dashboard');
      }
    } catch (err) {
      setLoginMessage(err.response?.data?.message || 'Login failed.');
    }
    setLoginLoading(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setLoginForm({ user: '', password: '' });
    setLoginMessage('');
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Create Account</h2>
        <div className="register-form-fields">
          <div className="input-group">
            <input 
              name="username" 
              placeholder="User Name" 
              value={form.username} 
              onChange={handleChange} 
              className={validationErrors.username ? 'error' : ''}
              required 
            />
            {validationErrors.username && (
              <div className="validation-error">{validationErrors.username}</div>
            )}
            {isChecking.username && <div className="checking-indicator">Checking...</div>}
          </div>
          
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          
          <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} required />
          
          <label className="register-file">
            <span>Company Logo</span>
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>
          
          <div className="input-group">
            <input 
              name="gmail" 
              placeholder="Email" 
              value={form.gmail} 
              onChange={handleChange} 
              className={validationErrors.gmail ? 'error' : ''}
              required 
            />
            {validationErrors.gmail && (
              <div className="validation-error">{validationErrors.gmail}</div>
            )}
            {isChecking.email && <div className="checking-indicator">Checking...</div>}
          </div>
          
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Choose Category</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
          
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Re-Password" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>Sign Up</button>
        {message && (
          <div className="register-message-row">
            <div className="register-message">{message}</div>
          </div>
        )}
        <div className="register-login-link">
          <span>Already have an account? </span>
          <span className="register-login-text" onClick={handleLoginClick}>Log In</span>
        </div>
      </form>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="register-login-modal-overlay" onClick={handleCloseLoginModal}>
          <div className="register-login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="register-login-close" onClick={handleCloseLoginModal}>×</button>
            <h3>Welcome Back</h3>
            <form onSubmit={handleLoginSubmit} className="register-login-form">
              <input
                name="user"
                placeholder="Email or Username"
                value={loginForm.user}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" disabled={loginLoading}>
                {loginLoading ? 'Logging In...' : 'Log In'}
              </button>
            </form>
            {loginMessage && <div className="register-login-message">{loginMessage}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;