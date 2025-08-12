import { useState, useRef, useEffect, type ChangeEvent, type MouseEvent } from "react";
import { useApp } from "../../utils/hooks";

const ItemDetailsModal = () => {
  const {
    selectedItem, setSelectedItem,
    isOpenItemDetailsDrawer, setIsOpenItemDetailsDrawer,
    imageZoom, setImageZoom,
    position, setPosition
  } = useApp();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Evento del controlador de zoom
  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageZoom(parseFloat(e.target.value));
  }

  // Evento de pulsar sobre la imagen
  const handleMouseDown = (e: React.MouseEvent) => {
    if (imageZoom <= 1) return;

    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }

  // Evento de liberar el click
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Evento de arrastrar la imagen
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || imageZoom <= 1) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const containerRect = container.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    // Calcular límites del desplazamiento
    const maxX = (imageRect.width - containerRect.width) / 2;
    const maxY = (imageRect.height - containerRect.height) / 2;

    let newX = e.clientX - startPos.x;
    let newY = e.clientY - startPos.y;

    // Limitar el desplazamiento a los bordes de la imagen
    newX = Math.min(Math.max(newX, -maxX), maxX);
    newY = Math.min(Math.max(newY, -maxY), maxY);

    setPosition({ x: newX, y: newY });
  }

  // Evento de cerrar el modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setPosition({ x: 0, y: 0 });
    setImageZoom(1);
  }

  // Cuando el zoom es x1 que la imagen se ponga nuevamente en el centro
  useEffect(() => {
    if (imageZoom <= 1) setPosition({ x: 0, y: 0 });
  }, [imageZoom, setPosition]);

  if (!selectedItem) return null;

  return (
    <div className="fixed w-screen h-screen bg-black/75">
      {/* Barra de opciones */}
      <div className="absolute flex w-full p-4 -m-2 items-center justify-between text-white">
        {/* Botón de cerrar el modal */}
        <button
          onClick={handleCloseModal}
          className="flex z-50 items-center justify-center h-12 w-12 rounded-full cursor-pointer transition-colors duration-300 ease hover:bg-gray-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {/* Controlador del zoom */}
        <div className="flex items-center w-2/5 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus z-50">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
          </svg>
          <input
            type="range"
            min={1}
            max={2}
            step={0.01}
            value={imageZoom}
            onChange={handleZoomChange}
            className="w-full h-1 z-50 bg-white rounded-lg appearance-none cursor-pointer ease"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus z-50">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </div>

        {/* Botón de visualizar los detalles */}
        <button
          onClick={() => setIsOpenItemDetailsDrawer(!isOpenItemDetailsDrawer)}
          className="flex z-50 items-center justify-center h-12 w-12 rounded-full cursor-pointer transition-colors duration-300 ease hover:bg-gray-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-menu-deep transition-transform duration-300 ease ${isOpenItemDetailsDrawer ? "transform scale-y-[-1]" : ""}`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6h16" /><path d="M7 12h13" />
            <path d="M10 18h10" />
          </svg>
        </button>
      </div>

      {/* Layout del modal */}
      <div className="h-screen flex justify-center items-center text-white">
        {/* Imagen */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={imageRef}
            className="w-full h-full inset-0 bg-center bg-no-repeat bg-contain object-cover"
            style={{
              backgroundImage: `url(${selectedItem.imageUrl})`,
              transform: `scale(${imageZoom}) translate(${position.x}px, ${position.y}px)`,
              cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: isDragging ? 'none' : 'transform 0.2s ease'
            }}
          />
        </div>

        {/* Menú de los detalles de la imagen */}
      </div>
    </div>
  )
}

export default ItemDetailsModal