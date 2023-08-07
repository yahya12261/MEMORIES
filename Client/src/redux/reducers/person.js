import { GET_PERSON } from "../constants/actionTypes";

export default (person = [], action) => {
  if (action.type == GET_PERSON) {
    return action.payload;
  } else {
    return person;
  }
};
