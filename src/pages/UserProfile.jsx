import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSchedule, fetchUserSchedules } from "@/store/therapy/schedule-slice"; // Import deleteSchedule
import { useToast } from "@/hooks/useToast";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { schedules, loading, error } = useSelector((state) => state.schedule);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  // console.log(user);

  const [activeModal, setActiveModal] = useState(null); // Track which appointment is expanded

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserSchedules(user.id));
    }
  }, [dispatch, user]);

  // console.log("User ID:", user?.id); // Log the user ID to check if it's being fetched correctly
  // console.log("user schedules", )
  // console.log("Schedules from Redux:", schedules);

  const toggleModal = (id) => {
    setActiveModal(activeModal === id ? null : id);
  };
const uniqueSchedules = schedules.reduce((acc, curr) => {
  // Determine the unique identifier: use transactionReference if available, otherwise use _id
  const uniqueKey = curr.package?.transactionReference || curr._id;

  // Check if the uniqueKey already exists in the accumulator
  if (
    !acc.some(
      (item) => (item.package?.transactionReference || item._id) === uniqueKey
    )
  ) {
    acc.push(curr);
  }

  return acc;
}, []);

// console.log(uniqueSchedules);



  const recentAppointments = uniqueSchedules
    .filter((schedule) => new Date(schedule.appointmentDate) < new Date())
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
    .slice(0, 3);

  const upcomingAppointments = uniqueSchedules
    .filter((schedule) => new Date(schedule.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  // Handle canceling an appointment
  const handleCancelAppointment = (appointmentId) => {
    // Dispatch the deleteSchedule thunk to delete the appointment
    dispatch(deleteSchedule(appointmentId))
      .unwrap()
      .then(() => {
        // After successfully canceling the appointment, you can refetch the schedules or update the state
        // alert("Appointment canceled successfully");
        toast({
          title: "Appointment canceled successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        })
        dispatch(fetchUserSchedules(user.id)); // Refetch updated schedules
      })
      .catch((error) => {
        // Handle error
        alert(error || "An error occurred while canceling the appointment");
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] pt-20 md:py-28">
      <div className="container mx-auto max-w-4xl bg-white shadow-md p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            type="button"
            className="inline-flex items-center"
          >
            <FaArrowLeftLong className="w-6 h-6 text-pink-500" />
            <span className="ml-2 text-sm sm:text-base text-pink-500 font-medium">
              Back
            </span>
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 list-item-text-3">
          My Profile
        </h1>

        {/* User Information */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Profile Information
          </h2>
          <p>
            <strong>Username:</strong> {user?.userName ?? "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email ?? "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {user?.role ?? "N/A"}
          </p>
          <p>
            <strong>Account created:</strong>{" "}
            {formatDate(user?.createdAt ?? "n/a")}
          </p>
        </div>

        {/* Recent Appointments */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            Recent Appointments
          </h2>
          <div className="mt-4 space-y-4">
            {loading ? (
              <p className="text-gray-500 text-sm sm:text-base">
                Loading appointments...
              </p>
            ) : error ? (
              <p className="text-red-500 text-sm sm:text-base">
                {error.message || "An unknown error occurred"}
              </p>
            ) : recentAppointments.length > 0 ? (
              recentAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-gray-300 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {appointment.appointmentTime}
                      </p>
                      <p>
                        <strong>Therapist:</strong>{" "}
                        {appointment.therapistName ?? "Not assigned"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleModal(appointment._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                      >
                        {activeModal === appointment._id
                          ? "Close Details"
                          : "View Details"}
                      </button>
                      {/* <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base"
                      >
                        Cancel Appointment
                      </button> */}
                    </div>
                  </div>
                  {activeModal === appointment?._id && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <p>
                        <strong>Account Name:</strong>{" "}
                        {appointment?.accountName || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {appointment?.email || "N/A"}
                      </p>
                      <p>
                        <strong>Phone:</strong> {appointment?.phone || "N/A"}
                      </p>
                      <p>
                        <strong>City:</strong> {appointment?.city || "N/A"}
                      </p>
                      <p>
                        <strong>State:</strong> {appointment?.state || "N/A"}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong>{" "}
                        {appointment?.dob
                          ? new Date(appointment.dob).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Appointment Date:</strong>{" "}
                        {appointment?.appointmentDate
                          ? new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Appointment Time:</strong>{" "}
                        {appointment?.appointmentTime || "N/A"}
                      </p>

                      <p>
                        <strong>Payment ID:</strong>{" "}
                        {appointment?.package.paymentId || "N/A"}
                      </p>
                      <p>
                        <strong>Payment Status:</strong>{" "}
                        {appointment?.package.paymentStatus || "N/A"}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ₦
                        {appointment?.package.totalAmount
                          ? appointment.package.totalAmount.toLocaleString()
                          : "0"}
                      </p>

                      <p>
                        <strong>Therapist:</strong>{" "}
                        {appointment?.therapistName || "N/A"}
                      </p>
                      {/* <p>
                        <strong>Transaction Reference:</strong>{" "}
                        {appointment?.package.transactionReference || "N/A"}
                      </p> */}

                      <p>
                        <strong>Selected Packages:</strong>
                      </p>
                      <ul className="list-disc ml-6">
                        {appointment?.package.selectedPackages &&
                        appointment.package.selectedPackages.length > 0 ? (
                          appointment.package.selectedPackages.map(
                            (pkg, index) => <li key={index}>{pkg}</li>
                          )
                        ) : (
                          <li>No Packages Selected</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm sm:text-base">
                No recent appointments found.
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 ">
            Upcoming Appointments
          </h2>
          <div className="mt-4 space-y-4">
            {loading ? (
              <p className="text-gray-500 text-sm sm:text-base">
                Loading appointments...
              </p>
            ) : error ? (
              <p className="text-red-500 text-sm sm:text-base mb-14">
                {error.message || "An unknown error occurred"}
              </p>
            ) : upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-gray-300 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {appointment.appointmentTime}
                      </p>
                      <p>
                        <strong>Therapist:</strong>{" "}
                        {appointment.therapistName ?? "Not assigned"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleModal(appointment._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                      >
                        {activeModal === appointment._id
                          ? "Close Details"
                          : "View Details"}
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="ml-4 bg-pink-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                  {activeModal === appointment._id && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <p>
                        <strong>Account Name:</strong> {appointment.accountName}
                      </p>
                      <p>
                        <strong>Email:</strong> {appointment.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {appointment.phone}
                      </p>
                      <p>
                        <strong>City:</strong> {appointment.city}
                      </p>
                      <p>
                        <strong>State:</strong> {appointment.state}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong>{" "}
                        {new Date(appointment.dob).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <p className="text-gray-500 text-sm sm:text-base mt-4 mb-8">
                  You have no upcoming appointments.
                </p>
                <Link
                  to="/therapy"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full px-6 py-4 mt-12"
                >
                  Book Appointment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* <Link
          to="/therapy"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-md mt-[10rem] rounded-full px-6 py-4 "
        >
          Book Appointment
        </Link> */}
      </div>
    </div>
  );
};

export default UserProfile;
