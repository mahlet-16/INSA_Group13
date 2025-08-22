import React, { useState, useEffect } from 'react';
import RegisterUserForm from './RegisterUserForm';
import UserList from './UserList';
import IdentityCheck from './IdentityCheck';
import CompanyProfile from './CompanyProfile';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const tabs = [
  { key: 'register', label: 'Register User' },
  { key: 'list', label: 'User List' },
  { key: 'identity', label: 'Identity Check' },
  { key: 'profile', label: 'Profile' },
];

function Dashboard() {
  const [tab, setTab] = useState('register');
  const [userCount, setUserCount] = useState(0);
  const [dashboardHeight, setDashboardHeight] = useState('80vh');
  const navigate = useNavigate();
  
  const company = JSON.parse(localStorage.getItem('company'));

  // Fetch user count and adjust dashboard dimensions
  const fetchUserCount = async () => {
    if (!company?.id) return;
    
    try {
      const res = await axios.get('http://localhost:5000/listUsers', { 
        params: { company_id: company.id } 
      });
      const count = res.data.length;
      setUserCount(count);
      
      // Adjust dashboard height based on user count
      if (count === 0) {
        setDashboardHeight('80vh');
      } else if (count <= 3) {
        setDashboardHeight('85vh');
      } else if (count <= 6) {
        setDashboardHeight('90vh');
      } else if (count <= 10) {
        setDashboardHeight('95vh');
      } else {
        setDashboardHeight('100vh');
      }
    } catch (error) {
      console.error('Failed to fetch user count:', error);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, [company?.id]);

  // Refresh user count when tab changes to list
  useEffect(() => {
    if (tab === 'list') {
      fetchUserCount();
    }
  }, [tab]);

  const handleLogout = () => {
    localStorage.removeItem('company');
    navigate('/');
  };

  const handleUserAdded = () => {
    fetchUserCount();
  };

  const handleUserDeleted = () => {
    fetchUserCount();
  };

  return (
    <div className="dashboard" style={{ minHeight: dashboardHeight }}>
      <div className="dashboard-header">
        <div className="dashboard-info">
          <div className="company-logo-section">
            {company?.company_logo ? (
              <img 
                src={`http://localhost:5000/uploads/${company.company_logo}`} 
                alt={`${company.company_name} Logo`} 
                className="company-logo"
                onError={(e) => {
                  console.log('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="company-logo-placeholder" style={{ display: company?.company_logo ? 'none' : 'flex' }}>
              <span>{company?.company_name?.charAt(0) || 'C'}</span>
            </div>
            <div className="user-count-section">
              <span className="user-count">Users: {userCount}</span>
            </div>
          </div>
          <div className="company-name-section">
            <h3 className="company-name">{company?.company_name || 'Company Name'}</h3>
            <span className="company-category">{company?.category || 'Category'}</span>
          </div>
        </div>
        <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
      </div>
      <div className="dashboard-tabs">
        {tabs.map(t => (
          <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="dashboard-content">
        {tab === 'register' && <RegisterUserForm onUserAdded={handleUserAdded} />}
        {tab === 'list' && <UserList onUserDeleted={handleUserDeleted} />}
        {tab === 'identity' && <IdentityCheck />}
        {tab === 'profile' && <CompanyProfile />}
      </div>
    </div>
  );
}

export default Dashboard;