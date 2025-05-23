import "./App.css"
import { Navigation } from "@/routes/navigation"
import { DialogProvider } from "./core/providers/dialog"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <DialogProvider>
      <Navigation />
      <Toaster />
    </DialogProvider>
  )
}

export default App
