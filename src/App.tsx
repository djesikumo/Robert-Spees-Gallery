import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <Router>
          <div className="flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
