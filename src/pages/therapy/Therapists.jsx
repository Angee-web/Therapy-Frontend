import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TherapyCards } from "./TherapyCards";
import { getAllTherapists } from "@/store/therapy/therapist-slice";
import { getAllUsers, getUserByEmail } from "@/store/users";

const Therapists = ({ selectedFilter }) => {
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector(
    (state) => state.therapists
  );
  const { users } = useSelector((state) => state.users); // Access the users from Redux

  const [filteredTherapists, setFilteredTherapists] = useState(therapists);

  useEffect(() => {
    dispatch(getAllTherapists());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFilter.option) {
      // Filter therapists based on the selected filter
      const filtered = therapists.filter((therapist) => {
        switch (selectedFilter.selectId) {
          case 1: // "CLINICAL GENDER"
            return (
              therapist.gender &&
              therapist.gender.toLowerCase() ===
                selectedFilter.option.toLowerCase()
            );
          case 2: // "SERVICE TYPE"
            return (
              therapist.therapyType &&
              therapist.therapyType.includes(selectedFilter.option)
            );
          case 3: // "CLIENT AGE"
            return (
              therapist.clientAge &&
              therapist.clientAge === selectedFilter.option
            );
          case 4: // "LANGUAGE"
            return (
              therapist.languages &&
              therapist.languages
                .flatMap((lang) =>
                  // Split by commas if the language is stored in a single string
                  lang.split(",").map((subLang) => subLang.trim().toLowerCase())
                )
                .includes(selectedFilter.option.toLowerCase())
            );
          default:
            return true; // No specific filter; include all therapists
        }
      });
      setFilteredTherapists(filtered);
    } else {
      setFilteredTherapists(therapists); // Show all therapists if no filter is selected
    }
  }, [selectedFilter, therapists]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  useEffect(() => {
    // Dispatch `getUserByEmail` for each therapist to get online status
    therapists.forEach((therapist) => {
      dispatch(getUserByEmail(therapist.email)); // Assuming therapist has email
    });
  }, [dispatch, therapists]);

  const handleReload = () => {
    window.location.reload(); // Reload the page when the button is clicked
  };

  if (loading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center bg-gray-100">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  if (error) {
    return <p>Error: {typeof error === "string" ? error : error.message}</p>;
  }

  return (
    <div className="flex flex-wrap gap-5 my-10 justify-center">
      {Array.isArray(filteredTherapists) && filteredTherapists.length > 0 ? (
        filteredTherapists.map((therapist) => (
          <TherapyCards key={therapist._id} therapist={therapist} />
        ))
      ) : (
        <div>
          <p>No therapists found.</p>
          <button
            onClick={handleReload}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-400 via-blue-600 to-pink-600 rounded-3xl hover:bg-blue-600 text-white"
          >
            Reload Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Therapists;
