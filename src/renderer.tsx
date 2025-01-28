import React from "react";
import { Container, createRoot } from "react-dom/client";
import MainApp from "./app";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

const container = document.getElementById("app") as Container | null;

if (container) {
  // Render your React component instead
  const root = createRoot(container);
  root.render(<MainApp />);
}
