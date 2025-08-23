// https://yesicon.app/ -> line-mid:icons

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-2 text-gray-800 font-selectric">{title}</h2>
    <div className="space-y-1">{children}</div>
  </section>
)

const Education = ({ text }: { text: string }) => (
  <p className="text-gray-700">{`• ${text}`}</p>
)

const Exhibitions = ({ year, children }: { year: string; children: React.ReactNode }) => (
  <div className="mb-2">
    <h3 className="text-xl font-semibold mb-2 text-gray-500 italic">{year}</h3>
    <div className="space-y-2 pl-4 text-gray-700">{children}</div>
  </div>
)

const Press = ({ author, title, publication, date }: {
  author: string;
  title: string;
  publication: string;
  date: string
}) => (
  <div className="mb-2">
    <p className="font-medium text-gray-700">{author}</p>
    <p className="text-gray-700">“{title}”, <span className="italic">{publication}</span>, {date}</p>
  </div>
)

const CvPage = () => {
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
            <div className="flex items-center space-x-1">
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
              <p>rbtsps@gmail.com</p>
            </div>
            <div className="flex items-center space-x-1">
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
              <p>@rbtsps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de educación */}
      <Section title="Selected Education and Honors">
        <Education text="Bestowed a Kentucky Colonel" />
        <Education text="Foundation for Contemporary Arts emergency grantee" />
        <Education text="BFA, Studio Art, Emphasis in Printmaking, Murray State University" />
        <Education text="Kentucky Governor’s School for the Arts Participant" />
      </Section>

      {/* Sección de exhibiciones */}
      <Section title="Selected Exhibitions and Engagements">
        <Exhibitions year="2025">
          <p>The Country This Shape is In: Works in Analog and (Early) Digital by Rbt. Sps., Shadow Kitchen in conjunction with Coaxial Arts, Los Angeles, California, USA</p>
          <p>The Country This Shape is In: Works in Analog and (Early) Digital by Rbt. Sps., Subsequence, Tbilisi, Georgia</p>
        </Exhibitions>
        <Exhibitions year="2024">
          <p>Apple Express: A Film by Rbt. Sps., Subsequence, Tbilisi, Georgia</p>
          <p>32BJ Art Show: Embracing Planet Earth, The High Line, New York, New York, USA</p>
        </Exhibitions>
        <Exhibitions year="2023">
          <p>16th Annual 32BJ Art Show, New York, New York, USA</p>
          <p>Middle of Knowhere Film Festival, Fayetteville Arkansas, USA</p>
        </Exhibitions>
        <Exhibitions year="2022">
          <p>Film screening: Confederitis, Cinema House, Tbilisi, Georgia</p>
        </Exhibitions>
        <Exhibitions year="2021">
          <p>Zootonic Hex, Field Projects, New York, New York, USA</p>
        </Exhibitions>
        <Exhibitions year="2020">
          <p>Experimental film workshop instructor/volunteer, Colegio Universitario San Gerónimo, Havana, Cuba (canceled due to Covid-19)</p>
        </Exhibitions>
        <Exhibitions year="2019">
          <p>Lecturer, Spalding University Film Festival, Louisville, Kentucky, USA</p>
          <p>Extended Family, Darby Forever Gallery, Louisville, Kentucky, USA</p>
          <p>Film screening: Confederitis, Circe Platform, Tbilisi, Georgia</p>
        </Exhibitions>
        <Exhibitions year="2018">
          <p>Confederitis: A film by Rbt. Sps. and Jillian McManemin, Official selection, Istanbul International Experimental Film Festival</p>
        </Exhibitions>
        <Exhibitions year="2017">
          <p>Semionauts: three exercises in collaborative essay filmmaking, King’s Leap, Brooklyn, New York, USA</p>
        </Exhibitions>
        <Exhibitions year="2013">
          <p>Apple Express: A Film by Rbt. Sps., Interstate Projects, Brooklyn, New York, USA</p>
          <p>Jillian McManemin and Rbt. Sps.: An Evening of Recitation and Song, BGSQD, New York, New York, USA</p>
          <p>Moving Image Contemporary Video Art Fair, New York Waterfront Tunnel, New York, New York, USA</p>
        </Exhibitions>
        <Exhibitions year="2011">
          <p>Magic For Beginners, PPOW,  New York, New York, USA</p>
        </Exhibitions>
        <Exhibitions year="2008">
          <p>Vienna Biennale 2008, Ve.Sch Galerie, Vienna, Austria</p>
        </Exhibitions>
      </Section>


      {/* Sección de prensa, televisión y radio */}
      <Section title="Selected Press, Television, and Radio">
        <Press
          author="Gabrichidze, Manana"
          title="What The American Director Found Wonderful"
          publication="GZA Magazine Tbilisi"
          date="21 November 2024"
        />
        <Press
          author="Ryder, Gina"
          title="The Art of Being a Super Begins at Dawn"
          publication="The New York Times"
          date="29 November 2023"
        />
        <Press
          author="Hieges, Nate, host"
          title="The Selection Committee"
          publication="Newtown Radio"
          date="17 April 2022"
        />
        <Press
          author="Clarke, Erin, host"
          title="Mornings on 1"
          publication="Time Warner Cable News NY1, New York City"
          date="24 January 2016"
        />
        <Press
          author="Lingan, John"
          title="Clear Victory: A Deep Dive Into The World’s Most Prestigious Water-Tasting Competition"
          publication="Buzzfeed"
          date="18 June 2015"
        />
        <Press
          author="Johnson, Ken"
          title="Magic For Beginners"
          publication="The New York Times"
          date="11 August 2011"
        />
        <Press
          author="O’Reilly, Bill, host"
          title="The O’Reilly Factor"
          publication="Fox News"
          date="15 May 2006"
        />
      </Section>
    </main>
  )
}

export default CvPage