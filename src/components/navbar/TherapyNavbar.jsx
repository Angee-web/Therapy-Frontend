import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp, IoHeadset, IoHome, IoPerson } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
import {
  FaBlog,
  FaInfoCircle,
  FaRegQuestionCircle,
  FaHome,
  FaBox,
} from "react-icons/fa";
// import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogout } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogOut, UserCog } from "lucide-react";
import { logoutUser } from "@/store/auth-slice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Assuming React Router is used for navigation
  const { user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Toggle the dropdown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Close dropdown after selecting a course
//   const handleCourseClick = () => {
//     setIsDropdownOpen(false);
//   };

  const handleLogout = async () => {
  try {
    await dispatch(logoutUser()).unwrap(); // Ensure the thunk completes
    localStorage.removeItem("token"); // Force remove the token from local storage
    localStorage.removeItem("intendedRoute"); // Ensure intendedRoute is also cleared
    navigate("/auth/login"); // Redirects the user to the login page
    window.location.reload(); // Reloads the page
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <div>
      {/* This is the navigation bar desktop view */}
      {/* This is the gradient colour for the page ( bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] )*/}
      <div className="fixed top-0 left-0 right-0 z-50 hidden lg:flex flex-col bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full">
        {/* Top Section */}
        <div className="flex w-full items-center px-10 py-3">
          <img
            className="h-[4rem]"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
            alt="App-logo"
          />

          <div className="relative flex items-center flex-grow justify-center">
            <Input className="w-[500px] bg-black text-white" />
            {/* Magnifying Glass Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-1 h-9 w-9 text-white bg-blue-500 p-2 font-bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        {/* Navbar Section */}
        <div className="bg-black w-full">
          <nav className="flex items-center justify-between px-10 py-3">
            {/* Left Navigation Links */}
            <ul className="flex gap-5">
              <li className="text-white hover:text-[#C42571]">
                <Link to="/">Home</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/therapy/about">About Us</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/therapy/teenAppointment">Teen Therapy</Link>
              </li>
              {/* Products Dropdown */}
              {/* <li className="relative text-white hover:text-[#C42571]">
                <button
                  onClick={toggleDropdown}
                  className="list-item-text-3 focus:outline-none"
                >
                  Our Products (+18 only)
                </button>
                {isDropdownOpen && (
                  <ul className="absolute z-30 left-0 mt-2 w-[10rem] h-auto bg-white flex flex-col justify-between shadow-lg rounded-lg text-black">
                    <li className="hover:bg-[#C42571] hover:text-white">
                      <Link
                        to="/shop/for-men"
                        className="block px-4 py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        For-Men
                      </Link>
                    </li>
                    <li className="hover:bg-[#C42571] hover:text-white">
                      <Link
                        to="/shop/for-women"
                        className="block px-4 py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        For-Women
                      </Link>
                    </li>
                    <li className="hover:bg-[#C42571] hover:text-white">
                      <Link
                        to="/shop/for-couple"
                        className="block px-4 py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Couples
                      </Link>
                    </li>
                    <li className="hover:bg-[#C42571] hover:text-white">
                      <Link
                        to="/shop/all-products"
                        className="block px-4 py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        All Products
                      </Link>
                    </li>
                  </ul>
                )}
              </li> */}
{/* 
              <li className="text-white hover:text-[#C42571]">
                <Link to="/shop/courses/books">Courses</Link>
              </li> */}

              {/* <li className="text-white hover:text-[#C42571]">
                <Link to="/blog">Blog</Link>
              </li> */}
              <li className="text-white hover:text-[#C42571]">
                <Link to="/therapy/contact">Contact Us</Link>
              </li>
            </ul>

            {/* Right Section: User Dropdown */}
            <div >
              <DropdownMenu className="bg-white ">
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-white text-lg bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] p-2 border border-white">
                      {user?.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-56">
                  <DropdownMenuLabel>
                    Logged In as {user?.userName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Account */}
                  <DropdownMenuItem
                    onClick={() => navigate("/therapy/profile")}
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* Log out */}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 ">
        <div className="flex items-center justify-between p-4 bg-[#F5F5DC]">
          <button onClick={toggleMenu} className="text-black">
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <img
            className="h-[3rem]"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
            alt="App-logo"
          />
        </div>

        {/* Sidebar Navigation */}
        <div
          className={`fixed top-0 left-0 h-full w-[80vw] bg-black text-white transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } border rounded-tr-2xl`}
        >
          <div className="flex flex-col h-full p-3">
            {/* App logo */}
            <div className="flex justify-between gap-2 items-center mb-6">
              <img
                className="h-[3rem]"
                src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
                alt="App-logo"
              />

              {/* Search Bar */}
              <div className="relative flex items-center w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search anything....."
                  className="w-full pl-8 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {/* Magnifying Glass Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </div>

              <button
                onClick={toggleMenu}
                className="text-white self-end mb-2 bg-slate-600 p-2 rounded-full font-semibold"
              >
                {/* Close Icon */}
                <IoCloseSharp />
              </button>
            </div>

            <nav className="flex flex-col gap-1 pl-4 text-md">
              <Link
                to="/"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <FaHome className="w-6 h-6" />
                Home
              </Link>

              <Link
                to="/therapy/about"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <FaInfoCircle className="w-6 h-6" />
                About Us
              </Link>

              <Link
                to="/therapy/teenAppointment"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <IoHeadset className="w-6 h-6" />
                Teen Therapy
              </Link>

              {/* <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="list-item-text-3 flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2 text-md"
                >
                  <FaBox className="w-5 h-5" />
                  Our Products (+18 only)
                </button>
                {isDropdownOpen && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/shop/for-men"
                        className="block hover:text-[#C42571]"
                        onClick={() => {
                          toggleMenu();
                          setIsDropdownOpen(false);
                        }}
                      >
                        For-Men
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop/for-women"
                        className="block hover:text-[#C42571]"
                        onClick={() => {
                          toggleMenu();
                          setIsDropdownOpen(false);
                        }}
                      >
                        For-Women
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop/for-couple"
                        className="block hover:text-[#C42571]"
                        onClick={() => {
                          toggleMenu();
                          setIsDropdownOpen(false);
                        }}
                      >
                        Couples
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop/all-products"
                        className="block hover:text-[#C42571]"
                        onClick={() => {
                          toggleMenu();
                          setIsDropdownOpen(false);
                        }}
                      >
                        All Products
                      </Link>
                    </li>
                  </ul>
                )}
              </div> */}

              {/* <div>
                <Link
                  to="/shop/courses/books"
                  className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                  onClick={toggleDropdown}
                >
                  <MdOutlineMenuBook/>
                  Courses
                </Link>
              </div> */}

              {/* <Link
                to="/blog"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <FaBlog className="w-6 h-6" />
                Blog
              </Link> */}
            </nav>

            <div className="flex flex-col pl-4 gap-2 text-sm mt-[50px]">
              <Link
                to="/therapy/contact"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <FaRegQuestionCircle className="w-5 h-5" />
                Contact Us
              </Link>

              {/* <Link
                to="/auth/register"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
              >
                <SiGnuprivacyguard className="w-5 h-5" />
                Sign up
              </Link> */}

              <Link
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={handleLogout} // Calls the logout function
              >
                <CiLogout className="w-5 h-5 font-bold" />
                Log out
              </Link>

              <Link
                to="/therapy/profile"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <IoPerson className="w-6 h-6" /> Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
