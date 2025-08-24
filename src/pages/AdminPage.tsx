import { useState } from "react";
import { useApp } from "../utils/hooks";
import GalerySection from "../components/home/GalerySection";
import { EducationSection, ExhibitionsSection, PressSection } from "../components/cv/CvSections";

const AdminPage = () => {
  const { cv } = useApp();
  const [activeTab, setActiveTab] = useState<"artworks" | "cv">("artworks");

  return (
    <main className="w-full flex flex-col px-8 py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Administration</h1>

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