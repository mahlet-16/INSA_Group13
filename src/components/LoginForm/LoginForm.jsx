import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import handleRegisterClick from "../RegisterForm/RegisterForm";
import "./LoginForm.css";

function LoginForm() {
  const [form, setForm] = useState({ user: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Try Super Admin login first (home login)
    try {
      const adminRes = await axios.post("http://localhost:5000/admin/login", {
        user: form.user,
        password: form.password,
      });
      if (adminRes.data?.token) {
        localStorage.setItem(
          "superadmin",
          JSON.stringify({
            token: adminRes.data.token,
            admin: adminRes.data.admin,
          })
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${adminRes.data.token}`;
        navigate("/admin");
        setLoading(false);
        return;
      }
    } catch {
      // Optionally log or handle the error
      // setMessage("Super admin login failed.");
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        user: form.user,
        password: form.password,
      });
      setMessage(res.data.message);
      if (res.data.company) {
        localStorage.setItem("company", JSON.stringify(res.data.company));
        if (res.data.token) {
          localStorage.setItem("company_token", res.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
    setLoading(false);
  };

  const [showForgot, setShowForgot] = useState(false);
  const [forgotUser, setForgotUser] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg("");
    try {
      const res = await axios.post("http://localhost:5000/forgot-password", {
        user: forgotUser,
      });
      setForgotMsg(`Your new password: ${res.data.newPassword}`);
    } catch (err) {
      setForgotMsg(err.response?.data?.message || "Reset failed.");
    }
    setForgotLoading(false);
  };

  return (
    <>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome Back</h2>
          <input
            name="user"
            placeholder="Email"
            value={form.user}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="login-links-row">
            <span
              className="login-forgot-link"
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </span>
          </div>
          <button type="submit" disabled={loading}>
            Log In
          </button>
          {message && <div className="login-message">{message}</div>}
          <div className="signup-link">
            <span>Don't have an account? </span>
            <span className="signup-text" onClick={handleRegisterClick}>
              Sign Up
            </span>
          </div>
        </form>
      </div>

      {showForgot && (
        <div
          className="login-modal-overlay"
          onClick={() => setShowForgot(false)}
        >
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Reset Password</h3>
            <form onSubmit={handleForgot} className="forgot-form">
              <input
                type="text"
                placeholder="Enter your username or email"
                value={forgotUser}
                onChange={(e) => setForgotUser(e.target.value)}
                required
              />
              <button type="submit" disabled={forgotLoading}>
                Reset Password
              </button>
            </form>
            {forgotMsg && <div className="login-message">{forgotMsg}</div>}
            <button
              className="login-modal-close"
              onClick={() => setShowForgot(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
