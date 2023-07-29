import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../../context/PostContext";
import "./posts.css";
import { useNavigate } from "react-router-dom";

export const Posts = () => {
  const { state, dispatch, fetchData } = useContext(PostContext);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(dispatch, currentPage);
  }, [dispatch, fetchData, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePostClick = (postId) => {
    navigate(`/postDetail/${postId}`, { state: { postId } });
  };

  return (
    <div className="post-page-container">
      <button onClick={() => navigate(`/create-post`)}>Create Post</button>
      <ul className="post-container">
        {state?.post.map(({ id, title, body }) => (
          <li
            key={id}
            className="post"
            onClick={() => handlePostClick(id)}
            style={{ cursor: "pointer" }}
          >
            <h2>{title}</h2>
            <p>{body}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-number">
          Page {currentPage} of {state.post.length}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === state.post.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};
