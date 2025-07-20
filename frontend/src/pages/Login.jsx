import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { AuthDataContext } from '../context/AuthContext';


const Login = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userDataContext);
  const { loading, setLoading } = useContext(AuthDataContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await fetch("https://airbnb-chpu.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Send cookies with request
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Optionally store token if you're using localStorage (not needed if using httpOnly cookie)
      // localStorage.setItem("token", data.token); // Only if token is returned

      // ✅ Set user data in context (Fix: use data, not response.data)
      setUserData(data);
      setLoading(false)

      alert("Login successful!");
      navigate("/");

    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
      setLoading(false)

    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <FaArrowLeftLong onClick={() => {
          navigate("/");
        }} />

        <h2 className="text-2xl font-bold text-center text-red-800">Welcome to Airbnb</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm mt-2 text-blue-600 hover:underline cursor-pointer" onClick={() => navigate("/forgot-password")}>
  Forgot Password?
</p>

          </div>
          {setUserData && <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
         disabled={loading} >
           {loading ? "Loading...":"Login"}
          </button>}
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-red-900 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
