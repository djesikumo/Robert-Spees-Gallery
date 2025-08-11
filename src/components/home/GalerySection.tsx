import GaleryItem from "./GaleryItem"
import type { GaleryItem as Item } from "../../types/galery"

interface GalerySectionProps {
  items: Item[];
}

const GalerySection = ({ items }: GalerySectionProps) => {
  return (
    <section className="p-4 flex flex-col items-center md:items-start md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map(item => (<GaleryItem key={item.id} item={item} />))}
    </section>
  )
}

export default GalerySection