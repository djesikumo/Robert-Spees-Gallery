import RbtSps from "../assets/Rbt Sps.jpg"

const BiographyPage = () => {
  return (
    <main className="w-full flex flex-col px-8 py-12 bg-gray-100 font-selectric">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-6xl font-bold mb-8 text-gray-800">Biography</h1>
        <img src={RbtSps} alt="Rbt.Sps." className="w-96 rounded-lg" />
        <p className="w-96 text-gray-500 italic text-center">The artist at 20 years old in 2005 shooting his seminal experimental documentary, Apple Express (photo credit: Katherine Duckworth)</p>
      </div>

      <div className="flex flex-col space-y-8 text-2xl">
        <p>Rbt. Sps. is an experimental filmmaker and visual artist who lives and works in NYC. The Kentucky native made his international art debut at the 2008 Vienna Biennale and has since shown work in Paris, Tbilisi, Los Angeles, Istanbul, Chicago, Nashville, Santiago (Cuba), and many other places.</p>
        <p>Sps. is an enthusiast of antiquated technology. Highlights in his collection include a 1987 Fisher-Price Pixelvsion, a fully functioning 1969 Sony Portapak, and a 1970s Groma Kolibri typewriter in the Georgian alphabet.</p>
        <p>A super fan of heavily peated whiskies, Sps. made a liquor pilgrimage to Islay, Scotland in 2023.</p>
        <p>The artist was bestowed a Kentucky Colonel in 2020.</p>
      </div>
    </main>
  )
}

export default BiographyPage