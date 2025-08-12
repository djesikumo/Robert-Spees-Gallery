import { useApp } from "../../utils/hooks";

const ItemDetailsModal = () => {
  const { selectedItem, setSelectedItem } = useApp();

  if (!selectedItem) return null;

  return (
    <div className="fixed w-screen h-screen bg-black/75">
      {/* Botón de cerrar el modal */}
      <button
        onClick={() => setSelectedItem(null)}
        className="absolute top-2 left-2 z-50 flex items-center justify-center h-12 w-12 rounded-full text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-500/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>

      {/* Botón de visualizar los detalles */}

      {/* Layout del modal */}
      <div className="relative flex justify-center items-center p-8 text-white">
        {/* Controlador del zoom */}
        <div className="absolute flex items-center w-2/5 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
          </svg>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailsModal