import { useState, useEffect } from "react";
import type { Education, Exhibition, Press } from "../../types/cv";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-2 text-gray-800 font-selectric">{title}</h2>
    <div className="space-y-1">{children}</div>
  </section>
)

interface EducationSectionProps {
  education: Education[];
  adminMode: boolean;
}

export const EducationSection = ({ education, adminMode }: EducationSectionProps) => (
  <Section title="Selected Education and Honors">
    {education.map((item) => (
      <div key={item.id} className="flex items-center justify-between space-x-2 sm:space-x-0">
        <p className="text-gray-700">{`• ${item.education}`}</p>

        {/* Acciones (solo disponibles desde el modo admin) */}
        {adminMode && (
          <div className="flex space-x-1 text-white">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    ))}

    {/* Acción de adición de un nuevo Education (solo disponibles desde el modo admin) */}
    {adminMode && (
      <button className="flex items-center px-2 py-1 space-x-1 rounded-md bg-blue-500 text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        <span>Add New Education</span>
      </button>
    )}
  </Section>
)

interface ExhibitionsSectionProps {
  exhibitions: Exhibition[];
  adminMode: boolean;
}

export const ExhibitionsSection = ({ exhibitions, adminMode }: ExhibitionsSectionProps) => {
  const [exhibitionsByYear, setExhibitionsByYear] = useState<Record<string, typeof exhibitions>>(exhibitions.reduce((acc, exhibition) => {
    const year = exhibition.year.toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(exhibition);
    return acc;
  }, {} as Record<string, typeof exhibitions>));

  useEffect(() => {
    setExhibitionsByYear(exhibitions.reduce((acc, exhibition) => {
      const year = exhibition.year.toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(exhibition);
      return acc;
    }, {} as Record<string, typeof exhibitions>))
  }, [exhibitions]);

  return (
    <Section title="Selected Exhibitions and Engagements">
      {Object.entries(exhibitionsByYear)
        .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA)) // Ordenar años descendente
        .map(([year, exhibitions]) => (
          <div key={year} className="mb-2">
            <h3 className="text-xl font-semibold text-gray-500 italic">{year}</h3>
            <div className="space-y-1 pl-4 text-gray-700">
              {exhibitions.map(exhibition => (
                <div key={exhibition.id} className="flex items-center justify-between space-x-2 sm:space-x-0">
                  <p>{exhibition.exhibition}</p>

                  {/* Acciones (solo disponibles desde el modo admin) */}
                  {adminMode && (
                    <div className="flex space-x-1 text-white">
                      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                          <path d="M16 5l3 3" />
                        </svg>
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      }

      {/* Acción de adición de un nuevo Education (solo disponibles desde el modo admin) */}
      {adminMode && (
        <button className="flex items-center px-2 py-1 space-x-1 rounded-md bg-blue-500 text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          <span>Add New Exhibition</span>
        </button>
      )}
    </Section>
  )
}

interface PressSectionProps {
  press: Press[];
  adminMode: boolean;
}

export const PressSection = ({ press, adminMode }: PressSectionProps) => (
  <Section title="Selected Press, Television, and Radio">
    {press.map((item) => (
      <div key={item.id} className="flex items-center justify-between space-x-2 sm:space-x-0">
        <div key={item.id} className="mb-2">
          <p className="font-medium text-gray-700">{item.author}</p>
          <p className="text-gray-700">“{item.title}”, <span className="italic">{item.publication}</span>, {item.date}</p>
        </div>

        {/* Acciones (solo disponibles desde el modo admin) */}
        {adminMode && (
          <div className="flex space-x-1 text-white">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    ))}

    {/* Acción de adición de un nuevo Education (solo disponibles desde el modo admin) */}
    {adminMode && (
      <button className="flex items-center px-2 py-1 space-x-1 rounded-md bg-blue-500 text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        <span>Add New Press Program</span>
      </button>
    )}
  </Section>
)