// import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex h-40 w-screen bg-black text-white">
      <div className="w-full flex items-center justify-between gap-4">
        <p className="w-full text-center">Sewn Pieces</p>
        <p className="w-full text-center">Videos/Films</p>
        <p className="w-full text-center text-3xl">Rbt.Sps</p>
        <p className="w-full text-center">CV</p>
        <p className="w-full text-center">Contact</p>
      </div>
    </div>
  )
}

export default Navbar