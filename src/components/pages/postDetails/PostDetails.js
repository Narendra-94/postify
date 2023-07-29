import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../context/PostContext";
import { useParams, useNavigate } from "react-router-dom";
import "./postDetails.css";

export const PostDetails = () => {
  const { state } = useContext(PostContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const selectedPost = state.post.find((post) => post.id === Number(postId));
    setPost(selectedPost);
  }, [state.post, postId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-details-container">
      <div className="post-details">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
};
