import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, useAuth } from "../utils/hooks";
import GalerySection from "../components/home/GalerySection";
import { EducationSection, ExhibitionsSection, PressSection } from "../components/cv/CvSections";

const AdminPage = () => {
  const { cv } = useApp();
  const { authUser, setAuthUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"artworks" | "cv">("artworks");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
    navigate("/");
  };

  // Si no hay usuario
  if (!authUser) return (
    <div className="w-full flex items-center justify-center"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    </div>
  )

  return (
    <main className="w-full flex flex-col px-8 py-12 bg-gray-100">
      <div className="flex flex-col-reverse sm:flex-row">
        <span className="flex-1" />
        <h1 className="flex-1 text-4xl font-bold mb-8 text-gray-800 text-center">Administration</h1>
        <div className="flex flex-1 items-center justify-center sm:justify-end">
          <button
            onClick={logout}
            className="flex px-4 py-2 gap-1 items-center cursor-pointer text-base transition-all duration-300 ease-in-out hover:scale-110 active:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
              <path d="M15 12h-12l3 -3" />
              <path d="M6 15l-3 -3" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-auto mb-12">
        <button
          className={`w-40 py-4 px-6 rounded-l-xl text-md cursor-pointer transition-all duration-300 ease-in-out ${activeTab === "artworks" ? "bg-gray-500 text-gray-100" : "text-gray-500 hover:bg-gray-200"}`}
          onClick={() => setActiveTab("artworks")}
        >
          Artworks
        </button>
        <button
          className={`w-40 py-4 px-6 rounded-r-xl text-md cursor-pointer transition-all duration-300 ease-in-out ${activeTab === "cv" ? "bg-gray-500 text-gray-100" : "text-gray-500 hover:bg-gray-200"}`}
          onClick={() => setActiveTab("cv")}
        >
          CV
        </button>
      </div>

      {/* Contenido */}
      {activeTab === "artworks" ? (
        <GalerySection adminMode={true} />
      ) : (
        <>
          <EducationSection education={cv.education} adminMode={true} />
          <ExhibitionsSection exhibitions={cv.exhibitions} adminMode={true} />
          <PressSection press={cv.press} adminMode={true} />
        </>
      )}
    </main>
  )
}

export default AdminPage