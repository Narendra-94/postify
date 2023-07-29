import React, { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../reducer/reducer";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData(dispatch, 1);
  }, []);

  const fetchData = async (dispatch, page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          (page - 1) * 10
        }&_limit=10`
      );
      const data = await response.json();
      dispatch({ type: "FETCH_DATA_SUCCESSFULLY", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider value={{ state, dispatch, fetchData }}>
      {children}
    </PostContext.Provider>
  );
};
