import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AppointmentButton = ({ text }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBookingClick = () => {
    if (isAuthenticated) {
      navigate("/therapy", { replace: true }); // Navigate directly to the appointment page
    } else {
      localStorage.setItem("intendedRoute", "/therapy"); // Save the intended route
      navigate("/auth/login", { replace: true }); // Redirect to the login page
    }
  };

  return (
    <button
      className="relative rounded-full bg-white text-black mt-2 sm:text-xs py-1 px-6 lg:px-4 font-semibold text-center overflow-hidden lg:text-lg"
      style={{
        border: "2px solid transparent",
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(to right, pink, blue, pink, blue, pink, blue)",
        backgroundClip: "padding-box, border-box",
        borderRadius: "9999px", // Ensure the border is rounded
        borderImageSlice: 1,
      }}
      onClick={handleBookingClick}
    >
      {text}
    </button>
  );
};

export default AppointmentButton;
