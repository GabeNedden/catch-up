import { createContext, useEffect, useState } from "react";
export const LiveLocationContext = createContext(null);

export const LiveLocationProvider = ({ children }) => {
  const [liveLocation, setLiveLocation] = useState(null);

  useEffect(() => {
    let userLocationTimer = setTimeout(() => {
      const success = (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      };

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
      console.log("UPDATED LOCATION", liveLocation);
    }, 5000);

    return () => {
      clearTimeout(userLocationTimer);
    };
  });

  return (
    <LiveLocationContext.Provider
      value={{
        liveLocation,
        setLiveLocation,
      }}
    >
      {children}
    </LiveLocationContext.Provider>
  );
};
