import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApplicationProvider, AuthProvider } from "./utils/ApplicationContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import VideosFilmsPage from "./pages/VideosFilmsPage";
import CvPage from "./pages/CvPage";
import BiographyPage from "./pages/BiographyPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <ApplicationProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/videos-films" element={<VideosFilmsPage />} />
                <Route path="/cv" element={<CvPage />} />
                <Route path="/biography" element={<BiographyPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ApplicationProvider>
    </>
  )
}

export default App
