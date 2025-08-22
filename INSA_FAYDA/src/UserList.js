import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

function UserList({ onUserDeleted }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const company = JSON.parse(localStorage.getItem('company'));

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/listUsers', { params: { company_id: company?.id } });
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [company?.id]);

  const startEdit = (u) => { setEditId(u.id); setEditForm({ ...u }); };
  const cancelEdit = () => { setEditId(null); setEditForm({}); };
  const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const saveEdit = async () => {
    try {
      await axios.put('http://localhost:5000/updateUser', { company_id: company?.id, ...editForm });
      setEditId(null);
      await fetchUsers();
    } catch (e) {
      alert('Update failed');
    }
  };
  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete('http://localhost:5000/deleteUser', { params: { company_id: company?.id, id } });
      await fetchUsers();
      
      // Call the callback to update user count
      if (onUserDeleted) {
        onUserDeleted();
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;
  if (!users.length) return <div>No users found.</div>;

  return (
    <div className="user-list-container">
      <div className="user-list-form">
        <h3>User List</h3>
        {users.map(user => (
          <div key={user.id} className="user-list-item">
            <div className="logo-section">
              {user.image ? <img src={`http://localhost:5000/uploads/${user.image}`} alt="User" /> : <span>No Image</span>}
            </div>
            
            <div className="form-grid">
              <div className="form-row">
                <label>Full Name</label>
                {editId === user.id ? 
                  <input name="full_name" value={editForm.full_name} onChange={handleChange} /> : 
                  <span>{user.full_name}</span>
                }
              </div>
              
              <div className="form-row">
                <label>Email</label>
                {editId === user.id ? 
                  <input name="email" value={editForm.email} onChange={handleChange} /> : 
                  <span>{user.email}</span>
                }
              </div>
              
              <div className="form-row">
                <label>Phone</label>
                {editId === user.id ? 
                  <input name="phone" value={editForm.phone} onChange={handleChange} /> : 
                  <span>{user.phone}</span>
                }
              </div>
              
              <div className="form-row">
                <label>User Type</label>
                {editId === user.id ? 
                  <input name="user_type" value={editForm.user_type} onChange={handleChange} /> : 
                  <span>{user.user_type}</span>
                }
              </div>
              
              <div className="form-row">
                <label>Status</label>
                {editId === user.id ? (
                  <select name="status" value={editForm.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  <span>{user.status}</span>
                )}
              </div>
              
              <div className="form-row">
                <label>Fayda ID</label>
                {editId === user.id ? 
                  <input name="fayda_id" value={editForm.fayda_id} onChange={handleChange} /> : 
                  <span>{user.fayda_id}</span>
                }
              </div>
              
              <div className="form-row">
                <label>Actions</label>
                <div className="form-actions">
                  {editId === user.id ? (
                    <>
                      <button className="save-btn" onClick={saveEdit}>Save</button>
                      <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => startEdit(user)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;