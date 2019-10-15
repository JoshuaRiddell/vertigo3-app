import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import notificationAudio from "../../assets/for-sure.mp3";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function NotificationBar({
  showBar,
  msg = "",
  duration,
  closeNotification,
  mode
}) {
  const classes = useStyles();
  const [transition, setTransition] = React.useState(undefined);

  React.useEffect(() => {
    const audio = new Audio(notificationAudio);
    if (showBar) audio.play();
  });

  let flashCountClass = "";

  if (mode === "PAUSE_SESSION" || mode === "STOP_SESSION") {
    flashCountClass = "flash-infinite";
  }
  if (mode === "RECORD_SESSION") {
    flashCountClass = "flash-3";
  }

  const handleClick = Transition => () => {
    setTransition(() => Transition);
  };

  const handleClose = () => {
    showBar = false;
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={`top,center`}
        open={showBar}
        onClose={handleClose}
        //TransitionComponent={transition}
        autoHideDuration={duration ? duration : 3000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        className={`notification ${flashCountClass}`}
        message={
          <span id="message-id" className="notification message">
            {msg}
          </span>
        }
        // action={[
        //   <IconButton
        //     key="close"
        //     aria-label="close"
        //     color="inherit"
        //     className={classes.close}
        //     onClick={closeNotification}
        //   >
        //     <CloseIcon />
        //   </IconButton>
        // ]}
      />
    </div>
  );
}
