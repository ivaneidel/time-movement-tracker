import { Button, Divider, Input } from "@mui/material";
import React, { useState } from "react";
import { WorkTimer } from "./types";
import { createNewTimer } from "./helpers";

interface PropTypes {
  onCreateNewTimer: (newTimer: WorkTimer) => void;
}

const CreateNewTimer = ({ onCreateNewTimer }: PropTypes) => {
  const [newTimerTitle, setNewTimerTitle] = useState("");

  const buttonDisabled = !newTimerTitle.trim();

  const onClick = () => {
    if (!buttonDisabled) {
      const newTimer = createNewTimer(newTimerTitle.trim());
      newTimer.isRunning = true;
      onCreateNewTimer(newTimer);
      setNewTimerTitle("");
    }
  };

  return (
    <div className="create-new-timer">
      <Input
        placeholder="Title"
        value={newTimerTitle}
        onChange={(event) => setNewTimerTitle(event.target.value)}
      />
      <Button
        variant="contained"
        onClick={buttonDisabled ? undefined : onClick}
        disabled={buttonDisabled}
      >
        Add new timer
      </Button>
    </div>
  );
};

export default CreateNewTimer;
