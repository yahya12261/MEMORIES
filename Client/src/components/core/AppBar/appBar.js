import React, { useRef, useState } from "react";
import {
  AppBar,
  Container,
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "react-bootstrap";
import { ChangePassword, ChangeProfileImage, POSTAPI_URL } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  },
  heading: {
    flexGrow: 1,
    fontWeight: "bold",
    color: "#3f51b5",
    textDecoration: "none",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  logout: {
    color: "#3f51b5",
  },
  appBarGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: theme.spacing(0.5),
    },
  },
  ProfilephotocircleCom: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "inline-block",
    marginRight: "10px",
    marginBottom: "15px",
  },
}));

const AppHeader = ({
  handleMenuOpen,
  handleMenuClose,
  FullName,
  anchorEl,
  ProfileImg,
}) => {
  const fileInputRef = useRef(null);
  const [changePassoModel, setChangePassoModel] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const [changeProfileModel, setChangeProfileModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProfileImage, setselectedProfileImage] = useState(null);
  const navigate = useNavigate();
  const handleSelectFile = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setselectedProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChangePassword = () => {
    handleMenuClose();
    setChangePassoModel(true);
  };
  const handleChangeProfile = () => {
    handleMenuClose();
    setChangeProfileModel(true);
  };
  const handleFormSubmit = async () => {
    if (oldPass === "") {
      setErrorMessage("Please enter the old password.");
      return;
    }
    if (newPass === "") {
      setErrorMessage("Please enter the new password.");
      return;
    }
    if (repeatNewPass === "") {
      setErrorMessage("Please repeat the new password.");
      return;
    }
    if (newPass !== repeatNewPass) {
      setErrorMessage("New password and repeat password do not match.");
      return;
    } else {
      try {
        await ChangePassword(oldPass, newPass).then(
          (res) => {
            setOldPass("");
            setNewPass("");
            setRepeatNewPass("");
            setErrorMessage("");
            setChangePassoModel(false);
            console.log(res.status);
          },
          (err) => {
            console.log(err);
            setErrorMessage("The password is incorrect!");
          }
        );
      } catch (err) {
        console.log(err);
        setErrorMessage("The password is incorrect!");
      }
    }
  };
  const handleModalClose = () => {
    setChangePassoModel(false);
    setChangeProfileModel(false);
  };
  const getProfileImg = () => {
    return POSTAPI_URL + "/getProfileImg/" + ProfileImg;
  };
  const handleSubmitButton = async () => {
    // const { Paragraph, selectedFile } = formData;
    const fileExt = selectedProfileImage.name
      ? selectedProfileImage?.name.split(".").pop()
      : null;

    try {
      await ChangeProfileImage(selectedProfileImage, fileExt);
      window.location.reload();
      console.log("Image Changed");
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.clear("user");
    handleMenuClose();
    navigate("/login");
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Container maxWidth="lg" backgroundColor="white">
        <Grid
          container
          alignItems="center"
          spacing={3}
          className={classes.appBarGrid}
        >
          <Grid item xs={12} sm={8}>
            <Typography className={classes.heading} variant="h4" align="left">
              Memories
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent="flex-end" alignItems="center">
              <Button onClick={handleMenuOpen}>{FullName}</Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleChangePassword}>
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleChangeProfile}>
                  Change Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Modal show={changePassoModel} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa fa-key mr-2" aria-hidden="true"></i>
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            label="Old Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <TextField
            label="Repeat New Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={repeatNewPass}
            onChange={(e) => setRepeatNewPass(e.target.value)}
          />
          {errorMessage && (
            <Typography style={{ margin: "3px", color: "red" }}>
              {errorMessage}
            </Typography>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleFormSubmit}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={changeProfileModel} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa fa-user-circle mr-2" aria-hidden="true"></i>
            Change Profile Photo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography>
            {selectedImage ? (
              <div>
                <h2>Selected Image Preview:</h2>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ width: "100%" }}
                />
              </div>
            ) : (
              <img
                className={classes.ProfilephotocircleCom}
                src={getProfileImg()}
                alt="Profile"
                style={{ width: "100%" }}
              />
            )}
            <Button
              style={{
                position: "absolute",
                bottom: "10%",
                right: "15%",
                zIndex: "1",
                borderRadius: "50%",
                border: "2% solid bisque",
                padding: "2%",
              }}
              onClick={handleSelectFile}
            >
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                style={{
                  color: "bisque",
                  fontSize: "450%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "lightBlue"; // Change the color on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "bisque"; // Reset the color when not hovering
                }}
              >
                {" "}
                <input
                  type="file"
                  id="selectedFile"
                  name="selectedFile"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  // onChange={handleFileChange}
                />
              </i>
            </Button>
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button disabled={!selectedImage} onClick={handleSubmitButton}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </AppBar>
  );
};

export default AppHeader;
