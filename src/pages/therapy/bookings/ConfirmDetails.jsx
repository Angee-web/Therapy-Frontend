import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useToast } from "@/hooks/useToast";
import { getScheduleById, updateSchedule } from "@/store/therapy/schedule-slice";
import { getPackagePrices } from "@/store/therapy/price-slice"; // Import the thunk
import { initializePayment } from "@/store/therapy/payment-slice";

const ConfirmDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scheduleId = localStorage.getItem("scheduleId");
  const { toast } = useToast();

  const { schedule, loading, error } = useSelector((state) => state.schedule);
  const { prices: packagePrices = {}, loading: pricesLoading, error: pricesError } = useSelector(
    (state) => state.prices || {}
  );

  // console.log("Package Prices:", packagePrices); // Debug log

  
  const paymentState = useSelector((state) => state.payment);

  const [selectedPackages, setSelectedPackages] = useState(
    JSON.parse(localStorage.getItem("selectedPackages")) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (scheduleId) {
      dispatch(getScheduleById(scheduleId));
    } else {
      console.error("Schedule ID not found in localStorage.");
      toast({
        title: "No Schedule Found",
        description:
          "There was no schedule and no package bought. Please book a schedule.",
        variant: "destructive",
      });
      navigate("/therapy/scheduling#bookings");
    }
  }, [dispatch, scheduleId, navigate, toast]);

  // Fetch package prices when the component mounts
  useEffect(() => {
    dispatch(getPackagePrices());
  }, [dispatch]);

  const handlePackageChange = (event) => {
    const { value, checked } = event.target;
    setSelectedPackages((prev) =>
      checked ? [...prev, value] : prev.filter((pkg) => pkg !== value)
    );
  };

  const handleFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayNow = async () => {
    if (selectedPackages.length === 0) {
      console.error("No valid package selected.");
      toast({
        title: "Please select a package to proceed",
        variant: "destructive",
      });
      return;
    }

    try {
      const {
        email,
        therapistId,
        userId,
        accountName,
        phone,
        dob,
        appointmentDate,
        appointmentTime,
        state,
        city,
        therapistName,
      } = schedule;

      const totalAmount = selectedPackages.reduce(
        (total, pkg) => total + (packagePrices[pkg] || 0),
        0
      );

      const paymentData = {
        email,
        accountName,
        phone,
        dob,
        appointmentDate,
        appointmentTime,
        state,
        city,
        therapistName,
        totalAmount,
        therapistId,
        userId,
        selectedPackages,
      };

      // Dispatch the initializePayment action and wait for the response
      const result = await dispatch(initializePayment(paymentData)).unwrap();

      // Access the payment URL from the result and redirect
      const paymentUrl = result?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error("Payment URL not found in the response.");
        toast({
          title: "Payment initialization failed",
          description: "Unable to get the payment URL.",
          variant: "destructive",
        });
      }

      // Return the payment data for further debugging if needed
      return paymentData;
    } catch (error) {
      console.error("Error initializing payment:", error);
      toast({
        title: "Error",
        description: "An error occurred while initializing payment.",
        variant: "destructive",
      });
    }
  };

  const handleEditDetails = () => {
    setIsEditing(true);
    setFormData({ ...schedule });
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(updateSchedule({ id: scheduleId, updatedData: formData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving edited details:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ ...schedule });
  };

  const goBack = () => {
    window.history.back();
  };

  if (loading || pricesLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  if (error || pricesError) return <div>Error: {error || pricesError}</div>;
  if (!schedule || Object.keys(schedule).length === 0)
    return <div>No schedule found.</div>;

  return (
    <div className="py-20 bg-[#F5F5DC]">
      <div className="lg:hidden block">
        <button onClick={goBack}>
          <FaArrowLeftLong className="pl-4 w-[40px] h-[20px] text-pink-500" />
        </button>
      </div>
      <div className="flex justify-center items-center py-14">
        <div className="bg-black text-white p-8 w-[90vw] lg:w-[50vw] rounded-xl">
          <h2 className="text-2xl mb-6">Confirm Your Details</h2>

          {/* Schedule Details */}
          <div className="mb-6">
            {isEditing ? (
              <>
                {/* Editable Fields */}
                <div>
                  <label htmlFor="accountName" className="block">
                    Account Name:
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    value={formData.accountName || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block">
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
                <div>
                  <label htmlFor="appointmentDate" className="block">
                    Appointment Date:
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
                <div>
                  <label htmlFor="appointmentTime" className="block">
                    Appointment Time:
                  </label>
                  <input
                    type="time"
                    id="appointmentTime"
                    name="appointmentTime"
                    value={formData.appointmentTime || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block">
                    State:
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block">
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleFieldChange}
                    className="p-2 bg-gray-200 text-black rounded-lg w-full"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Read-only Schedule Details */}
                <p>
                  <strong>Account Name:</strong> {schedule.accountName}
                </p>
                <p>
                  <strong>Phone:</strong> {schedule.phone}
                </p>
                <p>
                  <strong>Email:</strong> {schedule.email}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(schedule.dob).toLocaleDateString()}
                </p>
                <p>
                  <strong>Appointment Date:</strong>{" "}
                  {new Date(schedule.appointmentDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Appointment Time:</strong> {schedule.appointmentTime}
                </p>
                <p>
                  <strong>Location:</strong> {schedule.state}, {schedule.city}
                </p>
                <p>
                  <strong>Therapist:</strong> {schedule.therapistName}
                </p>
              </>
            )}
          </div>

          {/* Package Selection */}
          <div className="mb-6">
            <p>
              <strong>Select Package:</strong>
            </p>
            <div className="space-y-2">
              {Object.entries(packagePrices).map(([name, price]) => (
                <label key={name} className="block">
                  <input
                    type="checkbox"
                    value={name}
                    checked={selectedPackages.includes(name)}
                    onChange={handlePackageChange}
                    className="mr-2"
                  />
                  {name} - ₦{price.toLocaleString()}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white py-2 px-6 rounded-md"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-500 text-white py-2 px-6 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditDetails}
                className="bg-blue-500 text-white py-2 px-6 rounded-md"
              >
                Edit Details
              </button>
            )}

            <button
              onClick={handlePayNow}
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDetails;