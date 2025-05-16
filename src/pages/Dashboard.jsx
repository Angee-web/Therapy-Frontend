import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer"
import NotFound from "./not-found";


const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-[5rem] lg:mt-[8rem]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="*" element={<NotFound />} />
          <Route />
        </Routes>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
