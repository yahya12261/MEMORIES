import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  logout: {
    color: "rgba(255,0,0)",
  },
  image: {
    marginLeft: "15px",
  },
  Background: {
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "White",
  },
  appBar: {},
  heading: {
    flexGrow: 1,
    fontWeight: "bold",
    color: "#3f51b5",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  image: {
    marginLeft: "15px",
  },
  logout: {
    color: "#3f51b5",
  },
  container: {
    minHeight: "100vh",
  },
}));
