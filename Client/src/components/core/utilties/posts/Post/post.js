import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import AddComment from "@material-ui/icons/AddComment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./postStyle";

import { likePost } from "../../../../../redux/actions/posts";
import {
  addComment,
  clearComments,
  getComments,
} from "../../../../../redux/actions/comment";
import { ArrowBack } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { POSTAPI_URL } from "../../../../../api";

const Post = ({ post, setCurrentId, isShowFull }) => {
  // console.log(isShowFull);

  const [AddNewComment, setAddNewComment] = useState(false);
  const navigate = useNavigate();
  const comment = useSelector((state) => state.comment.comments);
  const [commentText, setCommentText] = useState("");

  const classes = useStyles();
  const textFieldRef = useRef();
  const [LikeColor, setLikeColor] = useState(
    post?.IsLike == 0 ? "secondary2" : "primary"
  );
  const onClickgetPost = (postId) => {
    localStorage.setItem("Post", postId);
    navigate("/core/post");
    //   console.log(postId);
  };
  const [formData, setFormData] = useState({
    comment: "",
  });
  const dispatch = useDispatch();
  const clear = () => {
    setFormData({ comment: "" });
  };
  useEffect(() => {
    if (isShowFull) {
      dispatch(getComments(post.postId));
      setAddNewComment(false);
    }
  }, []);
  const handleLike = () => {
    if (post.IsLike === 0) {
      post.IsLike = 1;
      setLikeColor("primary");
      post.likesCount += 1;
      dispatch(likePost(post.postId, post.IsLike));
    } else if (post.IsLike === 1) {
      post.IsLike = 0;
      setLikeColor("secondary2");
      post.likesCount -= 1;
      dispatch(likePost(post.postId, post.IsLike));
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addComment(post.postId, formData.comment));
      dispatch(getComments(post.postId));
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddComment = (postId) => {
    if (isShowFull) {
      if (textFieldRef.current) textFieldRef.current.focus();
    } else {
      onClickgetPost(post.postId);
    }
  };
  const handleBackBtn = () => {
    dispatch(clearComments());
  };
  const getPostLink = () => {
    return (
      POSTAPI_URL +
        "/getPostsImg/" +
        (post?.imgLink ? post.imgLink.split("/")[3] : "") ||
      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
    );
  };
  const getProfileLink = () => {
    return (
      POSTAPI_URL +
        "/getProfileImg/" +
        (post?.personInfo
          ? post?.personInfo.ProfileImage.Link.split("/")[3]
          : "") ||
      "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
    );
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={getPostLink()}
        title={post?.Paragraph}
      />
      <div className={classes.overlay}>
        <Typography>
          {isShowFull ? (
            <Link to="/core">
              <Button onClick={handleBackBtn}>
                <ArrowBack fontSize="small" className="m-1" color="primary" />
              </Button>
            </Link>
          ) : null}
          <img
            className={classes.Profilephotocircle}
            src={getProfileLink()}
            alt="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
          />

          <span
            style={{ cursor: "pointer" }}
            onClick={() => onClickgetPost(post.postId)}
          >
            {post?.personInfo.first + " " + post?.personInfo.last}
          </span>
        </Typography>
        <Typography variant="body2">
          {moment(post?.DateOfCreated).fromNow()}
        </Typography>
      </div>

      <div className={classes.details}></div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post?.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post?.Paragraph}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          className="Likebutton"
          size="small"
          color={LikeColor}
          onClick={() => {
            handleLike(post.postId);
          }}
        >
          <ThumbUpAltIcon className="m-1" fontSize="small" /> {post?.likesCount}
        </Button>
        <Button
          size="small"
          color="secondry"
          onClick={() => {
            handleAddComment(post.postId);
          }}
          // dispatch(deletePost(post._id))
        >
          <AddComment fontSize="small" className="m-1" />
          {post?.coummentCount}
        </Button>
      </CardActions>
      {post?.lastComment && !isShowFull ? (
        <>
          <hr />
          <Typography>
            <img
              className={classes.ProfilephotocircleCom}
              src={
                POSTAPI_URL +
                "/getProfileImg/" +
                post?.lastComment.personInfo.ProfileImage.Link.split("/")[3]
              }
            />
            {post?.lastComment.personInfo.first +
              " " +
              post?.lastComment.personInfo.last}
            <Typography className={classes.details}>
              {post?.lastComment.commentContent}
            </Typography>
          </Typography>
        </>
      ) : null}
      {isShowFull
        ? comment?.map((com) => (
            <div>
              <hr />
              <Typography>
                <img
                  className={classes.ProfilephotocircleCom}
                  src={
                    POSTAPI_URL +
                    "/getProfileImg/" +
                    com?.personInfo.ProfileImage.Link.split("/")[3]
                  }
                />
                {com?.personInfo.first + com?.personInfo.last}
                <span style={{ marginLeft: "2rem", color: "GrayText" }}>
                  {" " + moment(com?.CommentDate).fromNow()}
                </span>
                <Typography className={classes.details}>
                  {com?.commentContent}
                </Typography>
              </Typography>
            </div>
          ))
        : null}
      {isShowFull ? (
        <div>
          <hr />
          <form autoComplete="off" noValidate onSubmit={handleCommentSubmit}>
            <TextField
              variant="outlined"
              size="large"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              placeholder="Add a comment"
              style={{ marginRight: "10px", width: "90%" }}
              inputRef={textFieldRef}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </div>
      ) : null}
    </Card>
  );
};

export default Post;
