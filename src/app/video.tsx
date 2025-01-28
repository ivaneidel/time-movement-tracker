import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { RefObject } from "react";

interface PropTypes {
  videoRef: RefObject<HTMLVideoElement | null>;
  isRunning: boolean;
  isVideoRecording: boolean;
  stopVideoRecording: () => void;
  startVideoRecording: () => void;
}

const Video = ({
  videoRef,
  isRunning,
  isVideoRecording,
  stopVideoRecording,
  startVideoRecording,
}: PropTypes) => {
  return (
    <div className="video">
      <div className="toggle-video">
        <IconButton
          onClick={
            isVideoRecording
              ? () => stopVideoRecording()
              : () => startVideoRecording()
          }
        >
          {isVideoRecording ? (
            <Visibility htmlColor="#fff" />
          ) : (
            <VisibilityOff htmlColor="#fff" />
          )}
        </IconButton>
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted
        className={`${isRunning ? "running" : ""}`}
      ></video>
    </div>
  );
};

export default Video;
