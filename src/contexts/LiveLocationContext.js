import { createContext, useEffect, useState } from "react";
export const LiveLocationContext = createContext(null);

export const LiveLocationProvider = ({ children }) => {
  const [liveLocation, setLiveLocation] = useState(null);

  useEffect(() => {
    const success = (pos) => {};

    let id;
    let options;

    function success(pos) {
      setLiveLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    }

    function error(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }

    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    id = navigator.geolocation.watchPosition(success, error, options);
  }, []);

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
