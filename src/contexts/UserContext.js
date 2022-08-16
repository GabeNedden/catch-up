import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`https://catch-up-api.herokuapp.com/login`, {
        method: "POST",
        body: JSON.stringify({ user, isAuthenticated }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCurrentUser(res.data);
          setStatus("loaded");
        })
        .catch((error) => {
          console.log("error:", error);
          setStatus("error");
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const success = (pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        currentUser,
        status,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
