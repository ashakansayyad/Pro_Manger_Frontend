import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { decodeToken } from "react-jwt";
import { getUserData } from "../apis/user";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState();

  //get looged in user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
      }
      const decoded = decodeToken(token);
      if (!decoded) {
        setIsLoading(false);
        return null;
      } else {
        const userId = decoded?.id;
        setLoggedUserId(userId);
        const res = await getUserData(userId);
        setLoggedUserData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider
      value={{
        loggedUserData,
        setLoggedUserData,
        isLoading,
        setIsLoading,
        loggedUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
