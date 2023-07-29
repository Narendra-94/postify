export const initialState = {
  post: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESSFULLY": {
      return { ...state, post: action.payload };
    }
    case "ADD_POST_SUCCESSFULLY": {
      const updatedPosts = [...state.post, action.payload];
      return { ...state, post: updatedPosts };
    }
    default:
      return state;
  }
};
