import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/actions/posts";
import { getPerson } from "../../../redux/actions/person";
import * as api from "../../../api";
import AppHeader from "../../core/AppBar/appBar";
import Post from "../utilties/posts/Post/post";
import useStyles from "./styles";

const ShowPost = () => {
  const [currentId, setCurrentId] = useState(0);
  const posts = useSelector((state) => state.posts.result);
  const [anchorEl, setAnchorEl] = useState(null);
  const person = useSelector((state) => state.person);
  const [FullName, setFullName] = useState("Name Name");
  const [profileImgLink, setprofileImgLink] = useState("");
  const [postId, setPostId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    document.body.style.backgroundColor = "white"; // Set the background color to white
    dispatch(getPosts());
  }, [currentId, dispatch]);

  useEffect(() => {
    dispatch(getPerson());
  }, []);

  useEffect(() => {
    setPostId(localStorage.getItem("Post"));
  }, []);

  useEffect(() => {
    if (person.person) {
      setFullName(person.person[0].first + " " + person.person[0].last);
      setprofileImgLink(person.ProfileImg[0].Link.split("/")[3]);
    }
  }, [person.person, person.ProfileImg]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const getPostId = () => {
    return localStorage.getItem("Post");
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <AppHeader
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        FullName={FullName}
        anchorEl={anchorEl}
        ProfileImg={profileImgLink}
      />
      <Container maxWidth="lg">
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {postId && posts && posts.length > 0 ? (
            <Grid item xs={12} sm={12} md={12}>
              <Post
                post={posts.find((post) => post.postId == getPostId())}
                setCurrentId={setCurrentId}
                isShowFull={true}
              />
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
};

export default ShowPost;
