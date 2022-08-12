import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [postStatus, setPostStatus] = useState("loading");
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
      .then((res) => {
        setPosts(res.data);
        setPostStatus("loaded");
      })
      .catch((error) => {
        console.log("error:", error);
        setPostStatus("error");
      });
  }, []);

  return (
    <PostContext.Provider
      value={{
        postStatus,
        setPostStatus,
        posts,
        isAuthenticated,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
