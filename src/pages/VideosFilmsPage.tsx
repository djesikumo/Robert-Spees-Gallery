import Film from '../assets/animation.mp4'

const VideosFilmsPage = () => {
  return (
    <main className="w-full flex flex-col px-8 py-12 bg-gray-100 font-selectric"
      style={{height: "calc(100dvh - 160px)"}}
    >
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-center sm:text-start text-6xl font-bold mb-8 text-gray-800">Videos & Films</h1>
        <video src={Film} loop autoPlay className="w-96 rounded-lg" />
        <p className="w-96 text-gray-500 italic text-center">“Lost In The Wash” is a new experimental feature film by Rbt. Sps. currently still in production. Tyler J. Ladd stars alongside Sps. himself in this eclectic travelogue.</p>
        <p className="w-96 text-gray-800 text-center">Director of Photography: Jeremiah M. Carter. Associate Producer: Jeffrey C. Stanley. The film’s tentative completion date is October 2026.</p>
      </div>
    </main>
  )
}

export default VideosFilmsPage