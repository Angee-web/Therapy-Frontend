import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5DC]">
      <h1 className="text-3xl font-bold text-red-500 mb-4 list-item-text-3">Payment Failed</h1>
      <p className="text-gray-700 mb-8 text-lg">
        Unfortunately, your payment could not be processed at this time. Please
        try again later.
      </p>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="font-bold text-xl underline">What You Can Do:</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Verify your payment method details.</li>
          <li>Ensure sufficient funds in your account.</li>
          <li>Try initiating the payment again.</li>
          <li>Contact your bank if the issue persists.</li>
        </ul>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-gradient-to-tr from-blue-500 to-pink-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate("/therapy")}
      >
        Go Back to Home
      </button>
      <button
        className="mt-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
        onClick={() => navigate(-1)} // Navigate to the previous page
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailure;
