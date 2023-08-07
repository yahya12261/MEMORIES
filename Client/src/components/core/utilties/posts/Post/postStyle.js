import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  Profilephotocircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "inline-block",
    marginRight: "8px",
  },
  ProfilephotocircleCom: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "inline-block",
    marginRight: "8px",
    marginLeft: "15px",
    marginBottom: "15px",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
});
