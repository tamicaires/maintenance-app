import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { ThemeProvider } from "./components/ThemeProvider/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
