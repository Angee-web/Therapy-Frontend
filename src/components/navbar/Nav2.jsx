import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFirstOrderAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogIn } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

// import { FaUserCog } from "react-icons/fa";
import { LogOut, UserCog } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { getSearchResult } from "@/store/shop/search-slice";
import { BsCollection } from "react-icons/bs";

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-end items-center gap-3 text-2xl text-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-white cursor-pointer">
              <AvatarFallback className="bg-white text-lg bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]  p-2 border border-white">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="w-56">
            <DropdownMenuLabel>Logged In as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Account */}
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Order */}
            <DropdownMenuItem onClick={() => navigate("/shop/shopping-order")}>
              <FaFirstOrderAlt className="mr-2 h-4 w-4" />
              Orders
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/collection")}>
              <BsCollection className="mr-2 h-4 w-4" />
              Collection Page
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Log out */}
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

const Nav2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);

  // const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();

  const handleCartNavigate = () => {
    navigate("/shop/cart");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handelFavoriteNavigate = () => {
    navigate("/shop/wishlist");
  };

  const handleSearch = () => {
    if (keyword.trim().length > 2) {
      navigate(`/shop/search/${keyword}`);
    }
  };

  const handleLogin = () => {
    if (!isAuthenticated) {
      // If the user is not authenticated, save the last attempted URL and redirect to login
      const currentRoute = `/shop/home`;
      localStorage.setItem("lastAttemptedURL", currentRoute);
      navigate("/auth/login", { replace: true });
      return;
    }
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden fixed top-0 left-0 right-0 z-50  lg:flex flex-col bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full ">
        <div className="flex w-full items-center justify-between gap-[5rem] px-10 py-3">
          <img
            className="h-[4rem]"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
            alt="App-logo"
          />

          {/* The searchBar */}
          <div className=" flex items-center flex-grow justify-center">
            <Input
              placeholder="Search Product..."
              value={keyword}
              name="keyword"
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSearch()}
              className="w-[500px] absolute bg-black text-white"
            />
            {/* Magnifying Glass Icon */}
            <button
              type="button"
              className="relative left-[14.4rem]"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-9 w-9 text-white bg-blue-500 p-2 font-bold"
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
            </button>
          </div>

          <div className="flex justify-end items-center gap-3 text-2xl text-white">
            <IoLogoWhatsapp />
            <FaRegHeart onClick={handelFavoriteNavigate} />
            <div className="cursor-pointer" onClick={handleCartNavigate}>
              <MdOutlineShoppingCart />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-[#252525] w-full shadow-lg">
          <nav className="pl-[4rem] w-full pr-10 py-3 flex items-center shadow-custom justify-between">
            <ul className="flex gap-5 w-full p-3">
              <li className="text-white hover:text-[#C42571]">
                <Link to="/shop/home">Home</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/shop/about">About Us</Link>
              </li>

              {/* Products Dropdown */}
              <li className="relative text-white hover:text-[#C42571]">
                <button onClick={toggleDropdown} className="focus:outline-none">
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
              </li>

              <li className="text-white hover:text-[#C42571]">
                <Link to="/shop/courses/books">Courses</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/therapy">Therapy</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/shop/blog-page">Blog</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
            <div className="flex justify-between items-center gap-2 w-[30%] p-3">
              <div className="flex gap-4 w-[65%]">
                <Button className="bg-[#006CFF] w-full text-white text-lg font-semibold">
                  <Link to="/shop/sell-a-product">Sell</Link>
                </Button>
              </div>
              <div className="hidden lg:block">
                <div>
                  {isAuthenticated ? (
                    <div>
                      <HeaderRightContent />
                    </div>
                  ) : null}
                </div>
              </div>
              {!isAuthenticated && (
                <IoMdLogIn
                  onClick={handleLogin}
                  className="text-[#006CFF] text-3xl "
                />
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden border-b">
        <div className="flex items-center justify-between bg-[#252525] shadow-md p-4">
          <button onClick={toggleMenu} className="text-white">
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
          className={`fixed top-0 left-0 h-full w-64 z-30 bg-black text-white transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-5">
            <button onClick={toggleMenu} className="text-white self-end mb-5">
              <IoCloseSharp />
            </button>

            <nav className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex justify-start">
                  {isAuthenticated ? (
                    <div>
                      <HeaderRightContent />
                    </div>
                  ) : null}
                </div>

                {/* cart icon */}
                <div className="flex  items-center gap-3 text-2xl text-white">
                  <div className="cursor-pointer" onClick={handleCartNavigate}>
                    <MdOutlineShoppingCart />
                  </div>
                </div>
              </div>
              {/* Search input */}
              <div className=" flex items-center flex-grow w-fit justify-start relative">
                <Input
                  placeholder="Search Product..."
                  onChange={(event) => setKeyword(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                  name="keyword"
                  className="w-fit  bg-black text-white rounded-full"
                />
                {/* Magnifying Glass Icon */}
                <button
                  type="button"
                  className="absolute right-[0.20rem] "
                  onClick={handleSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" h-9 w-9 text-white bg-blue-500 p-2 font-bold rounded-full"
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
                </button>
              </div>
              <Link
                to="/shop/home"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/shop/about"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                About Us
              </Link>

              {/* Dropdown in Mobile View */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-left w-full hover:text-[#C42571]"
                >
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
              </div>

              <Link
                to="/shop/courses/books"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Courses
              </Link>
              <Link
                to="/therapy"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Therapy
              </Link>
              <Link
                to="/shop/blog-page"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Blog
              </Link>

              <Link
                to="/contact"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </nav>

            <div className="flex flex-col gap-2 mt-4">
              <Button className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full text-white">
                <Link to="/shop/sell-a-product">Sell</Link>
              </Button>

              {!isAuthenticated && (
                <Button
                  onClick={handleLogin}
                  className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav2;
