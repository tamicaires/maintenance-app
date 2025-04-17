import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { ThemeProvider } from "./components/ThemeProvider/index.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/services/query-client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Providers } from "./core/providers/index.tsx";
import { ErrorBoundary } from "./components/error-boundary/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Providers>
        {/* <ErrorBoundary> */}
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <DndProvider backend={HTML5Backend}>
                <App />
              </DndProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
        {/* </ErrorBoundary> */}
      </Providers>
    </Provider>
  </StrictMode>
);
