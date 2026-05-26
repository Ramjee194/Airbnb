import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/listing.model.js";
import User from "./models/user.model.js";
import Booking from "./models/booking.js";
import Review from "./models/review.model.js";

dotenv.config();

const seed = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      console.error("Error: MONGODB_URL is not defined in backend/.env file");
      process.exit(1);
    }
    
    await mongoose.connect(mongoUrl);
    console.log("✅ Connected to MongoDB for seeding");

    // 1. Clear listings, bookings, reviews
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    console.log("🧹 Cleared listings, bookings, and reviews from DB");

    // 2. Find or create host
    let host = await User.findOne({});
    if (!host) {
      host = await User.create({
        name: "RoomKaro Host",
        email: "host@roomkaro.com",
        password: "hashedpassword123"
      });
      console.log("👤 Created a default host user");
    } else {
      console.log(`👤 Using existing user as host: "${host.name}" (ID: ${host._id})`);
    }

    // 3. Define 10 distinct, premium properties
    const distinctListings = [
      {
        title: "Cozy Wooden Cabin in the Woods",
        description: "Escape to nature in this beautiful A-frame wooden cabin. Nestled among towering pines, it features a warm fireplace, outdoor fire pit, fully equipped kitchen, high-speed Wi-Fi, and 4 comfortable beds. Ideal for weekend hikes and stargazing.",
        rent: 3200,
        city: "Shimla",
        landMark: "Near Mall Road Forest Reserve",
        category: "Cabins",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 3200,
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Near Mall Road Forest Reserve, Shimla, Himachal Pradesh, India"
      },
      {
        title: "Sunset Beachfront Luxury Villa",
        description: "Step directly onto the sand from this exquisite modern beachfront villa. Features a private infinity plunge pool, sun loungers, panoramic ocean-facing glass walls, and a grand rooftop patio. Comes with premium room service and 4 guest suites.",
        rent: 8500,
        city: "Goa",
        landMark: "Candolim Beach Front",
        category: "Beach",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 8500,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Candolim Beach Front, Goa, India"
      },
      {
        title: "Modern Minimalist Flat in Bandra",
        description: "An elegant, sun-drenched flat located in the heart of Mumbai's most trendy neighborhood. Enjoy high-speed Wi-Fi, premium furnishings, a sleek workspace, state-of-the-art kitchen, and close proximity to the best cafes, bars, and galleries.",
        rent: 4200,
        city: "Mumbai",
        landMark: "Linking Road Cafes Area",
        category: "Flat",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 4200,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Linking Road Cafes Area, Bandra West, Mumbai, Maharashtra, India"
      },
      {
        title: "Heritage Palace Mansion with Courtyard",
        description: "Experience royal living in this grand historical mansion. Showcases traditional Rajasthani architecture, a central open courtyard, beautiful hand-painted murals, marble floors, and 4 lavish bedrooms with attached designer baths.",
        rent: 9800,
        city: "Jaipur",
        landMark: "Hawa Mahal Heritage Circle",
        category: "Mansions",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 9800,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Hawa Mahal Heritage Circle, Jaipur, Rajasthan, India"
      },
      {
        title: "Mountain View Organic Farmhouse",
        description: "A peaceful rural retreat surrounded by organic vegetable fields and fruit orchards. Features a spacious wrap-around verandah, cozy indoor swings, home-cooked local meals on demand, and 4 guest rooms overlooking scenic mountain valleys.",
        rent: 5500,
        city: "Lonavala",
        landMark: "Near Bhushi Dam",
        category: "Farms",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1472214222541-d510753a8707?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 5500,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Near Bhushi Dam, Lonavala, Maharashtra, India"
      },
      {
        title: "Infinity Pool Penthouse in the Sky",
        description: "Breathtaking penthouse offering unmatched panoramic views of the city skyline. Features a stunning private glass-walled infinity pool, smart automation systems, customized ambient lighting, fully stocked dry bar, and a state-of-the-art kitchen.",
        rent: 7500,
        city: "Bangalore",
        landMark: "UB City Business District",
        category: "Pools",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 7500,
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "UB City Business District, Bangalore, Karnataka, India"
      },
      {
        title: "Cozy Private Studio Room near Connaught Place",
        description: "Perfect base for exploring the capital city. A fully air-conditioned, self-contained studio room featuring high-speed Wi-Fi, warm lighting, dynamic workspace, and close access to metro lines, shopping hubs, and historical sights.",
        rent: 1800,
        city: "Delhi",
        landMark: "Connaught Place Circle",
        category: "Rooms",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        rating: 4.4,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 1800,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Connaught Place Circle, New Delhi, India"
      },
      {
        title: "Peaceful Forest Edge Cabin with Hot Tub",
        description: "Unplug and unwind in this quiet forest retreat. Features an outdoor heated hot tub, wrap-around deck, modern amenities, glass sky windows for stargazing, and 4 cozy sleeping spots surrounded by nature trails.",
        rent: 4600,
        city: "Manali",
        landMark: "Old Manali Forest Trail",
        category: "Cabins",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1475855581690-80aca532d82e?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 4600,
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Old Manali Forest Trail, Manali, Himachal Pradesh, India"
      },
      {
        title: "Exclusive Cliffside Ocean-View Villa",
        description: "Built on a private cliffside overlooking the Arabian Sea. Enjoy a private saltwater pool, customizable sunset chef dinners, fully loaded games room, and 4 double bedrooms with attached private sunset terraces.",
        rent: 9200,
        city: "Alibaug",
        landMark: "Varsoli Cliffside Heights",
        category: "Beach",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 9200,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Varsoli Cliffside Heights, Alibaug, Maharashtra, India"
      },
      {
        title: "Trendy Industrial Loft near Tech Hub",
        description: "A super-chic loft showcasing industrial design, double-height ceilings, exposed brickwork, smart voice commands, automated curtains, fully equipped modular kitchen, and a large terrace for social get-togethers.",
        rent: 3600,
        city: "Hyderabad",
        landMark: "Gachibowli Tech District",
        category: "Trending",
        host: host._id,
        image1: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        image2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        image3: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        isBooked: false,
        booking: [],
        guestCount: 4,
        bedroomCount: 4,
        bathroomCount: 4,
        price: 3600,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        country: "India",
        address: "Gachibowli Tech District, Hyderabad, Telangana, India"
      }
    ];

    const insertedListings = await Listing.insertMany(distinctListings);
    console.log(`🎉 Successfully added ${insertedListings.length} new distinct listings!`);

    // 4. Update the host's listings list in DB
    const listingIds = insertedListings.map(item => item._id);
    await User.findByIdAndUpdate(host._id, { listing: listingIds });
    console.log("🔗 Updated host listings references in DB");

  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seed();
