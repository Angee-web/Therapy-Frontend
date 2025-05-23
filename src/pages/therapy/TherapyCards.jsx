import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Include default calendar styles
import { FaArrowsAltH } from "react-icons/fa";
import { GiTripleYin } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const TherapyCards = ({ therapist }) => {
  const { users } = useSelector((state) => state.users); // Access the users from Redux

  // Get the therapist's online status from the users data
  const therapistUser =
    users && users.length > 0
      ? users.find((user) => user.email === therapist.email)
      : null;

  const isOnline = therapistUser ? therapistUser.isOnline : false;

  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const handleViewAvailabilityClick = () => {
    console.log("View Availability Clicked");
    navigate(`/therapy/therapist-details/${therapist._id}`, {
      state: { openModal: true },
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getTimeSlots = () => {
    if (selectedDate && therapist.openings) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const openingForSelectedDate = therapist.openings.find(
        (opening) => opening.day === formattedDate
      );

      if (openingForSelectedDate && openingForSelectedDate.times) {
        return openingForSelectedDate.times.map((time, index) => (
          <button
            key={index}
            className="py-2 px-4 rounded-md bg-gray-200 text-center hover:bg-blue-100"
          >
            {time}
          </button>
        ));
      }
    }
    return (
      <div className="col-span-4 text-center text-gray-500">
        No Available Slots
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 m-4 shadow-lg lg:w-full lg:mx-9">
      <div className="flex flex-col md:flex-row md:justify-between lg:flex-row lg:justify-between">
        <div className="md:w-1/2 lg:w-1/2 lg:flex-row lg:mt-8">
          <div className="flex lg:flex-row flex-col justify-center md:justify-start mb-4">
            <div className="relative">
              <Link to={`/therapy/therapist-details/${therapist._id}`}>
                <img
                  src={therapist.imageUrl || "/path-to-your-image.jpg"}
                  alt="therapist"
                  className="w-[150px] h-[150px] md:w-[210px] md:h-[210px] lg:w-[300px] lg:h-[300px] mb-4 rounded-full border-4 border-gray-300 object-cover mx-auto"
                />
              </Link>
              <span
                className={`absolute top-2 right-12 md:right-16 w-6 h-6 rounded-full border border-white ${
                  isOnline ? "bg-pink-500" : "bg-gray-400"
                }`}
              ></span>
            </div>

            <div>
              <div className="lg:flex gap-8">
                <div className="text-left ml-5 mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {therapist.firstName} {therapist.lastName}
                  </h2>
                  <p className="text-md text-black">{therapist.specialty}</p>
                </div>
              </div>

              <div className="text-sm mb-4 space-y-2 lg:space-y-4 lg:ml-5">
                <div className=" md:mb-2 w-fit ml-2">
                  <p className="border py-1 px-4 border-black rounded-3xl md:text-sm lg:text-sm">
                    Client age: {therapist.clientAge}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaArrowsAltH className="text-blue-600" />
                  <span className="text-[15px] lg:text-[16px]">
                    Age Range = {therapist.ageRange}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <GiTripleYin className="text-blue-600" />
                  <span className="text-[15px] lg:text-[16px]">
                    Zodiac Sign = {therapist.zodiacSign}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <IoBedOutline className="text-blue-600" />
                  <span className="text-[15px] lg:text-[16px]">
                    {therapist?.therapyType
                      ?.join(", ")
                      .replace(/, ([^,]*)$/, " and $1") + " Therapy" ||
                      "Therapy type not available"}
                  </span>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-1 mb-4">
                <button className="text-xs lg:text-[16px] border border-blue-600 rounded-full px-2 py-1 lg:px-6 text-blue-600">
                  {therapist.maritalStatus}
                </button>
                <button className="flex items-center lg:text-[16px] text-xs bg-blue-600 text-white rounded-full px-2 py-1 gap- ">
                  <MdOutlinePhoneInTalk className="w-3 h-3 lg:w-6 lg:h-6" />
                  Call Now
                </button>
                <button className="flex items-center lg:text-[16px] text-xs bg-green-500 text-white rounded-full px-3 py-1 gap-1">
                  <BsChatDots className="w-3 h-3 lg:w-6 lg:h-6" />
                  Chat Now
                </button>
              </div>

              <div className="flex justify-center md:justify-start mb-4">
                <Link to={`/therapy/therapist-details/${therapist._id}`}>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white lg:text-[16px] lg:w-60 lg:ml-16 lg:mt-4 lg:px-2 lg:h-8 text-sm rounded-full px-6 py-1">
                    Book Now
                  </button>
                </Link>
              </div>

              <div className="text-center md:text-left block md:hidden lg:hidden">
                <a
                  onClick={handleViewAvailabilityClick}
                  className="text-sm lg:text-md text-blue-600 underline cursor-pointer"
                >
                  View Availability
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:flex-col md:w-1/2 items-center mt-8">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="rounded-lg shadow-md bg-white p-4"
            tileClassName={({ date }) => {
              const isSelectedDate =
                selectedDate &&
                date.toISOString().split("T")[0] ===
                  selectedDate.toISOString().split("T")[0];
              return isSelectedDate
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-gray-100 text-gray-700";
            }}
          />

          {selectedDate && (
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 mt-4 text-sm">
              {getTimeSlots()}
            </div>
          )}

          <div className="playfair-display-select md:mt-4">
            <button
              onClick={handleViewAvailabilityClick}
              className="mt-4 text-black border p-2 rounded-lg border-slate-300 "
            >
              More
            </button>
          </div>

          <div className="text-center md:text-left">
            <a
              onClick={handleViewAvailabilityClick}
              className="text-sm lg:text-md text-blue-600 underline cursor-pointer"
            >
              View Availability
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
