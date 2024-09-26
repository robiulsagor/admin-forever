import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

const Sidebar = () => {


    return (
        <div className="w-[70px] lg:w-[18%] pt-6 border-r-2 min-h-[calc(100vh-70px)]">
            <div className="ml-[20%]  flex flex-col gap-4">
                <NavLink to='/add' className={({ isActive }) =>
                    `flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-1.5 rounded-l hover:bg-slate-200 transition ${isActive ? "bg-slate-200" : ""
                    }`
                }>
                    <img src={assets.add_icon} className="w-4 h-4" alt="" />
                    <span className="hidden lg:block">Add Item</span>
                </NavLink>

                <NavLink to='/list' className={({ isActive }) =>
                    `flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-1.5 rounded-l hover:bg-slate-200 transition ${isActive ? "bg-slate-200" : ""
                    }`
                }>
                    <img src={assets.parcel_icon} className="w-5 h-5" alt="" />
                    <span className="hidden lg:block">List Items</span>
                </NavLink>

                <NavLink to='/orders' className={({ isActive }) =>
                    `flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-1.5 rounded-l hover:bg-slate-200 transition ${isActive ? "bg-slate-200" : ""
                    }`
                }>
                    <img src={assets.order_icon} className="w-4 h-4" alt="" />
                    <span className="hidden lg:block">Orders</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar