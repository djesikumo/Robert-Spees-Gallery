import { useApp } from "../../utils/hooks"
import type { GaleryItem as Item } from "../../types/galery"

interface GaleryItemProps {
  item: Item
}
const GaleryItem = ({ item }: GaleryItemProps) => {
  const { setSelectedItem } = useApp()

  return (
    <div className="max-w-[372px] p-4">
      <div
        onClick={() => setSelectedItem(item)} 
        className="overflow-hidden"
      >
        <img src={item.imageUrl} alt={`${item.name}, ${item.year}`}
          className="object-contain rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center p-4 w-full">
        <h3 className="text-lg md:text-2xl font-medium text-center font-selectric line-clamp-2 md:line-clamp-none">{item.name}</h3>
        <p className="text-sm md:text-lg text-gray-500">{item.year}</p>
      </div>
    </div>
  )
}

export default GaleryItem