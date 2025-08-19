import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../utils/hooks';

const Navbar = () => {
  const { currentRoute, setCurrentRoute } = useApp();
  const location = useLocation();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname, currentRoute, setCurrentRoute]);

  return (
    <div className="flex h-40 w-full p-4 bg-black text-white font-selectric text-center">
      <div className="w-full flex items-center justify-center sm:justify-between gap-2 sm:gap-4">
        <div className='flex flex-col flex-1 sm:hidden'>
          <span className='w-full flex justify-center'>
            <Link to="/" className={`text-lg transition-colors duration-300 ease-in-out ${currentRoute === "/" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Sewn Pieces</Link>
          </span>
          <span className='w-full flex justify-center'>
            <Link to="/videos-films" className={`text-lg transition-colors duration-300 ease-in-out ${currentRoute === "/videos-films" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Videos/Films</Link>
          </span>
        </div>
        <span className='w-full hidden sm:flex flex-1 justify-center'>
          <Link to="/" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Sewn Pieces</Link>
        </span>
        <span className='w-full hidden sm:flex flex-1 justify-center'>
          <Link to="/videos-films" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/videos-films" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Videos/Films</Link>
        </span>

        {/* Rbt Sps */}
        <span className='flex-1 flex justify-center'>
          <p className="text-2xl sm:text-4xl">Rbt.Sps.</p>
        </span>

        <div className='flex flex-col flex-1 sm:hidden'>
          <span className='w-full flex justify-center'>
            <Link to="/cv" className={`text-lg transition-colors duration-300 ease-in-out ${currentRoute === "/cv" ? "text-indigo-500" : "hover:text-indigo-500"}`}>CV/Contact</Link>
          </span>
          <span className='w-full flex justify-center'>
            <Link to="/biography" className={`text-lg transition-colors duration-300 ease-in-out ${currentRoute === "/biography" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Biography</Link>
          </span>
        </div>
        <span className='w-full hidden sm:flex flex-1 justify-center'>
          <Link to="/cv" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/cv" ? "text-indigo-500" : "hover:text-indigo-500"}`}>CV/Contact</Link>
        </span>
        <span className='w-full hidden sm:flex flex-1 justify-center'>
          <Link to="/biography" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/biography" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Biography</Link>
        </span>
      </div>
    </div>
  )
}

export default Navbar