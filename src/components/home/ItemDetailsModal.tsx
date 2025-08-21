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
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
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
    setIsDetailsOpen(false);
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

  // Cuando cambia el ancho del documento y están desplegados los detalles
  useEffect(() => {
    const handleResize = () => {
      // Si el ancho supera el breakpoint sm (640px) y los detalles están abiertos, los cerramos
      if (window.innerWidth >= 768 && isDetailsOpen) {
        setIsDetailsOpen(false);
      }
    };
    // Agregar listener al montar
    window.addEventListener('resize', handleResize);

    // Verificar el tamaño inicial
    handleResize();
    // Limpiar listener al desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, [isDetailsOpen]);

  if (!selectedItem) return null;

  return (
    <div className="fixed w-screen bg-black/75 backdrop-blur-md animate-backdrop"
      style={{ height: "100dvh" }}
    >
      {/* Barra de opciones */}
      <div className={`absolute flex w-full p-4 items-center justify-between text-white ${isDetailsOpen ? "z-30" : "z-50"}`}>
        {/* Botón de cerrar el modal */}
        <div className="flex flex-1">
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
        </div>

        {/* Controlador del zoom */}
        <div className="hidden md:flex flex-1 items-center w-2/5 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus z-50">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
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
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus z-50">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" /><path d="M5 12l14 0" />
          </svg>
        </div>

        {/* Botones de navegar a la imagen anterior y posterior */}
        <div className="flex flex-1 justify-end space-x-1">
          {!isDetailsOpen && (
            <>
              <button
                onClick={handlePrevImage}
                className="flex items-center justify-center h-12 w-12 rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-500/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="flex items-center justify-center h-12 w-12 rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-500/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Layout del modal */}
      <div className="h-screen flex flex-col justify-center items-center text-white">
        {/* Imagen */}
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center overflow-hidden z-10 animate-modal-image-enter"
        >
          <img
            ref={imageRef}
            src={selectedItem.imageUrl}
            alt={`${selectedItem.name}, ${selectedItem.year}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="hidden md:flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `scale(${imageZoom}) translate(${position.x}px, ${position.y}px)`,
              cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: isDragging ? 'none' : 'transform 0.3s ease'
            }}
          />
          <img
            src={selectedItem.imageUrl}
            alt={`${selectedItem.name}, ${selectedItem.year}`}
            className={`md:hidden flex portrait:w-4/5 portrait:h-auto landscape:h-4/5 landscape:w-auto transition-transform duration-300 ease-in ${isDetailsOpen ? "scale-0" : "scale-100"}`}
          />
        </div>

        {/* Botón toggle para desplegar u ocultar los detalles del artwork */}
        <div
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className={`absolute flex md:hidden items-center py-2 z-30 transition-all duration-300 ease-in-out ${isDetailsOpen ? "top-0 flex-col-reverse" : "bottom-0 flex-col"}`}
        >
          <button className="flex items-center justify-center h-12 w-12 rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-500/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" className={`${isDetailsOpen ? "rotate-180" : ""}`}>
              <path fill="currentColor" d="M12 13q-.425 0-.712-.288T11 12V5.825L7.1 9.7q-.275.275-.687.288T5.7 9.7q-.275-.275-.275-.7t.275-.7l5.6-5.6q.15-.15.325-.212T12 2.425t.375.063t.325.212l5.6 5.6q.275.275.275.688T18.3 9.7q-.3.3-.712.3t-.713-.3L13 5.825V12q0 .425-.288.713T12 13m0 5q-.425 0-.712-.288T11 17v-1q0-.425.288-.712T12 15t.713.288T13 16v1q0 .425-.288.713T12 18m0 4q-.425 0-.712-.288T11 21t.288-.712T12 20t.713.288T13 21t-.288.713T12 22" />
            </svg>
          </button>
          <span>{isDetailsOpen ? "Hide details" : "Show details"}</span>
        </div>

        {/* Dialog de los detalles del artwork */}
        <div className={`absolute flex flex-col md:hidden items-center justify-center p-2 w-full h-full z-20 transition-transform duration-500 ease-in ${isDetailsOpen ? "translate-y-0" : "translate-y-full"}`}>
          <p className="text-center italic">{`${selectedItem.name}, ${selectedItem.year}`}</p>
          <p className="text-center">{selectedItem.technique}</p>
          <p className="text-center">{selectedItem.dimensions}</p>
          {selectedItem.description && <p className="text-center">{selectedItem.description}</p>}
        </div>
        <div className="absolute md:flex md:flex-col hidden items-center justify-center py-2 bottom-0 w-7/8 h-auto text-white">
          <p className="text-center italic">{`${selectedItem.name}, ${selectedItem.year}`}</p>
          <p className="text-center">{selectedItem.technique}</p>
          <p className="text-center">{selectedItem.dimensions}</p>
          {selectedItem.description && <p className="text-center">{selectedItem.description}</p>}
        </div>
      </div>
    </div>
  )
}

export default ItemDetailsModal