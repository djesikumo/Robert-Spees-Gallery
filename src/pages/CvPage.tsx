// https://yesicon.app/ -> line-mid:icons
import { useApp } from "../utils/hooks";
import { EducationSection, ExhibitionsSection, PressSection } from "../components/cv/CvSections";

const CvPage = () => {
  const { cv } = useApp();

  return (
    <main className="w-full flex flex-col px-8 py-12 bg-gray-100">
      {/* Sección del perfil */}
      <section className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-2 sm:space-y-0">
        <div className="flex flex-col flex-1 gap-1 justify-start text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 ">Rbt. Sps.</h1>
          <p className="text-gray-700">208 West 29th Street, Room 504</p>
          <p className="text-gray-700">New York, New York, USA, 10001</p>
        </div>
        <div className="flex flex-col flex-1 text-gray-700 items-center">
          <div className="flex flex-col space-y-1 items-center sm:items-start">
            <a className="flex items-center space-x-1" href="mailto:rbtsps@gmail.com">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path strokeDasharray="64" strokeDashoffset="64" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
                  </path>
                  <path strokeDasharray="24" strokeDashoffset="24" d="M3 6.5l9 5.5l9 -5.5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="24;0" />
                  </path>
                </g>
              </svg>
              <span>rbtsps@gmail.com</span>
            </a>
            <a className="flex items-center space-x-1" href="https://instagram.com/rbtsps" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="17" cy="7" r="1.5" fill="currentColor" fillOpacity="0">
                  <animate fill="freeze" attributeName="fill-opacity" begin="1.3s" dur="0.15s" values="0;1" />
                </circle>
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path strokeDasharray="72" strokeDashoffset="72" d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0" />
                  </path>
                  <path strokeDasharray="28" strokeDashoffset="28" d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" values="28;0" />
                  </path>
                </g>
              </svg>
              <span>@rbtsps</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sección de educación */}
      <EducationSection education={cv.education} adminMode={false} />

      {/* Sección de exhibiciones */}
      <ExhibitionsSection exhibitions={cv.exhibitions} adminMode={false} />

      {/* Sección de prensa, televisión y radio */}
      <PressSection press={cv.press} adminMode={false} />
    </main>
  )
}

export default CvPage