import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApplicationProvider } from "./utils/ApplicationContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import VideosFilmsPage from "./pages/VideosFilmsPage";
import CvPage from "./pages/CvPage";
import BiographyPage from "./pages/BiographyPage";

function App() {
  return (
    <>
      <ApplicationProvider>
        <Router>
          <div className="flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/videos-films" element={<VideosFilmsPage />} />
              <Route path="/cv" element={<CvPage />} />
              <Route path="/biography" element={<BiographyPage />} />
            </Routes>
          </div>
        </Router>
      </ApplicationProvider>
    </>
  )
}

export default App
