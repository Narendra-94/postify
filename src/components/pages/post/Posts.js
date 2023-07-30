import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../../context/PostContext";
import "./posts.css";
import { useNavigate } from "react-router-dom";
import { Shimmer } from "../../Shimmer";

export const Posts = () => {
  const { state, currentPage, setCurrentPage } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  console.log(state, "post state called");

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePostClick = (postId) => {
    navigate(`/postDetail/${postId}`, { state: { postId } });
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div className="post-page-container">
      <div className="post-page-header">
        <img
          src="https://uploads-ssl.webflow.com/64134b5d6d77584aa2835076/6413690106fcce1d6098745f_Viamagus%20Logo.svg"
          alt=""
        />
        <h1>Welcome to Postify!!!</h1>
        <button
          className="create-post"
          onClick={() => navigate(`/create-post`)}
        >
          Create Post
        </button>
        <img
          src="https://uploads-ssl.webflow.com/64134b5d6d77584aa2835076/6413690106fcce1d6098745f_Viamagus%20Logo.svg"
          alt=""
        />
      </div>

      <hr className="line-border" />

      {isLoading ? (
        <Shimmer />
      ) : (
        <>
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
            <span className="page-number">Page {currentPage} of 10</span>
            <button onClick={handleNextPage} disabled={currentPage === 10}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
