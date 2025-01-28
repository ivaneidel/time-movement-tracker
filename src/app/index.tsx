import { Button, Card, Input, List } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

import "./styles.scss";
import { WorkTimer } from "./types";
import { loadModels } from "./face-detection";
import TimerTile from "./timer-tile";
import { createNewTimer } from "./helpers";
import CreateNewTimer from "./create-new-timer";
import Video from "./video";

let stream: MediaStream | undefined;
let isVideoRecording = false;
let interval: NodeJS.Timeout | undefined;
let detecting = false;
let timerRunning = -1;
const timers: WorkTimer[] = [];

const MainApp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [_, setDelta] = useState(0);

  const isRunning = timers.some((t) => t.isRunning);

  const detectFace = async () => {
    if (detecting) {
      if (videoRef.current) {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );
        if (detection) {
          if (timerRunning >= 0 && timers[timerRunning]) {
            timers[timerRunning].endTime += 1;
            setDelta(Date.now());
          }
        }
      }
    } else {
      if (interval) clearInterval(interval);
    }
  };

  const start = async (index: number) => {
    if (isVideoRecording) {
      if (!modelsLoaded) {
        await loadModels();
        setModelsLoaded(true);
      }

      if (detecting) {
        stop();
      }

      detecting = true;
      timerRunning = index;
      timers[index].isRunning = true;
      interval = setInterval(() => detectFace(), 1000);
    }
  };

  const stop = () => {
    detecting = false;
    if (interval) clearInterval(interval);
    timers[timerRunning].isRunning = false;
    timerRunning = -1;
    setDelta(Date.now());
  };

  const onCreateNewTimer = (newTimer: WorkTimer) => {
    if (isVideoRecording) {
      timers.forEach((t) => {
        t.isRunning = false;
      });
      timers.splice(0, 0, newTimer);
      start(0);
      setDelta(Date.now());
    }
  };

  const startVideoRecording = async () => {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      isVideoRecording = true;
      setDelta(Date.now());
    }
  };

  const stopVideoRecording = () => {
    if (stream && !isRunning) {
      stream.getVideoTracks().forEach((t) => t.stop());
      isVideoRecording = false;
      setDelta(Date.now());
    }
  };

  useEffect(() => {
    startVideoRecording();
  }, []);

  return (
    <Card>
      <div className="container">
        <Video
          videoRef={videoRef}
          isRunning={isRunning}
          isVideoRecording={isVideoRecording}
          stopVideoRecording={stopVideoRecording}
          startVideoRecording={startVideoRecording}
        />
        <CreateNewTimer
          isVideoRecording={isVideoRecording}
          onCreateNewTimer={onCreateNewTimer}
        />
        <List sx={{ width: "100%" }}>
          {timers.map((timer, index) => {
            return (
              <TimerTile
                key={timer.id}
                timer={timer}
                startTimer={() => start(index)}
                stopTimer={stop}
              />
            );
          })}
        </List>
      </div>
    </Card>
  );
};

export default MainApp;
