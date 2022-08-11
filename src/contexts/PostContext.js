import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [status, setStatus] = useState("loading");
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("https://catch-up-api.herokuapp.com/posts", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch((error) => {
        console.log("error:", error);
        setStatus("error");
      });
  }, []);

  return (
    <PostContext.Provider
      value={{
        status,
        setStatus,
        isAuthenticated,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
