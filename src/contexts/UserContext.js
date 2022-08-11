import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (user) {
      fetch(
        `https://catch-up-api.herokuapp.com/user/${user.sub.substring(6)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("userres:", res);
        })
        .catch((error) => {
          console.log("error:", error);
          setStatus("error");
        });
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
