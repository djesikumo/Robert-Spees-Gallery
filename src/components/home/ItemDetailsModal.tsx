import { useState, useRef, useEffect, type ChangeEvent, type MouseEvent, type TouchEvent } from "react";
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
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Evento del controlador de zoom
  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageZoom(parseFloat(e.target.value));
  }

  // Evento de pulsar sobre la imagen
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDraggable) return;

    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  // Evento de pulsar el táctil del móvil
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if (!isDraggable) return;

    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  }

  // Evento de liberar el click
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Evento de liberar el táctil del móvil
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Evento de arrastrar la imagen
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!isDragging || !isDraggable) return;

    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  }

  const handleTouchMove = (e: TouchEvent<HTMLImageElement>) => {
    e.preventDefault();
    if (!isDragging || !isDraggable) return;

    if (e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y,
      });
    }
  };

  // Evento de cerrar el modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setPosition({ x: 0, y: 0 });
    setImageZoom(1);
    setIsDetailsOpen(false);
  }

  // Navegar a la imagen anterior
  const handlePrevImage = () => {
    if (!selectedItem) return;
    const currentIndex = data.findIndex(item => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    setSelectedItem(data[prevIndex]);
    setPosition({ x: 0, y: 0 });
    setImageZoom(1);
  }

  // Navegar a la imagen siguiente
  const handleNextImage = () => {
    if (!selectedItem) return;
    const currentIndex = data.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % data.length;
    setSelectedItem(data[nextIndex]);
    setPosition({ x: 0, y: 0 });
    setImageZoom(1);
  }

  // Cuando las dimensiones de la imagen son menores que su contenedor que se ponga nuevamente en el centro
  useEffect(() => {
    if (!isDraggable) setPosition({ x: 0, y: 0 });
  }, [imageZoom, setPosition, isDraggable]);

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

  // Validar arrastrabilidad
  useEffect(() => {
    // Calcular si la imagen es arrastrable basado en dimensiones
    const calculateDraggable = () => {
      if (!imageRef.current || !containerRef.current) return;

      const img = imageRef.current;
      const container = containerRef.current;

      const imgWidth = img.width * imageZoom;
      const imgHeight = img.height * imageZoom;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Es arrastrable si alguna dimensión de la imagen es mayor que el contenedor
      const draggable = imgWidth > containerWidth || imgHeight > containerHeight;
      console.log(draggable);
      setIsDraggable(draggable);
    };

    calculateDraggable();
  }, [imageZoom, selectedItem]);

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
        <div className="flex flex-1 items-center w-2/5 gap-2">
          {!isDetailsOpen && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus z-50">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus z-50">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" /><path d="M5 12l14 0" />
              </svg>
            </>
          )}
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="md:w-auto md:h-auto portrait:w-4/5 portrait:h-auto landscape:h-4/5 landscape:w-auto"
            style={{
              transform: `scale(${isDetailsOpen ? 0 : imageZoom}) translate(${position.x}px, ${position.y}px)`,
              cursor: isDraggable ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: !isDragging ? 'transform 0.3s ease' : "none"
            }}
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