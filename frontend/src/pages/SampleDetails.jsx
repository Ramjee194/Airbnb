import React from 'react';
import { useParams } from 'react-router-dom';
import { sampleListings } from '../samples/sampleListings';

function SampleDetails() {
  const { id } = useParams();
  const listing = sampleListings.find((item) => item.id === id);

  if (!listing) return <p>Listing not found</p>;

  return (
    <div className="p-6">
      <img src={listing.image1} className="w-full max-w-xl rounded-xl" />
      <h1 className="text-2xl font-bold mt-4">{listing.title}</h1>
      <p className="text-gray-500">{listing.description}</p>
      <p className="text-rose-600 mt-2 font-semibold">₹{listing.price} per night</p>
    </div>
  );
}

export default SampleDetails;
