import React, { useContext, useState } from "react";
import "./createPost.css";
import { PostContext } from "../../../context/PostContext";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useContext(PostContext);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setDescription(text);
    if (text.length > 1000) {
      setErrorMessage("Description cannot exceed 1000 characters");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      return;
    }

    setIsSubmitting(true);

    const newPost = {
      title: title,
      body: description,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();

      // dispatch({ type: "ADD_POST_SUCCESSFULLY", payload: data });
      dispatch({ type: "ADD_WHOLE_POST_SUCCESSFULLY", payload: data });

      setSuccessMessage("Post created successfully!");
      setTitle("");
      setDescription("");
      setIsSubmitting(false);

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-card">
      <div className="create-post-container">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="important">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description (Max 1000 characters)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={isSubmitting || errorMessage}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};
