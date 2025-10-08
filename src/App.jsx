import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutUs from "./components/AboutUs/AboutUs";
import CarList from "./components/CarList/CarList";
import Booking from "./components/Booking/Booking";
import Payment from "./components/Payment/Payment";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import ServicesList from "./components/ServiceList/ServiceList";
import Testimonial from "./components/Testimonial/Testimonial";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSignup from "./components/AdminSignup/AdminSignup";
import Admin from "./components/Admin/Admin";

import AOS from "aos";
import "aos/dist/aos.css";

// PrivateRoute wrapper
const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Wrapper to conditionally render Navbar/Footer
const Layout = ({ children, isAuthenticated, theme }) => {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/SignUp"]; // hide navbar/footer here

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      {!hideLayout && <Navbar theme={theme} />}
      {children}
      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  // Theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const element = document.documentElement;

  // Theme effect
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Layout isAuthenticated={isAuthenticated} theme={theme}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Hero theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AboutUs />
              </PrivateRoute>
            }
          />
          <Route
            path="/cars"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CarList />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/ServiceList"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ServicesList />
              </PrivateRoute>
            }
          />
          <Route
            path="/Testimonial"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Testimonial />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/AdminLogin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AdminLogin />
              </PrivateRoute>
            }
          />
          <Route
            path="/AdminSignup"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AdminSignup />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/Admin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
