import { Toaster } from "sonner";
import "./App.css";
import { Navigation } from "@/routes/navigation";

function App() {
  return (
    <>
      <Navigation />;
      <Toaster />
    </>
  );
}

export default App;
