import { useApp } from "../../utils/hooks";
import GaleryItem from "./GaleryItem"

interface GalerySectionProps {
  adminMode: boolean;
}

const GalerySection = ({ adminMode }: GalerySectionProps) => {
  const { artworks } = useApp();

  return (
    <section className="p-4 items-start justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {artworks.map(artwork => (
        <div key={artwork.id} className="w-full flex items-center justify-center">
          <GaleryItem item={artwork} adminMode={adminMode} />
        </div>
      ))}
    </section>
  )
}

export default GalerySection