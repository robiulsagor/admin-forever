import axios from "axios"
import { useState, useEffect } from "react"
import { backendUrl } from "../App"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { assets } from "../assets/assets"

// eslint-disable-next-line react/prop-types
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${backendUrl}/order/list`, { headers: { token } })
        if (res.data.success) {
          setOrders(res.data.orders)
        } else {
          toast.error(res.data.message || "Error in fetching orders")
        }
      } catch (error) {
        toast.error(error.message || "Error in fetching orders")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.post(`${backendUrl}/order/status`, { id, status }, { headers: { token } })
      if (res.data.success) {
        toast.success("Order status updated successfully")
        setOrders(orders.map(order => order._id === id ? { ...order, status } : order))
      } else {
        toast.error(res.data.message || "Error in updating order status")
      }
    } catch (error) {
      toast.error(error.message || "Error in updating order status")
    }
  }

  return (
    <div className="w-full pt-4 pb-10">
      <h2 className="text-xl font-medium text-gray-700 mb-3">All Orders</h2>

      <div>
        {loading ? <Loader height={'40vh'} /> : orders.length > 0 ? orders.map((order, index) => (
          <div key={index} className={`border border-gray-300 rounded  mb-2 grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] text-sm text-gray-700 py-12 px-8
          ${order.payment ? "" : "bg-red-50"}`}>
            <img src={assets.parcel_icon} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded" alt="" />

            <div className="flex flex-col gap-1 ">
              {order.items.map((item, i) => (
                i === order.items.length - 1 ? <p key={i}>{item.name} x {item.quantity} ${item.size} </p> : <p key={i}>{item.name}  x {item.quantity} ${item.size},</p>
              ))}

              <p className="font-medium text-gray-700 mt-2">{order.address.firstName} {order.address.lastName}</p>
              <p className=" text-gray-700 mt-2">{order.address.street}{order.address.city}, {order.address.state}, {order.address.zipCode}</p>
              <p className=" text-gray-700">{order.address.phoneNumber}</p>
            </div>

            <div>
              <p className="text-[15px]">Items: {order.items.length} </p>
              <p className="mt-3">Method:<span className={` font-semibold`}> {order.paymentMethod} </span> </p>
              <p className={`${order.payment ? "" : "text-red-500"} mt-0.5`}>Payment: <span className={` font-semibold`}>{order.payment ? "Done" : "Pending"} </span> </p>
              <p className="mt-0.5">Date: {new Date(order.date).toLocaleDateString()} </p>
            </div>

            <p className=" text-gray-600 text-[15px]">${order.amount} </p>

            <div>
              <select value={order.status} onChange={e => handleStatusChange(order._id, e.target.value)} name="" id="" className="border border-gray-500 rounded p-1 outline-none font-medium px-4 py-2 text-[15px]">
                <option value="Order Placed">Pending</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>


        )) : <h2 className="text-xl font-medium text-gray-700">No orders found</h2>}
      </div>
    </div>
  )
}

export default Orders