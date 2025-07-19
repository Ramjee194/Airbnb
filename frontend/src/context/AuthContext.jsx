import React, { createContext } from 'react';
import { useState } from 'react';

//  Use PascalCase for context names by convention
export const AuthDataContext = createContext();

function AuthContextProvider({ children }) {
  const serverUrl = "http://localhost:8000";
  const [loading,setLoading] = useState(false)

  // define this outside the return
  const value = { serverUrl ,loading,setLoading};

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContextProvider;
