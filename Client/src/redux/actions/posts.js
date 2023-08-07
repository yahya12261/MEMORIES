import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

import * as api from "../../api";
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const createPost = (post) => async (dispatch) => {
//   try {
//     const { data } = await api.addPost(post);

//     dispatch({ type: CREATE, payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const likePost = (id, isLike) => async (dispatch) => {
  try {
    if (isLike === 1) {
      await api.makeLike(id);
      dispatch({ type: LIKE });
    } else {
      await api.makeDisLike(id);
      dispatch({ type: LIKE });
    }
  } catch (error) {
    console.log(error.message);
  }
};
