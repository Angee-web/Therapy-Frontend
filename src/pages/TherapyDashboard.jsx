// TherapyDashboard.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Navbar from "@/components/navbar/TherapyNavbar";
import ProtectedRoute from "@/auth/ProtectedRoute";
import Therapy from "./therapy/Therapy";
import TeenPage from "./therapy/teen/TeenPage";
import TherapistDetails from "./therapy/TherapistDetails";
import TeenTherapy from "./therapy/teen/TeenTherapy";
import Contact from "./Contact";
import ShopAbout from "@/components/common/About";
import UserProfile from "./UserProfile";
import Current from "./therapy/bookings/Current";
import ConfirmDetails from "./therapy/bookings/ConfirmDetails";
import PaymentProcessing from "./therapy/bookings/PaymentProcess";
import Success from "./therapy/bookings/Success";
import PaymentFailure from "./therapy/bookings/Failure";
import NotFound from "./not-found";
import Footer from "@/components/footer/Footer";




const TherapyDashboard = () => {
  return (
    <div>
      <ScrollToTop />
      <div>
        <Navbar />
        <div className="mt-[3rem] lg:mt-[8rem] md:mt-[5rem]">
          <Routes>
            {/* Public Route for Therapy Landing Page */}
            {/* <Route path="/" element={<LandingPage />} /> */}

            {/* Protected Therapy Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Therapy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment/teen"
              element={
                <ProtectedRoute>
                  <TeenPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teenAppointment"
              element={
                <ProtectedRoute>
                  <TeenTherapy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/therapist-details/:id"
              element={<TherapistDetails />}
            />
            {/* <Route path="/testpage" element={<TherapistInfo />} />
            <Route path="/upload" element={<TherapistCreation />} /> */}

            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<ShopAbout />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/bookings" element={<ModalComponent />} /> */}
            <Route path="/scheduling/*" element={<Current />} />
            <Route path="/confirm-details" element={<ConfirmDetails />} />   
            <Route path="/verify-payment" element={<PaymentProcessing />} /> 
            <Route path="/payment-success" element={<Success />} />     
            <Route path="/payment-failure" element={<PaymentFailure />} /> 
             <Route path="*" element={<NotFound />} />    
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TherapyDashboard;
