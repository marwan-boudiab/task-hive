import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
// import { StrictMode } from "react";

// Use ReactDOM.createRoot for concurrent mode rendering
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Render the App component wrapped in AuthContextProvider
  // <StrictMode>
    <AuthContextProvider>
      <App /> {/* Root component of the application */}
    </AuthContextProvider>
  // </StrictMode>,
);
