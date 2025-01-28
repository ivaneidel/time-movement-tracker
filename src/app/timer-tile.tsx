import React, { useEffect } from "react";
import { WorkTimer } from "./types";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import { getTimeFromDate, getTimeFromTime } from "./helpers";

interface PropTypes {
  timer: WorkTimer;
  startTimer: () => void;
  stopTimer: () => void;
}

const TimerTile = ({ timer, startTimer, stopTimer }: PropTypes) => {
  const startTime = getTimeFromDate(timer.startTime);
  const endTime = getTimeFromTime(timer.endTime);

  const onClick = () => {
    if (timer.isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <ListItem
      secondaryAction={
        <div className="timer-trailing">
          <IconButton onClick={onClick}>
            {timer.isRunning ? <Pause /> : <PlayArrow />}
          </IconButton>
        </div>
      }
    >
      <ListItemText
        primary={timer.title}
        secondary={
          <span>
            {startTime.hours}:{startTime.minutes}:{startTime.seconds}
            {"  -  "}
            {endTime.hours}:{endTime.minutes}:{endTime.seconds}
          </span>
        }
      />
    </ListItem>
  );
};

export default TimerTile;
