import { verifyPayment } from "@/store/therapy/payment-slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const PaymentProcessing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const reference = searchParams.get("reference");
    const packageId = searchParams.get("packageId"); // Retrieve packageId

    if (reference && packageId) {
      const verify = async () => {
        try {
          const result = await dispatch(
            verifyPayment({ reference, packageId }) // Pass packageId
          ).unwrap();

          if (result.status === "success") {
            navigate("/therapy/payment-success", {
              state: { package: result.package },
            });
          } else {
            navigate("/therapy/payment-failure");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          navigate("/therapy/payment-failure");
        }
      };

      verify();
    } else {
      console.error("Payment reference or package ID not found in URL.");
      navigate("/therapy/payment-failure");
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Processing Payment...</h2>
      <p className="text-gray-600">Please wait while we verify your payment.</p>
    </div>
  );
};

export default PaymentProcessing;
