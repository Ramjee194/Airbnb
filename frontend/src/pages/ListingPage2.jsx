import React, { useContext } from 'react'
import { FaDollyFlatbed } from 'react-icons/fa';
import { FaArrowLeftLong, FaShop } from "react-icons/fa6";
import { GiFarmTractor, GiWoodCabin } from 'react-icons/gi';
import { LiaCampgroundSolid } from 'react-icons/lia';

import { useNavigate } from 'react-router-dom';
import { MdWhatshot, MdHolidayVillage, MdOutlinePool, MdRoomService } from "react-icons/md";
import { listingDataContext } from '../context/ListingContext';





function ListingPage2() {
    const navigate = useNavigate()
    const { formData, setFormData } = useContext(listingDataContext);

    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100 relative overflow-auto" >
            <div className="w-full max-w-full  p-8 space-y-6 bg-white rounded shadow-md  ">
                <FaArrowLeftLong onClick={() => {
                    navigate("/listingpage1");
                }} />
                <div className='w-[170px] h-[40px] text-[18px]  bg-[#e77b7b] text-white flex items-center justify-center
                        rounded-[50px] absolute top-[7px] right-[10px] shadow-lg'>Set Your Category

                </div>
                <div className='max-w-[600px] w-[100%] h-[50px] md:w-[50%] flex  items-center justify-start
        gap-[10px] overflow-auto  '>

                </div>
                <div className='flex flex-wrap justify-center items-center gap-8'>
                    <h1 className='text-xl cursor-pointer text-red-400 hover:text-red-600'>
                        Which of places describe you
                    </h1>
                    <div className='flex flex-wrap justify-center items-center gap-8'>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "pool" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "pool" }))}>
                            <MdOutlinePool size={30} className='text-black' />
                            <h3>Pool</h3>
                        </div>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "villa" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "villa" }))}>
                            <MdHolidayVillage size={30} className='text-black' />
                            <h3>Villa</h3>
                        </div>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "farm house" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "farm house" }))}>
                            <GiFarmTractor size={30} className='text-black' />
                            <h3>Farm House</h3>
                        </div>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "rooms" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "rooms" }))}>
                            <MdRoomService size={30} className='text-black' />
                            <h3>Rooms</h3>
                        </div>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "flat" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "flat" }))}>
                            <FaDollyFlatbed size={30} className='text-black' />
                            <h3>Flat</h3>
                        </div>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "pg" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "pg" }))}>
                            <LiaCampgroundSolid size={30} className='text-black' />
                            <h3>PG</h3>
                        </div>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "cabin" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "cabin" }))}>
                            <GiWoodCabin size={30} className='text-black' />
                            <h3>Cabin</h3>
                        </div>

                        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col
      cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[12px] rounded-lg 
      ${formData.category === "shops" ? "border-3 border-[#8b8b8b]" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, category: "shops" }))}>
                            <FaShop size={30} className='text-black' />
                            <h3>Shops</h3>
                        </div>

                    </div>
                </div>

                <button
                    type="submit"
                    className="w-[100px] py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => navigate("/listingpage3")} disabled={!formData}>
                    Next
                </button>
            </div>
        </div>

    )
}

export default ListingPage2