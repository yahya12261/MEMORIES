import {
  GET_COMMENTS,
  CLEAR_COMMENTS,
  ADD_COMMENT,
} from "../constants/actionTypes";

const commentReducer = (comments = [], action) => {
  if (action.type === GET_COMMENTS) {
    return action.payload;
  } else if (action.type === CLEAR_COMMENTS) {
    return [];
  } else if (action.type === ADD_COMMENT) {
    const { postId, comment } = action.payload;
    const newComment = {
      postId,
      comment,
    };
    return [...comments, newComment];
  } else {
    return comments;
  }
};

export default commentReducer;
