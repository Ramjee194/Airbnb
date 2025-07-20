import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import Nav from '../component/Nav';

function EditListing() {
  const { id } = useParams();
  const { serverURl } = useContext(userDataContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    rent: '',
    city: '',
    landMark: '',
    category: '',
    image1: '',
    image2: '',
    image3: '',
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`${"https://airbnb-chpu.onrender.com"}/api/listing/findlistingbyid/${id}`, {
          withCredentials: true
        });
        setForm({
          title: res.data.title || '',
          description: res.data.description || '',
          rent: res.data.rent || '',
          city: res.data.city || '',
          landMark: res.data.landMark || '',
          category: res.data.category || '',
          image1: res.data.image1 || '',
          image2: res.data.image2 || '',
          image3: res.data.image3 || ''
        });
      } catch (err) {
        console.error("Error fetching listing for edit:", err.message);
      }
    };
    fetchListing();
  }, [id, "https://airbnb-chpu.onrender.com"]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${"https://airbnb-chpu.onrender.com"}/api/listing/update/${id}`, form, {
        withCredentials: true
      });
      navigate('/mylistings');
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <div>
      <Nav />
      <div className="max-w-2xl mx-auto  p-6 mt-36">
        <h2 className="text-xl font-bold mb-4">Edit Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2" placeholder="Title" />
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2" placeholder="Description" />
          <input name="rent" value={form.rent} onChange={handleChange} className="w-full border p-2" placeholder="Rent" />
          <div>
            <label htmlFor="image1" className="block text-sm font-medium text-gray-700">Image 1</label>
            <input
              type="file"
              id="image1"
              required
              
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>
          <div>
            <label htmlFor="image2" className="block text-sm font-medium text-gray-700">Image 2</label>
            <input
              type="file"
              id="image2"
              required
              
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>
          <div>
            <label htmlFor="image3" className="block text-sm font-medium text-gray-700">Image 3</label>
            <input
              type="file"
              id="image3"
              required
            
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>
          <input name="city" value={form.city} onChange={handleChange} className="w-full border p-2" placeholder="City" />
          <input name="landMark" value={form.landMark} onChange={handleChange} className="w-full border p-2" placeholder="Landmark" />
          <input name="category" value={form.category} onChange={handleChange} className="w-full border p-2" placeholder="Category" />

          {/* Show previous images for reference */}
          <div className="flex gap-2">
            {[form.image1, form.image2, form.image3].map((img, i) =>
              img ? <img key={i} src={img} alt="preview" className="w-20 h-20 object-cover" /> : null
            )}
          </div>

          {/* Optionally allow re-upload (not required for autofill) */}
         
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditListing;
