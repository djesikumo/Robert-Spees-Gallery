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
}

export const EducationSection = ({ education }: EducationSectionProps) => (
  <Section title="Selected Education and Honors">
    {education.map((item) => (
      <p key={item.id} className="text-gray-700">{`• ${item.education}`}</p>
    ))}
  </Section>
)

interface ExhibitionsSectionProps {
  exhibitions: Exhibition[];
}

export const ExhibitionsSection = ({ exhibitions }: ExhibitionsSectionProps) => {
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
                <p key={exhibition.id}>{exhibition.exhibition}</p>
              ))}
            </div>
          </div>
        ))
      }
    </Section>
  )
}

interface PressSectionProps {
  press: Press[];
}

export const PressSection = ({ press }: PressSectionProps) => (
  <Section title="Selected Press, Television, and Radio">
    {press.map((item) => (
      <div key={item.id} className="mb-2">
        <p className="font-medium text-gray-700">{item.author}</p>
        <p className="text-gray-700">“{item.title}”, <span className="italic">{item.publication}</span>, {item.date}</p>
      </div>
    ))}
  </Section>
)