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
      className="max-w-[372px] min-h-[504px] p-4"
    >
      <div className="overflow-hidden">
        <img src={item.imageUrl} alt={`${item.name}, ${item.year}`}
          className="w-[348px] h-[348px] object-cover rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center p-4 w-full">
        <h3 className="text-2xl font-medium text-center">{item.name}</h3>
        <p className="text-lg text-gray-500">{item.year}</p>
      </div>
    </div>
  )
}

export default GaleryItem