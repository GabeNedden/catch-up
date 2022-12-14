import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const AllUsersContext = createContext(null);

export const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(null);
  const [allUsersStatus, setAllUsersStatus] = useState("loading");

  useEffect(() => {
    fetch(`https://catch-up-api.herokuapp.com/users`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAllUsers(res.data);
        setAllUsersStatus("loaded");
      })
      .catch((error) => {
        console.log("error:", error);
        setAllUsersStatus("error");
      });
  }, []);

  return (
    <AllUsersContext.Provider
      value={{
        allUsers,
        allUsersStatus,
      }}
    >
      {children}
    </AllUsersContext.Provider>
  );
};
