import {
  GET_COMMENTS,
  CLEAR_COMMENTS,
  ADD_COMMENT,
} from "../constants/actionTypes";
import * as api from "../../api";

export const addComment = async (postId, comment) => {
  await api.addComment(postId, comment);

  return {
    type: ADD_COMMENT,
    payload: {
      postId,
      comment,
    },
  };
};
export const clearComments = () => ({
  type: CLEAR_COMMENTS,
});
export const getComments = (PostId) => async (dispatch) => {
  try {
    const { data } = await api.getAllComment(PostId);
    dispatch({ type: GET_COMMENTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
