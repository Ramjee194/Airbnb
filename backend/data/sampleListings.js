// host will be dynamically injected after inserting user
export const sampleListings = (hostId) => [
  {
    title: "Cozy Room in Delhi",
    description: "Comfortable stay near Connaught Place",
    rent: 1500,
    location: "Delhi",
    category: "Room",
    host: hostId,
    image: "https://source.unsplash.com/random/300x300?room",
  },
  {
    title: "Modern Flat in Mumbai",
    description: "Luxurious flat in Bandra",
    rent: 4000,
    location: "Mumbai",
    category: "Flat",
    host: hostId,
    image: "https://source.unsplash.com/random/300x300?flat",
  },
];
