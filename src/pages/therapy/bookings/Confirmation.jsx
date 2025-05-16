import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackagePrices } from "@/store/therapy/price-slice"; // Import the thunk

const Confirmation = () => {
  const dispatch = useDispatch();

  // Access package prices from Redux state
  const { prices: packagePrices = {}, loading, error } = useSelector(
    (state) => state.prices || {}
  );
  // console.log("Package Prices:", packagePrices); // Debug log

  // Fetch package prices when the component mounts
  useEffect(() => {
    dispatch(getPackagePrices());
  }, [dispatch]);

  if (loading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex py-14 items-center justify-center bg-[#F5F5DC]">
      <div className="bg-black lg:w-[65vw] text-white flex flex-col py-8 px-3 lg:px-14 w-[90vw] rounded-xl">
        <div>
          <p className="text-2xl underline text-center mb-8">Promotions</p>
        </div>

        {/* Promotions */}
        <div className="grid grid-cols-2 gap-2 pb-12">
          <div className="bg-white text-black bg-opacity-20 px-4 py-10 lg:py-8 flex items-center rounded-md relative">
            <div className="lg:flex gap-8 text-black ">
              <p className="text-xl lg:text-2xl text-black ">
                5 Minutes / ₦ 2,000
              </p>
            </div>
            <div className="absolute bg-pink-500 p-1 rounded-bl-md rounded-tr-lg top-0 right-0 text-xs lg:p-2 md:text-md text-black ">
              <p>Time Limited Offer</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-10 lg:py-8 flex items-center rounded-md text-black ">
            <div className="lg:flex gap-8 text-black ">
              <p className="text-xl lg:text-2xl text-black ">₦ 10,000</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl underline text-center mb-8">Packages</p>
        </div>

        {/* Packages */}
        <div className="bg-white bg-opacity-20 px-4 py-10 rounded-md">
          <div className="flex items-center text-sm gap-12 flex-col lg:flex-row md:flex-row lg:text-lg md:text-lg lg:gap-32 lg:justify-center md:justify-center md:gap-14 lg:my-6 ">
            {/* Calls */}
            <div className="space-y-3">
              <p className="flex items-center text-black font-bold text-xl underline">
                Calls
              </p>
              {Object.entries(packagePrices)
                .filter(([name]) => name.toLowerCase().includes("calls"))
                .map(([name, price]) => (
                  <p key={name} className="flex text-black items-center">
                    {name} = <strong>₦{price.toLocaleString()}</strong>
                  </p>
                ))}
            </div>

            {/* Messages */}
            <div className="space-y-3">
              <p className="flex items-center text-black font-bold text-xl underline">
                Messages
              </p>
              {Object.entries(packagePrices)
                .filter(([name]) => name.toLowerCase().includes("messages"))
                .map(([name, price]) => (
                  <p key={name} className="flex text-black items-center">
                    {name} = <strong>₦{price.toLocaleString()}</strong>
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl underline text-center my-8">Tips</p>
        </div>

        {/* Tips */}
        <div className=" bg-white bg-opacity-20 lg:px-4 py-10 rounded-md mb-10">
          <ol className="list-decimal text-black space-y-3 px-8 lg:px-12">
            <li>
              All calls and messages to our therapists attract a reasonable fee
            </li>
            <li>
              Take advantage of our affordable therapy packages for premium
              service
            </li>
            <li>
              The more sessions you book, the more economical our services
              become
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;