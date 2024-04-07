import React, { createContext, useContext, useState } from 'react';


const UserContext = createContext();
export const dummyUser = {
    username: "johndoe",
    password: "encryptedpassword", // In real application, passwords wouldn't be stored or passed like this.
    refreshToken: "someRefreshToken",
    role: "user" // Can be "Admin", "professional", or "User"
  };
  
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Assume you set the initial user state with dummy data
  const [user, setUser] = useState(dummyUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
