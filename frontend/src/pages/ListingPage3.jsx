import React, { useContext } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../context/ListingContext';

function ListingPage3() {
  const navigate = useNavigate();
  const { formData, handleAddListing, adding } = useContext(listingDataContext);



  const images = [
    { src: formData.frontEndImage1, label: 'Image 1' },
    { src: formData.frontEndImage2, label: 'Image 2' },
    { src: formData.frontEndImage3, label: 'Image 3' },
  ];

  return (
    <div className='w-full min-h-screen bg-white flex items-center justify-center flex-col overflow-auto relative'>
      <div className="w-full max-w-5xl p-8 space-y-6 bg-white rounded shadow-md">

        {/* Back button */}
        <FaArrowLeftLong onClick={() => navigate("/listingpage1")} className="cursor-pointer" />

        {/* Location */}
        <div className='text-xl md:text-2xl font-semibold text-gray-800'>
          {`In ${(formData.landMark || '').toUpperCase()}, ${(formData.city || '').toUpperCase()}`}
        </div>

        {/* Image Gallery */}
        <div className='flex flex-wrap justify-center items-start gap-6'>
          {images.map((img, index) => (
            <div key={index} className="w-[300px] bg-gray-50 border rounded-lg shadow-sm overflow-hidden">
              {img.src ? (
                <img
                  src={img.src}
                  alt={`Listing ${index + 1}`}
                  className="w-full h-[200px] object-cover"
                />
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center text-gray-400">
                  No {img.label}
                </div>
              )}
              {/* Details below image */}
              <div className="p-4 text-sm text-gray-700 space-y-1">
                <p><strong>Title:</strong> {formData.title || 'N/A'}</p>
                <p><strong>Category:</strong> {formData.category || 'N/A'}</p>
                <p><strong>Description:</strong> {formData.description || 'N/A'}</p>
                <p><strong>Rent:</strong> ₹{formData.rent || 'N/A'}/day</p>
              </div>

            </div>
          ))}
        </div>

        {/* Optional: Raw data for debug */}
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </div>
      <button
        type="submit"
        className="w-[100px] py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
        onClick={() => handleAddListing()}
        disabled={!formData}>
        {adding ? "adding..." : " Add listing"}
      </button>
    </div>

  );
}

export default ListingPage3;
