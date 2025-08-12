import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApplicationProvider } from "./utils/ApplicationContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <ApplicationProvider>
        <Router>
          <div className="flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/gallery" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </ApplicationProvider>
    </>
  )
}

export default App
