import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_API } from "../service/baseservice"; 

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(BASE_API.CHECK_AUTH, {
          withCredentials: true, 
        });


        if (res.data?.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setIsAuthenticated(false); 
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === undefined) {
    return null; 
  }

  return isAuthenticated ? children : <Navigate to="/" replace />; 
};

export default ProtectedRoute;
