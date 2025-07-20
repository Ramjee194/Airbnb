import React, { useState, useContext } from 'react';
import { FaSearch, FaDollyFlatbed } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { MdWhatshot, MdHolidayVillage, MdOutlinePool, MdRoomService } from "react-icons/md";
import { GiFarmTractor, GiWoodCabin } from "react-icons/gi";
import { LiaCampgroundSolid } from "react-icons/lia";
import { FaShop } from "react-icons/fa6";
import logo from '../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';

const Nav = ({ onSearch, onCategorySelect, selectedCategory }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const { userData, setUserData, serverURl } = useContext(userDataContext);
  const { listingData, setFilteredListing, setSelectedCategory } = useContext(listingDataContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState('');


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClick = () => {
    onSearch(query);
  };
  const handleLogOut = async () => {
    try {
      await axios.post(`${"https://airbnb-chpu.onrender.com"}/api/auth/logout`, {}, { withCredentials: true });
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message || error);
    }
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    if (category === "Trending") {
      setFilteredListing(listingData);
    } else {
      const filtered = listingData.filter((item) =>
        item.category?.toLowerCase().trim() === category.toLowerCase().trim()
      );
      setFilteredListing(filtered);
    }
  };

  const categories = [
    { icon: <MdWhatshot size={24} />, label: 'Trending' },
    { icon: <MdHolidayVillage size={24} />, label: 'Villa' },
    { icon: <GiFarmTractor size={24} />, label: 'Farm House' },
    { icon: <MdOutlinePool size={24} />, label: 'Pool House' },
    { icon: <MdRoomService size={24} />, label: 'Rooms' },
    { icon: <FaDollyFlatbed size={24} />, label: 'Flat' },
    { icon: <LiaCampgroundSolid size={24} />, label: 'PG' },
    { icon: <GiWoodCabin size={24} />, label: 'Cabins' },
    { icon: <FaShop size={24} />, label: 'Shops' },
  ];



  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow">
      <nav className="flex items-center  justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="h-6 w-auto" />
          <span className="text-lg font-bold text-rose-600">airbnb</span>
        </div>

        {/* Search */}
        <div className="flex items-center border justify-between rounded-full  px-4 py-2 shadow-sm w-full max-w-md mx-auto sm:mx-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by title, landmark, price..."
            className="flex-grow text-sm outline-none text-gray-700 bg-transparent pr-2"
          />
          <FaSearch
            className="text-white bg-rose-500 p-2 rounded-full cursor-pointer"
            size={28}
            onClick={handleClick}
          />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4 relative text-left">
          <span
            className="text-sm text-gray-700 hidden md:inline  hover:text-gray-500 cursor-pointer"
            onClick={() => navigate("/listingpage1")}
          >
            List your home
          </span>
        </div>

        {/* Right profile */}
        <div className="relative">
          <div className="flex items-center gap-3 border rounded-full px-2 py-1">
            <HiMenu size={22} className="cursor-pointer" />
            {userData ? (
              <div
                onClick={() => setOpen(!open)}
                className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                {userData.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <CgProfile size={26} onClick={() => setOpen(!open)} className="cursor-pointer" />
            )}
          </div>

          {/* Dropdown */}
          {open && (
            <ul className="absolute top-12 right-0 w-52 bg-white border rounded-md shadow-md text-sm z-50">
              {!userData && (
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/login"); setOpen(false); }}>
                  Login
                </li>
              )}
              {userData && (
                <> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/"); setOpen(false); }}>
                  Home
                </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer " onClick={() => { handleLogOut(); setOpen(false); }}>
                    Logout
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b" onClick={() => { navigate("/mylistings"); setOpen(false); }}>
                    My Listings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/mybookings"); setOpen(false); }}>
                    My Bookings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/wishlist"); setOpen(false); }}>
                    Wishlist
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/host/dashboard"); setOpen(false); }}>
                    Host Dashboard

                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/user/dashboard')}>My Dashboard</li>

                </>
              )}
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/listingpage1"); setOpen(false); }}>
                List your Home
              </li>

            </ul>
          )}
        </div>
      </nav>
      <div className="border-b border-gray-200 w-full" />


     <div className="w-full border-b border-gray-200 bg-white">
  <div className="flex overflow-x-auto items-center justify-center gap-6 px-4 py-3">
    {categories.map((item, index) => (
      <div
        key={index}
        onClick={() => onCategorySelect(item.label)}
        className={`flex flex-col items-center cursor-pointer transition duration-200 hover:text-rose-500 ${
          selectedCategory === item.label ? 'text-rose-600 font-semibold' : 'text-gray-600'
        }`}
      >
        {item.icon}
        <span className="text-sm mt-1">{item.label}</span>
      </div>
    ))}
  </div>
</div>




    </div>
  );
};

export default Nav;


