import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const [postStatus, setPostStatus] = useState("loading");
  const [sharedPosts, setSharedPosts] = useState(null);
  const [publicPosts, setPublicPosts] = useState(null);
  const [publicPostStatus, setPublicPostStatus] = useState("loading");
  const [posts, setPosts] = useState([]);
  const [postFormOpen, setPostFormOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetch(`https://catch-up-api.herokuapp.com/posts`, {
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
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetch(
        `https://catch-up-api.herokuapp.com/sharedpublicposts/${currentUser._id}`,
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
          setSharedPosts(res.data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    fetch(`https://catch-up-api.herokuapp.com/publicposts/`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPublicPosts(res.data);
        setPublicPostStatus("loaded");
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
        sharedPosts,
        publicPosts,
        publicPostStatus,
        isAuthenticated,
        postFormOpen,
        setPostFormOpen,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
