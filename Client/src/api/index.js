import axios from "axios";
import authHeader from "../Services/authServices/auth-header";
import { API_URL as AUTH_URL } from "../Services/authServices/auth.service";
const BASEAPI_URL = "http://localhost:8081/api/v1/";
export const POSTAPI_URL = BASEAPI_URL + "Post";
const PERSON_API_URL = BASEAPI_URL + "person";
// const getAllPublicPosts = () => {
//   return axios.get(API_URL + "/public");
// };

export const getPosts = () => {
  console.log(authHeader());
  return axios.get(POSTAPI_URL + "/getPosts", { headers: authHeader() });
};
export const makeLike = (postId) => {
  return axios.post(
    POSTAPI_URL + "/makeLike",
    { postId: postId },
    { headers: authHeader() }
  );
};
export const makeDisLike = (PostId) => {
  return axios.post(
    POSTAPI_URL + "/makeDisLike",
    { postId: PostId },
    { headers: authHeader() }
  );
};
export const getPerson = () => {
  return axios.get(PERSON_API_URL + "/getPerson", { headers: authHeader() });
};
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}
export const addPost = (Paragraph, PostImage, Ext) => {
  let formData = new FormData();
  if (PostImage) {
    let fileName = generateRandomString(15) + "." + Ext;

    formData.append("Paragraph", Paragraph);
    formData.append("file", PostImage, fileName);
    formData.append("fileName", fileName);
    return axios.post(POSTAPI_URL + "/addPostwithImage", formData, {
      headers: authHeader(),
    });
  } else {
    formData.append("Paragraph", Paragraph);
    return axios.post(POSTAPI_URL + "/addPostwithoutImage", formData, {
      headers: authHeader(),
    });
  }
};
export const getAllComment = (postId) => {
  return axios.get(POSTAPI_URL + "/getAllCommentFromPostId/" + postId, {
    headers: authHeader(),
  });
};
export const addComment = (PostId, Com) => {
  return axios.post(
    POSTAPI_URL + "/setComment",
    { commentContent: Com, postId: PostId },
    {
      headers: authHeader(),
    }
  );
};
export const ChangePassword = (oldPass, newPass) => {
  return axios.post(
    AUTH_URL + "/ChangePassword",
    { oldPass: oldPass, newPass: newPass },
    {
      headers: authHeader(),
    }
  );
};
export const ChangeProfileImage = (ProfileImg, Ext) => {
  let formData = new FormData();
  // formData.delete("file");
  let fileName = generateRandomString(15) + "." + Ext;
  formData.append("file", ProfileImg, fileName + "");

  formData.append("name", fileName);
  return axios.post(POSTAPI_URL + "/ProfileUpdate", formData, {
    headers: authHeader(),
  });
};
