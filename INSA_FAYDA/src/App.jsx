/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import ServicesSection from "./ServicesSection";
import ServicePage from "./ServicePage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import AboutSection from "./AboutSection";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import aboutContent from "./aboutContent.json";
import serviceContent from "./serviceContent.json";
import headerBg from "./Assets/headera_bg.jpg";
import mainBg from "./Assets/BACKGROUND.jpg";
import drAbeyahmed from "./Assets/dr abeyahmed.jpg";
import nidImg from "./Assets/NID.jpg";
import SuperAdmin from "./SuperAdmin.jsx";

function About() {
  return (
    <section
      id="about"
      style={{
        display: "flex",
        alignItems: "center",
        padding: 60,
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ flex: 1, paddingRight: 40 }}>
        <h2 style={{ fontSize: 32, color: "#184C61" }}>About Us</h2>
        <p style={{ fontSize: 18, lineHeight: 1.6 }}>
          Our platform is a powerful centralized identity and registration
          system built to help organizations manage their internal users through
          secure, private dashboards. Each company gets its own isolated
          database and admin panel, allowing complete control over user data —
          from registration to verification.
          <br />
          <br />
          We provide a modern, single-page application (SPA) interface powered
          by React, Node.js, and MySQL to ensure fast, secure, and scalable
          performance for any organization — schools, companies, or
          institutions.
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <img
          src={drAbeyahmed}
          alt="About Us"
          style={{ width: "100%", maxWidth: 500, borderRadius: 10 }}
        />
      </div>
    </section>
  );
}
function Service() {
  return (
    <section
      id="services"
      style={{
        display: "flex",
        alignItems: "center",
        padding: 60,
        backgroundColor: "#fff",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src={nidImg}
          alt="Our Services"
          style={{ width: "100%", maxWidth: 500, borderRadius: 10 }}
        />
      </div>
      <div style={{ flex: 1, paddingLeft: 40 }}>
        <h2 style={{ fontSize: 32, color: "#184C61" }}>Our Services</h2>
        <ul style={{ fontSize: 18, lineHeight: 1.8 }}>
          <li>
            <strong>Company Registration:</strong> Quick signup and instant
            access to a private dashboard and database.
          </li>
          <li>
            <strong>Super Admin Dashboard:</strong> Full control over all
            companies, system settings, and activity monitoring.
          </li>
          <li>
            <strong>User Registration:</strong> Company admins can add internal
            users with detailed information.
          </li>
          <li>
            <strong>Identity Verification:</strong> Verify users using Fayda ID
            or Full Name from internal or mock databases.
          </li>
          <li>
            <strong>Authentication:</strong> Secure login via username/Gmail
            with password reset features.
          </li>
          <li>
            <strong>Real-Time SPA Experience:</strong> Smooth navigation,
            dynamic transitions, and user-friendly UI.
          </li>
          <li>
            <strong>Image/File Uploads:</strong> Upload company logos and user
            profile photos with ease.
          </li>
        </ul>
      </div>
    </section>
  );
}

function SuperAdminDashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [resetId, setResetId] = useState(null);
  const [resetPassword, setResetPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registerForm, setRegisterForm] = useState({
    username: "",
    phone: "",
    address: "",
    gmail: "",
    company_name: "",
    category: "",
    password: "",
    confirmPassword: "",
  });
  const [registerLogo, setRegisterLogo] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState([]);
  const [detailsCompany, setDetailsCompany] = useState(null);
  const [profile, setProfile] = useState({
    username: "superadmin",
    password: "",
    newPassword: "",
    profileImg: null,
  });
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [profileMsg, setProfileMsg] = useState("");

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/admin/companies");
      setCompanies(res.data);
    } catch (err) {
      setError("Failed to fetch companies.");
    }
    setLoading(false);
  };

  const fetchActivity = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/activity-log");
      setActivity(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchCompanies();
    fetchActivity();
  }, []);

  const filteredCompanies = companies.filter(
    (c) =>
      c.company_name.toLowerCase().includes(search.toLowerCase()) ||
      c.gmail.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (company) => {
    setEditId(company.id);
    setEditForm({ ...company });
    setMessage("");
  };
  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/company/${editId}`,
        editForm
      );
      setEditId(null);
      setMessage("Company updated.");
      fetchCompanies();
      fetchActivity();
    } catch {
      setMessage("Update failed.");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/admin/company/${id}`);
      setMessage("Company deleted.");
      fetchCompanies();
      fetchActivity();
    } catch {
      setMessage("Delete failed.");
    }
  };
  const handleReset = (id) => {
    setResetId(id);
    setResetPassword("");
    setMessage("");
  };
  const handleResetSave = async () => {
    try {
      await axios.post(
        `http://localhost:5000/admin/company/${resetId}/reset-password`,
        { newPassword: resetPassword }
      );
      setResetId(null);
      setResetPassword("");
      setMessage("Password reset.");
      fetchActivity();
    } catch {
      setMessage("Password reset failed.");
    }
  };

  const handleRegisterChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  const handleRegisterFile = (e) => setRegisterLogo(e.target.files[0]);
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setRegisterLoading(true);
    const data = new FormData();
    Object.entries(registerForm).forEach(([k, v]) => data.append(k, v));
    if (registerLogo) data.append("company_logo", registerLogo);
    try {
      await axios.post("http://localhost:5000/registerCompany", data);
      setMessage("Company registered successfully.");
      setRegisterForm({
        username: "",
        phone: "",
        address: "",
        gmail: "",
        company_name: "",
        category: "",
        password: "",
        confirmPassword: "",
      });
      setRegisterLogo(null);
      fetchCompanies();
      fetchActivity();
    } catch {
      setMessage("Company registration failed.");
    }
    setRegisterLoading(false);
  };

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleProfileImg = (e) => {
    setProfile({ ...profile, profileImg: e.target.files[0] });
    setProfileImgUrl(URL.createObjectURL(e.target.files[0]));
  };
  const handleProfileSave = (e) => {
    e.preventDefault();
    // For demo: just update local state and show message
    setProfileMsg("Profile updated! (Demo only, not persisted)");
    setTimeout(() => setProfileMsg(""), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("superadmin");
    window.location.href = "/admin-login";
  };

  return (
    <section className="super-admin-dashboard">
      <div className="super-admin-header-row">
        <h2>Super Admin Dashboard</h2>
        <button className="super-admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p className="super-admin-desc">
        Full system control: register, view, update, delete companies, reset
        passwords, monitor activities.
      </p>
      <h3 className="admin-section-title">Profile</h3>
      <form className="admin-profile-form" onSubmit={handleProfileSave}>
        <div className="profile-img-col">
          <label htmlFor="profileImg" className="profile-img-label">
            <div className="profile-img-wrapper">
              {profileImgUrl ? (
                <img
                  src={profileImgUrl}
                  alt="Profile"
                  className="profile-img-preview"
                />
              ) : (
                <span className="profile-img-placeholder">Upload Image</span>
              )}
              <span className="profile-upload-badge">Change</span>
            </div>
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfileImg}
            />
          </label>
          <small className="profile-hint">PNG/JPG up to 2MB</small>
        </div>
        <div className="profile-fields-col">
          <div className="profile-field">
            <label className="profile-label">Username</label>
            <input
              name="username"
              placeholder="superadmin"
              value={profile.username}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="profile-field">
            <label className="profile-label">Current Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter current password"
              value={profile.password}
              onChange={handleProfileChange}
            />
          </div>
          <div className="profile-field">
            <label className="profile-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={profile.newPassword}
              onChange={handleProfileChange}
            />
          </div>
          <div className="profile-actions">
            <button type="submit" className="profile-save-btn">
              Save Profile
            </button>
          </div>
        </div>
        {profileMsg && <div className="admin-message">{profileMsg}</div>}
      </form>
      <h3 className="admin-section-title">Register New Company</h3>
      <form className="admin-register-form" onSubmit={handleRegisterSubmit}>
        <div className="admin-register-form-fields">
          <input
            name="username"
            placeholder="Username"
            value={registerForm.username}
            onChange={handleRegisterChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={registerForm.phone}
            onChange={handleRegisterChange}
          />
          <input
            name="address"
            placeholder="Address"
            value={registerForm.address}
            onChange={handleRegisterChange}
          />
          <input
            name="gmail"
            placeholder="Gmail"
            value={registerForm.gmail}
            onChange={handleRegisterChange}
            required
          />
          <input
            name="company_name"
            placeholder="Company Name"
            value={registerForm.company_name}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="file"
            name="company_logo"
            accept="image/*"
            onChange={handleRegisterFile}
          />
          <select
            name="category"
            value={registerForm.category}
            onChange={handleRegisterChange}
            required
          >
            <option value="">Choose Category</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registerForm.confirmPassword}
            onChange={handleRegisterChange}
            required
          />
        </div>
        <button type="submit" disabled={registerLoading}>
          Register Company
        </button>
      </form>
      <h3 className="admin-section-title">Company List</h3>
      <div className="admin-search-bar">
        <input
          type="text"
          placeholder="Search by company name, email, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Loading companies...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="admin-company-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((c) => (
              <tr key={c.id}>
                <td>
                  {editId === c.id ? (
                    <input
                      name="company_name"
                      value={editForm.company_name}
                      onChange={handleEditChange}
                    />
                  ) : (
                    c.company_name
                  )}
                </td>
                <td>
                  {editId === c.id ? (
                    <input
                      name="username"
                      value={editForm.username}
                      onChange={handleEditChange}
                    />
                  ) : (
                    c.username
                  )}
                </td>
                <td>
                  {editId === c.id ? (
                    <input
                      name="gmail"
                      value={editForm.gmail}
                      onChange={handleEditChange}
                    />
                  ) : (
                    c.gmail
                  )}
                </td>
                <td>
                  {editId === c.id ? (
                    <input
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditChange}
                    />
                  ) : (
                    c.phone
                  )}
                </td>
                <td>
                  {editId === c.id ? (
                    <input
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                    />
                  ) : (
                    c.category
                  )}
                </td>
                <td>
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
                      <button onClick={() => handleReset(c.id)}>
                        Reset Password
                      </button>
                    </>
                  )}
                  {resetId === c.id && (
                    <div className="reset-password-row">
                      <input
                        type="text"
                        placeholder="New Password"
                        value={resetPassword}
                        onChange={(e) => setResetPassword(e.target.value)}
                      />
                      <button onClick={handleResetSave}>Save</button>
                      <button onClick={() => setResetId(null)}>Cancel</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {detailsCompany && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDetailsCompany(null)}
        >
          <div
            className="admin-modal admin-modal-horizontal"
            onClick={(e) => e.stopPropagation()}
          >
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
                    <b>Logo:</b>
                    <br />
                    <img
                      src={`http://localhost:5000/uploads/${detailsCompany.company_logo}`}
                      alt="Logo"
                      style={{ height: 60, borderRadius: 8, marginTop: 8 }}
                    />
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setDetailsCompany(null)}>Close</button>
          </div>
        </div>
      )}
      {message && <div className="admin-message">{message}</div>}
      <h3 className="admin-activity-title">Recent Activity</h3>
      <ul className="admin-activity-log">
        {activity.length === 0 && <li>No recent activity.</li>}
        {activity.map((a, idx) => (
          <li key={idx}>
            <span className={`activity-type activity-type-${a.type}`}>
              {a.type.replace("-", " ").toUpperCase()}
            </span>
            <span className="activity-details">
              {JSON.stringify(a.details)}
            </span>
            <span className="activity-timestamp">
              {new Date(a.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProtectedAdminRoute({ children }) {
  try {
    const stored = JSON.parse(localStorage.getItem("superadmin") || "null");
    if (stored && stored.token) return children;
  } catch {}
  return <Navigate to="/login" replace />;
}

function Contact() {
  return (
    <section
      id="contact"
      style={{
        display: "flex",
        alignItems: "center",
        padding: 60,
        backgroundColor: "#f4f8fb",
      }}
    >
      <div style={{ flex: 1, paddingRight: 40 }}>
        <h2 style={{ fontSize: 32, color: "#184C61" }}>Contact Us</h2>
        <p style={{ fontSize: 18, lineHeight: 1.6 }}>
          Get in touch with our team for any questions about our identity
          management platform. We're here to help you implement secure, reliable
          solutions for your organization.
        </p>
        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Email:</strong> info@faydapass.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong> 123 Tech Street, Digital City, DC 12345
          </p>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            width: "100%",
            height: 300,
            backgroundColor: "#e5e7eb",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontSize: 18,
          }}
        >
          Contact Form Placeholder
        </div>
      </div>
    </section>
  );
}

function SectionsPage() {
  return (
    <div className="sections-page">
      <AboutSection />
      <HowItWorks />
      <ServicesSection />
    </div>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide footer on dashboard routes
  const hideFooter =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin");
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Background styles: full-cover for company dashboard; solid background for admin
  const appBgStyle = isAdminRoute
    ? {
        minHeight: "100vh",
        height: "100vh",
        backgroundColor: "#1e1e1e",
      }
    : isDashboardRoute
    ? {
        minHeight: "100vh",
        height: "100vh",
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {
        minHeight: "100vh",
        height: "100vh",
        // backgroundImage: `url(${drAbeyahmed})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
      };

  return (
    <div className="App" style={appBgStyle}>
      {!isDashboardRoute && !isAdminRoute && <Header />}
      <div
        className={`main-content${!isDashboardRoute ? " content-with-bg" : ""}`}
      >
        <Routes>
          <Route path="/" element={<SectionsPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <SuperAdmin />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
