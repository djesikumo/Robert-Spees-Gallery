import { useApp } from "../utils/hooks"
import GalerySection from "../components/home/GalerySection"
import ItemDetailsModal from "../components/home/ItemDetailsModal"

const HomePage = () => {
  const { selectedItem } = useApp();
  
  return (
    <>
      <main
        className="w-full flex flex-col px-2 sm:px-4 py-8 sm:py-12 bg-gray-100"
        style={{ height: `${selectedItem ? "calc(100vh - 160px)" : "auto"}`, overflow: `${selectedItem ? "hidden" : "auto"}` }}
      >
        {/* Descripción */}
        <section className="text-center">
          <h2 className="gallery-title text-4xl font-bold mb-4 font-selectric text-gray-800">Selected Pieces</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Please click on any image for more information and/or to zoom in for greater detail.
          </p>
        </section>

        {/* Sección de la galería */}
        <GalerySection adminMode={false} />
      </main>

      {/* Modal de los detalles de la obra seleccionada */}
      <ItemDetailsModal />
    </>
  )
}

export default HomePage