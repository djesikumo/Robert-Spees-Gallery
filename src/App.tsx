import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./utils/NavigationContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <NavigationProvider>
        <Router>
          <div className="flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </NavigationProvider>
    </>
  )
}

export default App
