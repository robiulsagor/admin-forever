import { useState } from "react"
import { assets } from "../assets/assets"
import { toast } from "react-toastify"
import axios from "axios"
import { backendUrl } from "../App"

// eslint-disable-next-line react/prop-types
const Add = ({ token }) => {
  const [loading, setLoading] = useState(false)

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [price, setPrice] = useState('')
  const [sizes, setSizes] = useState([])
  const [bestSeller, setBestSeller] = useState(false)

  const sizeArray = ['SM', 'M', 'L', 'XL', 'XXL']

  const handleSizeChange = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size))
    } else {
      setSizes([...sizes, size])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!sizes.length) {
      toast.error("Please select a size!")
    }
    if (!image1) {
      toast.error("Please upload at least one image!")
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('price', price)
    formData.append('sizes', JSON.stringify(sizes))
    formData.append('bestSeller', bestSeller)
    image1 && formData.append('image1', image1)
    image2 && formData.append('image2', image2)
    image3 && formData.append('image3', image3)
    image4 && formData.append('image4', image4)

    try {
      const res = await axios.post(backendUrl + '/product/add', formData, { headers: { token } })
      if (res.data.success) {
        toast.success("Product added successfully!")
        // reset the form
        setName('')
        setDescription('')
        setCategory('')
        setSubCategory('')
        setPrice('')
        setSizes([])
        setBestSeller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error?.response?.data?.message)
      toast.error("Error - " + error?.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="w-full max-w-[500px] pt-8 py-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-gray-700 ">Upload Image</p>

          {/* image div */}
          <div className="flex flex-wrap gap-3 items-center mt-2 justify-center sm:justify-start">
            <div>
              <label htmlFor="image1">
                <img src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                  className="w-20 h-20 object-cover cursor-pointer" alt="" />
              </label>
              <input onChange={e => setImage1(e.target.files[0])} type="file" id="image1" className="hidden" />
            </div>

            <div>
              <label htmlFor="image2">
                <img src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                  className="w-20 h-20 object-cover cursor-pointer" alt="" />
              </label>
              <input onChange={e => setImage2(e.target.files[0])} type="file" id="image2" className="hidden" />
            </div>

            <div>
              <label htmlFor="image3">
                <img src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                  className="w-20 h-20 object-cover cursor-pointer" alt="" />
              </label>
              <input onChange={e => setImage3(e.target.files[0])} type="file" id="image3" className="hidden" />
            </div>

            <div>
              <label htmlFor="image4">
                <img src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                  className="w-20 h-20 object-cover cursor-pointer" alt="" />
              </label>
              <input onChange={e => setImage4(e.target.files[0])} type="file" id="image4" className="hidden" />
            </div>

          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name">Product Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} name="name" id="name" className="w-full border border-gray-300 px-3 py-2 outline-none rounded text-gray-700" required />
        </div>

        <div className="mb-4">
          <label htmlFor="description">Product Description</label>
          <textarea type="text" value={description} onChange={e => setDescription(e.target.value)} name="name" id="description" className="w-full border border-gray-300 px-3 py-2 outline-none rounded text-gray-700" required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-4 justify-between ">
          <div className="flex flex-col max-w-[200px]">
            <label htmlFor="category">Product Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} id="category" className="border border-gray-300 p-2 rounded outline-none text-gray-700" required>
              <option value="" defaultChecked disabled>Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="subCategory"> Sub-Category</label>
            <select value={subCategory} onChange={e => setSubCategory(e.target.value)} id="subCategory" className="border border-gray-300 p-2 max-w-[200px] text-gray-700" required>
              <option value="" defaultChecked disabled>Select</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Product Price</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} id="price" placeholder="59" className="border border-gray-300 p-2 w-[200px] sm:w-[150px] outline-none text-gray-700" required />
          </div>
        </div>

        <div className="mt-5 ">
          <label>Product Sizes</label>

          <div className="flex flex-row gap-4 my-3">
            {sizeArray.map((item, index) => (
              <div key={index} onClick={() => handleSizeChange(item)}>
                <p className={`px-3 py-1 bg-slate-200 rounded-sm cursor-pointer border select-none ${sizes.includes(item) ? " border-orange-400" : "border-transparent"} `} >{item} </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 items-center mt-7">
          <input type="checkbox" checked={bestSeller} onChange={e => setBestSeller(e.target.checked)} name="" id="bestSeller" />
          <label htmlFor="bestSeller" className="mb-0 select-none cursor-pointer" >Add to Bestseller</label>
        </div>

        <button disabled={loading} className="bg-gray-900 text-white px-8 py-2 rounded mt-8 hover:scale-110 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
          {loading ? "Loading..." : "Add Product"}
        </button>

      </form>
    </div>
  )
}

export default Add