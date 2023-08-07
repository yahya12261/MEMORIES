import { combineReducers } from "redux";

import posts from "./posts";
import person from "./person";
import comment from "./comment";
export const reducers = combineReducers({ posts, person, comment });
