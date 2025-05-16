import React, { useEffect, useState } from "react";
import Selecton from "./Category";
// import PaginationButtons from "@/components/ui/pagnationButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Therapists from "./Therapists";
import Calendar from "./Calender";
import { useDispatch, useSelector } from "react-redux";
import { getAllTherapists } from "@/store/therapy/therapist-slice";
import PaginationButtons from "@/components/ui/paginationButton";

const Therapy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { therapists } = useSelector((state) => state.therapists);
  const [therapistCount, setTherapistCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState({});

  const goBack = () => {
    window.history.back();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Delay to ensure navigation completes
  };

  // Fetch therapist count from Redux store
  useEffect(() => {
    const fetchTherapists = async () => {
      await dispatch(getAllTherapists());
    };

    fetchTherapists();
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(therapists)) {
      setTherapistCount(therapists.length);
    }
  }, [therapists]);

  // Handle filter change from Selecton component
  const handleFilterChange = (selectId, option) => {
    setSelectedFilter({ selectId, option });
  };

  return (
    <div style={{ backgroundColor: "#F5F5DC" }}>
      <div className="pt-6">
        {/* Back button */}
        <div className="mb-8 mt-10 ml-5">
          <button
            onClick={goBack}
            type="button"
            className="inline-flex items-center"
          >
            <FaArrowLeftLong className="w-6 h-6 text-pink-500" />
            <span className="ml-2 text-sm sm:text-base text-pink-500 font-medium">
              Back
            </span>
          </button>
        </div>

        {/* Dropdown */}
        <div>
          <Selecton onFilterChange={handleFilterChange} />
        </div>

        {/* Calendar */}
        <div>
          <Calendar />
        </div>

        {/* Therapy cards */}
        <div>
          <Therapists selectedFilter={selectedFilter} />
        </div>

        {/* Pagination and provider count */}
        <div className="flex items-center justify-between p-4 pb-24">
          <div className="mb-24">
            <PaginationButtons />
          </div>

          {/* Therapist count display */}
          <div className="flex items-center justify-center gap-2 font-semibold text-md mb-20">
            <p>
              <strong className="py-1 px-2 mr-2 border-2 border-blue-400 rounded-md">
                {therapistCount}{" "}
              </strong>
              {therapistCount === 1 ? "Provider" : "Providers"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Therapy;
