import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../../context/PostContext";
import "./posts.css";
import { useNavigate } from "react-router-dom";
import { Shimmer } from "../../Shimmer";

export const Posts = () => {
  const { state, currentPage, setCurrentPage } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  const localData = JSON.parse(localStorage.getItem("allPostData"));

  console.log(localData, "local");

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

  // const {
  //   allPostData: { length },
  // } = state;

  const lastPage = Math.ceil(
    localData?.length % 10 === 0
      ? localData.length / 10
      : localData?.length / 10
  );

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  console.log(state, "console");
  const sliceData = localData?.slice(startIndex, endIndex);

  return (
    <div className="post-page-container">
      <div className="post-page-header">
        <img
          src="https://uploads-ssl.webflow.com/64134b5d6d77584aa2835076/6413690106fcce1d6098745f_Viamagus%20Logo.svg"
          alt=""
        />
        <h1>Welcome to Postify!!!</h1>

        <img
          src="https://uploads-ssl.webflow.com/64134b5d6d77584aa2835076/6413690106fcce1d6098745f_Viamagus%20Logo.svg"
          alt=""
        />

        <button
          className="create-post"
          onClick={() => navigate(`/create-post`)}
        >
          Create Post
        </button>
      </div>

      <hr className="line-border" />

      {isLoading ? (
        <Shimmer />
      ) : (
        <>
          <ul className="post-container">
            {sliceData?.map(({ id, title, body }) => (
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
              Page {currentPage} of {lastPage}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === lastPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
