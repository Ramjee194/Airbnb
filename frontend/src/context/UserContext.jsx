import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);

  const serverURl = "http://localhost:8000"; // ✅ Update with your backend URL

  const getProfile = async () => {
    try {
      const result = await axios.get(`${serverURl}/api/user/profile`, {
        withCredentials: true, // ✅ Allow sending cookies
      });

      setUserData(result.data);
    } catch (error) {
      console.log("Error fetching profile:", error.response?.data || error.message);
      setUserData(null); // fallback
    }
  };

  useEffect(() => {
    getProfile(); // 🔁 Fetch profile when app loads
  }, []);

  const value = { userData, setUserData, serverURl };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
