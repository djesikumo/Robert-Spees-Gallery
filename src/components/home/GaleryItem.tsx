import { useApp } from "../../utils/hooks"
import type { GaleryItem as Item } from "../../types/galery"

interface GaleryItemProps {
  item: Item
}
const GaleryItem = ({ item }: GaleryItemProps) => {
  const { setSelectedItem } = useApp()

  return (
    <div
      onClick={() => setSelectedItem(item)}
      className="max-w-[372px] min-h-[504px] cursor-pointer rounded-lg shadow-lg p-4 bg-white"
    >
      <div className="overflow-hidden">
        <img src={item.imageUrl} alt={`${item.name}, ${item.year}`}
          className="w-[348px] h-[348px] object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-medium">{item.name}</h3>
        <p className="text-lg text-gray-500">{item.year}</p>
      </div>
    </div>
  )
}

export default GaleryItem