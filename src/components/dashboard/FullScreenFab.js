import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const useStyles = makeStyles(theme => ({
  fab: {
    zIndex: 1000,
    // top: "auto",
    // left: "auto",
    // bottom: 20,
    right: 10,
    position: "fixed"
  }
}));

const requestFullscreen = ele => {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    console.log("Fullscreen API is not supported.");
  }
};

export default function FullScreenFab() {
  const classes = useStyles();
  const [showFab, setFab] = React.useState([true]);

  const goFullScreen = e => {
    e.preventDefault();
    requestFullscreen(document.documentElement);
    setFab(false);
  };

  document.addEventListener("fullscreenchange", function(e) {
    if (document.webkitIsFullScreen === false) {
      ///fire your event
      setFab(true);
    } else if (document.mozFullScreen === false) {
      ///fire your event
      setFab(true);
    } else if (document.msFullscreenElement === false) {
      ///fire your event
      setFab(true);
    }
  });

  return showFab ? (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={e => goFullScreen(e)}
      >
        <FullscreenIcon />
      </Fab>
    </div>
  ) : (
    <></>
  );
}
