import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  container: {
    padding:"24px",
  },
  close: {
    position:"absolute",
    height:"2rem",
    width:"2rem",
    top: "2.5rem",
    right: "26%",
    cursor: "pointer",
  },
  mediaBeforeClick: {
    height: "0",
    paddingTop: "56.25%", // 16:9
    marginTop: "1rem",
    cursor: "pointer",
  },
  media: {
    height: "0",
    paddingTop: "56.25%", // 16:9
    marginTop: "1rem",
  },
  modal: {
    overflow:"scroll",
  },
  paper: {
    margin: "2rem 25%",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-around",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
