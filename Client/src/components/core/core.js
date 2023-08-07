import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import { getPerson } from "../../redux/actions/person";
import * as api from "../../api";
import AppHeader from "../core/AppBar/appBar";
import Posts from "./utilties/posts/posts";
import Form from "./utilties/form/form";

const Core = () => {
  const [currentId, setCurrentId] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null); // New state variable
  const person = useSelector((state) => state.person);
  const [FullName, setFullName] = useState("Name Name");
  const [profileImgLink, setprofileImgLink] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = "white"; // Set the background color to white
    dispatch(getPosts());
  }, [currentId, dispatch]);

  useEffect(() => {
    dispatch(getPerson());
  }, []);

  useEffect(() => {
    if (person.person) {
      setFullName(person.person[0].first + " " + person.person[0].last);
      //    console.log(person.ProfileImg[0].Link.split("/")[3]);
      setprofileImgLink(person.ProfileImg[0].Link.split("/")[3]);
    }
  }, [person.person, person.ProfileImg]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickgetPost = (postId) => {
    setSelectedPostId(postId);
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
        <Grid container justify="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={8} md={7}>
            <Posts
              setCurrentId={setCurrentId}
              selectedPostId={selectedPostId}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Core;
