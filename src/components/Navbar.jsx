import {assets} from "../assets/assets"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-[4%] py-2">
        <img src={assets.logo} className="w-40" alt="" />
        <button className="bg-gray-800 text-white px-3 py-2 sm:px-8 rounded-full hover:bg-gray-600 transition">Logout</button>
    </nav>
  )
}

export default Navbar