import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import MyListings from './pages/MyListing';
import ListingDetails from './pages/ListingDetails';
import EditListing from './pages/EditListing';
import BookingDetails from './pages/BookingDetails';
import MyBookings from './pages/MyBookings';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import HostDashboard from './pages/HostDashboard';
import Wishlist from './pages/Wishlist';
import CustomerDashboard from './pages/CustomerDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SampleDetails from './pages/SampleDetails';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/listingPage1' element={<ListingPage1 />} />
      <Route path='/listingPage2' element={<ListingPage2 />} />
      <Route path='/listingPage3' element={<ListingPage3 />} />
      <Route path='/mylistings' element={<MyListings />} />
      <Route path="/listing/:id" element={<ListingDetails />} />
      <Route path="/editlistings/:id" element={<EditListing />} />
      <Route path="/bookingdetails/:id" element={<BookingDetails />} />  {/* ✅ Booking details */}
      <Route path="/mybookings" element={<MyBookings />} />
      <Route path="/book/:listingId" element={<BookingPage />} />         {/* ✅ Booking form */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/host/dashboard" element={<HostDashboard />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/user/dashboard" element={<CustomerDashboard />} />


      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword/>} />
      <Route path="/sample/:id" element={<SampleDetails/>} />

    
     

    </Routes>
  );
}

export default App;
