import GalerySection from "../components/home/GalerySection"
import ItemDetailsModal from "../components/home/ItemDetailsModal"
import { data } from "../data"

const HomePage = () => {
  return (
    <>
      <main className="w-full flex flex-col px-4 py-12 bg-gray-100">
        {/* Descripción */}
        <section className="mb-12 text-center">
          <h2 className="gallery-title text-4xl font-bold mb-4">Selected Pieces</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explora nuestra cuidada selección de obras de arte contemporáneo. Cada
            pieza ha sido seleccionada por su valor artístico y significado
            cultural. Haz clic en cualquier obra para ver más detalles.
          </p>
        </section>

        {/* Sección de la galería */}
        <GalerySection items={data} />
      </main>

      {/* Modal de los detalles de la obra seleccionada */}
      <ItemDetailsModal />
    </>
  )
}

export default HomePage