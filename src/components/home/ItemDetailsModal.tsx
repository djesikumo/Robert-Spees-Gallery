import { useState, useRef, useEffect, type ChangeEvent, type MouseEvent } from "react";
import { useApp } from "../../utils/hooks";
import { data } from "../../data";

const ItemDetailsModal = () => {
  const {
    selectedItem, setSelectedItem,
    imageZoom, setImageZoom,
    position, setPosition
  } = useApp();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Evento del controlador de zoom
  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageZoom(parseFloat(e.target.value));
  }

  // Evento de pulsar sobre la imagen
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imageZoom <= 1) return;

    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x / imageZoom,
      y: e.clientY - position.y / imageZoom,
    });
  }

  // Evento de liberar el click
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Evento de arrastrar la imagen
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!isDragging || imageZoom <= 1) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const containerRect = container.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    // Calcular límites del desplazamiento considerando el zoom
    const scaledWidth = imageRect.width * imageZoom;
    const scaledHeight = imageRect.height * imageZoom;

    const maxX = (scaledWidth - containerRect.width) / 2;
    const maxY = (scaledHeight - containerRect.height) / 2;

    // Calcular nueva posición con ajuste de zoom
    let newX = (e.clientX - startPos.x) * imageZoom;
    let newY = (e.clientY - startPos.y) * imageZoom;

    // Limitar el desplazamiento a los bordes de la imagen
    newX = Math.min(Math.max(newX, -maxX), maxX);
    newY = Math.min(Math.max(newY, -maxY), maxY);

    setPosition({ x: newX, y: newY });
  }

  // Evento de cerrar el modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setPosition({ x: 0, y: 0 });
    setImageZoom(0.5);
  }

  // Navegar a la imagen anterior
  const handlePrevImage = () => {
    if (!selectedItem) return;
    const currentIndex = data.findIndex(item => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    setSelectedItem(data[prevIndex]);
    setPosition({ x: 0, y: 0 });
    setImageZoom(0.5);
  }

  // Navegar a la imagen siguiente
  const handleNextImage = () => {
    if (!selectedItem) return;
    const currentIndex = data.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % data.length;
    setSelectedItem(data[nextIndex]);
    setPosition({ x: 0, y: 0 });
    setImageZoom(0.5);
  }

  // Cuando el zoom es x1 que la imagen se ponga nuevamente en el centro
  useEffect(() => {
    if (imageZoom <= 0.75) setPosition({ x: 0, y: 0 });
  }, [imageZoom, setPosition]);

  if (!selectedItem) return null;

  return (
    <div className="fixed w-screen h-screen bg-black/75 backdrop-blur-md animate-backdrop">
      {/* Barra de opciones */}
      <div className="absolute flex w-full z-50 p-4 items-center justify-between text-white">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-zoom-out-area z-50">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13 15h4" />
            <path d="M15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
            <path d="M22 22l-3 -3" />
            <path d="M6 18h-1a2 2 0 0 1 -2 -2v-1" />
            <path d="M3 11v-1" />
            <path d="M3 6v-1a2 2 0 0 1 2 -2h1" />
            <path d="M10 3h1" />
            <path d="M15 3h1a2 2 0 0 1 2 2v1" />
          </svg>
          <input
            type="range"
            min={0.50}
            max={1.50}
            step={0.01}
            value={imageZoom}
            onChange={handleZoomChange}
            className="w-full h-1 z-50 bg-white rounded-lg appearance-none cursor-pointer ease"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-zoom-in-area z-50">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 13v4" />
            <path d="M13 15h4" />
            <path d="M15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
            <path d="M22 22l-3 -3" />
            <path d="M6 18h-1a2 2 0 0 1 -2 -2v-1" />
            <path d="M3 11v-1" />
            <path d="M3 6v-1a2 2 0 0 1 2 -2h1" />
            <path d="M10 3h1" />
            <path d="M15 3h1a2 2 0 0 1 2 2v1" />
          </svg>
        </div>

        {/* Relleno */}
        <div className="h-12 w-12" />
      </div>

      {/* Layout del modal */}
      <div className="h-screen flex justify-center items-center text-white">
        {/* Botón de navegar a la imagen anterior */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 z-50 flex items-center justify-center h-12 w-12 rounded-full cursor-pointer transition-colors duration-300 ease hover:bg-gray-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" />
          </svg>
        </button>

        {/* Botón de navegar a la imagen posterior */}
        <button
          onClick={handleNextImage}
          className="absolute right-4 z-50 flex items-center justify-center h-12 w-12 rounded-full cursor-pointer transition-colors duration-300 ease hover:bg-gray-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" />
          </svg>
        </button>

        {/* Imagen */}
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-hidden"
        >
          <div className="absolute flex items-center justify-center inset-0 overflow-auto z-10 animate-modal-image-enter">
            <img
              ref={imageRef}
              src={selectedItem.imageUrl}
              alt={`${selectedItem.name}, ${selectedItem.year}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="portrait:w-[95%] portrait:h-auto landscape:h-[95%] landscape:w-auto transition-transform duration-300 ease"
              style={{
                transform: `scale(${imageZoom}) translate(${position.x}px, ${position.y}px)`,
                cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                transition: isDragging ? 'none' : 'transform 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Detalles de la imagen */}
        <div className="absolute flex flex-col items-center justify-center bottom-0 w-7/8 h-32 text-white">
          <p className="italic">{`${selectedItem.name}, ${selectedItem.year}`}</p>
          <p className="text-center">{selectedItem.technique}</p>
          <p>{selectedItem.dimensions}</p>
          <p>{selectedItem.description ? selectedItem.description : "No description available."}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailsModal