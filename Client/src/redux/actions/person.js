import { FETCH_ALL, GET_PERSON } from "../constants/actionTypes";
import * as api from "../../api";

export const getPerson = () => async (dispatch) => {
  try {
    const { data } = await api.getPerson();
    dispatch({ type: GET_PERSON, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
