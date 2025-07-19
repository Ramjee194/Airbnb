import React, { useContext } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../context/ListingContext';

function ListingPage1() {
  const { formData, setFormData } = useContext(listingDataContext);
  const navigate = useNavigate();

  const handleImageChange = (e, frontKey, backKey) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      [backKey]: file,
      [frontKey]: URL.createObjectURL(file),
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 relative overflow-auto">
      <form
        className="max-w-[455px] w-[90%] h-[600px] flex items-center justify-start flex-col md:items-start gap-[10px] overflow-auto mt-[150px]"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/listingpage2");
        }}
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <FaArrowLeftLong onClick={() => navigate("/")} />

          <div className="w-[170px] h-[40px] text-[20px] bg-[#e77b7b] text-white flex items-center justify-center rounded-[50px] absolute top-[4px] right-[10px] shadow-lg">
            Setup Your Home
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Image 1 */}
          <div>
            <label htmlFor="image1" className="block text-sm font-medium text-gray-700">Image 1</label>
            <input
              type="file"
              id="image1"
              required
               onChange={(e) => handleImageChange(e, 'frontEndImage1', 'backEndImage1')}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Image 2 */}
          <div>
            <label htmlFor="image2" className="block text-sm font-medium text-gray-700">Image 2</label>
            <input
              type="file"
              id="image2"
              required
              onChange={(e) => handleImageChange(e, 'frontEndImage2', 'backEndImage2')}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Image 3 */}
          <div>
            <label htmlFor="image3" className="block text-sm font-medium text-gray-700">Image 3</label>
            <input
              type="file"
              id="image3"
              required
              onChange={(e) => handleImageChange(e, 'frontEndImage3', 'backEndImage3')}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Rent */}
          <div>
            <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Rent</label>
            <input
              type="text"
              id="rent"
              required
              value={formData.rent}
              onChange={(e) => setFormData((prev) => ({ ...prev, rent: e.target.value }))}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              required
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Landmark */}
          <div>
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
            <input
              type="text"
              id="landmark"
              required
              value={formData.landMark}
              onChange={(e) => setFormData((prev) => ({ ...prev, landMark: e.target.value }))}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            type="submit"
            className="w-[100px] py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingPage1;
