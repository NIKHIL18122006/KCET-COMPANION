import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

const config = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MathJaxContext config={config}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MathJaxContext>
  </StrictMode>
);