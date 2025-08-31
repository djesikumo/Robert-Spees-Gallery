import { useApp } from "../../utils/hooks";
import GaleryItem from "./GaleryItem"
import { request } from "../../utils/api";

interface GalerySectionProps {
  adminMode: boolean;
}

const GalerySection = ({ adminMode }: GalerySectionProps) => {
  const { artworks } = useApp();

  const testAddArtwork = async () => {
    const formData = new FormData();

    // Agregar campos del artwork al FormData
    formData.append('name', 'Title test');
    formData.append('year', '2025');
    formData.append('technique', 'Technique test');
    formData.append('dimensions', '45 x 45');

    // Agregar la imagen
    const blob = new Blob([new ArrayBuffer(1024)], { type: 'image/jpeg' });
    const file = new File([blob], 'test-image.jpg', { type: 'image/jpeg' });
    formData.append('image', file);

    await request("http://localhost:8000/artwork/new_artwork", {
      method: "POST",
      body: formData,
      onSuccess: (data) => console.log(data)
    })
  }

  return (
    <section className="p-4 flex flex-col items-center">
      {/* Acción de adición de un nuevo Artwork (solo disponibles desde el modo admin) */}
      {adminMode && (
        <button
          onClick={testAddArtwork}
          className="flex items-center px-4 py-2 space-x-1 mb-8 rounded-md bg-blue-500 text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          <span>Add New Artwork</span>
        </button>
      )}
      <div className="items-start justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {artworks.map(artwork => (
          <div key={artwork.id} className="w-full flex items-center justify-center">
            <GaleryItem item={artwork} adminMode={adminMode} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default GalerySection