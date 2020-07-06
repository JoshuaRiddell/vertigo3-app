import React from "react";
import notificationAudio from "../../assets/for-sure.mp3";
import warningAudio from "../../assets/Warning-1.ogg";

export default function NotificationBar({
  showBar,
  msg = "",
  duration,
  closeNotification,
  mode
}) {
  const audio = new Audio(
    mode === "STOP_SESSION" ? warningAudio : notificationAudio
  );

  React.useEffect(() => {
    if (mode === "STARTUP") {
      return;
    }
    if (showBar) {
      audio.play();
    }
    if (mode) {
      audio.play();
    }
  }, [mode, showBar]);

  let flashCountClass = "";

  if (mode === "PAUSE_SESSION" || mode === "STOP_SESSION") {
    flashCountClass = "flash-infinite";
  }
  if (mode === "RECORD_SESSION") {
    flashCountClass = "flash-3";
  }

  return (
    <div className={`notification ${flashCountClass}`}>
      <span id="message-id" className="notification message">
        {msg}
      </span>
    </div>
  );
}
