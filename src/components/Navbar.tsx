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
    <div className="flex h-40 w-full bg-black text-white font-selectric">
      <div className="w-full flex items-center justify-between gap-4">
        <span className='w-full flex justify-center'>
          <Link to="/" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Sewn Pieces</Link>
        </span>
        <span className='w-full flex justify-center'>
          <Link to="/videos-films" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/videos-films" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Videos/Films</Link>
        </span>
        <span className='w-full flex justify-center'>
          <Link to="/rbt-sps" className={`text-4xl transition-colors duration-300 ease-in-out ${currentRoute === "/rbt-sps" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Rbt.Sps</Link>
        </span>
        <span className='w-full flex justify-center'>
          <Link to="/cv" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/cv" ? "text-indigo-500" : "hover:text-indigo-500"}`}>CV</Link>
        </span>
        <span className='w-full flex justify-center'>
          <Link to="/contact" className={`text-2xl transition-colors duration-300 ease-in-out ${currentRoute === "/contact" ? "text-indigo-500" : "hover:text-indigo-500"}`}>Contact</Link>
        </span>
      </div>
    </div>
  )
}

export default Navbar