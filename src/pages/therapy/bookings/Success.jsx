import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageDetails = location.state?.package;

  useEffect(() => {
    if (!packageDetails) {
      navigate("/therapy"); // Redirect if no package details
    }
  }, [packageDetails, navigate]);

  if (!packageDetails) {
    return null; // Render nothing while redirecting
  }

  // Calculate the total amount from selectedPackages
  const totalAmount = packageDetails.selectedPackages.reduce(
    (sum, pkg) => sum + (pkg.price || 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5DC]">
      <h1 className="text-2xl font-bold text-pink-500 mb-4 list-item-text-3">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-8 text-lg">
        Thank you for your payment. Here are your details:
      </p>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="font-bold text-xl underline">Appointment Details</h2>
        <p>
          <strong>Therapist:</strong> {packageDetails.therapistName}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(packageDetails.appointmentDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {packageDetails.appointmentTime}
        </p>
        <p>
          <strong>Location:</strong> {""}
          {packageDetails.state}, {packageDetails.city}
        </p>
        <p>
          <strong>Package:</strong>{" "}
          {Array.isArray(packageDetails.selectedPackages)
            ? packageDetails.selectedPackages.map((pkg, index) => (
                <span key={pkg._id}>
                  {pkg.name} {index < packageDetails.selectedPackages.length - 1 && ", "}
                </span>
              ))
            : packageDetails.selectedPackages}
        </p>
        <p>
          <strong>Transaction Reference:</strong>{" "}
          {packageDetails.transactionReference}
        </p>
        <p>
          <strong>Payment Status:</strong> {""}
          {packageDetails.paymentStatus}
        </p>
        <p>
          <strong>Payment Id:</strong> {""}
          {packageDetails.paymentId}
        </p>
        <p>
          <strong>Amount Paid:</strong> NGN {totalAmount.toLocaleString()}
        </p>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-gradient-to-tr from-blue-500 to-pink-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate("/therapy")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Success;