import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/Post";
import { PostContext } from "../contexts/PostContext";

const PostDetails = () => {
  const { postId } = useParams();
  const { posts } = useContext(PostContext);
  const [thisPost, setThisPost] = useState(null);

  useEffect(() => {
    if (posts.length) {
      let temp = posts.find((post) => {
        return post._id === postId;
      });
      setThisPost(temp);
      console.log(temp);
    }
  }, [posts]);
  return (
    <Wrapper>
      <div style={{ height: "30px" }}></div>
      {thisPost && <Post post={thisPost} />}
    </Wrapper>
  );
};

export default PostDetails;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
