import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const AllUsersContext = createContext(null);

export const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`https://catch-up-api.herokuapp.com/`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAllUsers(res.data);
        setStatus("loaded");
      })
      .catch((error) => {
        console.log("error:", error);
        setStatus("error");
      });
  }, []);

  return (
    <AllUsersContext.Provider
      value={{
        allUsers,
        status,
      }}
    >
      {children}
    </AllUsersContext.Provider>
  );
};
