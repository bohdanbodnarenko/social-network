import {
  SET_POSTS,
  SET_SELECTED_POST,
} from "./types";

const initState = {
  posts: [],
  selectedPost: null
};

const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload
      }
    default:
      return state;
  }
};

export default postsReducer;