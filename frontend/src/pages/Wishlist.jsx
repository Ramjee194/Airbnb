import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import Card from '../component/Card';
import { userDataContext } from '../context/UserContext';

function Wishlist() {
  const [favorites, setFavorites] = useState([]);
  const { serverURl } = useContext(userDataContext);

  useEffect(() => {
    axios.get(`${serverURl}/api/wishlist`, { withCredentials: true })
      .then(res => setFavorites(res.data.favorites))
      .catch(err => console.error("Failed to fetch wishlist:", err));
  }, []);

  return (
    <div className="flex bg-red-50 mt-14 items-center justify-center">
      <Nav />
      <div className="pt-28 px-4 max-w-6xl mx-auto">
        <h1 className="flex justify-center items-center text-2xl font-semibold mb-6 ">Your Wishlist</h1>
        <div className="flex flex-wrap gap-6">
          {favorites.length > 0 ? (
            favorites.map((item, i) => <Card key={i} listing={item} />)
          ) : (
            <p className="text-gray-500">You haven’t added anything to your wishlist yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
