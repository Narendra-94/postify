import { updateLocalStorage } from "../context/PostContext";

export const initialState = {
  post: [],
  allPostData: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESSFULLY": {
      return { ...state, post: action.payload };
    }
    case "FETCH_WHOLE_DATA_SUCCESSFULLY": {
      return { ...state, allPostData: action.payload };
    }
    case "ADD_POST_SUCCESSFULLY": {
      const updatedPosts = [...state.post, action.payload];
      return { ...state, post: updatedPosts };
    }
    case "ADD_WHOLE_POST_SUCCESSFULLY": {
      const updatedPosts = [...state.allPostData, action.payload];
      updateLocalStorage(updatedPosts);
      return { ...state, allPostData: updatedPosts };
    }
    default:
      return state;
  }
};
