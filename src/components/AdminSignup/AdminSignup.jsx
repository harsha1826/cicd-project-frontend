import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle normal login
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1234/api/auth/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ email })); // minimal user info
        if (onLogin) onLogin();
        navigate("/home");
      } else {
        alert(text || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    }
  };

  // 🔹 Handle OTP login
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1234/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        if (onLogin) onLogin();
        navigate("/home");
      } else {
        alert(data.message || "OTP login failed");
      }
    } catch (err) {
      console.error("OTP Login error:", err);
      alert("Server error. Try again later.");
    }
  };

  // 🔹 Request OTP
  const requestOtp = async () => {
    try {
      const res = await fetch("http://localhost:1234/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message || "OTP sent to your email!");
    } catch (err) {
      console.error("OTP request error:", err);
      alert("Error sending OTP.");
    }
  };

  // 🔹 Inline Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    form: {
      backgroundColor: "rgba(255,255,255,0.95)",
      padding: "40px 30px",
      borderRadius: "15px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
      width: "380px",
      textAlign: "center",
      backdropFilter: "blur(5px)",
    },
    heading: {
      marginBottom: "20px",
      color: "#222",
      fontSize: "26px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      border: "none",
      borderRadius: "8px",
      backgroundImage:
        "url('https://cdn-icons-png.flaticon.com/512/743/743131.png')",
      backgroundColor: "#007bff",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "12px center",
      backgroundSize: "24px",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "0.3s",
      paddingLeft: "45px",
    },
    toggleBtn: {
      background: "none",
      border: "none",
      color: "#007bff",
      cursor: "pointer",
      marginTop: "10px",
      textDecoration: "underline",
    },
    signupBtn: {
      marginTop: "10px",
      backgroundColor: "#28a745",
      color: "white",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.form}
        onSubmit={isOtpLogin ? handleOtpLogin : handlePasswordLogin}
      >
        <h2 style={styles.heading}>
          {isOtpLogin ? "Login with OTP" : "Login with Password"}
        </h2>

        {/* Email input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />

        {/* Password or OTP field */}
        {!isOtpLogin ? (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          />
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              style={styles.input}
            />
            <button
              type="button"
              onClick={requestOtp}
              style={{
                ...styles.button,
                backgroundColor: "#ffc107",
                color: "#000",
                backgroundImage: "none",
                paddingLeft: "12px",
              }}
            >
              Send OTP
            </button>
          </>
        )}

        {/* Submit button */}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          {isOtpLogin ? "Login with OTP" : "Login"}
        </button>

        {/* Toggle login mode */}
        <button
          type="button"
          style={styles.toggleBtn}
          onClick={() => setIsOtpLogin(!isOtpLogin)}
        >
          {isOtpLogin ? "Login with Password instead" : "Login with OTP instead"}
        </button>

        {/* Signup & Admin navigation (side by side) */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap", // ensures responsive wrapping
          }}
        >
          <button
            type="button"
            style={{ ...styles.signupBtn, backgroundColor: "#28a745" }}
            onClick={() => navigate("/SignUp")}
          >
            User Sign Up
          </button>

          <button
            type="button"
            style={{ ...styles.signupBtn, backgroundColor: "#17a2b8" }}
            onClick={() => navigate("/AdminLogin")}
          >
            Admin Login
          </button>

          <button
            type="button"
            style={{ ...styles.signupBtn, backgroundColor: "#6f42c1" }}
            onClick={() => navigate("/AdminSignup")}
          >
            Admin Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
