// App.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { checkAuth } from "./store/auth-slice.js";
import { Skeleton } from "./components/ui/skeleton.jsx";
import { SocketProvider } from "./store/SocketProvider.jsx";
import ScrollToTop from "./pages/ScrollToTop.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TherapyDashboard from "./pages/TherapyDashboard.jsx";
import CheckAuth from "./components/common/check-auth";
import Auth from "./auth/Auth.jsx";
import NotFound from "./pages/not-found/index.jsx";
import FloatingWhatsAppButton from "./components/ui/WhatsAppIcon.jsx";
import UnauthPage from "./pages/unauth-page/index.jsx";


const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      !token &&
      window.location.pathname !== "/auth/login" &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/auth/register" &&
      window.location.pathname !== "/auth/forgot-password" &&
      window.location.pathname !== "/auth/input-otp" &&
      window.location.pathname !== "/auth/confirm-reset" &&
      window.location.pathname !== "/auth/reset-password"
    ) {
      navigate("/auth/login");
    } else {
      dispatch(checkAuth())
        .unwrap()
        .catch((error) => {
          if (error === "No token found" || error === "Unauthorized") {
            if (
              window.location.pathname !== "/auth/login" &&
              window.location.pathname !== "/" &&
              window.location.pathname !== "/auth/register" &&
              window.location.pathname !== "/auth/forgot-password" &&
              window.location.pathname !== "/auth/input-otp" &&
              window.location.pathname !== "/auth/confirm-reset" &&
              window.location.pathname !== "/auth/reset-password"
            ) {
              navigate("/auth/login");
            }
          }
        });
    }
  }, [dispatch, navigate]);

  if (isLoading) {
    return <Skeleton className="max-w-md h-auto rounded-full" />;
  }

  return (
    <SocketProvider>
      <div className="flex flex-col overflow-hidden">
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/therapy/*" element={<TherapyDashboard />} />
          <Route
            path="/auth/*"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Auth />
              </CheckAuth>
            }
          />
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* WhatsApp button will appear on all pages */}
        <FloatingWhatsAppButton phoneNumber="1234567890" />
      </div>
    </SocketProvider>
  );
};

export default App;