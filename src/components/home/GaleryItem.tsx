import { useApp } from "../../utils/hooks"
import type { GaleryItem as Item } from "../../types/galery"

interface GaleryItemProps {
  item: Item;
  adminMode: boolean;
}
const GaleryItem = ({ item, adminMode }: GaleryItemProps) => {
  const { setSelectedItem } = useApp();

  return (
    <div className="relative max-w-[372px] p-1 sm:p-4">
      {/* Acciones (solo disponibles desde el modo admin) */}
      {adminMode && (
        <div className="absolute w-full flex items-center justify-end space-x-1 z-10 -my-5 text-white">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      )}

      {/* Contenido */}
      <div
        onClick={() => {
          if (!adminMode) setSelectedItem(item);
        }}
        className="overflow-hidden"
      >
        <img src={item.imageUrl} alt={`${item.name}, ${item.year}`}
          className="w-full object-contain rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center p-4 w-full">
        <h3 className="text-lg md:text-2xl font-medium text-center font-selectric line-clamp-3 md:line-clamp-none text-gray-800">{item.name}</h3>
        <p className="text-sm md:text-lg text-gray-500">{item.year}</p>
      </div>
    </div>
  )
}

export default GaleryItem