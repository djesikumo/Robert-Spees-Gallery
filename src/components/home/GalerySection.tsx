import GaleryItem from "./GaleryItem"
import type { GaleryItem as Item } from "../../types/galery"

interface GalerySectionProps {
  items: Item[];
}

const GalerySection = ({ items }: GalerySectionProps) => {
  return (
    <section className="p-4 items-start justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map(item => (
        <div className="w-full flex items-center justify-center">
          <GaleryItem key={item.id} item={item} />
        </div>
      ))}
    </section>
  )
}

export default GalerySection