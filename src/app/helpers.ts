import { WorkTimer } from "./types";

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const getTimeFromDate = (date: number) => {
  const dateObject = new Date(date);
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  return { seconds, minutes, hours };
};

export const getTimeFromTime = (time: number) => {
  // No need to divide by 1000 because time is in seconds, not milliseconds
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time / 60) % 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(time / (60 * 60))
    .toString()
    .padStart(2, "0");
  return { seconds, minutes, hours };
};

export const createNewTimer = (title: string): WorkTimer => ({
  id: generateRandomString(10),
  title,
  startTime: Date.now(),
  endTime: 0,
  isRunning: false,
});
