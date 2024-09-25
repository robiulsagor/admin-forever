import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

const Sidebar = () => {


    return (
        <div className="w-[18%] mt-6 border-r-2 min-h-screen">
            <div className="ml-[20%]  flex flex-col gap-6">
                <NavLink to='/add' className={({ isActive }) =>
                    `flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-2 rounded-l hover:bg-slate-200 transition ${isActive ? "bg-slate-200" : ""
                    }`
                }>
                    <img src={assets.add_icon} className="w-5 h-5" alt="" />
                    <span className="hidden sm:block">Add</span>
                </NavLink>

                <NavLink to='/list' className={({ isActive }) =>
                    `flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-2 rounded-l hover:bg-slate-200 transition ${isActive ? "bg-slate-200" : ""
                    }`
                }>
                    <img src={assets.parcel_icon} className="w-5 h-5" alt="" />
                    <span className="hidden sm:block">List</span>
                </NavLink>

                <NavLink to='/orders' className={({ isActive }) =>
                    `flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-2 rounded-l hover:bg-slate-200 transition ${isActive ? "bg-slate-200" : ""
                    }`
                }>
                    <img src={assets.order_icon} className="w-5 h-5" alt="" />
                    <span className="hidden sm:block">Orders</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar