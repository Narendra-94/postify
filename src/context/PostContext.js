import React, { createContext, useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "../reducer/reducer";

export const PostContext = createContext();

export const updateLocalStorage = (allPostData) => {
  localStorage.setItem("allPostData", JSON.stringify(allPostData));
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const data = await response.json();
      console.log(data, "whole data called");
      dispatch({ type: "FETCH_WHOLE_DATA_SUCCESSFULLY", payload: data });
    };

    getData();
  }, []);

  useEffect(() => {
    updateLocalStorage(state.allPostData);
  }, [state.allPostData]);

  /*
    - To Fetch Data from Api on every page change
    - Used useEffect at line:14 to fetch all the data from API 
    - Stored the data in local storage as well 
    - Updated local storage when new post get's added (line:27) 
  */

  // useEffect(() => {
  //   const getData = async (page) => {
  //     const response = await fetch(
  //       `https://jsonplaceholder.typicode.com/posts?_start=${
  //         (page - 1) * 10
  //       }&_limit=10`
  //     );
  //     const data = await response.json();
  //     dispatch({ type: "FETCH_DATA_SUCCESSFULLY", payload: data });
  //   };

  //   getData(currentPage);
  // }, [currentPage]);

  console.log(state.allPostData, "allPostData");

  return (
    <PostContext.Provider
      value={{ state, dispatch, currentPage, setCurrentPage }}
    >
      {children}
    </PostContext.Provider>
  );
};
