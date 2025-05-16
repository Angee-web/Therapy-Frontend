import { getAllTherapists } from "@/store/therapy/therapist-slice";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector(
    (state) => state.therapists
  );

  useEffect(() => {
    if (!therapists || therapists.length === 0) {
      dispatch(getAllTherapists());
    }
  }, [dispatch, therapists]);

  useEffect(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const week = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });

    setWeekDates(week);
  }, [currentDate]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const goToPreviousWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {typeof error === "string" ? error : error.message}</p>;
  }

  const individualTherapistsCount = therapists?.filter(
    (therapist) =>
      Array.isArray(therapist.therapyType) &&
      therapist.therapyType.some((type) => type.toLowerCase() === "individual")
  ).length;

  return (
    <div className="mt-5 bg-white mx-4 lg:mx-9 rounded-lg shadow-lg">
      {/* Mobile View */}
      <p className="text-center text-sm py-2 lg:hidden md:hidden text-gray-700 font-medium">
        {individualTherapistsCount} Providers Found For Individual Therapy
      </p>

      {/* Large Screen View */}
      <div className="hidden md:flex lg:flex flex-col items-center gap-6 px-8 py-4 playfair-display-select">
        <p className="lg:text-lg lg:font-medium md:text-[13px] md:font-medium text-gray-700">
          {individualTherapistsCount} Providers Found For Individual Therapy
        </p>

        <div className="flex items-center justify-between w-full max-w-3xl">
          <button
            onClick={goToPreviousWeek}
            className="text-xl cursor-pointer pl-2 font-medium text-gray-600 hover:text-blue-500 transition duration-200"
          >
            <IoIosArrowBack />
          </button>

          <div className="flex justify-between playfair-display-select px-4 text-xs md:text-sm gap-4 lg:text-md w-full">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`text-center p-2 rounded-lg cursor-pointer transition duration-200 ${
                  isToday(date)
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >
                <span className="block font-semibold">
                  {date
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toUpperCase()}
                </span>
                <span>
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={goToNextWeek}
            className="text-xl cursor-pointer pr-2 font-medium text-gray-600 hover:text-blue-500 transition duration-200"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;