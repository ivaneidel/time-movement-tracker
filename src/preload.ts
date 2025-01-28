import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  log: console.log,
});
