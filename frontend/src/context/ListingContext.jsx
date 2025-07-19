import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthDataContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const listingDataContext = createContext();


function ListingContext({ children }) {
  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();
  const [filteredListing, setFilteredListing] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("Trending");


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rent: '',
    city: '',
    landMark: '',
    category: '',
    frontEndImage1: '',
    frontEndImage2: '',
    frontEndImage3: '',
    backEndImage1: '',
    backEndImage2: '',
    backEndImage3: ''
  });

  const [adding, setAdding] = useState(false);
  const [listingData, setListingData] = useState([]);

  const handleAddListing = async () => {
    setAdding(true);
    try {
      const formUploadData = new FormData();

      formUploadData.append("title", formData.title);
      formUploadData.append("description", formData.description);
      formUploadData.append("rent", formData.rent);
      formUploadData.append("city", formData.city);
      formUploadData.append("landMark", formData.landMark);
      formUploadData.append("category", formData.category);

      formUploadData.append("image1", formData.backEndImage1);
      formUploadData.append("image2", formData.backEndImage2);
      formUploadData.append("image3", formData.backEndImage3);

      const result = await axios.post(`${serverUrl}/api/listing/add`, formUploadData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("Listing Added:", result.data);
      navigate("/");
    } catch (error) {
      console.error("Error uploading listing:", error.response?.data || error.message);
    } finally {
      setAdding(false);
    }
  };

  const getListing = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/listing/get`, {
        withCredentials: true,
      });
      console.log("Fetched listings:", result.data);
      setListingData(result.data); // Should now be an array

      setFilteredListing(result.data); // show all by default
    } catch (error) {
      console.error("Error fetching listing:", error.message || error);
    }
  };


  useEffect(() => {
    getListing();
  }, []);

  const value = {
    formData,
    setFormData,
    handleAddListing,
    listingData,
    setListingData,
    filteredListing,
    setFilteredListing,
    selectedCategory,
    setSelectedCategory,
    adding,
    setAdding,
  };


  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
}

export default ListingContext;
