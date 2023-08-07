import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, selectedPostId }) => {
  const posts = useSelector((state) => state.posts.result);
  const classes = useStyles();

  return !posts ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post.postId} item xs={12} sm={6} md={4}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
            isSelected={post.postId === selectedPostId}
            isShowFull={false}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
