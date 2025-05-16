// import React from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// const FloatingWhatsAppButton = ({ phoneNumber = "1234567890" }) => {
//   const location = useLocation();

//   // Don't show on admin pages
//   if (location.pathname.includes("/admin")) {
//     return null;
//   }

//   const handleWhatsAppClick = () => {
//     // Format phone number according to WhatsApp requirements
//     const formattedNumber = phoneNumber.replace(/\D/g, "");
//     const whatsappUrl = `https://wa.me/${formattedNumber}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <button
//       onClick={handleWhatsAppClick}
//       className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
//       aria-label="Chat on WhatsApp"
//     >
//       <FaWhatsapp className="text-xl md:text-2xl" />
//     </button>
//   );
// };

// export default FloatingWhatsAppButton;


import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const FloatingWhatsAppButton = ({
  phoneNumber = "1234567890",
  message = "Hello! I have a question about your products.",
}) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // Don't show on admin pages
  // Don't show on admin or auth pages
  if (
    location.pathname.includes("/admin") ||
    location.pathname.includes("/auth/login") ||
    location.pathname.includes("/auth/register") ||
    location.pathname.includes("/auth/forgot-password") ||
    location.pathname.includes("/auth/reset-password") ||
    location.pathname.includes("/auth/input-otp") ||
    location.pathname.includes("/auth/confirm-reset")
  ) {
    return null;
  }

  const handleWhatsAppClick = () => {
    // Format phone number and message for WhatsApp URL
    const formattedNumber = phoneNumber.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isHovered && (
        <div className="bg-white text-gray-800 p-2 rounded-lg shadow-lg mb-2 text-sm animate-fade-in">
          Chat with us on WhatsApp!
        </div>
      )}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </button>
    </div>
  );
};

export default FloatingWhatsAppButton;