// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import Card from '../component/Card';
import { userDataContext } from '../context/UserContext';
import { sampleListings } from '../samples/sampleListings';

function Home() {
  const [listings, setListings] = useState([]);
  const [flatListing, setFlatListing] = useState([]);
  const [filteredListing, setFilteredListing] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const { serverURl } = useContext(userDataContext);

  useEffect(() => {
    const fetchPublicListings = async () => {
      try {
        const response = await axios.get(`${"https://airbnb-chpu.onrender.com"}/api/listing/public`);
        const allListings = response.data || [];
        if (allListings.length > 0) {
          setListings(allListings);
          filterAndFlatten(allListings, selectedCategory);
        } else {
          setListings(sampleListings);
          filterAndFlatten(sampleListings, selectedCategory);
        }
      } catch (err) {
        console.error('Error loading listings. Using sample listings.', err.message);
        setListings(sampleListings);
        filterAndFlatten(sampleListings, selectedCategory);
      }
    };

    fetchPublicListings();
  }, [serverURl]);

  const filterAndFlatten = (data, category) => {
    const filtered =
      category === 'Trending'
        ? data
        : data.filter((item) => item.category?.toLowerCase() === category.toLowerCase());

    const flat = [];
    filtered.forEach((listing) => {
      ['image1', 'image2', 'image3'].forEach((imgKey) => {
        if (listing[imgKey]) {
          flat.push({ ...listing, image: listing[imgKey] });
        }
      });
    });

    setFilteredListing(flat);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    filterAndFlatten(listings, category);
  };

  const handleSearch = (term) => {
    if (!term) {
      filterAndFlatten(listings, selectedCategory);
      return;
    }

    const lower = term.toLowerCase();
    const filtered = listings.filter((item) =>
      item.title?.toLowerCase().includes(lower) ||
      item.description?.toLowerCase().includes(lower) ||
      item.location?.toLowerCase().includes(lower) ||
      item.landmark?.toLowerCase().includes(lower) ||
      item.category?.toLowerCase().includes(lower)
    );

    filterAndFlatten(filtered, selectedCategory);
  };

  return (
    <div className="min-h-screen mt-28 bg-gray-50">
      <Nav
        onSearch={handleSearch}
        onCategorySelect={handleCategory}
        selectedCategory={selectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
        {filteredListing.map((listing, index) => (
          <Card key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Home;
