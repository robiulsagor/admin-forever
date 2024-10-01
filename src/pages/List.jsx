import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const List = ({ token }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await axios.get(backendUrl + '/product/list', { headers: { token } })
        setProducts(res.data.products)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const deleteProduct = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?")
    if (!confirm) return

    try {
      const res = await axios.post(backendUrl + '/product/delete', { productId: id }, { headers: { token } })
      if (res.data.success) {
        toast.success("Product deleted successfully!")
        setProducts(products.filter(product => product._id !== id))
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ? error.response.data.message : "Something went wrong")
    }
  }

  return (
    <div className="w-full pt-4 pb-10 ">
      <h2 className="text-xl font-medium text-gray-600 mb-6">All Products List</h2>
      {loading && <div className="flex justify-center items-center"><Loading /></div>}

      {!loading && products.length === 0 && <div className="flex justify-center items-center"><p className="text-gray-500">No products found</p></div>}

      {!loading && products.length > 0 && (
        <>
          <div className="bg-slate-100 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_0.5fr] text-sm p-1 font-medium text-gray-700">
            <p>Image</p>
            <p>Name</p>
            <p className="hidden md:block">Category</p>
            <p className="hidden md:block">Price</p>
            <p>Action</p>
          </div>

          <div className="mt-2 ">
            {products.map((product, index) => (
              <div key={index} className="mb-2 border rounded p-1 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_0.5fr] text-sm items-center text-gray-700">
                <div className="border w-14 h-14 object-cover rounded">
                  <img src={product.image[0]} className="w-full h-full object-cover" alt="" />
                </div>
                <p>{product.name}</p>
                <p className="hidden md:block">{product.category}</p>
                <p className="hidden md:block">${product.price}</p>
                <div className="flex gap-2">
                  <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export default List