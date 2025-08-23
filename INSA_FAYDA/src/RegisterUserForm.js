import React, { useState } from 'react';
import axios from 'axios';
import './RegisterUserForm.css';

function RegisterUserForm({ onUserAdded }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    user_type: '',
    status: 'Active',
    fayda_id: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const company = JSON.parse(localStorage.getItem('company'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('company_id', company.id);
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (image) {
        data.append('image', image);
      }

      const response = await axios.post('http://localhost:5000/registerUser', data);
      setMessage('User successfully registered!');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        user_type: '',
        status: 'Active',
        fayda_id: ''
      });
      setImage(null);
      
      // Call the callback to update user count
      if (onUserAdded) {
        onUserAdded();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-user-form" onSubmit={handleSubmit}>
      <h3>Register New User</h3>
      <div className="register-user-form-fields">
        <input name="full_name" placeholder="Full Name" value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        <input name="user_type" placeholder="User Type (e.g., Student)" value={formData.user_type} onChange={e => setFormData({ ...formData, user_type: e.target.value })} required />
        <input type="file" name="image" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <select name="status" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input name="fayda_id" placeholder="Fayda ID" value={formData.fayda_id} onChange={e => setFormData({ ...formData, fayda_id: e.target.value })} required />
      </div>
      <button type="submit" disabled={loading}>Register User</button>
      {message && <div className="register-message">{message}</div>}
    </form>
  );
}

export default RegisterUserForm;