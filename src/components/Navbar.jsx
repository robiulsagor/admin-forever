/* eslint-disable react/prop-types */
import { assets } from "../assets/assets"

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center justify-between px-[4%] h-[68px] py-1.5">
      <img src={assets.logo} className="w-32 sm:w-36" alt="" />
      <button onClick={() => setToken('')} className="bg-gray-800 text-white text-sm sm:text-base px-3 py-2 sm:px-8 rounded-full hover:bg-gray-600 transition">Logout</button>
    </nav>
  )
}

export default Navbar