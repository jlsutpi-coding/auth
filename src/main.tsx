import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
);
